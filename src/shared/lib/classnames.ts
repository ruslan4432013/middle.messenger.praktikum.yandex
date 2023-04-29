export const cn = (...classes: (Record<string, boolean> | string | undefined)[]) => {
  const res: string[] = [];
  classes.forEach((obj) => {
    if (typeof obj === 'object') {
      for (const [key, value] of Object.entries(obj)) {
        if (value) {
          res.push(key);
        }
      }
    } else if (typeof obj === 'string') {
      res.push(obj);
    }
  });
  return res.join(' ');
};
