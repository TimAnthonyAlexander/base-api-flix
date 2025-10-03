// Generated TypeScript definitions for BaseApi
// Do not edit manually - regenerate with: ./mason types:generate

export type UUID = string;
export type Envelope<T> = { data: T };

export interface ErrorResponse {
  error: string;
  requestId: string;
  errors?: Record<string, string>;
}

export interface WatchItem {
  title: string;
  type: string;
  description?: string | null;
  release_year?: number | null;
  rating?: number;
  ratings_count?: number;
  id?: string;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface User {
  name?: string;
  password?: string;
  email?: string;
  active?: boolean;
  id?: string;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface GetRecommendationsQueryParams {
  limit?: number;
  minRating?: number;
}

export type GetRecommendationsResponse = Envelope<unknown>;

export interface GetGenreByGenrePathParams {
  genre: string;
  [key: string]: string | number | null;
}

export type GetGenreByGenreResponse = Envelope<{ data: WatchItem }>;

export interface GetHealthQueryParams {
  db?: string;
  cache?: string;
}

export type GetHealthResponse = Envelope<unknown>;

export interface PostSignupRequestBody {
  name?: string;
  email?: string;
  password?: string;
}

export type PostSignupResponse = Envelope<User>;

export interface PostLoginRequestBody {
  email?: string;
  password?: string;
}

export type PostLoginResponse = Envelope<{ user: unknown[] }>;

export type PostLogoutResponse = Envelope<{ message: string }>;

export type GetMeResponse = Envelope<{ user: unknown[] }>;

export type GetOpenApiResponse = Envelope<unknown>;

export interface WatchItemMovie {
  id?: string;
  director?: string | null;
  duration_minutes?: number | null;
  file_path?: string;
}

export interface WatchItemEpisode {
  id?: string;
  episode_number?: number;
  title?: string | null;
  description?: string | null;
  file_path?: string;
}

export interface WatchItemSeason {
  id?: string;
  season_number?: number;
  description?: string | null;
  release_year?: number | null;
  episodes?: WatchItemEpisode[];
}

export interface WatchItemDetails extends WatchItem {
  movies?: WatchItemMovie[];
  seasons?: WatchItemSeason[];
}

export interface GetWatchItemByIdPathParams {
  id: string;
  [key: string]: string | number | null;
}

export type GetWatchItemByIdResponse = Envelope<WatchItemDetails>;
