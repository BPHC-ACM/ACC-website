import Header from './components/Header/header'
import Footer from './components/Footer/footer'
import HomeContent from './components/home-content'
import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <HomeContent />
      <Footer />
    </div>
  )
}