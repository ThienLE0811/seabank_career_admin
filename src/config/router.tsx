import { MenuDataItem } from "@ant-design/pro-components";
import { RouteObject } from "react-router-dom";
import Layout from "#/layout";
import PostPage from "#/pages/posts";
import Login from "#/pages/login";
import {
  ClusterOutlined,
  FileDoneOutlined,
  FolderOpenOutlined,
  GlobalOutlined,
  NotificationOutlined,
  ReadOutlined,
  SolutionOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import Category from "#/pages/category";
import User from "#/pages/user";
import NotFound from "#/pages/404";
import NotAuthorized from "#/pages/403";
import Recruitments from "#/pages/recruitment";
import RecruitmentTemplate from "#/pages/recruitmentTemplate";
import RecruitmentManager from "#/pages/recruitmentManager";
import BannerPage from "#/pages/banner";
import MediaPage from "#/pages/media";

export const defaultRouter: Record<string, string> = {
  "/cms": "/cms/posts",
  "/recruitment": "/recruitment/job-board",
  "/user-management": "/user-management/user",
  "/candidate-management": "/candidate-management/candidate",
};

export const workplace: RouteObject | MenuDataItem = {
  path: "/",
  element: <Layout />,
  children: [
    {
      name: "Quản lý nội dung",
      path: "cms",
      icon: <ReadOutlined />,
      // element: <PostPage />,
      children: [
        {
          name: "Bài viết",
          path: "posts",
          icon: <ReadOutlined />,
          element: <PostPage />,
        },
        {
          name: "Danh mục",
          path: "category",
          icon: <ClusterOutlined />,
          element: <Category />,
        },
        {
          name: "Banner",
          path: "banner",
          icon: <NotificationOutlined />,
          element: <BannerPage />,
        },
        {
          name: "Media",
          path: "media",
          icon: <ClusterOutlined />,
          element: <MediaPage />,
        },

        // {
        //   name: "Khảo sát",
        //   path: "survey",
        //   icon: <NotificationOutlined />,
        //   element: <Survey />,
        // },
        // {
        //   name: "Mạng xã hội",
        //   path: "social",
        //   icon: <GlobalOutlined />,
        //   element: <Social />,
        // },
      ],
    },
    {
      name: "Quản lý tuyển dụng",
      path: "recruitment",
      icon: <FileDoneOutlined />,
      // element: <>recruitment</>,
      children: [
        {
          name: "Việc làm",
          path: "job-board",
          icon: <FolderOpenOutlined />,
          // element: <User />,
          children: [
            // {
            //   name: "Đăng tin tuyển dụng",
            //   path: "recruitments",
            //   icon: <FolderOpenOutlined />,
            //   element: <Recruitments />,
            // },
            {
              name: "Quản lý tuyển dụng",
              path: "recruitments",
              icon: <FolderOpenOutlined />,
              element: <RecruitmentManager />,
            },
          ],
        },
        // {
        //   name: "Thư mục",
        //   path: "folder",
        //   icon: <ReadOutlined />,
        //   element: <User />,
        // },
        {
          name: "Mẫu việc làm",
          path: "job-template",
          icon: <FolderOpenOutlined />,
          element: <RecruitmentTemplate />,
        },
      ],
    },
    {
      name: "Quản lý ứng viên",
      path: "candidate-management",
      icon: <FileDoneOutlined />,
      element: <>recruitment</>,
      children: [
        {
          name: "Ứng viên",
          path: "candidate",
          icon: <SolutionOutlined />,
          element: <User />,
        },
        {
          name: "Thành viên",
          path: "member",
          icon: <TeamOutlined />,
          element: <User />,
        },
        // {
        //   name: "Import ứng viên",
        //   path: "job-template",
        //   icon: <FolderOpenOutlined />,
        //   element: <User />,
        // },
      ],
    },
    {
      name: "Quản lý người dùng",
      path: "user-management",
      icon: <FileDoneOutlined />,
      element: <></>,
      children: [
        {
          name: "Người dùng",
          path: "user",
          icon: <ReadOutlined />,
          element: <User />,
        },
        {
          name: "Vai trò",
          path: "permission",
          icon: <FolderOpenOutlined />,
          element: <User />,
        },
      ],
    },
  ],
};

export const routes: MenuDataItem[] | RouteObject[] = [
  {
    path: "*",
    name: "404",
    element: <NotFound />,
  },
  {
    path: "/error",
    children: [
      {
        path: "404",
        name: "Error 404",
        element: <NotFound />,
      },
      {
        path: "403",
        name: "Error 403",
        element: <NotAuthorized />,
      },
    ],
  },
  {
    path: "/auth",
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  workplace,
];

//   workplace: workplace,
//   all: routes,
//   defaultRouter: defaultRouter,
// };
