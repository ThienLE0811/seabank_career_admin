type ResponseAPI<T> = {
  data: T;
  success: boolean;
  error?: {
    message?: string;
    errors?: {
      id: string;
      message: string;
      code: number;
    }[];
  };
};

interface Recruitment {
  id: number;
  code: string;
  jobTitle: string;
  description: string;
  experienceRequirementDescriptions: string;
  industry: string;
  salaryType: string;
  salaryCurrency: string;
  salaryMinValue: string;
  salaryMaxValue: string;
  employmentTypes: string;
  validThrough: string;
  jobBenefits: string;
  gender: string;
  ageFrom: string;
  ageTo: string;
  experienceRequirementsType: string;
  monthsOfExperienceFrom: number;
  monthsOfExperienceTo: number;
  occupationalCategory: string;
  qualifications: string;
  createdBy: string;
  modifiedBy: string;
  createdTime: string;
  modifiedTime: string;
  publishStatus: number;
  publishUpDate: string;
  publishDownDate: string;
  skills: string;
  jobAmount: number;
  note: string;
  reasonJobPostings: string;
  mdmJobLocationid: number;
}

interface RequestBody {
  start: number;
  limit: number;
  keyword: string;
  sortField: string;
  sortType: string;
  count: boolean;
}

interface Applicant {
  id: number;
  code: string;
  jobTitle: string;
  description: string;
  experienceRequirementDescriptions: string;
  industry: string;
  salaryType: string;
  salaryCurrency: string;
  salaryMinValue: string;
  salaryMaxValue: string;
  employmentTypes: string;
  validThrough: string;
  jobBenefits: string;
  gender: string;
  ageFrom: string;
  ageTo: string;
  experienceRequirementsType: string;
  monthsOfExperienceFrom: number;
  monthsOfExperienceTo: number;
  occupationalCategory: string;
  qualifications: string;
  createdBy: string;
  modifiedBy: string;
  createdTime: string;
  modifiedTime: string;
  publishStatus: number;
  publishUpDate: string;
  publishDownDate: string;
  skills: string;
  jobAmount: number;
  note: string;
  reasonJobPostings: string;
  mdmJobLocationid: number;
}

interface LoginReq {
  username: string;
  password: string;
}

interface LoginRes {
  userFullName: string;
}

interface PostsCreate {
  title: string;
  alias: string;
  description: string;
  content: string;
  state: number;
  ordering: number;
  stick: boolean;
  categoriesId: number[];
  thumbImage: string;
  tags: string[];
  feature: boolean;
  featureOrdering: number;
  bannerImage: string;
}

interface PostsInfo {
  id?: number;
  title: string;
  tags: any[];
}

interface SurveyInfo {
  id: number;
  title: string;
  state: number;
}

interface PostsDetailRes {
  success: boolean;
  data: {
    id: number;
    title: string;
    alias: string;
    description: string;
    content: string;
    state: number;
    createdTime: string;
    modifiedTime: string;
    createdBy: string;
    modifiedBy: string;
    ordering: number;
    stick: false;
    categoriesId: number[];
    publishUp: string;
    thumbImage: string;
    publishTime: Date;
    tags: string[][];
    feature: boolean;
    featureOrdering: number;
    bannerImage: string;
  };
}

type PostsList = RequestBody;

interface PostsDetailListRes {
  success: boolean;
  data: {
    total: number;
    items: [
      {
        id: number;
        title: string;
        alias: string;
        description: string;
        content: string;
        state: number;
        createdTime: Date;
        modifiedTime: Date;
        createdBy: string;
        modifiedBy: string;
        ordering: number;
        stick: false;
        categoriesId: number[];
        publishUp: string;
        thumbImage: string;
        publishTime: string;
        tags: string[][];
        feature: boolean;
        featureOrdering: number;
        bannerImage: string;
      }
    ];
  };
}

interface updatePosts {
  title: string;
  alias: string;
  description: string;
  content: string;
  state: number;
  ordering: number;
  stick: boolean;
  categoriesId: number[];
  thumbImage: string;
  tags: string[];
  feature: boolean;
  featureOrdering: number;
  bannerImage: string;
  id: number;
}

interface CategoryCreate {
  title: string;
  parentId: number;
  path: string;
  description: string;
}

interface updateCategory {
  title: string;
  parentId: number;
  path: string;
  description: string;
  id: number;
}

interface CategoryDetailRes {
  success: boolean;
  data: {
    id: number;
    title: string;
    parentId: number;
    path: string;
    description: string;
    createdTime: string;
    modifiedTime: string;
    createdBy: string;
    modifiedBy: string;
  };
}

type CategoryList = RequestBody;

interface CategoryDetailListRes {
  success: true;
  data: {
    total: number;
    items: [
      {
        id: number;
        title: string;
        parentId: number;
        path: string;
        description: string;
        createdTime: string;
        modifiedTime: string;
        createdBy: string;
        modifiedBy: string;
      }
    ];
  };
}

interface SurveyCreate {
  title: string;
  state: number;
  description: string;
}

interface updateSurvey {
  title: string;
  state: number;
  description: string;
  id: number;
}

interface SurveyDetailRes {
  success: boolean;
  data: {
    id: number;
    title: string;
    state: number;
    description: string;
    createdTime: string;
    modifiedTime: string;
    createdBy: string;
    modifiedBy: string;
  };
}

type SurveyList = RequestBody;

interface SurveyDetailListRes {
  success: true;
  data: {
    total: number;
    items: [
      {
        id: number;
        title: string;
        state: number;
        description: string;
        createdTime: string;
        modifiedTime: string;
        createdBy: string;
        modifiedBy: string;
      }
    ];
  };
}

type RecruitmentCreate = Omit<Recruitment, "id">;

type updateRecruitment = Recruitment;

interface RecruitmentDetailRes {
  success: boolean;
  data: Recruitment;
}

interface RecruitmentDetailListRes {
  success: boolean;
  data: {
    total: number;
    items: [Recruitment];
  };
}

type RecruitmentTemplateCreate = Omit<Recruitment, "id">;

type updateRecruitmentTemplate = Recruitment;

interface RecruitmentTemplateDetailRes {
  success: boolean;
  data: Recruitment;
}

type RecruitmentTemplateList = RequestBody;
interface RecruitmentTemplateDetailListRes {
  success: boolean;
  data: {
    total: number;
    items: [Recruitment];
  };
}

type ApplicantCreate = Omit<Applicant, "id">;

type updateApplicant = Applicant;

interface ApplicantDetailRes {
  success: boolean;
  data: Applicant;
}

type ApplicantList = RequestBody;

interface ApplicantDetailListRes {
  success: true;
  data: {
    total: number;
    items: [Applicant];
  };
}
