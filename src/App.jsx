import SmoothScroll from "./components/SmoothScroll"
import Aboutsection from "./components/AboutSection/about"
import Header from "./components/Header/header"
import Herosection from "./components/Herosection/herosection"
import Process from "./components/Process/process"
import Team from "./components/Team/team"
import "./index.css"

function App() {
  return (
    <SmoothScroll>
      <div>
        <Header></Header>
        <Herosection></Herosection>
        <Aboutsection></Aboutsection>
        <Team></Team>
        <Process></Process>

      </div>
    </SmoothScroll>
  )
}

export default App
