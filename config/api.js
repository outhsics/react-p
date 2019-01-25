

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
    // 用户详情  用户-用户专项试卷集合
    userDetail: {
        studySpecialPape: `${apiPrefix.tlb}/admin/studySpecialPaper/list`,
        getUserDetail: `${apiPrefix.tlb}/admin/user/detail`,
        studyUserSpecial: `${apiPrefix.tlb}/admin/studyUserSpecial/list`,
    }
};
export { api };