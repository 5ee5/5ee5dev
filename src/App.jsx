import "./App.css";
import Header from "./sections/Header";
import Tech from "./sections/Tech";
import Toolkit from "./sections/Toolkit";
import AboutMe from "./sections/AboutMe";
import MyProjects from "./sections/MyProjects";
import ContactMe from "./sections/ContactMe";
import Friends from "./sections/Friends";
import Webring from "./sections/Webring";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <div className="info-row">
          <Toolkit />
          <Tech />
          <AboutMe />
          <MyProjects />
          <ContactMe />
          <Friends />
          <Webring />
        </div>
      </main>
    </>
  );
}
