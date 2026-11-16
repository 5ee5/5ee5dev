# My Neovim Setup

A practical reference for my Neovim + LazyVim environment on **Xen**, my
Gentoo home server, accessed from my Linux desktop over SSH.

> This guide records the setup and workflow discussed so far. Items
> marked **Suggested** were recommendations, not confirmed
> installations. Check the relevant config before assuming an optional
> plugin or language tool is enabled.

## 1. Environment

  Item               Setup
  ------------------ --------------------------------------------
  Remote host        `xen`
  Hostname           `xen.5ee5.dev`
  Operating system   Gentoo Linux
  Access             SSH from my Linux desktop
  Editor             Neovim
  Configuration      LazyVim starter
  Main use           Full-stack development, especially Next.js
  Colorscheme        Tokyo Night
  Git TUI            Lazygit
  Search tool        ripgrep (`rg`)

Neovim runs on Xen. I connect from my desktop using the SSH host alias:

``` bash
ssh xen
```

## 2. Installation and configuration location

The LazyVim starter was installed under:

``` text
~/.config/nvim
```

The previous configuration was preserved by renaming it:

``` text
~/.config/nvim.backup
```

The active configuration is therefore:

``` text
~/.config/nvim/
├── init.lua
├── lazy-lock.json
├── lua/
│   ├── config/
│   └── plugins/
└── ...
```

The exact files in the directory can vary as LazyVim and the
configuration evolve.

Useful commands:

``` bash
# Open Neovim
nvim

# Open a specific file
nvim path/to/file

# Open the configuration directory
nvim ~/.config/nvim/

# Inspect the config files
find ~/.config/nvim -maxdepth 3 -type f
```

## 3. Confirmed preferences and settings

### Line numbers

I prefer ordinary sequential line numbers, not relative line numbers:

``` lua
vim.opt.number = true
vim.opt.relativenumber = false
```

Put these in a Lua file loaded by the configuration, commonly:

``` text
~/.config/nvim/lua/config/options.lua
```

### Colorscheme

Tokyo Night is configured and was working.

### File explorer

The file explorer is opened manually when needed. It is not configured
to open automatically every time Neovim starts.

## 4. LazyVim basics

LazyVim uses **Space** as its leader key. Pressing Space and pausing
briefly opens the which-key menu, showing available commands.

The most useful habit is to press Space and look through the available
actions rather than trying to memorize every mapping immediately.

### Everyday shortcuts

  Shortcut            Action
  ------------------- -----------------------------------
  `Space Space`       Find files
  `Space ,`           Switch buffers
  `Space e`           Toggle file explorer
  `Space sg`          Search text in the project (grep)
  `Space sw`          Search the word under the cursor
  `Space b d`         Close current buffer
  `Space gg`          Open Lazygit
  `Ctrl+/`            Toggle floating terminal
  `Space` then wait   Open which-key

Some mappings can vary with LazyVim versions and enabled extras. If one
does not work, use which-key to inspect the active mapping.

## 5. Navigation and editing

### Moving around

  Shortcut   Action
  ---------- --------------------------------
  `h`        Move left
  `j`        Move down
  `k`        Move up
  `l`        Move right
  `w`        Next word
  `b`        Previous word
  `0`        Start of line
  `^`        First non-blank character
  `$`        End of line
  `gg`       First line of file
  `G`        Last line of file
  `%`        Jump between matching brackets

### Editing

  Shortcut   Action
  ---------- ---------------------------------
  `i`        Insert before cursor
  `a`        Insert after cursor
  `o`        Open a new line below
  `O`        Open a new line above
  `x`        Delete character
  `dd`       Delete line
  `yy`       Yank (copy) line
  `p`        Paste after cursor
  `u`        Undo
  `Ctrl+r`   Redo
  `.`        Repeat last change
  `ciw`      Change inside word
  `diw`      Delete inside word
  `V`        Select whole lines
  `v`        Character-wise visual selection

