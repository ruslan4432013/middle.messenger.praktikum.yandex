export const createMessage = (value: string) => JSON.stringify({
  content: value,
  type: 'message',
});

export const createMessageGetOld = (offset: number) => JSON.stringify({
  content: offset.toString(),
  type: 'get old',
});
