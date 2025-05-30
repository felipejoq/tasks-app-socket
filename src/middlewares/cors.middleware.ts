import cors from "cors";

export class CorsMiddleware {
  static corsAllow(acceptedOrigins = [] as string[]) {

    return cors({
      origin: (origin: string | undefined, callback) => {

        if (acceptedOrigins.length === 0) {
          return callback(null, true);
        }

        if (!origin || acceptedOrigins.includes(origin)) {
          return callback(null, true);
        }

        return callback(new Error('No permitido por CORS'));
      },
      credentials: true,
    });
  }
}