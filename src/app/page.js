import Header from "@/components/Header";
import Tech from "@/components/Tech";
import Toolkit from "@/components/Toolkit";
import AboutMe from "@/components/AboutMe";
import ContactMe from "@/components/ContactMe";
import Friends from "@/components/Friends";
import Webring from "@/components/Webring";

export default function Home() {
  return (
    <>
      <Header />

      <main className="layout">
        <aside className="sidebar">
          <AboutMe />
          <ContactMe />
          <Friends />
          <Webring />
        </aside>

        <div className="content">
          <Toolkit />
          <Tech />
        </div>
      </main>
    </>
  );
}
