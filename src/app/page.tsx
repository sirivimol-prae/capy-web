import Head from "../component/Head";
import AboutMe from "../component/AboutMe";
import Education from "../component/Education";
import Skills from "../component/Skills";
import Contact from "../component/Contact";
import Navbar from "../component/Navbar";
import ScrollToTop from "../component/ScrollToTop";
import Portfolio from "../component/Portfolio";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Head />
      <AboutMe />
      <Education />
      <Skills />
      <Portfolio />
      <Contact />
      <ScrollToTop />
    </main>
  );
}