import type { Metadata } from "next";
import TerminalJoke from "@/components/TerminalJoke";

export const metadata: Metadata = {
  title: "Permission denied | 5ee5.dev",
  robots: { index: false, follow: false },
};

export default function SudoPage() {
  return (
    <TerminalJoke
      command="sudo -i"
      output="[sudo] password for visitor: "
      note="visitor is not in the sudoers file. This incident will be reported."
    />
  );
}
