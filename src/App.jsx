import NavBar from "./components/NavBar";
import HeroSection from "./sections/HeroSection";
import MessageSection from "./sections/MessageSection";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  return (
    <main>
      <NavBar />
      <HeroSection />
      <MessageSection />
      <div className="h-dvh border border-red-500" />
    </main>
  );
};

export default App;
