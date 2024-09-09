FROM php:8.3-cli

# Install necessary PHP extensions
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    zip \
    unzip \
    git \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd \
    && docker-php-ext-install pdo pdo_mysql zip

# Set the working directory to the 'web' folder
WORKDIR /var/www/html/web

# Copy the project files to the container
COPY . /var/www/html

# Expose port 8888 for the PHP server
EXPOSE 8888

# Command to run PHP's built-in server inside the 'web' directory
CMD ["php", "-S", "0.0.0.0:8888", ".ht.router.php"]
