import Section from "../section"
import sampleInfo from "./sampleinfo.json"
import ChatsSidebar from "./chats_sidebar";
import styles from "./section3.css"
export default function Section3() {
  return (
      <div className="chatsystem">
        <ChatsSidebar professorId="P001"/>
        <div className="renderChats"></div>
      </div>
  )
}

