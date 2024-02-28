import { Configuration, Post, PostsApi } from "#/lib/openapi";

export const BASE_URL_PORTAL = "https://sb-career-gw.onbank.vn";

export const configuration = new Configuration({
  basePath: BASE_URL_PORTAL,
});
