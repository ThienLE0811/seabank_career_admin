type ProTableRequest = {
  params: ParamsType & {
    pageSize?: number | undefined;
    current?: number | undefined;
    keyword?: string | undefined;
  };
  sort?: Record<string, SortOrder>;
  filter?: Record<string, React.ReactText[] | null>;
  activeTab?: string;
};

type ProTableBannerRequest = {
  params: ParamsType & {
    pageSize?: number | undefined;
    current?: number | undefined;
    keyword?: string | undefined;
  };
  sort?: Record<string, SortOrder>;
  filter?: Record<string, React.ReactText[] | null>;
  activeTab?: string;
};

type BannerTableRequest = {
  keywords?: string;
  _public?: boolean;
};

type HanldeReloadTable = {
  listTable: any;
  activeTab?: string;
  actionRef: React.MutableRefObject<ActionType | undefined>;
};

type GetListCategoryProps = {
  start?: number;
  limit?: number;
};
