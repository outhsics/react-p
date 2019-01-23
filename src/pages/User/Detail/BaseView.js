import React, { Component } from 'react';
import { Form, Input, Upload, Select, Button } from 'antd';
import { connect } from 'dva';
import styles from './BaseView.less';
import HeaderView from './HeaderView';


// const FormItem = Form.Item;

@connect(({ user }) => ({
  currentUser: user.currentUser,
}))
@Form.create()
class BaseView extends Component {
  componentDidMount() {
  }




  render() {
    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        base
        <HeaderView />
      </div>
    );
  }
}

export default BaseView;
