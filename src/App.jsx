import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SmoothScroll from "./components/SmoothScroll"
import Header from "./components/Header/header"
import Footer from "./components/Footer/footer"
import ScrollToTop from "./components/ScrollToTop"
import Home from "./pages/Home"
import Portfolio from "./pages/Portfolio"
import Service from "./pages/Service"
import Apply from "./pages/Apply"
import Founder from "./pages/Founder"
import Careers from "./pages/Careers"
import "./index.css"

function App() {
  return (
    <Router>
      <ScrollToTop />
      <SmoothScroll>
        <div className="smooth-content">
          <div className="last-page-section">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/service" element={<Service />} />
              <Route path="/apply" element={<Apply />} />
              <Route path="/founder" element={<Founder />} />
              <Route path="/careers" element={<Careers />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </SmoothScroll>
    </Router>
  );
}

export default App;
