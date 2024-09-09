function Footer() {
  return (
    <>
      <div className=" bg-blue-500">
        <div className="max-w-2xl mx-auto text-white py-10">
          <div className="flex gap-5 justify-center md:justify-center items-center">
          <img
            className="h-10 w-auto"
            src="/file1.png"
            alt="Your Company"
          />
          E-Commerce website
          </div>
          <div className="mt-8 flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-400">
            <p className="order-2 md:order-1 mt-8 md:mt-0">
              {' '}
              © Francis Silva, 2024.{' '}
            </p>
            <div className="order-1 md:order-2">
              <span className="px-2">Home</span>
              <span className="px-2 border-l">Contact us</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
