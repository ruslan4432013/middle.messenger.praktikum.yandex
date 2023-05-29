export function uuid4(): string {
  // Генерируем 16-байтное случайное число
  const buffer = new Uint8Array(16);
  crypto.getRandomValues(buffer);

  // Устанавливаем версию UUID v4 (0100) и вариант (10xx, где x - случайные биты)
  buffer[6] = (buffer[6] & 0x0f) | 0x40;
  buffer[8] = (buffer[8] & 0x3f) | 0x80;

  // Форматируем байты в строку
  return (
    `${Array.from(buffer)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
      .slice(0, 8)
    }-${
      Array.from(buffer.subarray(4, 6))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('')
    }-${
      Array.from(buffer.subarray(6, 8))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('')
    }-${
      Array.from(buffer.subarray(8, 10))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('')
    }-${
      Array.from(buffer.subarray(10))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('')}`
  );
}
