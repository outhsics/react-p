import React, { Component } from 'react';
import {
  Form,
  Input,
  Upload,
  Select,
  Button,
  Progress,
  Row,
  Col
} from 'antd';
import { connect } from 'dva';
import styles from './BaseView.less';
import HeaderView from './HeaderView';
import withRouter from 'umi/withRouter';



// const FormItem = Form.Item;

// @connect(({ userdetail }) => ({
//   userdetail
// }))
// @Form.create()
class BaseView extends Component {


  // console.log(match, 'match');
  // console.log(history, 'history');

  // this.customerCode = this.$route.params.customerCode;





  render() {
    const { userExam } = this.props;
    // const { data: { userDetail } } = userdetail;
    // debugger

    const { match, location, history } = this.props;
    return (
      <div>
        {/* <div>You are now at {location.pathname}</div>; */}
        <HeaderView />
        <Row className={styles.progress}>
          <Col span={3}>
            总进度：

          </Col>
          <Col span={21}>
            <Progress className={styles.progress_r} percent={30} />

          </Col>
        </Row>
        <div className={styles.tableList}>
          <Table
            columns={columns}
            expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
            dataSource={data}
          />,

        </div>
      </div>
    );
  }
}

export default withRouter(BaseView);
