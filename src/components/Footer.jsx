import React from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";
import { GrLinkedin } from "react-icons/gr";

const Footer = () => {
  return (
    <div className="bg-[#020c1b] w-full py-[5%] text-white">
      <div className="max-w-[950px] mx-auto px-5">
        {/* links  */}
        <div className="space-x-3 text-center mb-7">
          <span className="text-lg cursor-pointer hover:text-[#da2f68]">Terms of Use</span>
          <span className="text-lg cursor-pointer hover:text-[#da2f68]">Privacy-Policy</span>
          <span className="text-lg cursor-pointer hover:text-[#da2f68]">About</span>
          <span className="text-lg cursor-pointer hover:text-[#da2f68]">Blog</span>
          <span className="text-lg cursor-pointer hover:text-[#da2f68]">FAQ</span>
        </div>

        {/* lorem text  */}
        <div className="text-center text-gray-600 text-sm mb-7">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur,
          asperiores sit. Odit excepturi, ullam ipsam distinctio corporis
          assumenda necessitatibus saepe atque voluptatem perferendis repellat
        </div>

        {/* icons  */}
        <div className="flex flex-wrap items-center justify-center gap-[1.5rem]">
          <div className="cursor-pointer h-[50px] w-[50px] bg-[#04152d] rounded-full flex items-center justify-center  hover:icons-shadow hover:text-[#da2f68]">
            <FaFacebookSquare size={25} />
          </div>
          <div className="cursor-pointer h-[50px] w-[50px] bg-[#04152d] rounded-full flex items-center justify-center hover:icons-shadow hover:text-[#da2f68]">
            <AiFillInstagram size={25} />
          </div>
          <div className="cursor-pointer h-[50px] w-[50px] bg-[#04152d] rounded-full flex items-center justify-center hover:icons-shadow hover:text-[#da2f68]">
            <AiOutlineTwitter size={25} />
          </div>
          <div className="cursor-pointer h-[50px] w-[50px] bg-[#04152d] rounded-full flex items-center justify-center hover:icons-shadow hover:text-[#da2f68]">
            <GrLinkedin size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
