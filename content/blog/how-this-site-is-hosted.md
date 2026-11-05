---
title: "How this site is hosted"
date: "2026-11-02 13:40"
summary: "A Xeon at home, PM2, a Cloudflare Tunnel, and a small worker for when it all goes down."
---

This site doesn't live on a hosting platform. It runs on a Xeon E5-2680 v4 at home, and this is how the pieces fit together.

## The stack

- **Next.js** builds the site. Most pages, including the project pages, are generated ahead of time as static HTML.
- **PM2** keeps the Next server running and restarts it after a crash or a deploy.
- **nginx** sits in front of it.
- **A Cloudflare Tunnel** connects the machine to the internet. The tunnel makes an outbound connection to Cloudflare, so I don't open any ports on my router or expose my home IP address.

## Deploying

A deploy is one command:

```bash
npm run deploy
```

It runs `next build` and then `pm2 restart`. The server reads the build from the working copy, so a build that isn't followed by a restart can leave the site half-updated. That's why the two steps are chained in one script.

## When the server is down

If the machine is off or the tunnel is down, Cloudflare can't reach my server and shows its own error page. I wanted visitors to see something that looks like the rest of the site instead.

So there's a small **Cloudflare Worker** in front of everything. It passes normal requests straight through. When Cloudflare reports that it can't reach the origin (a 502, or the 520 to 530 range of errors), it returns a page styled like the rest of the site, with a `$ retry` button. It sends it with a 503 status, not a 200, so search engines don't treat it as the real page.

It only catches those errors. If my own app fails with a normal 500, the Worker stays out of the way and the site's own error page shows.

## Why bother

Mostly because it's fun.
