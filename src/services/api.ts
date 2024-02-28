import { configuration } from "#/config/api";
import {
  AuthApi,
  CategoriesApi,
  PostsApi,
  ApplicantsApi,
  RecruitmentsApi,
  RecruitmentTemplatesApi,
  UploadApi,
  MasterdataApi,
  BannersApi,
  MediaFilesApi,
} from "#/lib/openapi";
import request from "#/lib/request";

const authApi = new AuthApi(configuration, undefined, request);
const categoryApi = new CategoriesApi(configuration, undefined, request);
const postsApi = new PostsApi(configuration, undefined, request);
const uploadApi = new UploadApi(configuration, undefined, request);

const bannerApi = new BannersApi(configuration, undefined, request);

const mediaApi = new MediaFilesApi(configuration, undefined, request);

const applicantApi = new ApplicantsApi(configuration, undefined, request);
const recruitmentApi = new RecruitmentsApi(configuration, undefined, request);
const masterDataApi = new MasterdataApi(configuration, undefined, request);
const recruitmentTemplateApi = new RecruitmentTemplatesApi(
  configuration,
  undefined,
  request
);

export {
  authApi,
  categoryApi,
  postsApi,
  applicantApi,
  uploadApi,
  bannerApi,
  recruitmentApi,
  recruitmentTemplateApi,
  masterDataApi,
  mediaApi,
};
