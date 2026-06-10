import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center flex flex-col items-center gap-2">
      <span>
        &copy; {new Date().getFullYear()} Барлық құқық қорғалған. Веб сайт тек оқыту мақсатында даярланған. Sherkhan Nurnaz.
      </span>

      <div className="flex gap-x-4 mt-2">
        <a
          href="https://github.com/Bladejq"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="hover:text-gray-400 transition"
        >
          <FaGithub size={20} />
        </a>

        <a
          href="http://www.instagram.com/nurn4z3"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="hover:text-gray-400 transition"
        >
          <FaInstagram size={20} />
        </a>
      </div>
    </footer>

  );
};

export default Footer;
