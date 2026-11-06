---
title: "Building Loopback, a small webring"
date: "2026-11-06 09:56"
summary: "Why I made a webring for personal sites, and a few decisions behind it: an iframe with no scripts, hand-reviewed members, and SQLite."
---

A webring is a loop of personal websites. Each one links to the next, and after the last one you end up back at the first. I like them because nothing ranks the sites or decides what you see next. You click an arrow and land on somebody's homepage.

I'm in the [ring-amajig](https://ring.pre1ude.dev) ring, and at some point I wanted to build one myself. That became **Loopback**, which runs at [ring.5ee5.dev](https://ring.5ee5.dev).

## What it does

A member puts a small widget on their site with **previous** and **next** links. Click one and you're redirected to the neighbouring member's site. The order is by join date, and members who are no longer active are skipped.

The ring is a plain list, so the navigation code is a few functions with no framework in them. That made it easy to test, including the edge cases: a ring with one member, a visitor coming from a site that has since been removed, and an unknown member id.

## The widget is an iframe

My first version was a custom element: a script on the member's page that rendered the links in a shadow DOM. It worked, but I ended up deleting it.

The iframe does the same job with one line of HTML:

```html
<iframe src="https://ring.5ee5.dev/embed?url=https://your-site.com" width="320" height="100" style="border:0" title="Loopback"></iframe>
```

Offering both a script and an iframe confused the install page. The iframe also needs no member ID, because the server finds the member from the site address. And the frame itself is static HTML and CSS. It loads no scripts, images or cookies, so I'm not asking anyone to run my JavaScript on their site. The hover animations are CSS only and turn off for `prefers-reduced-motion`.

There are two optional parameters, `fgcolor` and `bgcolor`, so a member can match the widget to their site. You can see that on the home page of this site, where it's coloured green on near-black. `name=off` shrinks it to just the logo.

One trade-off: if you aren't a member, you get a blank frame instead of an error. I didn't want the response to reveal whether a site was unknown, inactive or suspended.

## Members are reviewed by hand

Anyone can apply on the [join page](https://ring.5ee5.dev/join), but I read every application. An approved site starts in a "setting up" state. It shows on the homepage as a loading card but isn't part of the ring yet, so the owner can install the widget first. Then I mark it live.

There's one admin account, created from the terminal. Sign-up is turned off, and I didn't expose the auth endpoints at all. Sign-in and sign-out are server actions behind my own rate limit.

Every admin action is written to an audit log. The log is append-only, and database triggers reject any update or delete, even from raw SQL. An entry is written in the same transaction as the change it describes, so the two can't get out of sync.

## SQLite

The original plan was PostgreSQL. I switched to SQLite because I didn't want to run a database server for a ring this size. It's one file in WAL mode, accessed through Drizzle. The cost is that it needs a persistent disk and a single app instance, which suits a machine at home and wouldn't suit serverless hosting.

The schema enforces most of the rules itself. URLs, name lengths, statuses and tag counts are all `CHECK` constraints, so a bad row can't get in even if I insert it by hand. The integration tests caught one gotcha here: SQLite treats a `CHECK` that evaluates to `NULL` as passing, so the date check needed a `coalesce`.

## Hosting

It's hosted the same way as this site: PM2 on the same machine, with a Cloudflare Tunnel pointing straight at the app. I wrote about that in [how this site is hosted](/blog/how-this-site-is-hosted). It's a separate process and a separate database from the dev copy, so running tests can't touch live data.

## Join

If you have a personal site, you're welcome to apply at [ring.5ee5.dev/join](https://ring.5ee5.dev/join). The code is on [GitHub](https://github.com/5ee5/loopback).
