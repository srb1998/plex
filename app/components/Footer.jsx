import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import ContentWrapper from "./contentWrapper/contentWrapper"
import Link from "next/link";


const Footer = () => {
  return (
    <footer className="bg-[#020c1b] shrink-0 py-2 text-white relative bottom-0">
      <ContentWrapper>
        <ul className="flex-center gap-[30px] mb-[30px] md:my-8 md:gap-12 font-semibold">

          <li className="text-base md:text-base whitespace-no-wrap hover:text-[#c5446f] cursor-pointer">Terms Of Use</li>
          <li className="text-base md:text-base whitespace-no-wrap hover:text-[#c5446f] cursor-pointer">Privacy-Policy</li>
          <li className="text-base md:text-base hover:text-[#c5446f] cursor-pointer">About</li>
          <li className="text-base md:text-base hover:text-[#c5446f] cursor-pointer">Blog</li>
          <li className="text-base md:text-base hover:text-[#c5446f] 
          cursor-pointer">FAQ</li>
        </ul>

        <div className="flex-center opacity-90 font-semibold mb-[30px] md:mb-10 md:gap-4">
          Made with ❤ by Sourabh
        </div>

        <div className="flex-center gap-[10px] cursor-pointer hover:icon">
          <span className="w-[50px] h-[50px] rounded-full bg-[#04152d] flex-center hover:shadow-pink-500 hover:text-pink-600">
            <Link href="https://www.facebook.com/soug9999/" target="_blank"><FaFacebookF href="" /></Link>
          </span>
          <span className="w-[50px] h-[50px] rounded-full bg-[#04152d] flex-center hover:shadow-pink-500 hover:text-pink-600">
            <Link href="https://www.instagram.com/the.sourabh.007/"
             target="_blank">
              <FaInstagram />
            </Link>
          </span>
          <span className="w-[50px] h-[50px] rounded-full bg-[#04152d] flex-center hover:shadow-pink-500 hover:text-pink-600">
          <Link href="https://twitter.com/soug9999" 
          target="_blank">
            <FaTwitter />
          </Link>
          </span>
          <span className="w-[50px] h-[50px] rounded-full bg-[#04152d] flex-center hover:shadow-pink-500 hover:text-pink-600">
          <Link href="https://www.linkedin.com/in/thesourabh/" target="_blank"><FaLinkedin />
          </Link>
          </span>
        </div>
      </ContentWrapper>

    </footer>
  )
}

export default Footer