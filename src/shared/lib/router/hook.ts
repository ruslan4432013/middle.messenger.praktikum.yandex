import { Router } from './router';

export function useParams<T extends Record<string, string> = Record<string, string>>() {
  return new Router('#root', window).useParams<T>();
}
