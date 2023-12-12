export default function Footer() {
  return (
    <div className="bg-blue-900 text-white py-12 px-4 sm:px-8 lg:px-0 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
        <div className="col-span-1">
          <h6 className="font-bold uppercase">Support</h6>
          <ul className="mt-4">
            <li className="py-1">support@icecapital.com</li>
            <li>
              <span>Whatsapp:</span> +1234567
            </li>
          </ul>
        </div>
        <div className="col-span-1">
          <h6 className="font-bold uppercase">Company</h6>
          <ul className="mt-4">
            <li className="py-1">Investment Banking</li>
            <li className="py-1">Private Equity</li>
            <li className="py-1">Stock and Forex</li>
            <li className="py-1">Crypto Currency</li>
          </ul>
        </div>
        <div className="col-span-1">
          <h6 className="font-bold uppercase">Legal</h6>
          <ul className="mt-4">
            <li className="py-1">Terms of use</li>
            <li className="py-1">Customer information</li>
            <li className="py-1">Policies</li>
            <li className="py-1">Conditions</li>
          </ul>
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-2">
          <p className="font-bold uppercase">Subscribe to our newsletter</p>
          <p className="py-4">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>
          <form className="flex flex-col sm:flex-row">
            <input
              className="w-full p-2 mr-4 rounded-md mb-4"
              type="email"
              placeholder="Enter email.."
            />
            <button className="p-2 mb-4 bg-white text-black hover:bg-indigo-600 hover:text-white">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Social Icons Section */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center mt-8 text-white">
        <p className="py-4">2023 ICECAPITAL, LLC. All rights reserved</p>
        <div className="flex gap-4">{/* Add your social icons here */}</div>
      </div>
    </div>
  );
}
