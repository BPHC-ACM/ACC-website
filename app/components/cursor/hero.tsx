import Image from "next/image"
import Link from "next/link"
import styles from "../../page.module.css"

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBg}></div>

      {/* Decorative elements */}
      <div className={`${styles.blob} ${styles.blob1}`}></div>
      <div className={`${styles.blob} ${styles.blob2}`}></div>
      <div className={`${styles.blob} ${styles.blob3}`}></div>

      <div className={`${styles.container} ${styles.heroContainer}`}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Empowering Your Academic Journey</h1>
          <p className={styles.heroSubtitle}>Discover Your Potential, Define Your Path, Achieve Your Goals</p>
          <div className={styles.heroButtons}>
            <Link href="/home" className={styles.primaryButton}>
              <span>Dive In</span>
            </Link>
          </div>
        </div>
        <div className={styles.heroImage}>
          <div className={styles.heroImageBg}></div>
          <Image
            src="/placeholder.svg?height=500&width=600"
            alt="Students discussing academic plans"
            fill
            className="object-contain p-8"
            priority
          />
        </div>
      </div>
    </section>
  )
}

