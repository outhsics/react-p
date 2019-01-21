export default [
  // {
  //   path: '/user',
  //   component: '../layouts/UserLayout',
  //   routes: [{ path: '/user', component: './Welcome' }],
  // },
  // app
  {
    path: '/',
    // redirect: './welcome',
    component: '../layouts/BasicLayout',
    routes: [
      { path: '/', redirect: '/user/list' },

      // 用户管理
      {
        path: '/user',
        name: '用户管理',
        icon: 'dashboard',
        routes: [
          // 用户资源池
          {
            path: '/user/list',
            name: '用户资源池',
            component: './User/List',
          },
        ],
      },
      // 试卷管理
      {
        path: '/exam',
        name: '试卷管理',
        icon: 'form',
        routes: [
          // 试卷列表
          {
            path: '/exam/list',
            name: '试卷列表',
            component: './Exam/List',
          },
          {
            path: '/exam/newexam',
            hideInMenu: true,
            component: './Exam/NewExam',
          },


        ],
      },

      // 数据分析
      {
        path: '/data',
        name: '数据分析',
        icon: 'table',
        routes: [
          // 数据看板
          {
            path: '/data/board',
            name: '数据看板',
            component: './Data/Analysis',
          },
        ],
      },

      // 基础数据
      {
        path: '/basic',
        name: '基础数据',
        icon: 'profile',
        routes: [
          // 营运工具
          {
            path: '/basic/operate',
            name: '营运工具',
            component: './Basic/OperateTool',
          },
        ],
      },
    ],
  },

]