const isProdEnv = process.env.NODE_ENV === "production";

export const API_BASE = isProdEnv
    ? "https://devapi.cupponpro.com/api/v1/"
    : "https://devapi.cupponpro.com/api/v1/";

export const API_BASE_V2 = isProdEnv
    ? "https://devapi.cupponpro.com/api/v2/"
    : "https://devapi.cupponpro.com/api/v2/";

export const BASE_URL = isProdEnv
    ? "https://mastarqr.com/"
    : "http://localhost:3000/";
