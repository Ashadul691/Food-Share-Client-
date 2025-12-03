import { FaFacebookF, FaGithub, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#f3f4f6] text-base-content mt-10">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-3xl font-bold text-[#8fbf5b] henny-penny-regular">
            Food Share
          </h2>
          <p className="mt-4 text-sm text-gray-600 leading-relaxed">
            Food Share helps reduce food waste by connecting donors with people in need.  
            Share, care, and make a positive impact.
          </p>
        </div>

        {/* Services */}
        <div>
          <h3 className="footer-title text-lg mb-4 text-[#3b3b3b] font-semibold">
            Services
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li><a className="hover:text-[#8fbf5b] duration-200">Food Sharing</a></li>
            <li><a className="hover:text-[#8fbf5b] duration-200">Community Support</a></li>
            <li><a className="hover:text-[#8fbf5b] duration-200">Emergency Help</a></li>
            <li><a className="hover:text-[#8fbf5b] duration-200">Volunteer Program</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="footer-title text-lg mb-4 text-[#3b3b3b] font-semibold">
            Company
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li><a className="hover:text-[#8fbf5b] duration-200">About Us</a></li>
            <li><a className="hover:text-[#8fbf5b] duration-200">Contact</a></li>
            <li><a className="hover:text-[#8fbf5b] duration-200">Careers</a></li>
            <li><a className="hover:text-[#8fbf5b] duration-200">Press</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="footer-title text-lg mb-4 text-[#3b3b3b] font-semibold">
            Legal
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li><a className="hover:text-[#8fbf5b] duration-200">Terms of Service</a></li>
            <li><a className="hover:text-[#8fbf5b] duration-200">Privacy Policy</a></li>
            <li><a className="hover:text-[#8fbf5b] duration-200">Refund Policy</a></li>
          </ul>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between">
          
          {/* Left - Copyright */}
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Food Share— All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4 md:mt-0">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/ashadul.islam.rafi.2025/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white shadow hover:bg-[#8fbf5b] hover:text-white duration-300"
            >
              <FaFacebookF size={18} />
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/Ashadul691"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white shadow hover:bg-[#8fbf5b] hover:text-white duration-300"
            >
              <FaGithub size={18} />
            </a>

            {/* X (Twitter) */}
            <a
              href="https://x.com/ashadul691"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white shadow hover:bg-[#8fbf5b] hover:text-white duration-300"
            >
              <FaXTwitter size={18} />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
