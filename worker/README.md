# Offline Worker

Serves a themed offline page when Cloudflare cannot reach the origin — the
machine is off, or the `cloudflared` tunnel is down (Cloudflare error 1033 /
HTTP 530).

Deployed separately from the site; `npm run deploy` does **not** touch it.

## Deploy

    npx --yes wrangler@4 deploy --config worker/wrangler.toml

First run opens a browser to authorise wrangler against the Cloudflare account
that owns the `5ee5.dev` zone.

## Test it for real

Local smoke test (origin still up, so it should just proxy):

    npx --yes wrangler@4 dev --config worker/wrangler.toml

The only test that proves the 530 path works is taking the tunnel down:

    sudo systemctl stop cloudflared
    curl -s -o /dev/null -w '%{http_code}\n' https://5ee5.dev/   # expect 503
    sudo systemctl start cloudflared

## Scope

Only Cloudflare's origin-unreachable range (520–530) is intercepted. A real 500
from Next passes through untouched so the app's own `error.tsx` still renders.
