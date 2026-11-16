---
title: "My Neovim Setup"
date: "2026-11-16 19:50"
summary: "A look at my Neovim workflow on Gentoo Linux, from LazyVim and Git integration to remote development and Discord Rich Presence."
draft: false
---

# My Neovim Setup

I've been gradually moving away from traditional code editors and building a development workflow around Neovim.

What started as an experiment has turned into a pretty capable development environment. I now use Neovim as my primary editor for working on projects, navigating codebases, and managing Git changes.

Here's a look at how I've put everything together.

![Neovim running on Xen with the Tokyo Night colorscheme](/images/blog/neovim/overview.png)

## The environment

My development environment runs on my Gentoo Linux server, which I call **Xen**.

Rather than running my editor locally, I connect to the server over SSH from my Linux desktop. This means my projects, dependencies, development tools, and editor configuration all live in one place.

The main components of my setup are:

| Component | Choice |
|---|---|
| Operating system | Gentoo Linux |
| Editor | Neovim |
| Configuration | LazyVim |
| Colorscheme | Tokyo Night |
| Git interface | Lazygit |
| Git integration | Gitsigns |
| Search | ripgrep |
| Remote access | SSH |

## LazyVim

Instead of configuring every Neovim plugin from scratch, I decided to use **LazyVim**.

LazyVim provides a well-organized starting point with sensible defaults, plugin management, useful keybindings, and integrations for common development tasks.

It also makes extending the configuration much easier.

My configuration lives in:

```text
~/.config/nvim/
```

I prefer keeping my setup relatively clean and using the functionality LazyVim already provides instead of installing plugins for absolutely everything.

## Appearance and navigation

For the colorscheme, I went with **Tokyo Night**.

I also prefer traditional sequential line numbers rather than relative line numbers:

```lua
vim.opt.number = true
vim.opt.relativenumber = false
```

LazyVim's built-in Snacks tools handle much of my navigation.

Some of the shortcuts I use regularly:

| Shortcut | Function |
|---|---|
| `Space Space` | Find files |
| `Space ,` | Switch buffers |
| `Space e` | File explorer |
| `Space sg` | Search project contents |
| `Space sw` | Search word under cursor |
| `Ctrl+/` | Toggle terminal |
| `Space gg` | Open Lazygit |

The which-key menu is also particularly useful. Pressing Space and waiting displays available commands, which makes discovering shortcuts much easier.

### Browsing the project

The Snacks Explorer gives me a quick way to browse the project without leaving the editor.

![LazyVim Snacks Explorer showing the project tree](/images/blog/neovim/file-explorer.png)

## Searching with ripgrep

Project-wide searching is powered by **ripgrep**.

I installed it through Gentoo Portage:

```bash
sudo emerge --ask sys-apps/ripgrep
```

Snacks uses ripgrep to search through project files, making it easy to find functions, variables, configuration options, and references without manually opening every file.

I generally keep configuration files included in searches, since files like `package.json`, `tsconfig.json`, and `next.config.ts` are often important when debugging.

## Git integration

Git is a major part of my development workflow, so I wanted proper integration inside Neovim.

I use two tools for this.

### Gitsigns

Gitsigns displays changes directly in the editor.

It also lets me work with individual Git hunks:

- Navigate between changes.
- Preview a hunk.
- Stage individual hunks.
- Reset changes when necessary.

This is especially useful when I want to commit only specific parts of a file.

### Lazygit

For more involved Git operations, I use **Lazygit**.

I can open it directly from Neovim using:

```text
Space gg
```

From there, I can review diffs, stage files, create commits, pull changes, and push to remote repositories.

![Lazygit running in the terminal](/images/blog/neovim/lazygit.png)

It gives me a visual Git interface without having to leave my terminal workflow.

## Remote development and Discord Rich Presence

One interesting challenge was getting Discord Rich Presence working while Neovim runs remotely.

Discord runs on my local desktop, but Neovim runs on Xen.

Cord.nvim normally communicates with Discord through a local Unix socket. Since that socket wasn't available on the server, I used SSH socket forwarding.

My SSH configuration includes:

```sshconfig
Host xen
    HostName xen.5ee5.dev
    User e5
    IdentityFile ~/.ssh/id_ed25519
    ProxyCommand cloudflared access ssh --hostname %h
    RemoteForward /run/user/1000/discord-ipc-0 /run/user/1000/discord-ipc-0
    ExitOnForwardFailure yes
```

This forwards the Discord IPC socket from my desktop to Xen.

After configuring Cord.nvim to use the forwarded socket, Discord Rich Presence started working even though the editor and Discord were running on separate machines.

It's a small detail, but a nice example of how flexible a remote development environment can be.

## What's next?

I'm still experimenting with Neovim and gradually improving the setup.

Some areas I want to explore further include:

- Better TypeScript and Next.js integration.
- More efficient navigation and code actions.
- Refining my plugin configuration.
- Exploring more of Neovim's built-in capabilities.

I'm not trying to recreate every feature of a traditional IDE. I want an environment that stays lightweight, works well over SSH, and gives me control over my development workflow.

For now, Neovim on Xen is doing exactly that.

---

*My configuration is still evolving, so this post will probably change as I discover new tools and improve my workflow.*

