// types.ts
export type SetCookieFunction = (name: string, value: string, options?: { path?: string; secure?: boolean; httpOnly?: boolean }) => void;
export type RemoveCookieFunction = (name: string) => void;
