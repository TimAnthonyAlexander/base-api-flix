// Generated React hooks for BaseApi
// Do not edit manually - regenerate with: ./mason types:generate

import { useState, useEffect, useCallback, type DependencyList } from 'react';
import { type HttpOptions } from './http';
import * as Api from './client';
import * as Types from './types';

export interface QueryOptions<T> extends HttpOptions {
  enabled?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

export interface QueryResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export interface MutationResult<T, TVariables> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  mutate: (variables: TVariables) => Promise<T>;
  reset: () => void;
}

/**
 * React hook for GET /recommendations
 * Auto-fetches on mount and when dependencies change
 */
export function useGetRecommendations(query?: Types.GetRecommendationsQueryParams, options?: QueryOptions<Types.GetRecommendationsResponse>, deps?: DependencyList): QueryResult<Types.GetRecommendationsResponse> {
  const [data, setData] = useState<Types.GetRecommendationsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const enabled = options?.enabled ?? true;

  const fetchData = useCallback(async () => {
    if (!enabled) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await Api.getRecommendations(query, options);
      setData(result);
      options?.onSuccess?.(result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      options?.onError?.(error);
    } finally {
      setLoading(false);
    }
  }, [enabled, JSON.stringify(query), ...(deps || [])]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

/**
 * React hook for GET /genre/{genre}
 * Auto-fetches on mount and when dependencies change
 */
export function useGetGenreByGenre(path: Types.GetGenreByGenrePathParams, options?: QueryOptions<Types.GetGenreByGenreResponse>, deps?: DependencyList): QueryResult<Types.GetGenreByGenreResponse> {
  const [data, setData] = useState<Types.GetGenreByGenreResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const enabled = options?.enabled ?? true;

  const fetchData = useCallback(async () => {
    if (!enabled) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await Api.getGenreByGenre(path, options);
      setData(result);
      options?.onSuccess?.(result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      options?.onError?.(error);
    } finally {
      setLoading(false);
    }
  }, [enabled, JSON.stringify(path), ...(deps || [])]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

/**
 * React hook for GET /health
 * Auto-fetches on mount and when dependencies change
 */
export function useGetHealth(query?: Types.GetHealthQueryParams, options?: QueryOptions<Types.GetHealthResponse>, deps?: DependencyList): QueryResult<Types.GetHealthResponse> {
  const [data, setData] = useState<Types.GetHealthResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const enabled = options?.enabled ?? true;

  const fetchData = useCallback(async () => {
    if (!enabled) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await Api.getHealth(query, options);
      setData(result);
      options?.onSuccess?.(result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      options?.onError?.(error);
    } finally {
      setLoading(false);
    }
  }, [enabled, JSON.stringify(query), ...(deps || [])]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

/**
 * React hook for POST /auth/signup
 * Returns a mutate function that must be called manually
 */
export function usePostSignup(
  options?: QueryOptions<Types.PostSignupResponse>
): MutationResult<Types.PostSignupResponse, {body: Types.PostSignupRequestBody}> {
  const [data, setData] = useState<Types.PostSignupResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(async (variables: {body: Types.PostSignupRequestBody}) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await Api.postSignup(variables.body, options);
      setData(result);
      options?.onSuccess?.(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      options?.onError?.(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [options]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  return { data, loading, error, mutate, reset };
}

/**
 * React hook for POST /auth/login
 * Returns a mutate function that must be called manually
 */
export function usePostLogin(
  options?: QueryOptions<Types.PostLoginResponse>
): MutationResult<Types.PostLoginResponse, {body: Types.PostLoginRequestBody}> {
  const [data, setData] = useState<Types.PostLoginResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(async (variables: {body: Types.PostLoginRequestBody}) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await Api.postLogin(variables.body, options);
      setData(result);
      options?.onSuccess?.(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      options?.onError?.(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [options]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  return { data, loading, error, mutate, reset };
}

/**
 * React hook for POST /auth/logout
 * Returns a mutate function that must be called manually
 */
export function usePostLogout(
  options?: QueryOptions<Types.PostLogoutResponse>
): MutationResult<Types.PostLogoutResponse, {}> {
  const [data, setData] = useState<Types.PostLogoutResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(async (_variables: {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await Api.postLogout(options);
      setData(result);
      options?.onSuccess?.(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      options?.onError?.(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [options]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  return { data, loading, error, mutate, reset };
}

/**
 * React hook for GET /me
 * Auto-fetches on mount and when dependencies change
 */
export function useGetMe(options?: QueryOptions<Types.GetMeResponse>, deps?: DependencyList): QueryResult<Types.GetMeResponse> {
  const [data, setData] = useState<Types.GetMeResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const enabled = options?.enabled ?? true;

  const fetchData = useCallback(async () => {
    if (!enabled) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await Api.getMe(options);
      setData(result);
      options?.onSuccess?.(result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      options?.onError?.(error);
    } finally {
      setLoading(false);
    }
  }, [enabled, ...(deps || [])]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

/**
 * React hook for GET /openapi.json
 * Auto-fetches on mount and when dependencies change
 */
export function useGetOpenApi(options?: QueryOptions<Types.GetOpenApiResponse>, deps?: DependencyList): QueryResult<Types.GetOpenApiResponse> {
  const [data, setData] = useState<Types.GetOpenApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const enabled = options?.enabled ?? true;

  const fetchData = useCallback(async () => {
    if (!enabled) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await Api.getOpenApi(options);
      setData(result);
      options?.onSuccess?.(result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      options?.onError?.(error);
    } finally {
      setLoading(false);
    }
  }, [enabled, ...(deps || [])]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
