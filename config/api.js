

import { config } from './common'

const apiPrefixConfig = {
    development: {
        tlb: '/api',
    },
    production: {
        // tlb: "http://192.168.96.15:8980",
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
    }
};
export { api };