import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import Link from 'umi/link';
import { Checkbox,Input,Button, Alert, Icon ,Form} from 'antd';
import Login from '@/components/Login';
import styles from './Login.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
class LoginPage extends Component {

  componentDidMount(){
    // console.log(this.loginForm,'loginForm')
    // console.log('loginForm')
    // debugger
  }
 
  handleSubmit = (e) => {
    const _this = this;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { dispatch } = _this.props;
          dispatch({
            type: 'login/login',
            payload: values,
          });
      }
    });

    // console.log(values,'values');
    // // debugger
    // if (!err) {
    //   const { dispatch } = this.props;
    //   dispatch({
    //     type: 'login/login',
    //     payload: {
    //       ...values,
    //     },
    //   });
    // }
  };


  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 12 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 8 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 12,
          offset: 0,
        },
        sm: {
          span: 8,
          offset: 4,
        },
      },
    };
    const { login, submitting } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
<div  className={styles.form}>
      <Form onSubmit={this.handleSubmit} >
      <Form.Item
      className={styles.formItem}
        {...formItemLayout}
        label="账户名"
      >
        {getFieldDecorator('userName', {
          rules: [{
            required: true, message: '请输入账户名',
          }],
        })(
          <Input prefix={<span><Icon type="user" className={styles.prefixIcon} /></span>}     placeholder={'账户'}/>
        )}
      </Form.Item>

      <Form.Item
      className={styles.formItem}

        {...formItemLayout}
        label="密码"
      >
        {getFieldDecorator('password', {
          rules: [{
            required: true, message: '请输入密码',
          }],
        })(
          <Input 
            prefix={<span><Icon type="lock" className={styles.prefixIcon} /></span>}  placeholder={'密码'}/>
        )}
      </Form.Item>
      <Form.Item
      className={styles.formItem}
      
       {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">登录</Button>
        </Form.Item>
      </Form>


</div>
      
    );
  }
}

const WrappedLoginPage = Form.create({ name: 'login' })(LoginPage);
export default WrappedLoginPage;