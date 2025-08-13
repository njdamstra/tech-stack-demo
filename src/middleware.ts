// src/middleware.ts
import type { MiddlewareHandler } from 'astro';

const COOKIE =
  (import.meta as any).env?.SESSION_COOKIE_NAME ?? process.env.SESSION_COOKIE_NAME ?? 'a_session';
const CROSS_SITE = String(
  (import.meta as any).env?.CROSS_SITE ?? process.env.CROSS_SITE ?? ''
).toLowerCase() === 'true';
const COOKIE_DOMAIN =
  (import.meta as any).env?.COOKIE_DOMAIN ?? process.env.COOKIE_DOMAIN ?? undefined;

export const onRequest: MiddlewareHandler = async (ctx, next) => {
  const { cookies, locals, url } = ctx;
  const isHttps = url.protocol === 'https:';

  const get = <T = string>(key: string) =>
    key === 'userSession' ? (cookies.get(COOKIE)?.value as T | undefined) : undefined;

  const set = (key: string, value: string, opts: { expires?: Date } = {}) => {
    if (key !== 'userSession') return;
    cookies.set(COOKIE, value, {
      httpOnly: true,
      secure: CROSS_SITE ? true : isHttps,   // <-- works in localhost (http) + HTTPS prod
      sameSite: CROSS_SITE ? 'none' : 'lax',
      path: '/',
      expires: opts.expires,
      domain: COOKIE_DOMAIN
    });
  };

  const destroy = () => cookies.delete(COOKIE, { path: '/' });

  // @ts-expect-error augment locals
  locals.session = { get, set, destroy };
  return next();
};
