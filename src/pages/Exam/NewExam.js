import React, { Component, div, Fragment } from 'react';
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

import moment from 'moment';

import styles from './List.less';
import { create } from 'domain';
import PaperForm from './PaperForm';
const { TabPane } = Tabs;
const confirm = Modal.confirm;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const paperDetail =  {
  "id": 42,
  "title": "String",
  "specialId": 1,
  "level": 100.55,
  "totalScore": 100.55,
  "totalDuration": 100,
  "sort": 0,
  "state": 1,
  "createTime": 1550634596871,
  "updateTime": null,
  "topics": [
    {
      "id": 55,
      "paperId": 42,
      "type": 1,
      "audio": "String",
      "audioDuration": 100,
      "score": 100.55,
      "subNum": 1,
      "topicNo": 1,
      "subTopics": [
        {
          "id": 57,
          "topicId": 55,
          "title": "String",
          "parse": "String",
          "topicNo": 1,
          "options": [
            {
              "id": 95,
              "topicSubId": 57,
              "answer": "String",
              "image": "String",
              "isCorrect": 0,
              "topicNo": 1
            },
            {
              "id": 96,
              "topicSubId": 57,
              "answer": "String",
              "image": "String",
              "isCorrect": 1,
              "topicNo": 2
            },
            {
              "id": 97,
              "topicSubId": 57,
              "answer": "String",
              "image": "String",
              "isCorrect": 0,
              "topicNo": 3
            },
            {
              "id": 98,
              "topicSubId": 57,
              "answer": "String",
              "image": "String",
              "isCorrect": 0,
              "topicNo": 4
            }
          ]
        }
      ]
    }
  ]
};
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
class CreateExam extends Component {
  state = {
    uploadAudioName: null,
    uploadAudioDuration: null,
    editItem: null,
    currentEditType: 1,
    showEdit: false,
    paperDetail,
    currentAddExamItem:	{
			"type": 1,
			"audio": "String",
			"audioDuration": 100,
			"score": 100.55,
			"subNum": 1,
			"subTopics": []
		}
  };



