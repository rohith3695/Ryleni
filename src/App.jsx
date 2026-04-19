import SmoothScroll from "./components/SmoothScroll"
import Aboutsection from "./components/AboutSection/about"
import Header from "./components/Header/header"
import Herosection from "./components/Herosection/herosection"
import Process from "./components/Process/process"
import Team from "./components/Team/team"
import Footer from "./components/Footer/footer"
import "./index.css"

function App() {
  return (
    <SmoothScroll>
      <div className="smooth-content">
        <div className="last-page-section">
          <Header />
          <Herosection />
          <Aboutsection />
          <Team />
          <Process />
          {/* Spacer to allow full sticky reveal of the full-screen footer */}
          <div className="h-48 pointer-events-none" />
        </div>
        <Footer />
      </div>
    </SmoothScroll>

  )
}



export default App
