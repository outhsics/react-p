import mockjs from 'mockjs'

export default {
    '/api/v1/manage/article/list': (req, res) => {
        const {
            query: { search = {}, current = 1, pageSize = 10 },
        } = req
        const { status = ['pending', 'valid', 'invalid'] } = search

        res
            .send(
                mockjs.mock({
                    'code|0': 1,
                    pagination: {
                        'total|30': 1,
                        current: +current,
                        pageSize: pageSize,
                    },
                    'dataset|10': [
                        {
                            'id|+1': (current - 1) * 10 + 1,
                            title: '@ctitle(10, 30)',
                            'status|1': status,
                            'banner|1': ['', '@image'],
                            intro: '@cparagraph(2,5)',
                            content: '@cparagraph(50, 100)',
                            created_at: '@date(2018-02-dd HH:mm:ss)',
                            updated_at: '@date(2018-10-dd HH:mm:ss)',
                        },
                    ],
                })
            )
            .end()
    },
}