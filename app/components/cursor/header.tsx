"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Sun, Moon } from "lucide-react"
import { useTheme } from "./theme-provider"
import styles from "../../page.module.css"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  return (
    <header className={styles.header}>
      <div className={`${styles.container} ${styles.headerContainer}`}>
        <div
          className={styles.logo}
          style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          <img
            src="/acc-logo.png"
            alt="ACC Logo"
            style={{ height: "3rem", width: "auto" }} // Adjusted height to match text
          />
          <span
            className={`${styles.logoSubtitle} hidden sm:block`}
            style={{ fontSize: "0.75rem", lineHeight: "1.2" }}
          >
            Academic
            <br />
            Counselling
            <br />
            Cell
          </span>
        </div>
      
  
      

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          <div className={styles.navLinks}>
            <Link href="#events" className={styles.navLink}>
              Events
            </Link>
            <Link href="#about" className={styles.navLink}>
              About Us
            </Link>
            <Link href="#contact" className={styles.navLink}>
              Contact
            </Link>
          </div>
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button
            onClick={toggleTheme}
            className={styles.themeToggle}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Mobile Navigation Toggle */}
          <button className={styles.mobileToggle} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <Link href="#events" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
            Events
          </Link>
          <Link href="#about" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
            About Us
          </Link>
          <Link href="#contact" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
            Contact
          </Link>
        </div>
      )}
    </header>
  )
}

