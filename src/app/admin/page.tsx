import type { Metadata } from "next";
import TerminalJoke from "@/components/TerminalJoke";

export const metadata: Metadata = {
  title: "Permission denied | 5ee5.dev",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <TerminalJoke
      command="ssh admin@5ee5.dev"
      output="admin@5ee5.dev: Permission denied (publickey)."
      note="There's no admin panel here. Nice try, though."
    />
  );
}
