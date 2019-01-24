

function getUserDetail(req, res) {

    const dataSource = {
        id: 1,
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
        lastLogin: new Date(`2019-01-11`),
        createAt: new Date(`2019-01-11`),
        studyTime: '120mins',
        overUser: '20%',
        city: '厦门',
        sex: '男',
        nickName: 'nickname'
    }

    const result = {
        userDetail: dataSource,
    };
    return res.json(result);
}


export default {
    'GET /api/user/detail': getUserDetail,
};
