import { router } from './router';

export function useParams<T extends Record<string, string> = Record<string, string>>() {
  return router.useParams<T>();
}