  uploadProps = {
    name: 'file',
    action: 'https://api.jze100.com/hear/admin/file/upload',
    headers: {
      authorization: 'authorization-text',
    },
    showUploadList: false,
    onChange: info => {
      console.log(info.fileList, 'fileList');

      if (info.fileList.length > 1) {
        info.fileList.shift();
      }
      // info.fileList = info.fileList.map(file => {
      //   delete file.name;
      //   return file;
      // });
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
  componentDidMount() {
    const { location, dispatch, examlist } = this.props;

    dispatch({
      type: 'examlist/fetchPaperDetail',
      payload: location.query.id,
    });

    // dispatch({
    //   type: 'operate/fetchSpecialList',
    // });
  }

  onSubmitExam = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'exam/createPaper',
      payload: '',
    });
  };
  handleSubmit = () => {};

  onAddExam = () => {
    const formData = this.props.form.getFieldsValue();

    const subTopics = [];

       // formData.topicNum
    // formData.topicScore
    // 2
    for(let i =0;i <= formData.topicNum.length;i++) {
      subTopics.push({
          "title": "",
          "parse": "",
          "options": [
            {
              "answer": "",
              "image": ""
            },
            {
              "answer": "",
              "image": "",
              "isCorrect": 1
            },
            {
              "answer": "",
              "image": ""
            }
          ]
      })
    }  

    this.setState({
      currentAddExamItem:{
        ...this.state.currentAddExamItem,
        subTopics
      }
    })
  };

  addOption = id => {
    const { editItem } = this.state;
    const data = editItem;
    // debugger;
    data.subTopics[id - 1].options.push({
      // id: data.subTopics[id - 1].options.length + 1,
      topicSubId: data.subTopics[id - 1].id,
      answer: '',
      image: '',
      isCorrect: 0,
      topicNo: data.subTopics[id - 1].options.length + 1,
    });
    this.setState({
      editItem: data,
    });
  };

  cancelEdit = () => {
    this.setState({
      showEdit: false,
    });
  };

  handleEdit = item => {
    console.log(item);
    this.setState({
      editItem: item,
      showEdit: true,
      currentEditType: item.type,
    });
  };
  deleteExam = () => {};

  saveChange = () => {
    const { editItem } = this.state;
    const { examlist, dispatch, location } = this.props;

    // editItem.

    for (let k in editItem.subTopics) {
      for (let kk in editItem.subTopics[k].options) {
        if (editItem.subTopics[k].answer === editItem.subTopics[k].options[kk].topicNo) {
          editItem.subTopics[k].options[kk].isCorrect = 1;
        } else {
          editItem.subTopics[k].options[kk].isCorrect = 0;
        }
        delete editItem.subTopics[k].answer;
      }
    }

    paperDetail.topics[editItem.topicNo - 1] = editItem;

    // for (let k in paperDetail.topics) {
    //   for (let kk in paperDetail.topics[k].subTopics) {
    //     delete paperDetail.topics[k].subTopics.kk.answer;
    //   }
    // }

    // debugger;
    dispatch({
      type: 'examlist/updatePaper',
      payload: paperDetail,
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
        //  success
        console.log(data, '12');
      },
    });
  };

  deleteConfirm = item => {
    // debugger
    let title = '删除试题';
    let content = (
      <div>
        <p>新增试卷时，试题可以删除</p> <p>题目删除后不可复原，确认删除第{item.id}题吗？</p>
      </div>
    );

    confirm({
      title,
      content,
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {},
    });
  };

  // renderSelectP = (resources = []) => {
  //   return (
  //     <Fragment>
  //       <Row>
  //         <Col span={3}>题目：</Col>
  //         <Col span={13}>
  //           <Input.TextArea placeholder={'富文本框'} rows={8} />
  //         </Col>
  //       </Row>
  //       <Row gutter={16}>
  //         <Col span={5}>
  //           <Row>
  //             <Col span={9}>7(1)</Col>
  //             <Col span={15}>
  //               <Input />
  //             </Col>
  //           </Row>
  //         </Col>

  //         <Col span={4}>
  //           <Row>
  //             <Col span={9}>7(2)</Col>
  //             <Col span={15}>
  //               <Input />
  //             </Col>
  //           </Row>
  //         </Col>

  //         <Col span={4}>
  //           <Row>
  //             <Col span={9}>7(3)</Col>
  //             <Col span={15}>
  //               <Input />
  //             </Col>
  //           </Row>
  //         </Col>

  //         <Col span={4}>
  //           <Row>
  //             <Col span={9}>7(1)</Col>
  //             <Col span={15}>
  //               <Input />
  //             </Col>
  //           </Row>
  //         </Col>

  //         <Col span={4}>
  //           <Row>
  //             <Col span={9}>7(1)</Col>
  //             <Col span={15}>
  //               <Input />
  //             </Col>
  //           </Row>
  //         </Col>
  //       </Row>

  //       <Row>
  //         <Col span={4}>答案:</Col>

  //         <Col span={20}>
  //           <Row>
  //             <Col span={10}>
  //               <Row>
  //                 <Col span={5}>71()</Col>
  //                 <Col span={11}>
  //                   <Input />
  //                 </Col>
  //               </Row>
  //             </Col>

  //             <Col span={7}>
  //               <Row>
  //                 <Col span={9}>72()</Col>
  //                 <Col span={11}>
  //                   <Input />
  //                 </Col>
  //               </Row>
  //             </Col>
  //           </Row>
  //         </Col>
  //       </Row>

  //       <Row>
  //         <Col span={3}>解析:</Col>
  //         <Col span={11} style={{ mariginRight: 30 }}>
  //           <Input.TextArea placeholder={'专项说明文本（0/180）'} rows={8} />
  //         </Col>
  //       </Row>
  //     </Fragment>
  //   );
  // };


  handleGetInputChoice= (index,index2,event)=>{
    // console.log(e,'e')
    console.log(event.target.value,'e')
    console.log(index)
    console.log(index2)
    // debugger
    const {editItem} = this.state;
    const examTmp = _.cloneDeep(editItem);

    examTmp.subTopics[index].options[index2].answer = event.target.value;
    this.setState({
      editItem:examTmp
    })
  }

  handleGetInputValue= (index,event)=>{
    // console.log(e,'e')
    console.log(event.target.value,'e')
    console.log(index)
    console.log(index2)
    // debugger
    const {editItem} = this.state;
    const examTmp = _.cloneDeep(editItem);

    examTmp.subTopics[index-1].title = event.target.value;
    this.setState({
      editItem:examTmp
    })
  }


  onChangeRadio = (index,event) => {
    console.log(event.target.value,'e')
    console.log(index)

    const {editItem} = this.state;

    const examTmp = _.cloneDeep(editItem);

    // this.state.radioValueList[index] = event.target.value;
    // const v = this.refs.radioGroup.props.topicno;
    const copyData =  _.cloneDeep(this.state.radioValueList)
    // const copyData = this.state.radioValueList.slice(0);



    copyData[index] = Number(event.target.value);



    this.setState({
      radioValueList:copyData
    })
    
    const currentItem = mapRadioToOptions(copyData,examTmp);

    this.setState({
      editItem: currentItem,
    });

  };



  renderSelectQs = v => {
    const editItem  = v;
    return (
      <Fragment>
        <div className={styles.item1}>
          {editItem &&
            editItem.subTopics.map((subItem,index) => {
              return (
                <Fragment key={subItem.topicNo}>
                  <Row>
                    <Col span={6}>题目（{subItem.topicNo}）:</Col>

                    <Col span={18}>
                      <Input value={subItem.title} onChange={()=>this.handleGetInputValue(subItem.topicNo,event)} />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <RadioGroup
                        onChange={() => this.onChangeRadio(subItem.topicNo - 1,event)}
                        value={this.state.radioValueList[subItem.topicNo - 1]}
                        // topicno={subItem.topicNo}
                        // ref="radioGroup"
                        style={{ width: '100%' }}
                      >
                        {subItem.options.map((optionItem,index2) => {
                          return (
                            <Row gutter={16} key={optionItem.topicNo}>
                              <Col span={14}>
                                <Row>
                                  <Col span={6}>选项: {optionItem.topicNo} </Col>
                                  <Col span={18}>
                                    <Input value={optionItem.answer} onChange={()=>this.handleGetInputChoice(index,index2,event)} />
                                  </Col>
                                </Row>
                              </Col>

                              <Col span={9}>
                                <Row>
                                  <Col span={4}>or</Col>
                                  <Col span={15}>
                                    <div>
                                      <Upload {...this.uploadProps}>
                                        <Button>
                                          <Icon type="upload" /> 上传图片
                                        </Button>
                                      </Upload>
                                    </div>
                                  </Col>
                                  <Col span={5}>
                                    &nbsp;&nbsp;&nbsp;
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
                        onClick={() => this.addOption(subItem.topicNo,editItem)}
                        // topicno={}
                        // ref="addOption"
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
                        value={subItem.parse}
                        onChange={()=>this.handleGetInputText(index,event)}                        
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
                            onClick={() => this.saveChange(editItem)}
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
      paperDetail,
      currentAddExamItem
    } = this.state;
    // const { paperDetail } = examlist;


    const { specialList } = operate;


    return (
      <div className={styles.container}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <NavLink to="/exam/list">试卷管理</NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="#" style={{ color: '#1890FF', textDecoration: 'none' }}>
              新增试卷
            </a>
          </Breadcrumb.Item>
        </Breadcrumb>
        <PaperForm/ >

        {/* <Form name={'form1'} layout="horizontal" className={styles.examForm}>
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
        </Form> */}

        <Row gutter={24}>
          <Col lg={9} md={24}>
          <h2>试卷预览</h2>
              <div className={styles.examLeft}>
                {paperDetail.topics &&
                  paperDetail.topics.map(item => (
                    <Card
                      key={item.topicNo}
                      bordered={false}
                      hoverable
                      // onClick={() => this.handleEdit(item)}
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
                                    <Fragment>
                                    <a
                                      onClick={() => this.deleteConfirm(item)}
                                      style={{ marginRight: 5, float: 'right' }}
                                    >
                                      删除
                                    </a>
                                    <a
                                      onClick={() => this.handleEdit(item)}
                                      style={{ marginRight: 5, float: 'right' }}
                                    >
                                      编辑
                                    </a>
                                 
                                    </Fragment>
                                    
                                    
                                  )}
                                </div>

                                {subItem.options.map(subOption => {
                                  return (
                                    <div key={subOption.topicNo} style={{ lineHeight: '31px' }}>
                                      <span> {subOption.topicNo}</span>
                                      <span> {subOption.answer}</span>
                                      {subOption.image && subOption.image.includes('http') && (
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

          <Col lg={15} md={24}>
            <h2>新增题目{editItem && editItem.topicNo}</h2>
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
                    <Col span={10}>
                      <span>
                        上传音频: {uploadAudioName || (editItem && editItem.audio) || ''}
                        </span>
                    </Col>
                    <Col span={5}>
                      <span>
                      该音频时长:
                          {uploadAudioDuration >= 0
                            ? uploadAudioDuration
                            : (editItem && editItem.audioDuration) || ''}
                        </span>
                      
                    </Col>
                    <Col span={6}>
                    <Upload {...this.uploadProps}>
                        <Button style={{ marginLeft: 60 }}>
                          <Icon type="upload" /> 上传文件
                        </Button>
                      </Upload>
                    </Col>
                 
                  </Row>
                  <Row>
                  <Col span={10}>

              
                      <Form.Item
                  labelCol={{ span: 11 }}
                  wrapperCol={{ span: 11 }}
                  label="该音频下的题目数"
                >
                  {getFieldDecorator('topicNum', {
                    rules: [{ required: true, message: '请输入题目数' }],
                    initialValue:1
                  })(<InputNumber min={1} max={100}  />)}
                </Form.Item>

                  </Col>
                  <Col span={8}>


                      <Form.Item
                  labelCol={{ span: 11 }}
                  wrapperCol={{ span: 11 }}
                  label="每题分数"
                >
                  {getFieldDecorator('topicScore', {
                    rules: [{ required: true, message: '请输入分数' }],
                    initialValue:0
                  })(<InputNumber min={1} max={100}  />)}
                </Form.Item>


                  </Col>
                  <Col span={6}>

                  <Button type="primary" onClick={this.onAddExam}>
                        确认
                      </Button>
                  </Col>


                  </Row>

                </div>

                {showEdit && editItem.type === 1 ? this.renderSelectQs(currentAddExamItem) : ''}
                {showEdit && editItem.type === 2 ? this.renderSelectP() : ''}

              </Form>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default CreateExam;
