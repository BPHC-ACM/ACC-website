import Header from "./components/cursor/header"
import Hero from "./components/cursor/hero"
import Events from "./components/cursor/events"
import AboutUs from "./components/cursor/about-us"
import Footer from "./components/cursor/footer"
import ScrollIndicator from "./components/cursor/scroll-indicator"

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <ScrollIndicator />
      <Events />
      <AboutUs />
      <Footer />
    </main>
  )
}