### Modes

  Key     Mode / action
  ------- -----------------------
  `i`     Insert mode
  `Esc`   Return to Normal mode
  `v`     Visual mode
  `V`     Visual line mode
  `:`     Command-line mode

A good default: navigate and make structural edits in Normal mode; enter
Insert mode only when typing.

## 6. Windows and buffers

A **buffer** is an open file. A **window** is a view displaying a
buffer. You can have several windows showing different buffers.

### Window navigation

  Shortcut   Action
  ---------- ----------------------
  `Ctrl+h`   Move to left window
  `Ctrl+j`   Move to lower window
  `Ctrl+k`   Move to upper window
  `Ctrl+l`   Move to right window

### Useful commands

``` vim
:split
:vsplit
:close
```

-   `:split` creates a horizontal split.
-   `:vsplit` creates a vertical split.
-   `:close` closes the current window.

### Buffers

  Shortcut      Action
  ------------- ---------------------------
  `Space ,`     Choose an open buffer
  `Space b d`   Delete the current buffer

You can keep multiple files open as buffers without having to display
them all in separate windows.

## 7. Finding files and searching code

LazyVim's Snacks picker provides fuzzy finding and project search.

  Shortcut        Use
  --------------- --------------------------------------
  `Space Space`   Find a file by name
  `Space sg`      Search text across the project
  `Space sw`      Search for the word under the cursor
  `Space e`       Browse the project tree

### ripgrep

`rg` is installed on Xen and is used by project-search tools.

Check it with:

``` bash
rg --version
```

It was installed on Gentoo using:

``` bash
sudo emerge --ask sys-apps/ripgrep
```

A shell alias was also added:

``` bash
alias grep='rg'
```

The alias affects interactive shell commands. Neovim plugins such as
Snacks call the `rg` executable directly, so the binary itself must be
installed.

### What to exclude from search

Avoid excluding configuration files globally. Files such as
`package.json`, `tsconfig.json`, `next.config.ts`, and ESLint or
Prettier config files are often important when debugging a project.

Generated or dependency directories are better candidates for exclusion:

``` text
node_modules/
.next/
dist/
build/
coverage/
```

## 8. LSP and code intelligence

When a language server is installed and attached to the current buffer,
LazyVim provides code navigation and language features.

  Shortcut     Action
  ------------ --------------------------
  `gd`         Go to definition
  `gr`         Find references
  `gi`         Go to implementation
  `gD`         Go to declaration
  `K`          Show hover documentation
  `Space ca`   Code action
  `Space cr`   Rename symbol
  `]d`         Next diagnostic
  `[d`         Previous diagnostic

These features depend on a working language server for the file type. If
a mapping has no useful result, check that the appropriate LSP is
installed and attached.

## 9. Git integration

### Gitsigns

Gitsigns was confirmed working.

  Shortcut      Action
  ------------- ---------------------
  `]h`          Next Git hunk
  `[h`          Previous Git hunk
  `Space ghp`   Preview hunk
  `Space ghs`   Stage hunk
  `Space ghr`   Reset hunk
  `Space ghS`   Stage entire buffer

A **hunk** is a group of changed lines. Staging individual hunks lets me
commit only selected parts of a file.

### Lazygit

Lazygit is installed on Xen through Gentoo Portage. The installed
version observed during setup was `0.66.3`.

Launch it from Neovim:

``` text
Space gg
```

Or from the terminal:

``` bash
lazygit
```

Useful Lazygit keys:

  Key       Action
  --------- ---------------------------------------
  `Space`   Stage / unstage selected file or hunk
  `a`       Stage all
  `c`       Commit
  `P`       Push
  `p`       Pull
  `q`       Quit
  `?`       Show help

Review the diff before committing, especially when an AI coding
assistant has edited files.

## 10. Terminal workflow

LazyVim provides a floating terminal toggle:

``` text
Ctrl+/
```

This is useful for commands such as:

``` bash
npm run dev
npm run lint
npm run build
git status
```

I can also use a separate SSH terminal for Claude Code while keeping
Neovim open. If an external tool changes a file that is already open in
Neovim, check or reload the buffer before continuing so the editor view
is up to date.

