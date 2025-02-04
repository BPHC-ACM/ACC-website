import Header from './components/header'
import Footer from './components/footer'
import HomeContent from './components/home-content'
import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      {/* <Header /> */}
      <HomeContent />
      <Footer />
    </div>
  )
}