import Section from "../section"
import sampleInfo from "./sampleinfo.json"
import ChatsSidebar from "./chats_sidebar";
import ChatsMain from "./chats_main.js";
import { useState } from "react"
import styles from "./section3.css"
export default function Section3() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  return (
      <div className="chatsystem">
        <ChatsSidebar professorId="P001" setSelectedRoom={setSelectedRoom} selectedRoom={selectedRoom}/>
        <ChatsMain selectedRoom={selectedRoom} />
      </div>
  )
}

