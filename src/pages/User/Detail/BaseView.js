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



// const FormItem = Form.Item;
const columns = [{
  title: '名称',
  dataIndex: 'title',
},
{
  title: '进度',
  dataIndex: 'pace',
},
{
  title: '最新成绩',
  dataIndex: '最新成绩',
  render: 90,
  render: (text, record) => (
    <Fragment>
      <span>{text}</span>
      <span>{record.id}</span>
    </Fragment>
  )
},
{
  title: '最近答题时间',
  dataIndex: 'lastAnswerTime',
},
]

// @Form.create()
@connect(({ userdetail, userexam }) => ({
  userdetail,
  userexam
}))
class BaseView extends Component {


  componentDidMount() {
    const { location, dispatch } = this.props;

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
    const { userExam, UserSpecial } = userexam;

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
            <Progress className={styles.progress_r} percent={30} />
          </Col>
        </Row>
        <div className={styles.tableList}>
          {userExam && <Table
            pagination={{
              showQuickJumper: true, showSizeChanger: true,
            }}
            footer={() => <div className={styles.footer}>
              <span className={styles.footerLeft}>
                试卷下共26份试卷
            </span>

            </div>}
            rowKey={record => record.id}
            columns={columns}
            expandedRowRender={record => <p style={{ margin: 0 }}>{record.id}</p>}
            dataSource={userExam}
          />
          }

        </div>
      </Fragment>
    );
  }
}

export default withRouter(BaseView);
