

function getUserExam(req, res) {

    const dataSource = {
        id: 1,
        name: ''
    }


    const result = {
        userExam: dataSource,
    };
    return res.json(result);
}


export default {
    'GET /api/user/exam': getUserExam,
};
