type ObjWithValue = {
  value: string
};

export const isTargetWithValue = (target: unknown): target is ObjWithValue => {
  if (target && typeof target === 'object' && 'value' in target) {
    return true;
  }
  return false;
};
