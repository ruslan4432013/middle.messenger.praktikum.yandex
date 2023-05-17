import { type Component } from '../component';
import { router } from '../router';

export const loginRequired = (
  validationFn: () => boolean | Promise<boolean>,
  redirect: string,
) => function <T extends new (...args: any[]) => Component>(constructor: T) {
  return class extends constructor {
    public componentDidMount() {
      (async () => {
        const res = await validationFn();
        if (!res) {
          router.go(redirect);
        }
      })();
      super.componentDidMount?.();
    }
  };
};
