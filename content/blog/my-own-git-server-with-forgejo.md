---
title: "My own Git server with Forgejo"
date: "2026-11-06 15:43"
summary: "Moving beyond GitHub: setting up Forgejo on my home server, migrating 5ee5dev, and configuring pushes to two Git hosts."
---

I've been running more and more of my own services on my home server, so naturally, Git hosting was eventually going to happen.

I already use GitHub for my projects, but I wanted to experiment with hosting my own repositories. That led me to **Forgejo**, a self-hosted Git hosting platform.

My instance is now running at [git.5ee5.dev](https://git.5ee5.dev).

## Why Forgejo?

I didn't particularly need to move away from GitHub. I wanted to have more control over where my repositories live and learn how to run my own Git hosting infrastructure.

Forgejo is a good fit for that. It provides a familiar interface for browsing repositories, commits, branches, issues and pull requests, without relying on an external hosting platform.

## Setting it up

I initially considered installing Forgejo directly on Gentoo, but ran into trouble fetching the package from the configured Gentoo mirrors. Rather than spending more time troubleshooting the package, I switched to Docker Compose.

The deployment uses persistent storage and binds its web interface to localhost on port `3030`. This keeps it separate from the Next.js site, which already occupies port `3000`.

I then added a new hostname to my existing Cloudflare Tunnel configuration:

- `git.5ee5.dev` → `localhost:3030`

Cloudflare handles the public HTTPS connection, while Forgejo runs locally on the server.

## Migrating 5ee5dev

I didn't want to start with an empty Forgejo instance, so I migrated my existing `5ee5dev` repository from GitHub.

Forgejo has a built-in migration feature that made this surprisingly easy. I supplied the GitHub repository URL and a temporary personal access token, selected the migration options, and the import completed in less than a minute.

I initially imported it as a mirror, but later converted it into a regular repository. This means the Forgejo copy is now independent of GitHub.

The temporary GitHub token was revoked after the migration.

## Two Git remotes, one repository

I still want to use GitHub, so I kept it as my `origin` remote and added Forgejo as another remote called `forgejo`.

```bash
git remote -v
```

I also configured `origin` to push to both hosting services:

```bash
git remote set-url --add --push origin https://github.com/5ee5/5ee5dev.git
git remote set-url --add --push origin https://git.5ee5.dev/5ee5/5ee5dev.git
```

Now a regular:

```bash
git push origin
```

sends changes to both GitHub and Forgejo.

Fetching and pulling through `origin` still use GitHub, so it remains my fetch source of truth. I can also push directly to Forgejo using the separate remote.

## What's next?

For now, it's a small personal Git server with one user and one migrated repository.

I'll probably add more projects as I go. It's a small addition to my homelab, but it's nice having another piece of infrastructure that I fully control.

And yes, I now have my own Git hosting at `git.5ee5.dev`.
