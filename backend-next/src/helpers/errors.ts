import { HttpException, HttpStatus } from '@nestjs/common';

export const httpErrors = {
  badReq: (message: string, error = null) => {
    return new HttpException(
      {
        success: false,
        message,
        status: HttpStatus.BAD_REQUEST,
        error,
      },
      HttpStatus.BAD_REQUEST,
    );
  },
  notFound: (message: string, error = null) => {
    return new HttpException(
      {
        success: false,
        message,
        status: HttpStatus.NOT_FOUND,
        error,
      },
      HttpStatus.NOT_FOUND,
    );
  },
  serverError: (message: string = 'Something went wrong!', error = null) => {
    return new HttpException(
      {
        success: false,
        message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  },
};
