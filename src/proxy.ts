
import CliAware from "cli-aware";
import { NextResponse, type NextRequest } from "next/server";

const ansi = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  green: "\x1b[92m",
  muted: "\x1b[90m",
};

const link = (url: string, label: string) =>
  `\x1b]8;;${url}\x1b\\${ansi.green}${label}${ansi.reset}\x1b]8;;\x1b\\`;

const heading = (command: string) =>
  `${ansi.green}${ansi.bold}$ ${command}${ansi.reset}`;

const rule = `${ansi.muted}${"─".repeat(54)}${ansi.reset}`;

const content = `
${ansi.green}${ansi.bold}
   ███████╗███████╗███████╗███████╗
   ██╔════╝██╔════╝██╔════╝██╔════╝
   ███████╗█████╗  █████╗  ███████╗
   ╚════██║██╔══╝  ██╔══╝  ╚════██║
   ███████║███████╗███████╗███████║
   ╚══════╝╚══════╝╚══════╝╚══════╝
${ansi.reset}
  ${ansi.muted}PERSONAL TERMINAL INTERFACE  //  5EE5.DEV${ansi.reset}

${rule}

${heading("whoami")}
  ${ansi.green}${ansi.bold}5ee5${ansi.reset}
  Developer · Linux Enthusiast · Runner

${rule}

${heading("ls ~/contact")}
  ${ansi.muted}DISCORD  ${ansi.reset}${link("https://discord.com/users/903314598596321331", "5ee5.")}
  ${ansi.muted}EMAIL    ${ansi.reset}${link("mailto:e5@5ee5.dev", "e5@5ee5.dev")}
  ${ansi.muted}WEB      ${ansi.reset}${link("https://5ee5.dev", "5ee5.dev")}

${rule}

${heading("fastfetch --hw")}
  ${ansi.green}LAPTOP${ansi.reset}   Lenovo Ideapad Gaming 3
  ${ansi.green}SERVER${ansi.reset}   Xeon E5-2680 v4
  ${ansi.green}MAC${ansi.reset}      MacBook Pro 2017

${rule}

  ${ansi.muted}CONNECTION ESTABLISHED${ansi.reset}
  ${ansi.green}https://5ee5.dev${ansi.reset}

`;

export function proxy(request: NextRequest) {
  const client = new CliAware(request);

  if (client.cli) {
    return new Response(content, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/",
};

