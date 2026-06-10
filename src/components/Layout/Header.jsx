import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-600 via-purple-700 to-blue-500 text-white shadow-md">
      <nav className="max-w-6xl mx-auto flex items-center justify-between p-4 md:p-6">
        <div className="font-bold text-2xl md:text-3xl tracking-wide">
          <a href="/">Практика</a>
        </div>

        {/* Меню для ПК */}
        <div className="hidden md:flex space-x-8 font-semibold text-lg">
          <Link to="/" className="hover:text-cyan-300 transition-colors">Басты бет</Link>
          <Link to="/about" className="hover:text-cyan-300 transition-colors">Біз туралы</Link>
          <a
            href="/presentation.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-300 transition-colors"
          >
            Презентация
          </a>

        </div>

        {/* Бургер на мобильных */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none text-white"
          >
            {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </nav>

      {/* Мобильное меню */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-b from-blue-600 via-purple-700 to-blue-500 px-4 pb-4 shadow-lg animate-slide-down">
          <Link
            to="/"
            className="block py-3 text-lg text-white hover:text-cyan-200 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Басты бет
          </Link>
          <Link
            to="/about"
            className="block py-3 text-lg text-white hover:text-cyan-200 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Біз туралы
          </Link>
          <a
            href="/presentation.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="block py-3 text-lg text-white hover:text-cyan-200 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Презентация
          </a>

        </div>
      )}

      <style>
        {`
          @keyframes slide-down {
            0% { opacity: 0; transform: translateY(-10px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-slide-down {
            animation: slide-down 0.3s ease-out forwards;
          }
        `}
      </style>
    </header>
  );
}
