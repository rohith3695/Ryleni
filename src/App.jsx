import SmoothScroll from "./components/SmoothScroll"
import Aboutsection from "./components/AboutSection/about"
import Header from "./components/Header/header"
import Herosection from "./components/Herosection/herosection"
import Process from "./components/Process/process"
import Team from "./components/Team/team"
import Footer from "./components/Footer/footer"
import "./index.css"
import Services from "./components/Differentsection"
import Challenges from "./components/Challenges"
import Portfolio from "./components/Portfolio/portfolio"

function App() {
  return (
    <SmoothScroll>
      <div className="smooth-content">
        <div className="last-page-section">
          <Header />
          <Herosection />
          <Aboutsection />
          <Team />
          <Services />
          <Challenges />
          <Process />
          <Portfolio />
        </div>
        <Footer />
      </div>
    </SmoothScroll>
  );
}

export default App;
