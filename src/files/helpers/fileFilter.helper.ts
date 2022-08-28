export const fileFilter = (
  request: Express.Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  if (!file) return callback(new Error('File is empty'), false);

  const validExtensions: string[] = ['jpg', 'jpeg', 'png', 'gif'];
  const fileExtension: string = file.mimetype.split('/')[1];

  if (validExtensions.includes(fileExtension)) {
    callback(null, true);
  }

  callback(null, false);
};
