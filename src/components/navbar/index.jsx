import { Link } from 'react-scroll';
import { useState, useEffect } from 'react';
import Logo from '@/assets/img/logo.png';

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

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-colors duration-400 ${scrolled ? 'bg-primary-400' : 'bg-transparent'}`}>
            <div className="container mx-auto flex justify-between items-center py-6 px-4 lg:px-0">
                <div className="flex items-center">
                    <img src={Logo} alt="Logo" className="h-10" />
                </div>
                <ul className={`hidden md:flex md:space-x-8`}>
                    <li className="nav-item">
                        <Link to="landing-hero" smooth={true} duration={500} className="nav-link text-neutral-50 hover:font-bold text-[16px] font-sans cursor-pointer transition-all duration-500 ease-in-out">
                            Beranda
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="landing-destination" smooth={true} duration={500} className="nav-link text-neutral-50 hover:font-bold text-[16px] font-sans cursor-pointer transition-all duration-500 ease-in-out">
                            Destinasi
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="landing-fitur" smooth={true} duration={500} className="nav-link text-neutral-50 hover:font-bold text-[16px] font-sans cursor-pointer transition-all duration-500 ease-in-out">
                            Fitur
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="landing-tentangkami" smooth={true} duration={500} className="nav-link text-neutral-50 hover:font-bold text-[16px] font-sans cursor-pointer transition-all duration-500 ease-in-out">
                            Tentang Kami
                        </Link>
                    </li>
                </ul>
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-white hover:text-[#0A6847] focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                    {isOpen && (
                        <ul className="absolute top-16 left-0 bg-white w-full shadow-md py-2 px-4">
                            <li>
                                <Link to="landing-hero" smooth={true} duration={500} onClick={toggleMenu} className="block text-black hover:text-[#0A6847] text-sm font-sans cursor-pointer py-1">
                                    Beranda
                                </Link>
                            </li>
                            <li>
                                <Link to="landing-destination" smooth={true} duration={500} onClick={toggleMenu} className="block text-black hover:text-[#0A6847] text-sm font-sans cursor-pointer py-1">
                                    Destinasi
                                </Link>
                            </li>
                            <li>
                                <Link to="landing-fitur" smooth={true} duration={500} onClick={toggleMenu} className="block text-black hover:text-[#0A6847] text-sm font-sans cursor-pointer py-1">
                                    Fitur
                                </Link>
                            </li>
                            <li>
                                <Link to="landing-tentangkami" smooth={true} duration={500} onClick={toggleMenu} className="block text-black hover:text-[#0A6847] text-sm font-sans cursor-pointer py-1">
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