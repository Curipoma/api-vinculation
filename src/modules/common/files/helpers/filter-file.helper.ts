export const filterFileHelper = (
  _req: Express.Request,
  _file: Express.Multer.File,
  callback: (...args: unknown[]) => unknown,
) => {
  return callback(null, true);
};
