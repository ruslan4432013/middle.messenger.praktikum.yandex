export const phone = (phoneNumber: string): boolean => {
  const phoneNumberRegex = /^\+?\d{10,15}$/;

  return phoneNumberRegex.test(phoneNumber);
};
