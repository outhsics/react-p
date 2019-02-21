import React,{Component, Fragment }from 'react';
import { connect } from 'dva';
import styles from './List.less';

 import {
  Button,
  Form,
  Row,
  Col,
  Input,
  InputNumber,
  Radio,
} from 'antd';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
 const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@connect(({ examlist, operate }) => ({
  examlist,
  operate,
}))
@Form.create() 
 class PaperForm extends Component {

  componentDidMount() {
    const { location, dispatch, examlist } = this.props;

    // dispatch({
    //   type: 'examlist/fetchPaperDetail',
    //   payload: location.query.id,
    // });

    dispatch({
      type: 'operate/fetchSpecialList',
    });
  }


  render(){
    const {
      form: { getFieldDecorator },
      examlist,
      operate,
    } = this.props;

    const { specialList } = operate;

    return (

    <Fragment>
    <Form name={'form1'} layout="horizontal" className={styles.examForm}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item {...formItemLayout} label={'试卷名称'}>
              {getFieldDecorator('title', {
                rules: [{ required: true, message: '请输入名称，不超过18个字', max: 18 }],
                initialValue: '',
              })(
                <Input
                  placeholder="
                  因果题型训练                    
                  6/18"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('id', { initialValue: '' })(<Input type="hidden" />)}
            </Form.Item>
          </Col>
          <Col span={9}>
            <Form.Item
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 8 }}
              label="难度系数*（顶级5分）"
            >
              {getFieldDecorator('level', {
                rules: [{ required: true, message: '请输入名称' }],
                initialValue: '',
              })(<InputNumber min={1} max={10} step={0.1} />)}
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item {...formItemLayout} label={'专项选择'}>
              {getFieldDecorator('specialId', {
                rules: [{ required: true, message: '请输入名称' }],
              })(
                <RadioGroup size="default">
                  {specialList.map(item => {
                    return (
                      <RadioButton key={item.id} value={item.id}>
                        {item.title}
                      </RadioButton>
                    );
                  })}
                </RadioGroup>
              )}
            </Form.Item>
          </Col>
          <Col span={9}>
            <Form.Item>
              <span style={{ marginRight: 20 }}>试卷总分： {'暂无'}</span>
              该试卷音频总长：{'暂无'}
            </Form.Item>
          </Col>
          <Col span={3}>
            <Button type="primary" onClick={this.onSubmitExam}>
              提交试卷
            </Button>
          </Col>
        </Row>
      </Form>

  </Fragment>

    )


  }
 }

 export default PaperForm;