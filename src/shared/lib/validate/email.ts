export const email = (mail: string) => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  if (!emailRegex.test(mail)) {
    return false;
  }

  const [username, domain] = mail.split('@');

  if (username.length < 1 || domain.length < 3) {
    return false;
  }

  const domainParts = domain.split('.');
  const topLevelDomain = domainParts[domainParts.length - 1];

  if (topLevelDomain.length < 2) {
    return false;
  }

  const letterRegex = /^[A-Za-z]+$/;

  for (let i = 0; i < domainParts.length - 1; i++) {
    const part = domainParts[i];

    if (part.length < 2 || !letterRegex.test(part)) {
      return false;
    }
  }

  return true;
};
