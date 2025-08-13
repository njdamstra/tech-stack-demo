import type { MiddlewareHandler } from 'astro';

const COOKIE = process.env.SESSION_COOKIE_NAME || 'a_session';
const CROSS_SITE = String(process.env.CROSS_SITE || '').toLowerCase() === 'true';

export const onRequest: MiddlewareHandler = async (context, next) => {
  const { cookies, locals } = context;

  const get = <T = string>(key: string) =>
    key === 'userSession' ? (cookies.get(COOKIE)?.value as T | undefined) : undefined;

  const set = (key: string, value: string, opts: { expires?: Date; domain?: string } = {}) => {
    if (key !== 'userSession') return;
    cookies.set(COOKIE, value, {
      httpOnly: true,
      secure: true,
      sameSite: CROSS_SITE ? 'none' : 'lax',
      path: '/',
      expires: opts.expires,
      domain: process.env.COOKIE_DOMAIN || opts.domain
    });
  };

  const destroy = () => cookies.delete(COOKIE, { path: '/' });

  // @ts-expect-error - augmenting locals dynamically
  locals.session = { get, set, destroy };

  return next();
};
