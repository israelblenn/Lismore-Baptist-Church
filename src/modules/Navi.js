import React, { useEffect } from 'react'
import logo from "../assets/logo.webp"
import hopefield from "../assets/Hopefield_Lismore_RGB.png"
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {

    useEffect(() => {
        const handleScroll = () => {
            const heroSection = document.querySelector('.hero')
            const headerSection = document.querySelector('.header')
            const hamburger = document.querySelector('.hamburger')
            if (!hamburger) return

            const isHeroVisible = heroSection && heroSection.getBoundingClientRect().bottom > 0
            const isHeaderVisible = headerSection && headerSection.getBoundingClientRect().bottom > 0

            if (isHeroVisible || isHeaderVisible) {
                hamburger.classList.remove('black')
            } else {
                hamburger.classList.add('black')
            }
        }

        const handleHamburgerChange = () => {
            const tray = document.querySelector('.hamburger-tray')
            const menuCheckbox = document.querySelector('.hamburger input')
            const navSidebar = document.querySelector('.navSidebar')
            const hamburgerMenu = document.querySelector('.hamburger-menu')
            if (!tray || !menuCheckbox || !navSidebar || !hamburgerMenu) return

            if (menuCheckbox.checked) {
                tray.style.opacity = '1'
                tray.style.pointerEvents = 'auto'
                navSidebar.style.pointerEvents = 'auto'
                hamburgerMenu.style.pointerEvents = 'auto'
            } else {
                tray.style.opacity = '0'
                tray.style.pointerEvents = 'none'
                navSidebar.style.pointerEvents = 'none'
                hamburgerMenu.style.pointerEvents = 'none'
            }
        }

        const checkbox = document.querySelector('.hamburger input')
        window.addEventListener('scroll', handleScroll)
        if (checkbox) checkbox.addEventListener('change', handleHamburgerChange)

        return () => {
            window.removeEventListener('scroll', handleScroll)
            if (checkbox) checkbox.removeEventListener('change', handleHamburgerChange)
        }
    }, [])

    const handleNavLinkClick = () => {
        const menuCheckbox = document.querySelector('.hamburger input')
        menuCheckbox.checked = false

        const tray = document.querySelector('.hamburger-tray')
        const navSidebar = document.querySelector('.navSidebar')
        const hamburgerMenu = document.querySelector('.hamburger-menu')

        tray.style.opacity = '0'
        tray.style.pointerEvents = 'none'
        navSidebar.style.pointerEvents = 'none'
        hamburgerMenu.style.pointerEvents = 'none'
    }

    return (
        <section className="container-medium">
            <nav className="desktop-navigation">
                <Link to="/"><img src={logo} alt="" className="logo" width="192" height="48" /></Link>
                <ul className="navLinks">
                    <li><NavLink id="home" to="/" className="navLink" data-text="Home">Home</NavLink></li>
                    <li><NavLink id="our-team" to="OurTeam" className="navLink" data-text="Our Team">Our Team</NavLink></li>
                    <li><NavLink id="sermons" to="Sermons" className="navLink" data-text="Sermons">Sermons</NavLink></li>
                    <li><NavLink id="partnerships" to="Partnerships" className="navLink" data-text="Partnerships">Partnerships</NavLink></li>
                    <li><NavLink id="contact-us" to="ContactUs" className="navLink" data-text="Contact Us">Contact Us</NavLink></li>
                    <li><NavLink id="hopefield" to="Partnerships" className="navLink"><img src={hopefield} alt="hopefield" className="hopefield" /></NavLink></li>
                </ul>
            </nav>
            <div className='mobile-navigation'>
                <div className="hamburger-tray"></div>
                <nav className="hamburger-menu">
                    <label className="hamburger">
                        <input type="checkbox" aria-label="Toggle navigation menu" />
                    </label>
                    <aside className="navSidebar">
                        <ul>
                            <li><NavLink id="home" to="/" className="navLink" data-text="Home" onClick={handleNavLinkClick}>Home</NavLink></li>
                            <li><NavLink id="our-team" to="OurTeam" className="navLink" data-text="Our Team" onClick={handleNavLinkClick}>Our Team</NavLink></li>
                            <li><NavLink id="sermons" to="Sermons" className="navLink" data-text="Sermons" onClick={handleNavLinkClick}>Sermons</NavLink></li>
                            <li><NavLink id="partnerships" to="Partnerships" className="navLink" data-text="Partnerships" onClick={handleNavLinkClick}>Partnerships</NavLink></li>
                            <li><NavLink id="contact-us" to="ContactUs" className="navLink" data-text="Contact Us" onClick={handleNavLinkClick}>Contact Us</NavLink></li>
                        </ul>
                        <em className="mCopyright">Copyright &copy; 2023 Lismore Baptist Church <br /> Website by <a href="https://israelblennerhassett.com">Israel Blennerhassett</a></em>
                    </aside>
                </nav>
            </div>
        </section>
    )
}

export default Navbar
