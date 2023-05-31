import { Response } from "express";

enum HttpStatus {
  OK = 200,
  EMPTY_QUERY = 400,
  NOT_FOUND = 404,
  FORBIDDEN = 403,
  INTERNAL_SERVER_ERROR = 500,
}


  export const Ok = (res: Response, result?: any): Response => {
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      statusMsg: "Success",
      result,
    });
  }

  export const EmptyQuery = (res: Response, result?: any): Response => {
    return res.status(HttpStatus.EMPTY_QUERY).json({
      status: HttpStatus.EMPTY_QUERY,
      statusMsg: "No search parameter found",
      result,
    });
  }

  export const NotFound = (res: Response, result?: any): Response => {
    return res.status(HttpStatus.NOT_FOUND).json({
      status: HttpStatus.NOT_FOUND,
      statusMsg: "Not Found",
      result,
    });
  }

  export const Forbidden = (res: Response, result?: any): Response => {
    return res.status(HttpStatus.FORBIDDEN).json({
      status: HttpStatus.FORBIDDEN,
      statusMsg: "Forbidden",
      result,
    });
  }

  export const Error = (res: Response, result?: any): Response => {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      statusMsg: "Internal server error",
      result,
    });
  }


