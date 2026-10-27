import { JetBrains_Mono, VT323 } from "next/font/google";

const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });
const vt323 = VT323({ weight: "400", subsets: ["latin"], variable: "--font-vt323" });

/** Classes defining `--font-jetbrains` and `--font-vt323`, for <html>. */
export const fontVariables = `${jetbrains.variable} ${vt323.variable}`;
