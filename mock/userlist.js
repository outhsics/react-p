import { parse } from 'url';

// mock tableListDataSource
let tableListDataSource = [];
for (let i = 0; i < 46; i += 1) {
  tableListDataSource.push({
    id: i,
    disabled: i % 6 === 0,
    href: '/user/detail/2',
    avatar: [
      'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
      'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
    ][i % 2],
    nickname: `nickname ${i}`,
    studytime: '160mins',
    createdAt: new Date(`2019-01-${Math.floor(i / 2) + 1}`),
    city: '厦门',
    sex: '男'
  });
}


function getUserList(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  let dataSource = tableListDataSource;

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  // if (params.status) {
  //   const status = params.status.split(',');
  //   let filterDataSource = [];
  //   status.forEach(s => {
  //     filterDataSource = filterDataSource.concat(
  //       dataSource.filter(data => parseInt(data.status, 10) === parseInt(s[0], 10))
  //     );
  //   });
  //   dataSource = filterDataSource;
  // }

  if (params.nickname) {
    dataSource = dataSource.filter(data => data.nickname.indexOf(params.nickname) > -1);
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };

  return res.json(result);
}



function postRule(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, nickname, id } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter(item => id.indexOf(item.id) === -1);
      break;
    case 'post':
      const i = Math.ceil(Math.random() * 10000);
      tableListDataSource.unshift({
        id: i,
        href: 'https://ant.design',
        avatar: [
          'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
          'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
        ][i % 2],
        nickname: `nickname ${i}`,
        studytime: '160mins',
        createdAt: new Date(),
        city: '厦门',
        sex: '男',
      });
      break;
    case 'update':
      tableListDataSource = tableListDataSource.map(item => {
        if (item.id === id) {
          Object.assign(item, { nickname });
          return item;
        }
        return item;
      });
      break;
    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };

  return res.json(result);
}

export default {
  'GET /api/user/list': getUserList,
  'POST /api/rule': postRule,
};
