"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import styles from "./sidebar.module.css"

export default function Sidebar({ setActiveSection }) {
  const [activeButton, setActiveButton] = useState(null)
  const sections = ["Dashboard", "Requests", "Chats", "Forum","Forms"]

  const handleClick = (index) => {
    setActiveSection(`section${index + 1}`)
    setActiveButton(index)
  }

  return (
    <nav className={styles.sidebar}>
      <div className={styles.navContainer}>
        {sections.map((section, index) => (
          <motion.div
            key={index}
            className={styles.navItemWrapper}
            whileHover={{ backgroundColor: "rgba(200, 200, 200, 0.1)" }}
            transition={{ duration: 0.2 }}
          >
            <motion.button
              className={`${styles.navItem} ${activeButton === index ? styles.active : ""}`}
              onClick={() => handleClick(index)}
              whileTap={{ scale: 0.95 }}
            >
              {section}
            </motion.button>
          </motion.div>
        ))}
      </div>
      <div className={styles.sidebarFooter}>
        <motion.button
          className={styles.pillButton}
          whileHover={{ backgroundColor: "rgba(239, 137, 13, 0.3)" , scale: 1.05}}
          whileTap={{ scale: 0.95 }}
        >
          Edit Profile
        </motion.button>
        <motion.button
          className={styles.pillButton}
          whileHover={{ backgroundColor: "rgba(239, 137, 13, 0.3)", scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Logout
        </motion.button>
      </div>
    </nav>
  )
}
