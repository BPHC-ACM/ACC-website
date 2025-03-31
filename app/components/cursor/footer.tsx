import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="footer-border"></div>

      <div className="container">
        <div className="social-links">
          <Link href="#" className="social-link">
            <Facebook size={20} />
          </Link>
          <Link href="#" className="social-link">
            <Twitter size={20} />
          </Link>
          <Link href="#" className="social-link">
            <Instagram size={20} />
          </Link>
          <Link href="#" className="social-link">
            <Linkedin size={20} />
          </Link>
        </div>

        <div className="footer-links">
          <Link href="#" className="footer-link">
            About
          </Link>
          <Link href="#" className="footer-link">
            Features
          </Link>
          <Link href="#events" className="footer-link">
            Events
          </Link>
        </div>

        <div className="contact-button">
          <Link href="#" className="contact-link">
            <span>Contact Us</span>
          </Link>
        </div>

        <div className="copyright">© Powered By ACM</div>
      </div>
    </footer>
  )
}

