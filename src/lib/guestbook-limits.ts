/** Kept apart from guestbook.ts, which reads files and so can't reach the browser. */
export const LIMITS = { name: 32, message: 280, website: 200 } as const;
