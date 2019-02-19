import React, { PureComponent, Component, div, Fragment } from 'react';
import {
  Icon,
  Tabs,
  Table,
  Button,
  Modal,
  Breadcrumb,
  Form,
  Row,
  Col,
  Input,
  InputNumber,
  Radio,
  Card,
  Upload,
  message,
} from 'antd';
import { connect } from 'dva';
import NavLink from 'umi/navlink';
import update, { extend } from 'immutability-helper';

import moment from 'moment';

import styles from './List.less';
import { create } from 'domain';
const { TabPane } = Tabs;
const confirm = Modal.confirm;
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

const formItemLayout2 = {
  labelCol: {
    span: 9,
  },
  wrapperCol: {
    span: 12,
  },
};

@connect(({ examlist, operate }) => ({
  examlist,
  operate,
}))
@Form.create()
class Detail extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      uploadAudioName: null,
      uploadAudioDuration: null,
      editItem: null,
      currentEditType: 1,
      showEdit: false,
    };
  }

  uploadProps = {
    name: 'file',
    action: 'https://api.jze100.com/hear/admin/file/upload',
    headers: {
      authorization: 'authorization-text',
    },
    onChange: info => {
      console.log(info.fileList, 'fileList');

      if (info.fileList.length > 1) {
        info.fileList.shift();
      }
      this.setState({
        uploadAudioName: info.file.name,
      });
      const _this = this;
      // if (info.fileList.l)

      if (info.file.status !== 'uploading') {
        console.log(info.file, 'info.file');
        console.log(info.fileList, ' info.fileList');
      }

      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        if (info.file.response.code === 1) {
          _this.setState({
            uploadAudioDuration: info.file.response.data.duration,
          });
          console.log(_this.state.uploadAudioDuration, '2');
          // debugger;
        }
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  // state = {
  //   uploadAudioName: null,
  //   editItem: null,
  //   currentEditType: 1,
  //   showEdit: false,
  //   uploadProps: {
  //     name: 'file',
  //     action: 'https://api.jze100.com/hear/admin/file/upload',
  //     headers: {
  //       authorization: 'authorization-text',
  //     },
  //     onChange(info) {
  //       console.log(info.file.name, 'info123');

  //       this.setState({
  //         uploadAudioName: info.file.name,
  //       });
  //       if (info.file.status !== 'uploading') {
  //         console.log(info.file, 'info.file');
  //         console.log(info.fileList, ' info.fileList');
  //       }

  //       if (info.file.status === 'done') {
  //         message.success(`${info.file.name} file uploaded successfully`);
  //       } else if (info.file.status === 'error') {
  //         message.error(`${info.file.name} file upload failed.`);
  //       }
  //     },
  //   },
  // };

  componentDidMount() {
    const { location, dispatch, examlist } = this.props;

    dispatch({
      type: 'examlist/fetchPaperDetail',
      payload: location.query.id,
    });

    dispatch({
      type: 'operate/fetchSpecialList',
    });
  }

  // onSubmitExam = () => {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'exam/createPaper',
  //     payload: '',
  //   });
  // };
  handleSubmit = () => {};

  onChangeRadio = () => {
    const v = this.refs.radioGroup.props.topicno;
    const copyData = this.state.radioValueList.slice(0);

    copyData[v - 1] = Number(event.target.value);

    this.setState({
      radioValueList: copyData,
    });
  };

  addOption = () => {
    const { editItem } = this.state;
    const id = this.refs.addOption.props.topicno;

    const data = JSON.parse(JSON.stringify(editItem));

    data.subTopics[id - 1].options.push({
      // topicSubId: data.subTopics[id - 1].id,
      answer: '',
      image: '',
      isCorrect: 0,
      topicNo: data.subTopics[id - 1].options.length + 1,
    });

    this.setState(
      Object.assign(
        {},
        {
          editItem: data,
        }
      )
    );
  };

  cancelEdit = () => {
    this.setState({
      showEdit: false,
    });
  };

  handleEdit = item => {
    const radioValueList = [];

    for (let k in item.subTopics) {
      for (let kk in item.subTopics[k].options) {
        if (item.subTopics[k].options[kk].isCorrect === 1) {
          radioValueList.push(item.subTopics[k].options[kk].topicNo);
        }
      }
    }

    this.setState({
      editItem: item,
      showEdit: true,
      currentEditType: item.type,
      radioValueList,
    });
  };
  deleteExam = () => {};

  calcScore = v => {
    let score = 0;
    for (let k in v.topics) {
      score += v.topics[k].score;
    }
    return score;
  };

  calcDuration = v => {
    let duration = 0;
    for (let k in v.topics) {
      duration += v.topics[k].audioDuration;
    }
    return duration;
  };

  saveChange = () => {
    const { editItem } = this.state;
    const { examlist, dispatch, location } = this.props;
    const { paperDetail } = examlist;
    paperDetail.topics[editItem.topicNo - 1] = editItem;

    examlist.audio = this.state.uploadAudioName;
    examlist.audioDuration = Number(this.state.uploadAudioDuration);

    let formData = this.props.form.getFieldsValue();
    const totalScore = this.calcScore(paperDetail);
    const totalDuration = this.calcDuration(paperDetail);

    formData = Object.assign(formData, { totalScore }, { totalDuration });

    const saveData = Object.assign(paperDetail, formData);

    // is Correct
    // TODO
    debugger;
    dispatch({
      type: 'examlist/updatePaper',
      payload: saveData,
    });

    dispatch({
      type: 'examlist/fetchPaperDetail',
      payload: location.query.id,
    });
  };

  handleChange = evt => {
    this.setState({
      value: evt.target.value,
    });
  };
  onUpload = () => {
    $.ajax({
      type: 'POST',
      url: url,
      data: formData,
      contentType: undefined,
      mimeType: 'multipart/form-data',
      success: function(data) {
        console.log(data, '12');
      },
    });
  };

  renderSelectQs = v => {
    const { editItem } = this.state;
    return (
      <Fragment>
        <div className={styles.item1}>
          {editItem &&
            editItem.subTopics.map(subItem => {
              return (
                <Fragment key={subItem.topicNo}>
                  <Row>
                    <Col span={6}>题目（{subItem.topicNo}）:</Col>

                    <Col span={18}>
                      <Input defaultValue={subItem.title} />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <RadioGroup
                        onChange={() => this.onChangeRadio()}
                        value={this.state.radioValueList[subItem.topicNo - 1]}
                        topicno={subItem.topicNo}
                        ref="radioGroup"
                        style={{ width: '100%' }}
                      >
                        {subItem.options.map(optionItem => {
                          return (
                            <Row gutter={16} key={optionItem.topicNo}>
                              <Col span={14}>
                                <Row>
                                  <Col span={6}>选项: {optionItem.topicNo} </Col>
                                  <Col span={18}>
                                    <Input defaultValue={optionItem.answer} />
                                  </Col>
                                </Row>
                              </Col>

                              <Col span={9}>
                                <Row>
                                  <Col span={4}>or</Col>
                                  <Col span={17}>
                                    <div>
                                      <Upload {...this.uploadProps}>
                                        <Button>
                                          <Icon type="upload" /> 上传图片
                                        </Button>
                                      </Upload>
                                    </div>
                                  </Col>
                                  <Col span={3}>
                                    <Radio value={optionItem.topicNo} />
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          );
                        })}
                      </RadioGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={24}>
                      <Button
                        type="primary"
                        onClick={() => this.addOption()}
                        topicno={subItem.topicNo}
                        ref="addOption"
                        style={{ width: '100%' }}
                        icon={'plus'}
                      >
                        新增选项
                      </Button>
                    </Col>
                  </Row>
                  {/* <Row>
                    <Col span={3}>答案:</Col>
                    <Col span={13}>
                      <InputNumber defaultValue={subItem.answer} min={1} max={10} />
                    </Col>
                  </Row> */}
                  <Row className={styles.rightFooter}>
                    <Col span={3}>解析:</Col>

                    <Col span={13}>
                      <Input.TextArea
                        defaultValue={subItem.parse}
                        placeholder={'专项说明文本（0/180）'}
                        rows={8}
                      />
                    </Col>
                    {subItem.topicNo === editItem.subTopics.length && (
                      <Col span={7} className={styles.opt}>
                        <Row>
                          <Button onClick={() => this.cancelEdit()} style={{ width: '100%' }}>
                            取消编辑
                          </Button>
                        </Row>
                        <Row>
                          <Button
                            onClick={() => this.saveChange()}
                            type="primary"
                            style={{ width: '100%' }}
                          >
                            保存修改
                          </Button>
                        </Row>
                      </Col>
                    )}
                  </Row>
                </Fragment>
              );
            })}
        </div>
      </Fragment>
    );
  };

  render() {
    const {
      form: { getFieldDecorator },
      examlist,
      operate,
    } = this.props;
    const {
      editItem,
      currentEditType,
      showEdit,
      uploadAudioName,
      uploadAudioDuration,
    } = this.state;
    const { paperDetail } = examlist;
    const { specialList } = operate;

    return (
      paperDetail &&
      specialList && (
        <div className={styles.container}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <NavLink to="/exam/list">试卷管理</NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="#" style={{ color: '#1890FF', textDecoration: 'none' }}>
                {paperDetail.title}
              </a>
            </Breadcrumb.Item>
          </Breadcrumb>

          <Form layout="horizontal" className={styles.examForm}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item {...formItemLayout} label={'试卷名称'}>
                  {getFieldDecorator('title', {
                    rules: [{ required: true, message: '请输入名称，不超过18个字', max: 18 }],
                    initialValue: paperDetail.title,
                  })(
                    <Input
                      placeholder="
                    因果题型训练                    
                    6/18"
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('id', { initialValue: paperDetail.id })(
                    <Input type="hidden" />
                  )}
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
                    initialValue: paperDetail.level,
                  })(<InputNumber min={1} max={10} step={0.1} />)}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item {...formItemLayout} label={'专项选择'}>
                  {getFieldDecorator('specialId', {
                    rules: [{ required: true, message: '请输入名称' }],
                    initialValue: paperDetail.specialId,
                  })(
                    <RadioGroup size="default">
                      {specialList.map(item => {
                        return (
                          <RadioButton key={item.id} value={item.id}>
                            {item.title}
                            {paperDetail.specialId === item.id ? paperDetail.specialId : null}
                          </RadioButton>
                        );
                      })}
                    </RadioGroup>
                  )}
                </Form.Item>
              </Col>
              <Col span={9}>
                <Form.Item>
                  <span style={{ marginRight: 20 }}>
                    试卷总分： {paperDetail.totalScore || '暂无'}
                  </span>
                  该试卷音频总长：{paperDetail.totalDuration || '暂无'}
                </Form.Item>
              </Col>
              {/* <Col span={3}>
                <Button type="primary" onClick={this.onSubmitExam}>
                  提交试卷
                </Button>
              </Col> */}
            </Row>
          </Form>

          <Row gutter={24}>
            <Col lg={11} md={24}>
              <h2>试卷预览</h2>
              <div className={styles.examLeft}>
                {paperDetail.topics &&
                  paperDetail.topics.map(item => (
                    <Card
                      key={item.topicNo}
                      bordered={false}
                      hoverable
                      onClick={() => this.handleEdit(item)}
                    >
                      {item.type === 1 ? (
                        <div key={item.id}>
                          {item.subTopics.map(subItem => {
                            return (
                              <div key={subItem.topicNo}>
                                <div className={styles.examTitle}>
                                  <h2 style={{ float: 'left', marginRight: 11 }}>
                                    {item.topicNo === subItem.topicNo ? item.topicNo : ''} (
                                    {subItem.topicNo}).{subItem.title}({item.score}分)
                                  </h2>
                                  {item.topicNo === subItem.topicNo && (
                                    <a
                                      onClick={() => this.handleEdit(item)}
                                      style={{ marginRight: 5, float: 'right' }}
                                    >
                                      编辑
                                    </a>
                                  )}
                                </div>

                                {subItem.options.map(subOption => {
                                  return (
                                    <div key={subOption.topicNo} style={{ lineHeight: '31px' }}>
                                      <span> {subOption.topicNo}</span>
                                      <span> {subOption.answer}</span>
                                      {subOption.image.includes('http') && (
                                        <img src={subOption.image} />
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div key={item.id}>
                          <div className={styles.examTitle}>
                            <h2 style={{ float: 'left', marginRight: 11 }}>
                              {item.id}.({item.score}分)
                            </h2>
                            <div style={{ float: 'right' }}>
                              <a onClick={() => this.handleEdit(item)} style={{ marginRight: 5 }}>
                                编辑
                              </a>
                            </div>
                          </div>
                          {item.subTopics.map(subItem => {
                            return (
                              <div key={subItem.topicNo}>
                                <h2>
                                  {subItem.id} .{subItem.title}
                                </h2>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </Card>
                  ))}
              </div>
            </Col>

            <Col lg={12} md={24}>
              <h2>编辑题目{editItem && editItem.topicNo}</h2>
              <div className={styles.examRight}>
                <Form onSubmit={this.handleSubmit}>
                  <Row>
                    <Form.Item label="题型选择" labelCol={{ span: 5 }} wrapperCol={{ span: 17 }}>
                      <RadioGroup value={currentEditType} size="default">
                        <RadioButton disabled={!(currentEditType === 1)} value={1}>
                          选择
                        </RadioButton>
                        <RadioButton disabled={!(currentEditType === 2)} value={2}>
                          段落填空
                        </RadioButton>
                      </RadioGroup>
                    </Form.Item>
                  </Row>
                  <div className={styles.itemHeader}>
                    <Row>
                      <Col span={8}>
                        <span>
                          上传音频: {uploadAudioName || (editItem && editItem.audio) || ''}
                        </span>
                      </Col>
                      <Col span={8}>
                        <span>
                          该音频时长:
                          {uploadAudioDuration >= 0
                            ? uploadAudioDuration
                            : (editItem && editItem.audioDuration) || ''}
                        </span>
                      </Col>
                      <Col span={3}>
                        <Upload {...this.uploadProps}>
                          <Button style={{ marginLeft: 60 }}>
                            <Icon type="upload" /> 重新上传
                          </Button>
                        </Upload>
                      </Col>
                    </Row>

                    <Row>
                      <Col span={14}>
                        <Form.Item
                          label=" 该音频下的题目数:"
                          labelCol={{ span: 11 }}
                          wrapperCol={{ span: 11 }}
                        >
                          <InputNumber min={1} max={100} value={editItem && editItem.subNum} />
                        </Form.Item>
                      </Col>

                      <Col span={10}>
                        <Form.Item
                          label=" 每题分数:"
                          labelCol={{ span: 11 }}
                          wrapperCol={{ span: 12 }}
                        >
                          <InputNumber min={1} max={100} value={editItem && editItem.score} />
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>

                  {showEdit && editItem.type === 1 ? this.renderSelectQs() : ''}
                  {showEdit && editItem.type === 2 ? this.renderSelectP() : ''}

                  {/* {currentEditType === 1 && !showEdit ? this.renderNewSelectQs() : ''} */}
                  {/* {currentEditType === 2 && !showEdit ? this.renderNewSelectP() : ''} */}
                </Form>
              </div>
            </Col>
          </Row>
        </div>
      )
    );
  }
}

export default Detail;
