import {CustomError} from "@config/errors/custom.error";
import {Response} from "express";

export const handleError = (error: unknown, res: Response) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({result: {errors: [error.message]}});
  }

  if (Array.isArray(error)) {
    const errors = error
      .flatMap(err => Object.values(err.constraints));
    return res.status(400).json({result: {errors}});
  }

  console.error("Unexpected error:", error);
  return res.status(500).json({result: {errors: ['Internal server error']}});
}