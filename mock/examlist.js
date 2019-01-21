import { parse } from 'url';

// mock tableListDataSource
const tableListDataSource = [];

for (let i = 0; i < 46; i += 1) {
    tableListDataSource.push({
        id: i + 1,
        disabled: i % 6 === 0,
        href: 'https://ant.design',
        title: '厦门双十中学模拟卷',
        difficulty: '3.2',
        finish: '123/360',
        grade: '77/100',
        soundSize: '20:39',
        createdAt: new Date(`2019-01-${Math.floor(i / 2) + 1}`),
    });
}


function getExamList(req, res, u) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }

    const params = parse(url, true).query;

    const dataSource = tableListDataSource;

    // if (params.sorter) {
    //     const s = params.sorter.split('_');
    //     dataSource = dataSource.sort((prev, next) => {
    //         if (s[1] === 'descend') {
    //             return next[s[0]] - prev[s[0]];
    //         }
    //         return prev[s[0]] - next[s[0]];
    //     });
    // }



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

export default {
    'GET /api/exam/list': getExamList,
};
