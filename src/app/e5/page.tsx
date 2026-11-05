import type { Metadata } from "next";
import TerminalJoke from "@/components/TerminalJoke";

export const metadata: Metadata = {
  title: "e5 | 5ee5.dev",
  robots: { index: false, follow: false },
};

/** Easter egg: e5 is both the handle and the Xeon that serves this site. */
export default function E5Page() {
  return (
    <TerminalJoke
      preformatted
      command={'lscpu | grep -E "Model name|Thread|Core|Max MHz"'}
      output={`Model name:           Intel(R) Xeon(R) CPU E5-2680 v4 @ 2.40GHz
Thread(s) per core:   2
Core(s) per socket:   14
CPU max MHz:          3300.0000`}
      note="e5 is the Xeon in my home server, handing you this page right now. It's also my handle. Hi!"
    />
  );
}
