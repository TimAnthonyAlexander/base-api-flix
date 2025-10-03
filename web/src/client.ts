// Generated API client functions for BaseApi
// Do not edit manually - regenerate with: ./mason types:generate

import { http, type HttpOptions } from './http';
import { buildPath } from './routes';
import * as Types from './types';

/**
 * GET /genre/{genre}
 * @tags Genres, Recommendations
 */
export async function getGenreByGenre(path: Types.GetGenreByGenrePathParams, options?: HttpOptions): Promise<Types.GetGenreByGenreResponse> {
  const url = buildPath('GetGenreByGenre', path);

  return http.get(url, options);
}

/**
 * GET /health
 * @tags API
 */
export async function getHealth(query?: Types.GetHealthQueryParams, options?: HttpOptions): Promise<Types.GetHealthResponse> {
  const url = '/health';
  const searchParams = new URLSearchParams();
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    }
  }
  const fullUrl = searchParams.toString() ? `${url}?${searchParams}` : url;

  return http.get(fullUrl, options);
}

/**
 * POST /auth/signup
 * @tags Authentication
 */
export async function postSignup(body: Types.PostSignupRequestBody, options?: HttpOptions): Promise<Types.PostSignupResponse> {
  const url = '/auth/signup';

  return http.post(url, body, options);
}

/**
 * POST /auth/login
 * @tags Authentication
 */
export async function postLogin(body: Types.PostLoginRequestBody, options?: HttpOptions): Promise<Types.PostLoginResponse> {
  const url = '/auth/login';

  return http.post(url, body, options);
}

/**
 * POST /auth/logout
 * @tags Authentication
 */
export async function postLogout(options?: HttpOptions): Promise<Types.PostLogoutResponse> {
  const url = '/auth/logout';

  return http.post(url, options);
}

/**
 * GET /me
 * @tags Authentication
 */
export async function getMe(options?: HttpOptions): Promise<Types.GetMeResponse> {
  const url = '/me';

  return http.get(url, options);
}

/**
 * GET /openapi.json
 * @tags API
 */
export async function getOpenApi(options?: HttpOptions): Promise<Types.GetOpenApiResponse> {
  const url = '/openapi.json';

  return http.get(url, options);
}
