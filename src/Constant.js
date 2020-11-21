const isProdEnv = process.env.NODE_ENV === 'production';

export const API_BASE = isProdEnv
  ? 'https://stagingapi.cupponpro.com/api/v1/'
  : 'https://stagingapi.cupponpro.com/api/v1/';

export const BASE_URL = isProdEnv ? 'https://mastarqr.com/' : 'http://localhost:3000/';
