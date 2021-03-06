import { config } from './common';

const apiPrefixConfig = {
  development: {
    tlb: '/api',
  },
  production: {
    tlb: 'https://api.jze100.com/hear',
  },
};

const apiPrefix = apiPrefixConfig[config.env];

const api = {
  // 用户管理-用户列表
  userManage: {
    getUserList: `${apiPrefix.tlb}`,
    enableUser: `${apiPrefix.tlb}`,
    disableUser: `${apiPrefix.tlb}`,
    searchUser: `${apiPrefix.tlb}`,
  },
  // 用户详情
  userDetail: {
    // 用户试卷
    studySpecialPape: `${apiPrefix.tlb}/admin/studySpecialPaper/list`,
    // 用户专项
    studyUserSpecial: `${apiPrefix.tlb}/admin/studyUserSpecial/list`,
    // 用户
    // 用户- 查询单数
    getUserDetail: `${apiPrefix.tlb}/admin/user/detail`,
  },
  // 查询数据集合
  queryDataHub: {
    // 用户-查询数据集合
    getUserList: `${apiPrefix.tlb}/admin/user/list`,
  },
  // 更新状态（admin）
  updateState: {
    // 用户- 更新状态
    updateUser: `${apiPrefix.tlb}/admin/user/update`,
  },
  paper: {
    createPaper: `${apiPrefix.tlb}/admin/paper/create`,
    queryPaperList: `${apiPrefix.tlb}/admin/paper/list`,
    queryPaperDetail: `${apiPrefix.tlb}/admin/paper/detail`,
    updatePaperState: `${apiPrefix.tlb}/admin/paper/updateState`,
    deletePaper: `${apiPrefix.tlb}/admin/paper/delete`,
    updatePaper: `${apiPrefix.tlb}/admin/paper/update`,
  },
  basicData: {
    querySpecialList: `${apiPrefix.tlb}/admin/special/list`,
    saveConfig: `${apiPrefix.tlb}/admin/config/save`,
    configInfo: `${apiPrefix.tlb}/admin/config/info`,
  },
  special: {
    updateSpecial: `${apiPrefix.tlb}/admin/special/update`,
    createSpecial: `${apiPrefix.tlb}/admin/special/create`,
    deleteSpecial: `${apiPrefix.tlb}/admin/special/delete`,
  },
  admin:{
    login: `${apiPrefix.tlb}/admin/sysUser/login`,
  },
  report:{
    base:`${apiPrefix.tlb}/admin/report/base`,
    paper:`${apiPrefix.tlb}/admin/report/paper`,
  }
};
export { api };
