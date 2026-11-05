"use client";

import { useSyncExternalStore } from "react";

/** Easter egg: the 404 page fails a different command on each visit. */
const VARIANTS = [
  { cmd: "cat this-page", out: "cat: this-page: No such file or directory" },
  { cmd: "cd this-page", out: "bash: cd: this-page: No such file or directory" },
  { cmd: "./this-page", out: "bash: ./this-page: No such file or directory" },
  { cmd: "curl this-page", out: "curl: (22) The requested URL returned error: 404" },
  { cmd: "emerge this-page", out: "!!! 'this-page' is not a valid package atom." },
  {
    cmd: "git checkout this-page",
    out: "error: pathspec 'this-page' did not match any file(s) known to git",
  },
];

let picked: number | null = null;
function getPick() {
  picked ??= Math.floor(Math.random() * VARIANTS.length);
  return picked;
}
const subscribe = () => () => {};

export default function NotFoundCommand() {
  // The server always renders the first variant, so hydration matches; the
  // browser then settles on its random pick.
  const { cmd, out } = VARIANTS[useSyncExternalStore(subscribe, getPick, () => 0)];

  return (
    <>
      <p className="text-muted">$ {cmd}</p>
      <p className="mt-1 mb-4">{out}</p>
    </>
  );
}
