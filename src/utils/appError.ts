export class AppError extends Error {
  statusCode: number;
  status: string;

  constructor(message: string, statusCode = 500, status = "failed") {
    super(message);
    this.statusCode = statusCode;
    this.status = status;
  }
}

// export default (message: string, statusCode: number) => {
//   const error = new CustomError(message);
//   console.log({ statusCode });
//   error.statusCode = statusCode || 500;
//   error.status = "failed";

//   return error;
// };
