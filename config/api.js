

import { config } from './common'

const apiPrefixConfig = {
    development: {
        tlb: '/api',
    },
    production: {
        tlb: "https://api.jze100.com/hear",
    }
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
    }
};
export { api };