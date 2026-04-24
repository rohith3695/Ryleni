import Aboutsection from "../components/AboutSection/about"
import Herosection from "../components/Herosection/herosection"
import Process from "../components/Process/process"
import Team from "../components/Team/team"
import Services from "../components/Differentsection"
import Challenges from "../components/Challenges"
import Portfolio from "../components/Portfolio/portfolio"

const Home = () => {
    return (
        <>
            <Herosection />
            <Aboutsection />
            <Team />
            <Services />
            <Challenges />
            <Process />
            <Portfolio />
        </>
    )
}

export default Home;
