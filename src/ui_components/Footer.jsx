import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { CiMail } from "react-icons/ci";

const Footer = () => {
  return (
    <footer className="bg-[#F6F6F7] padding-x py-16 max-container dark:bg-[#141624]">
      <div className="flex flex-wrap gap-8 justify-between max-md:justify-center">
        {/* BlogVerse Info */}
        <div className="w-[300px] flex flex-col gap-6 max-md:items-center">
          <h1 className="text-[#141624] text-2xl dark:text-[#FFFFFF]">BlogVerse</h1>
          <p className="text-[14px] text-[#696A75] leading-[1.5] max-md:text-center dark:text-[#97989F]">
            Welcome to BlogVerse – where thoughts become stories. Share, read,
            and enjoy amazing content from writers around the world.
          </p>
        </div>

        {/* Newsletter */}
        <div className="bg-white w-[350px] px-6 flex flex-col items-center justify-center gap-2 rounded-lg dark:bg-[#242535] py-6">
          <h3 className="font-semibold text-xl dark:text-white">
            Weekly Newsletter
          </h3>
          <p className="text-[#696A75] text-[16px] mb-5 dark:text-[#97989F]">
            Get blog articles and offers via email
          </p>
          <div className="w-full relative">
            <input
              placeholder="Your Email"
              className="border border-[#DCDDDF] rounded-sm h-[40px] px-3 py-3 w-full text-[14px] dark:bg-[#181A2A]"
            />
            <CiMail className="absolute top-[12px] right-[10px] text-[16px] dark:text-[#97989F]" />
          </div>
          <button className="bg-[#4B6BFB] text-[#FFFFFF] text-[16px] rounded-md w-full py-3">
            Subscribe
          </button>
        </div>
      </div>

      {/* Social Icons */}
      <div className="py-3 flex items-center gap-6 cursor-pointer mt-6 justify-center">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="dark:text-white text-[20px] text-[#141624]" />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebookF className="dark:text-white text-[20px] text-[#141624]" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <BsTwitterX className="dark:text-white text-[20px] text-[#141624]" />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
          <FaYoutube className="dark:text-white text-[20px] text-[#141624]" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
