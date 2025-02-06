"use client"
import sampleInfo from "./sampleinfo.json"
import styles from "./chats_sidebar.css"
import {IconUserCircle, IconSearch } from "@tabler/icons-react";
import { useState } from "react"
import { motion } from "framer-motion"
export default function chats_Sidebar({professorId}) {
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const filteredRooms = sampleInfo.rooms.filter(
        (room) => room.consultant.id === professorId
      );
      const searchedRooms = filteredRooms.filter(
        (room) =>
          room.student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          room.student.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
  return (
    <div className="sidebar">
      <h2 className="chats_heading">Chats </h2>
      <input
        type="text"
        placeholder="Search by name or ID..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="searchbox glass"
      />
      {searchedRooms.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="students-container"
        >
          {searchedRooms.map((room) => (
            <motion.button
              key={room.roomid}
              className="chat"
              onClick={() => setSelectedRoom(room.roomid)}
              initial={{ backgroundColor: "#1E1E1E" }}
              whileHover={{ backgroundColor: "#444444" }}
              animate={{ backgroundColor: selectedRoom === room.roomid ? "#444444": "#1E1E1E" , color: selectedRoom === room.roomid ? "#FFFFFF": "#B0B0B0"   }}
              transition={{ duration: 0.3 }}
              style={{ border: "none", padding: "10px", margin: "2.5px", cursor: "pointer", borderRadius: "5px" }}
            >
              <IconUserCircle size={30}/>
              <div><p> {room.student.name}</p>
              <p>{room.student.id}</p></div>
            </motion.button>
          ))}
        </motion.div>
      ) : (
        <p>No user found.</p>
      )}
    </div>
  )
}

