export const getMessageTime = (date: Date) => {
  const hours = `${date.getHours()}`.padStart(2, '0');
  const minutes = `${date.getMinutes()}`.padStart(2, '0');
  const messageTime = `${hours}:${minutes}`;
  const isoTime = date.toISOString();
  return { messageTime, isoTime };
};
