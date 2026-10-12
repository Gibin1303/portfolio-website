import "../styles/hero.css";
import HeroBanner from "../Components/HeroBanner";
import Banner from "../Components/Banner";
import Works from "../Components/Works";
import About from "../Components/About";
import Contact from "../Components/Contact";
import WorkExperience from "../Components/WorkExperience";
import { useParticles } from "../hooks/useParticles";

const Hero = () => {
  return (
    <main className="hero bg-luxury-dark relative min-h-screen w-full">
      <HeroBanner />
      <Banner text="CREATIVE FULLSTACK DEVELOPER" />
      <Works />
      <About />
      <WorkExperience />
      <Contact />
    </main>
  );
};

export default Hero;
