// src/lib/cookies.ts

export type CookieSameSite = "strict" | "lax" | "none";

export type SetCookieOptions = {
  path?: string;
  domain?: string;
  maxAge?: number;
  expires?: number | Date;
  sameSite?: CookieSameSite;
  secure?: boolean;
  partitioned?: boolean;
};

function buildDocumentCookie(
  name: string,
  value: string,
  options: SetCookieOptions = {},
) {
  const {
    path = "/",
    domain,
    maxAge,
    expires,
    sameSite = "lax",
    secure = process.env.NODE_ENV === "production",
    partitioned = false,
  } = options;

  return [
    `${encodeURIComponent(name)}=${encodeURIComponent(value)}`,
    `Path=${path}`,
    domain ? `Domain=${domain}` : "",
    typeof maxAge === "number" ? `Max-Age=${maxAge}` : "",
    expires
      ? `Expires=${
          expires instanceof Date
            ? expires.toUTCString()
            : new Date(expires).toUTCString()
        }`
      : "",
    `SameSite=${sameSite}`,
    secure ? "Secure" : "",
    partitioned ? "Partitioned" : "",
  ]
    .filter(Boolean)
    .join("; ");
}

export async function setCookie(
  name: string,
  value: string,
  options: SetCookieOptions = {},
) {
  if (typeof window === "undefined") {
    return;
  }

  const {
    path = "/",
    domain,
    maxAge,
    expires,
    sameSite = "lax",
    secure = process.env.NODE_ENV === "production",
    partitioned = false,
  } = options;

  /**
   * Modern Cookie Store API
   */
  if ("cookieStore" in window) {
    try {
      await window.cookieStore.set({
        name,
        value,
        path,
        domain,
        expires:
          typeof expires === "number"
            ? expires
            : expires instanceof Date
              ? expires.getTime()
              : maxAge
                ? Date.now() + maxAge * 1000
                : undefined,

        /**
         * TS DOM typings may lag behind browser support.
         * These properties are already supported by modern browsers.
         */
        sameSite,
        secure,
        partitioned,
      } as CookieInit);

      return;
    } catch (error) {
      console.warn(
        "[cookies] CookieStore API failed. Falling back to document.cookie.",
        error,
      );
    }
  }

  /**
   * Legacy fallback for unsupported browsers / webviews.
   * Required for maximum compatibility.
   */
  // biome-ignore lint/suspicious/noDocumentCookie: required as legacy fallback for unsupported Cookie Store API environments
  document.cookie = buildDocumentCookie(name, value, options);
}

export async function getCookie(name: string) {
  if (typeof window === "undefined") {
    return undefined;
  }

  /**
   * Modern API
   */
  if ("cookieStore" in window) {
    try {
      const cookie = await window.cookieStore.get(name);

      return cookie?.value;
    } catch (error) {
      console.warn(
        "[cookies] CookieStore API get failed. Falling back.",
        error,
      );
    }
  }

  /**
   * Legacy fallback
   */
  const encodedName = encodeURIComponent(name);

  const cookies = document.cookie.split("; ");

  for (const cookie of cookies) {
    const [key, ...rest] = cookie.split("=");

    if (key === encodedName) {
      return decodeURIComponent(rest.join("="));
    }
  }

  return undefined;
}

export async function deleteCookie(
  name: string,
  options: Omit<SetCookieOptions, "maxAge" | "expires"> = {},
) {
  if (typeof window === "undefined") {
    return;
  }

  /**
   * Modern API
   */
  if ("cookieStore" in window) {
    try {
      await window.cookieStore.delete({
        name,
        path: options.path,
        domain: options.domain,
      });

      return;
    } catch (error) {
      console.warn(
        "[cookies] CookieStore API delete failed. Falling back.",
        error,
      );
    }
  }

  /**
   * Legacy deletion fallback.
   */
  // biome-ignore lint/suspicious/noDocumentCookie: required as legacy fallback for unsupported Cookie Store API environments
  document.cookie = buildDocumentCookie(name, "", {
    ...options,
    expires: new Date(0),
    maxAge: 0,
  });
}
