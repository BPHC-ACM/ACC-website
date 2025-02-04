// import Section from "./section"

// export default function Section2() {
//   return (
//     <Section
//       title="Requests"
//       content="This is the content for Requests."
//     />
//   )
// }
import ChatRequests from "./chat-requests"
import styles from "./section2.module.css"

export default function Section2() {
  return (
    <div className={styles.section}>
      <ChatRequests />
    </div>
  )
}

