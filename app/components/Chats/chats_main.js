"use client"

import {IconUserCircle, IconSearch } from "@tabler/icons-react";
import styles from "./chats_main.css"
import sampleInfo from "./sampleinfo.json"
import { useState } from "react"
export default function chats_Main({selectedRoom, searchedRooms}) {
  const selectedRoomData = sampleInfo.rooms.find((room) => room.roomid === selectedRoom);
  const student = selectedRoomData ? selectedRoomData.student : null;  
  const selectedMessages = selectedRoom
    ? sampleInfo.rooms.find((room) => room.roomid === selectedRoom)?.messages || []
    : [];
    
    return(
        <div className="chat-display" style={{ width: "78%"}}>
      {selectedRoom ? (
        <>
          <div className="header">
              <IconUserCircle size={50}/>
              <div><p> {student.name}</p>
              <p>{student.id}</p></div>
            </div>
          <div className="messages-container" style={{ maxHeight: "60vh", overflowY: "auto", padding:"5px"}}>
            {selectedMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)).map((msg, index) => (
              <div key={index}
              className={msg.name === student.name ? "message student-message" : "message professor-message"}
                style={{ padding: "10px", borderRadius: "20px", marginBottom: "10px" }}>
                {msg.content}
                <br />
                <span style={{ fontSize: "12px", color: "gray" }}>{new Date(msg.timestamp).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="defaultmsg">
          <img src="/acc-logo.png"></img>
          <p>Your Academic Network, Simplified.</p>
        </div>
      )}
    </div>
    );
}