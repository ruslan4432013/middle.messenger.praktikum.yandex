type CallbackParams = {
  src: string,
  file: File
};

export function cropImage(
  file: File,
  maxWidth: number,
  maxHeight: number,
  callback: (params: CallbackParams) => void,
): void {
  const img = new Image();
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;

  img.onload = () => {
    let { width, height } = img;

    const aspectRatio = width / height;

    // Проверяем, нужно ли изменять размер изображения
    if (width > maxWidth || height > maxHeight) {
      if (width / maxWidth > height / maxHeight) {
        width = maxWidth;
        height = Math.round(width / aspectRatio);
      } else {
        height = maxHeight;
        width = Math.round(height * aspectRatio);
      }
    }
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);

    const croppedDataURL = canvas.toDataURL('image/jpeg');
    canvas.toBlob((blob) => {
      if (blob) {
        const resizedFile = new File([blob], file.name, {
          type: 'image/jpeg',
          lastModified: Date.now(),
        });
        callback({ src: croppedDataURL, file: resizedFile });
      }
    }, 'image/jpeg');
  };

  img.src = URL.createObjectURL(file);
}
