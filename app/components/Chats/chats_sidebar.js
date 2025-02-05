"use client"
import sampleInfo from "./sampleinfo.json"
import styles from "./chats_sidebar.css"

export default function chats_Sidebar({professorId}) {
    const filteredRooms = sampleInfo.rooms.filter(
        (room) => room.consultant.id === professorId
      );
  return (
    <div>
        <div className="sidebar">
      <h2>Chats</h2>
      {filteredRooms.length > 0 ? (
        filteredRooms.map((room) => (
          <div key={room.roomid} className="room">
            <p><strong>Student:</strong> {room.student.name} ({room.student.id})</p>
          </div>
        ))
      ) : (
        <p>No chats at the moment</p>
      )}
    </div>
    </div>
  )
}

