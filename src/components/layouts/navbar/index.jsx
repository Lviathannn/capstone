import { Link } from "react-scroll";
import { useState, useEffect } from "react";
import Logo from "@/assets/img/logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${scrolled ? "bg-primary-400" : "bg-transparent"}`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-5 lg:px-0">
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="w-[160px]" />
        </div>
        <ul className={`hidden md:flex md:space-x-8`}>
          <li className="nav-item">
            <Link
              to="landing-hero"
              smooth={true}
              duration={500}
              className="nav-link cursor-pointer text-white transition-all duration-500 ease-in-out hover:font-bold"
            >
              Beranda
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="landing-destination"
              smooth={true}
              duration={500}
              className="nav-link cursor-pointer text-white transition-all duration-500 ease-in-out hover:font-bold"
            >
              Destinasi
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="landing-fitur"
              smooth={true}
              duration={500}
              className="nav-link cursor-pointer text-white transition-all duration-500 ease-in-out hover:font-bold"
            >
              Fitur
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="landing-tentangkami"
              smooth={true}
              duration={500}
              className="nav-link cursor-pointer text-white transition-all duration-500 ease-in-out hover:font-bold"
            >
              Tentang Kami
            </Link>
          </li>
        </ul>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white hover:text-[#0A6847] focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
          {isOpen && (
            <ul className="absolute left-0 top-16 w-full bg-white px-4 py-2 shadow-md">
              <li>
                <Link
                  to="landing-hero"
                  smooth={true}
                  duration={500}
                  onClick={toggleMenu}
                  className="block cursor-pointer py-1  text-sm text-black hover:text-[#0A6847]"
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  to="landing-destination"
                  smooth={true}
                  duration={500}
                  onClick={toggleMenu}
                  className="block cursor-pointer py-1  text-sm text-black hover:text-[#0A6847]"
                >
                  Destinasi
                </Link>
              </li>
              <li>
                <Link
                  to="landing-fitur"
                  smooth={true}
                  duration={500}
                  onClick={toggleMenu}
                  className="block cursor-pointer py-1  text-sm text-black hover:text-[#0A6847]"
                >
                  Fitur
                </Link>
              </li>
              <li>
                <Link
                  to="landing-tentangkami"
                  smooth={true}
                  duration={500}
                  onClick={toggleMenu}
                  className="block cursor-pointer py-1  text-sm text-black hover:text-[#0A6847]"
                >
                  Tentang Kami
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
