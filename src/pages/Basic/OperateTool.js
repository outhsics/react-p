import React, { Component, Fragment } from 'react';
import {
  message,
  Card,
  Icon,
  Form,
  Row,
  Col,
  Button,
  Input,
  DatePicker,
  Popconfirm,
  InputNumber,
} from 'antd';
import { connect } from 'dva';
import styles from './OperateTool.less';
import WritingConfig from './WritingConfig';
const { RangePicker } = DatePicker;
const { Meta } = Card;

const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1025319_360iia8jjiu.js', // 在 iconfont.cn 上生成
});

const validatorContent = (rule, value, callback) => {
  if (value.length > 180) {
    callback('字数不得超过180');
  }
  callback();
};

const validatorName = (rule, value, callback) => {
  if (value.length > 10) {
    callback('字数不得超过10');
  }
  callback();
};

const validatorSlogan = (rule, value, callback) => {
  if (value.length > 12) {
    callback('字数不得超过12');
  }
  callback();
};
function cancel() {
  message.error('取消删除');
}

@connect(({ operate, examlist }) => ({
  operate,
  examlist,
}))
@Form.create({ name: 'operate_form' })
class OperateTool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false, // 表示新增
    };
  }

  cbSuccess = () => {
    const { dispatch } = this.props;

    this.state.isEditing ? message.success('修改成功') : message.success('新增成功');

    dispatch({
      type: 'operate/fetchSpecialList',
    });
    this.handleReset();
  };

  deleteSuccess = () => {
    const { dispatch } = this.props;

    message.success('删除成功');

    dispatch({
      type: 'operate/fetchSpecialList',
    });
  };

  componentDidMount() {
    this.loadSpecialList();
  }

  loadSpecialList = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'operate/fetchSpecialList',
    });

    // dispatch({
    //   type: 'examlist/fetchPaperList',
    //   payload: {
    //     pageNum: 1,
    //     pageSize: 10,
    //   },
    // });
  };

  save = () => {
    console.log('save');
  };

  addSpecial = () => {
    this.setState({
      isEditing: false,
    });
    this.handleReset();
    // console.log('add');
  };
  handleSubmit = e => {
    const { dispatch } = this.props;
    const { isEditing } = this.state;

    e.preventDefault();
    // this.props.form.validateFields((err, values) => {
    //   if (!err) {
    //     console.log('Received values of form: ', values);
    //   }
    // });
    this.props.form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        isEditing
          ? dispatch({
              type: 'operate/updateSpecial',
              payload: this.props.form.getFieldsValue(),
              callback: this.cbSuccess,
            })
          : dispatch({
              type: 'operate/createSpecial',
              payload: this.props.form.getFieldsValue(),
              callback: this.cbSuccess,
            });
      }
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  handleEdit = v => {
    console.log(this);
    console.log(v, 'v');
    this.setState({
      isEditing: true,
    });
    this.props.form.setFieldsValue({
      id: v.id,
      button: v.button,
      content: v.content,
      peopleBase: v.peopleBase,
      slogan: v.slogan,
      title: v.title,
    });
  };
  handleDelete = v => {
    const { dispatch } = this.props;

    dispatch({
      type: 'operate/deleteSpecial',
      payload: v.id,
      callback: this.deleteSuccess,
    });
  };

  render() {
    const { isEditing } = this.state;
    const { operate } = this.props;
    const { specialList } = operate;

    // debugger
    const { getFieldDecorator } = this.props.form;

    return (
      <Fragment>
        <WritingConfig />
        <div className="container">
          <div className={styles.section2}>
            <Row className={styles.row1}>
              <Col span={18}>
                <MyIcon className={styles.blue} type="icon-number2" />
                <span className={styles.title}>专项类型</span>
                <div>试卷分类显示</div>
              </Col>
              <Col span={6} className={styles.row1_right}>
                <Button onClick={this.addSpecial} style={{ width: 120 }} type="primary">
                  新增专项
                </Button>
              </Col>
            </Row>
          </div>

          <Row gutter={16} className={styles.cardList}>
            {specialList &&
              specialList.map(item => {
                return (
                  <Col span={8} key={item.id}>
                    <Card
                      hoverable
                      className={styles.card}
                      title={item.title}
                      extra={
                        <Fragment>
                          <a style={{ marginRight: 10 }} onClick={this.handleEdit.bind(this, item)}>
                            编辑
                          </a>
                          <Popconfirm
                            title="确定删除?"
                            onConfirm={this.handleDelete.bind(this, item)}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                          >
                            <a href="#">删除</a>
                          </Popconfirm>
                        </Fragment>
                      }
                    >
                      <Meta description={item.slogan} />
                      <div className={styles.card_content}>{item.content}</div>
                      <p>{item.button}</p>
                      <p>人数基础：{item.peopleBase} 人</p>
                    </Card>
                  </Col>
                );
              })}
          </Row>

          <div className={styles.editContent}>
            <Form onSubmit={this.handleSubmit}>
              <Row>
                <Col span={12}>
                  <Form.Item label="专项名称" labelCol={{ span: 5 }} wrapperCol={{ span: 17 }}>
                    {getFieldDecorator('title', {
                      rules: [
                        { required: true, message: '请输入专项训练名称（不超过10个字）' },
                        { validator: validatorName },
                      ],
                    })(<Input placeholder={'专项训练名称（不超过10个字）'} />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="slogon" labelCol={{ span: 5 }} wrapperCol={{ span: 17 }}>
                    {getFieldDecorator('slogan', {
                      rules: [
                        { required: true, message: '请输入输入该专项训练的slogan（不超过12个字）' },
                        { validator: validatorSlogan },
                      ],
                    })(<Input placeholder={'输入该专项训练的slogan（不超过12个字）'} />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Form.Item label="专项说明文本" labelCol={{ span: 5 }} wrapperCol={{ span: 17 }}>
                    {getFieldDecorator('content', {
                      rules: [
                        { required: true, message: '请输入文字,字数不得超过180' },
                        { validator: validatorContent },
                      ],
                    })(
                      <Input.TextArea
                        placeholder={'专项说明文本（0/180）'}
                        autosize={{ minRows: 6, maxRows: 6 }}
                        max={180}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Row>
                    <Form.Item label="按钮" labelCol={{ span: 5 }} wrapperCol={{ span: 17 }}>
                      {getFieldDecorator('button', {
                        rules: [
                          { required: true, message: '输入该专项训练的按钮文本（不超过12个字）!' },
                          { validator: validatorSlogan },
                        ],
                      })(<Input placeholder={'输入该专项训练的按钮文本（不超过12个字）!'} />)}
                    </Form.Item>
                  </Row>
                  <Row>
                    <Form.Item
                      label="该专项练习人数基数:"
                      labelCol={{ span: 9 }}
                      wrapperCol={{ span: 14 }}
                    >
                      {getFieldDecorator('peopleBase', {
                        rules: [{ required: true, message: '请输入该专项练习人数基数' }],
                      })(<InputNumber min={1} max={100000} />)}
                    </Form.Item>

                    <Form.Item>{getFieldDecorator('id', {})(<Input hidden />)}</Form.Item>
                  </Row>
                  <Row style={{ paddingRight: '45px', textAlign: 'right' }}>
                    <Button
                      style={{ width: 120 }}
                      onClick={this.handleReset}
                      style={{ marginRight: '30px' }}
                    >
                      {isEditing ? '取消编辑' : '取消'}
                    </Button>
                    <Button htmlType="submit" style={{ width: 120 }} type="primary">
                      {isEditing ? '提交修改' : '新增专项'}
                    </Button>
                  </Row>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default OperateTool;
