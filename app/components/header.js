import Image from "next/image"
import styles from "./header.module.css"

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Image src="/placeholder.svg" alt="Logo" width={40} height={40} />
        <h1 className={styles.name}>ACC Forum</h1>
      </div>
    </header>
  )
}

