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

      {/* Below `narrow`, both rails collapse to `display: contents` so all six
          sections become direct grid items and can be individually ordered. */}
      <main className="layout">
        <aside className="sticky top-8 grid gap-5 short:static narrow:contents">
          <AboutMe className="narrow:order-1" />
          <ContactMe className="narrow:order-4" />
          <Friends className="narrow:order-5" />
          <Webring className="narrow:order-6" />
        </aside>

        <div className="grid gap-5 narrow:contents">
          <Toolkit className="narrow:order-2" />
          <Tech className="narrow:order-3" />
        </div>
      </main>
    </>
  );
}
