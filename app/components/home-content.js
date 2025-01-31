'use client'

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import Section1 from "./section1"       //Dashboard
import Section2 from "./section2"       //Requests
import Section3 from "./section3"       //Chats
import Section4 from "./section4"       //Forum
import Section5 from "./section5"       //Forum


import Sidebar from "./sidebar"
import styles from "../page.module.css"

export default function HomeContent() {
  const [activeSection, setActiveSection] = useState("section1")

  const renderSection = () => {
    switch (activeSection) {
      case "section1":
        return <Section1 key="section1" />
      case "section2":
        return <Section2 key="section2" />
      case "section3":
        return <Section3 key="section3" />
      case "section4":
        return <Section4 key="section4" />
      case "section5":
        return<Section5 key="section5"/>
      default:
        return <Section1 key="section1" />
    }
  }

  return (
    <div className={styles.content}>
      <Sidebar setActiveSection={setActiveSection} />
      <main className={styles.main}>
        <AnimatePresence mode="wait">{renderSection()}</AnimatePresence>
      </main>
    </div>
  )
}