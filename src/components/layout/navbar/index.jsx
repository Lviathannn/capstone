import { Link } from "react-scroll";
import { useState, useEffect } from "react";
import Logo from "@/assets/img/logo.png";
import { Button } from "@/components/ui/button";
import { publicRoutes } from "@/constant/routes";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
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
      className={`duration-400 fixed left-0 top-0 z-50 w-full transition-colors ${scrolled ? "bg-primary-400" : "bg-transparent"}`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-6 lg:px-0">
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="h-10" />
        </div>
        <ul className={`hidden items-center md:flex md:space-x-8`}>
          <li className="nav-item">
            <Link
              to="landing-hero"
              smooth={true}
              duration={500}
              className="nav-link cursor-pointer font-jakarta-sans text-[16px] text-neutral-50 transition-all duration-500 ease-in-out hover:font-bold"
            >
              Beranda
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="landing-destination"
              smooth={true}
              duration={500}
              className="nav-link cursor-pointer font-jakarta-sans text-[16px] text-neutral-50 transition-all duration-500 ease-in-out hover:font-bold"
            >
              Destinasi
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="landing-fitur"
              smooth={true}
              duration={500}
              className="nav-link cursor-pointer font-jakarta-sans text-[16px] text-neutral-50 transition-all duration-500 ease-in-out hover:font-bold"
            >
              Fitur
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="landing-tentangkami"
              smooth={true}
              duration={500}
              className="nav-link cursor-pointer font-jakarta-sans text-[16px] text-neutral-50 transition-all duration-500 ease-in-out hover:font-bold"
            >
              Tentang Kami
            </Link>
          </li>
          <li className="nav-item">
            <Button className="bg-secondary-500 hover:bg-secondary-700" asChild>
              <NavLink to={publicRoutes.LOGIN}>Masuk</NavLink>
            </Button>
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
            <ul className="\ absolute left-0 top-16 w-full bg-white px-4 py-2 shadow-md">
              <li>
                <Link
                  to="landing-hero"
                  smooth={true}
                  duration={500}
                  onClick={toggleMenu}
                  className="block cursor-pointer py-1 font-jakarta-sans text-sm text-black hover:text-[#0A6847]"
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
                  className="block cursor-pointer py-1 font-jakarta-sans text-sm text-black hover:text-[#0A6847]"
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
                  className="block cursor-pointer py-1 font-jakarta-sans text-sm text-black hover:text-[#0A6847]"
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
                  className="block cursor-pointer py-1 font-jakarta-sans text-sm text-black hover:text-[#0A6847]"
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