## 11. Web-development tooling

The main development use case is full-stack Next.js and TypeScript.

The following LazyVim extras were discussed as useful options. **They
were suggested, not all confirmed as enabled.**

  Extra                   Purpose
  ----------------------- ------------------------------------------
  `lang.typescript`       TypeScript / JavaScript language support
  `lang.tailwind`         Tailwind CSS support
  `lang.json`             JSON support
  `lang.docker`           Dockerfile and related support
  `lang.markdown`         Markdown support
  `lang.yaml`             YAML support
  `lang.prisma`           Prisma schema support
  `linting.eslint`        ESLint integration
  `formatting.prettier`   Prettier formatting

LazyVim extras are generally enabled through the LazyVim configuration
under:

``` text
~/.config/nvim/lua/plugins/
```

Check the current LazyVim documentation and the installed version's
Extras interface before adding an extra. Do not assume every suggested
extra is already enabled.

## 12. Discord Rich Presence over SSH with Cord.nvim

Cord.nvim was eventually made to work even though Neovim runs on Xen and
Discord runs on the local Linux desktop.

The solution is to forward Discord's Unix IPC socket through SSH.

### Local Discord socket

On the desktop, the Discord IPC socket was found at:

``` text
/run/user/1000/discord-ipc-0
```

### SSH configuration

The local desktop's `~/.ssh/config` contains this host entry:

``` sshconfig
Host xen
    HostName xen.5ee5.dev
    User e5
    IdentityFile ~/.ssh/id_ed25519
    ProxyCommand cloudflared access ssh --hostname %h
    RemoteForward /run/user/1000/discord-ipc-0 /run/user/1000/discord-ipc-0
    ExitOnForwardFailure yes
```

The `RemoteForward` line makes the local desktop socket available at the
same path on Xen.

Check that SSH is reading the forwarding configuration:

``` bash
ssh -G xen | grep -iE 'remoteforward|exitonforwardfailure'
```

Reconnect after changing the SSH configuration:

``` bash
ssh xen
```

Then check the socket on Xen:

``` bash
ls -la /run/user/1000/discord-ipc-0
```

### Cord.nvim

Cord.nvim was configured on Xen to use:

``` text
/run/user/1000/discord-ipc-0
```

After reconnecting and restarting Neovim, Discord Rich Presence worked.

**Important:** the forwarded socket exists only while the SSH connection
is alive. Disconnecting removes the forwarded socket; reconnecting with
`ssh xen` creates it again.

## 13. A practical daily workflow

A typical session can look like this:

1.  Connect to Xen:

    ``` bash
    ssh xen
    ```

2.  Open the project:

    ``` bash
    cd ~/path/to/project
    nvim .
    ```

3.  Use `Space Space` to open a file, or `Space sg` to search the
    project.

4.  Use LSP navigation and diagnostics while editing.

5.  Open the floating terminal with `Ctrl+/` to run the development
    server, tests, linting, or build.

6.  Use Gitsigns to inspect changes and stage individual hunks.

7.  Open Lazygit with `Space gg` to review the final diff, commit, and
    push.

8.  Keep the SSH session open if Discord Rich Presence is needed.

## 14. Quick troubleshooting

### `Space sg` does not search

Check that ripgrep is installed:

``` bash
command -v rg
rg --version
```

### LSP shortcuts do not work

Check that a language server is installed and attached to the current
buffer. LSP mappings only provide language features when a suitable
server is active.

### Discord Rich Presence disappears

Check that the SSH connection is still open and that the forwarded
socket exists on Xen:

``` bash
ls -la /run/user/1000/discord-ipc-0
```

Reconnect with:

``` bash
ssh xen
```

### A keymap is unfamiliar

Press `Space` and wait for which-key. It is often the quickest way to
discover the mappings available in the current setup.

------------------------------------------------------------------------

*This is a living setup note. Update it as plugins, language tools,
keymaps, and the workflow change.*
