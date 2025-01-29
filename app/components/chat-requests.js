"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import styles from "./chat-requests.module.css"

const ChatRequest = ({ name, iconUrl, text, time, cgpa, branch }) => (
  <motion.div
    className={styles.chatRequest}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className={styles.avatar}>
      <Image src={iconUrl || "/placeholder.svg"} alt={name} width={40} height={40} />
    </div>
    <div className={styles.content}>
      <div className={styles.nameInfo}>
        <h3>{name}</h3>
        <span className={styles.academicInfo}>
          CGPA: {cgpa} | {branch}
        </span>
      </div>
      <p>{text}</p>
    </div>
    <div className={styles.time}>{time}</div>
    <div className={styles.actions}>
      <motion.button
        className={`${styles.actionButton} ${styles.acceptButton}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Accept
      </motion.button>
      <motion.button
        className={`${styles.actionButton} ${styles.rejectButton}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Reject
      </motion.button>
    </div>
  </motion.div>
)

export default function ChatRequests() {
  const [requests, setRequests] = useState([])
  const [totalRequests, setTotalRequests] = useState(0)

  useEffect(() => {
    const fetchChatRequests = async () => {
      const response = await fetch("/api/chat-requests")
      const data = await response.json()
      setRequests(data.requests)
      setTotalRequests(data.totalRequests)
    }

    fetchChatRequests()
  }, [])

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Incoming Chat Requests ({totalRequests})</h2>
      <div className={styles.requestsContainer}>
        {requests.map((request, index) => (
          <ChatRequest key={index} {...request} />
        ))}
      </div>
    </div>
  )
}

