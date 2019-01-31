import React, { Component, Fragment } from 'react';
import {
  Form,
  Input,
  Upload,
  Select,
  Button,
  Progress,
  Row,
  Col,
  Table
} from 'antd';
import { connect } from 'dva';
import styles from './BaseView.less';
import HeaderView from './HeaderView';
import withRouter from 'umi/withRouter';
import moment from 'moment';




// const FormItem = Form.Item;
const columns = [{
  title: '试卷名称',
  dataIndex: 'title',
},
{
  title: '进度',
  dataIndex: 'pace',
  sorter: (a, b) => a.pace - b.pace,
  render: pace => <span>{pace}%</span>,

},
{
  title: '最新成绩',
  dataIndex: '最新成绩',
  render: (text, record) => (<span>{record.score}/{record.totalScore}</span>)
},
{
  title: '最近答题时间',
  dataIndex: 'lastAnswerTime',
  render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,

},
]

// @Form.create()
@connect(({ userdetail, userexam }) => ({
  userdetail,
  userexam
}))
class BaseView extends Component {


  componentDidMount() {
    const { location, dispatch, userexam } = this.props;
    const { UserSpecial } = userexam;



    // console.log(location.query.id)
    // debugger
    dispatch({
      type: 'userdetail/fetch',
      payload: {
        id: location.query.id,
      }
    })


  }

  render() {

    const { userexam, userdetail } = this.props;
    const { userDetail } = userdetail;
    const { userExam, UserSpecial, pace } = userexam;

    // debugger

    // const { match, location, history } = this.props;
    return (
      <Fragment>
        {userDetail && <HeaderView />}
        <Row className={styles.progress}>
          <Col span={3}>
            总进度：
          </Col>
          <Col span={21}>
            {UserSpecial[0] && <Progress className={styles.progress_r} percent={Number(pace) || Number(UserSpecial[0].pace)} />}
          </Col>
        </Row>
        <div className={styles.tableList}>
          {userExam && <Table
            pagination={{
              showQuickJumper: true, showSizeChanger: true,
            }}
            footer={() => <div className={styles.footer}>
              <span className={styles.footerLeft}>
                试卷下共{userExam.length}份试卷
              </span>

            </div>}
            rowKey={record => record.id}
            columns={columns}
            expandedRowRender={record => <p style={{ margin: 0 }}>
              缺少历史成绩
            </p>}
            dataSource={userExam}
          />
          }

        </div>
      </Fragment>
    );
  }
}

export default withRouter(BaseView);
