const { Product } = require('../model/Product');

exports.syncProductsFromDrupal = async (req, res) => {
    const fetch = (await import('node-fetch')).default;
    const DRUPAL_API_URL = 'http://localhost:8888/api/product';

    try {
        // Fetch products from Drupal API
        const response = await fetch(DRUPAL_API_URL);
        const drupalProducts = await response.json();

        // Map Drupal product data to your MongoDB schema
        const products = drupalProducts.map(product => ({
            title: product.product_name || '',
            description: product.field_description || '',
            price: parseFloat(product.field_price?.replace('$', '').replace(',', '') || '0') || 0,
            discountPercentage: parseFloat(product.field_discountpercentage?.replace('%', '') || '0') || 0,
            rating: parseFloat(product.field_rating || '0') || 0,
            stock: parseInt(product.field_stock || '0', 10) || 0,
            brand: product.field_brand || '',
            category: product.field_category || '',
            thumbnail: product.field_thumbnail || '',
            images: product.field_images ? product.field_images.match(/https?:\/\/[^\s"]+/g) || [] : [],
            deleted: product.field_deleted === 'true',
            colors: product.field_colors ? product.field_colors.split(',') : [],
            highlights: product.field_highlights ? product.field_highlights.split(',') : [],
            sizes: product.field_sizes ? product.field_sizes.split(',') : []
        }));

        // Insert or update products in MongoDB
        await Promise.all(products.map(async product => {
            await Product.findOneAndUpdate(
                { title: product.title },
                product,
                { upsert: true, new: true }
            );
        }));

        res.status(200).json({ products });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.fetchProductByIdFromDrupal = async (req, res) => {
    const fetch = (await import('node-fetch')).default;
    const DRUPAL_API_URL = 'http://localhost:8888/api/product';
    const { id } = req.params;

    try {
        // Fetch product from Drupal API
        const response = await fetch(`${DRUPAL_API_URL}/${id}`);

        if (!response.ok) {
            throw new Error('Failed to fetch product from Drupal');
        }

        const drupalProducts = await response.json();

        // If response is an array, take the first product
        const product = Array.isArray(drupalProducts) ? drupalProducts[0] : drupalProducts;

        if (!product) {
            throw new Error('Product not found');
        }

        console.log('Drupal Product:', product); // Debug line

        // Map Drupal product data to your MongoDB schema
        const mappedProduct = {
            title: product.product_name || '',
            description: product.field_description || '',
            price: parseFloat(product.field_price?.replace('$', '').replace(',', '') || '0') || 0,
            discountPercentage: parseFloat(product.field_discountpercentage?.replace('%', '') || '0') || 0,
            rating: parseFloat(product.field_rating || '0') || 0,
            stock: parseInt(product.field_stock || '0', 10) || 0,
            brand: product.field_brand || '',
            category: product.field_category || '',
            thumbnail: product.field_thumbnail || '',
            images: product.field_images ? product.field_images.match(/https?:\/\/[^\s"]+/g) || [] : [],
            deleted: product.field_deleted === 'true',
            colors: product.field_colors ? product.field_colors.split(',') : [],
            highlights: product.field_highlights ? product.field_highlights.split(',') : [],
            sizes: product.field_sizes ? product.field_sizes.split(',') : []
        };

        console.log('Mapped Product:', mappedProduct); // Debug line

        res.status(200).json(mappedProduct);
    } catch (err) {
        console.error('Error fetching product from Drupal:', err); // Improved error logging
        res.status(500).json({ error: err.message });
    }
};

