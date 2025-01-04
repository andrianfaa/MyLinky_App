/** @type {import("express").Express} */

declare global {
  interface ApiResponseModel<T = null> {
    status: "success" | "error/failed";
    status_code: number;
    message: string | string[];
    data?: T;
    total_data?: number;
  }

  namespace Express {
    interface Request {
      user: {
        uid: string;
        email: string;
      };
    }

    interface Response {
      sendResponse: <T = null>(
        type: ApiResponseModel["status"],
        /**
         * HTTP Status Code (ex: 200, 201, 404, 500, etc.)
         * @default 200
         * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
         */
        statusCode: number,
        options: Omit<ApiResponseModel<T>, "status" | "status_code" | "total_data">
      ) => void;
    }
  }
}

export {};
