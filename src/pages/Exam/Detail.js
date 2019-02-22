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
import _ from 'lodash'
import mapRadioToOptions from '@/utils/mapRadioToOptions';


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

@connect(({  operate }) => ({
  operate,
}))
@Form.create()
class Detail extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      subTopicsListTemp:[],
      uploadAudioName: null,
      uploadAudioDuration: null,
      editItem: null,
      currentEditType: 1,
      showEdit: false,
      paperDetail:{},
      title:'',
      newExam:false
    };
  }


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

      this.setState({
        uploadAudioName: info.file.name,
      });
      const _this = this;

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


          this.setState({
            newExam:true,
            showEdit:false
          })

          console.log(_this.state.uploadAudioDuration, '2');
          // debugger;
        }
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };



  cbSetPageDetail = (v)=>{
    const {  dispatch } = this.props;

    this.setState({
      paperDetail:v,
      title:v.title
    })
  }
  componentDidMount() {
    const { location, dispatch, examlist } = this.props;
    // const{paperDetail} =examlist;
    

    dispatch({
      type: 'examlist/fetchPaperDetail',
      payload: location.query.id,
      callback:this.cbSetPageDetail
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
  handleSubmit = e => {
    // const { dispatch } = this.props;
    // const { isEditing } = this.state;

    e.preventDefault();
    // this.props.form.validateFields((err, values) => {
    //   if (!err) {
    //     console.log('Received values of form: ', values);
    //   }
    // });
    this.props.form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        // debugger
        console.log(this.props.form.getFieldsValue(),'--2')
      }
    });
  };


  handleTopicScore =  (event)=>{
    const {editItem} = this.state;
    const examTmp = _.cloneDeep(editItem);

    examTmp.score = Number(event.target.value);
    this.setState({
      editItem:examTmp
    })
  }

  

  handleTopicSubNum =  (event)=>{

    // const {editItem} = this.state;
    // const examTmp = _.cloneDeep(editItem);

    // examTmp.subNum = Number(event.target.value);

    // this.setState({
    //   editItem:examTmp
    // })

  }

  handleGetInputText= (index,event)=>{
    // console.log(e,'e')
    // console.log(event.target.value,'e')
    // console.log(index)
    // debugger
    const {editItem} = this.state;
    const examTmp = _.cloneDeep(editItem);

    examTmp.subTopics[index].parse = event.target.value;
    this.setState({
      editItem:examTmp
    })
  }

  handleGetInputValue= (index,event)=>{
    // console.log(e,'e')
    // console.log(event.target.value,'e')
    const {editItem} = this.state;
    const examTmp = _.cloneDeep(editItem);

    examTmp.subTopics[index-1].title = event.target.value;
    this.setState({
      editItem:examTmp
    })
  }




  handleGetTitle= (event)=>{
    // console.log(e,'e')
    // console.log(event.target.value,'e')

    const data = _.cloneDeep(this.state.paperDetail);
    data.title = event.target.value;

    // examTmp.subTopics[index].title = event.target.value;
    this.setState({
      paperDetail:data
    })
  }

  // handleGetId =  (event)=>{
  //   console.log(event.target.value,'e')
  //   this.setState({
  //     paperDetail:{
  //       ...this.state.paperDetail,
  //       id:event.target.value
  //     }
  //   })
  // }

  handleGetSpecial = (event)=>{
    // console.log(event,'e')
    // console.log(event.target.value,'e')


    const data = _.cloneDeep(this.state.paperDetail);

    data.specialId =  Number(event.target.value);

    this.setState({
      paperDetail:data
    })
    // debugger

  }

  handleGetLevel = (event)=>{
    // console.log(e,'e')
    console.log(event.target.value,'e')

    // const examTmp = _.cloneDeep(editItem);
    const data = _.cloneDeep(this.state.paperDetail);
    data.level =  Number(event.target.value);
    this.setState({
      paperDetail:data
    })
  }
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

  addOption = (id,v) => {
    let editItem = v
    // const id = this.refs.addOption.props.topicno;

    const data =  _.cloneDeep(editItem);

    data.subTopics[id - 1].options.push({
      // topicSubId: data.subTopics[id - 1].id,
      answer: '',
      image: '',
      topicNo: data.subTopics[id - 1].options.length + 1,
    });
    // debugger

    this.setState(
      Object.assign(
        {},
        {
          editItem:data,
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
        if (
          item.subTopics[k].options[kk].isCorrect &&
          item.subTopics[k].options[kk].isCorrect === 1
        ) {
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
    // debugger

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

  saveChange = (v) => {
    const { radioValueList,paperDetail } = this.state;
    const {editItem} = this.state;

    const { dispatch, location } = this.props;

    const currentItem = mapRadioToOptions(radioValueList,editItem);
    
    paperDetail.topics[editItem.topicNo - 1] = currentItem;

    editItem.audio = this.state.uploadAudioName;
    editItem.audioDuration = Number(this.state.uploadAudioDuration);

    let formData = this.props.form.getFieldsValue();
    const totalScore = this.calcScore(paperDetail);
    const totalDuration = this.calcDuration(paperDetail);

    formData = Object.assign(formData, { totalScore }, { totalDuration });

    const saveData = Object.assign(paperDetail, formData);

    if(saveData.createTime) delete saveData.createTime
    if(saveData.updateTime) delete saveData.updateTime

    for(let k in saveData.topics) {
      if(saveData.topics[k].id)  delete saveData.topics[k].id;
      if(saveData.topics[k].paperId)  delete saveData.topics[k].paperId;
      // if(saveData.topics[k].topicNo)  delete saveData.topics[k].topicNo;
      // if(saveData.topics[k].subNum)  delete saveData.topics[k].subNum;
      for(let kk in saveData.topics[k].subTopics) {
        if(saveData.topics[k].subTopics[kk].id) delete saveData.topics[k].subTopics[kk].id;
        // if(saveData.topics[k].subTopics[kk].topicNo) delete saveData.topics[k].subTopics[kk].topicNo;
        if(saveData.topics[k].subTopics[kk].topicId) delete saveData.topics[k].subTopics[kk].topicId;

        for(let kkk in saveData.topics[k].subTopics[kk].options) {
          if(saveData.topics[k].subTopics[kk].options[kkk].id) delete saveData.topics[k].subTopics[kk].options[kkk].id
          // debugger
          if(saveData.topics[k].subTopics[kk].options[kkk].topicSubId) delete saveData.topics[k].subTopics[kk].options[kkk].topicSubId
          if(saveData.topics[k].subTopics[kk].options[kkk].isCorrect !==1) delete saveData.topics[k].subTopics[kk].options[kkk].isCorrect
          // if(saveData.topics[k].subTopics[kk].options[kkk].topicNo) delete saveData.topics[k].subTopics[kk].options[kkk].topicNo

        }

      }

    }



    // const radioValueList; [1]


    // isCorrect

    // TODO
    // debugger;

    console.log(saveData,'saveData')
    // return;
    dispatch({
      type: 'examlist/updatePaper',
      payload: saveData,
    });

    dispatch({
      type: 'examlist/fetchPaperDetail',
      payload: location.query.id,
    });

    // location.reaload();

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
                                      <Button disabled={optionItem.answer}>
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


  renderSelectNewQs = (v) => {
    
    return (
      <Fragment>
        <div className={styles.item1}>
          {v && v.map((item,itemIndex) => {
              return (
                <Fragment key={itemIndex}>
                  <Row>
                    <Col span={5}>题目（{itemIndex+1}）:</Col>

                    <Col span={18}>
                      <Input value={item.title} onChange={()=>this.handleGetInputValue(itemIndex,event)} />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <RadioGroup
                        onChange={() => this.onChangeRadio(itemIndex,event)}
                        value={this.state.radioValueList[itemIndex]}
                        // topicno={item.topicNo}
                        // ref="radioGroup"
                        style={{ width: '100%' }}
                      >
                        {item.options.map((optionItem,optionsIndex) => {
                          return (
                            <Row gutter={16} key={optionsIndex}>
                              <Col span={14}>
                                <Row>
                                  <Col span={6}>选项: {optionsIndex+1} </Col>
                                  <Col span={18}>
                                    <Input value={optionItem.answer} onChange={()=>this.handleGetInputChoice(itemIndex,optionsIndex,event)} />
                                  </Col>
                                </Row>
                              </Col>

                              <Col span={9}>
                                <Row>
                                  <Col span={4}>or</Col>
                                  <Col span={15}>
                                    <div>
                                      <Upload {...this.uploadProps}>
                                        <Button disabled={optionItem.answer}>
                                          <Icon type="upload" /> 上传图片
                                        </Button>
                                      </Upload>
                                    </div>
                                  </Col>
                                  <Col span={5}>
                                    &nbsp;&nbsp;&nbsp;
                                    <Radio value={optionsIndex+1} />
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
                        onClick={() => this.addOption(itemIndex,v)}
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
                        value={item.parse}
                        onChange={()=>this.handleGetInputText(itemIndex,event)}                        
                        placeholder={'专项说明文本（0/180）'}
                        rows={8}
                      />
                    </Col>
                    {itemIndex+1 === v.length && (
                      <Col span={7} className={styles.opt}>
                        <Row>
                          <Button onClick={() => this.cancelEdit()} style={{ width: '100%' }}>
                            清空重新录入
                          </Button>
                        </Row>
                        <Row>
                          <Button
                            onClick={() => this.saveTopic(v)}
                            type="primary"
                            style={{ width: '100%' }}
                          >
                            确认试题
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
      operate,
    } = this.props;
    const {
      editItem,
      currentEditType,
      showEdit,
      uploadAudioName,
      uploadAudioDuration,
      paperDetail,
      subTopicsListTemp,
      newExam,
      title
    } = this.state;
    // const { paperDetail } = examlist;
    const { specialList } = operate;

    // const copyEditItem =   _.cloneDeep(editItem);
    // const title = _.cloneDeep();

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
                {title}
              </a>
            </Breadcrumb.Item>
          </Breadcrumb>

          {/* <Form name={'tform'}  layout="horizontal" className={styles.examForm}> */}
            <Row gutter={16}>
              <Col span={12}>
                {/* <Form.Item {...formItemLayout} label={'试卷名称'}>
                  {getFieldDecorator('title', {
                    rules: [{ required: true, message: '请输入名称，不超过18个字', max: 18 }],
                    initialValue: paperDetail.title,
                  })(
                     */}
                     <Row>
                     <Col span={5}>

                     <span>
                     试卷名称:

                     </span>
                     </Col>
                     <Col span={9}>
                    <Input
                value={paperDetail.title}
                onChange={()=>this.handleGetTitle(event)}
                      placeholder="因果题型训练6/18"/>

                     </Col>
                     </Row>

                  {/* )}
                </Form.Item> */}
                {/* <Form.Item>
                  {getFieldDecorator('id', { initialValue: paperDetail.id })( */}
                    <Input type="hidden"    value={paperDetail.id} />
                  {/* )}
                </Form.Item> */}
              </Col>
              <Col span={9}>
                {/* <Form.Item
                  labelCol={{ span: 12 }}
                  wrapperCol={{ span: 8 }}
                  label="难度系数*（顶级5分）"
                >
                  {getFieldDecorator('level', {
                    rules: [{ required: true, message: '请输入名称' }],
                    initialValue: paperDetail.level, */}
                  {/* })( */}
                    <Row>
                     <Col span={14}>
                     <span>
                     难度系数*（顶级5分）
                     </span>
                     </Col>
                     <Col span={5}>

                    <InputNumber
                     onChange={()=>this.handleGetLevel(event)} 
                     min={1} max={10} step={0.1} value={paperDetail.level} />
                     </Col>
                     </Row>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>

                    <Row>
                     <Col span={5}>
                     <span>
                     专项选择:
                     </span>
                     </Col>
                     <Col span={17}>
                    <RadioGroup size="default" 
                    onChange={()=>this.handleGetSpecial(event)} 
                    value={ paperDetail.specialId}>
                      {specialList.map(item => {
                        return (
                          <RadioButton key={item.id} value={item.id}>
                            {item.title}
                            {/* {paperDetail.specialId === item.id ? paperDetail.specialId : null} */}
                          </RadioButton>
                        );
                      })}

                    </RadioGroup>
                    </Col>
                    </Row>

              </Col>
              <Col span={12}>
                <Form.Item>
                  <span style={{ marginRight: 20 }}>
                    试卷总分： {paperDetail.totalScore || '暂无'}
                  </span>
                  该试卷音频总长：{paperDetail.totalDuration || '暂无'}
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {/* <Button htmlType="submit" style={{ width: 120 }} type="primary">
              提交试卷
                    </Button> */}
                </Form.Item>

              </Col>
            </Row>

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
              <h2>编辑题目{editItem && editItem.topicNo}</h2>
              <div className={styles.examRight}>
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
                        {/* <Form.Item
                          label=" 该音频下的题目数:"
                          labelCol={{ span: 11 }}
                          wrapperCol={{ span: 11 }}
                        > */}
                        {/* {getFieldDecorator('paperNum', { initialValue: editItem && editItem.subNum })( */}

                          <Row>
                            <Col span={14}>
                            该音频下的题目数:
                            </Col>
                            <Col span={3}>
                                <InputNumber min={0} max={100} value={ editItem && editItem.subNum} 
                                onChange={()=>this.handleTopicSubNum(event)}
                                 />
                            </Col>

                            </Row>
                      </Col>

                      <Col span={10}>
                          <Row>
                            <Col span={8}>
                            每题分数:
                            </Col>
                            <Col span={3}>
                              <InputNumber min={0} max={100} value={editItem && editItem.score} 
                              onChange={()=>this.handleTopicScore(event)} ></InputNumber>
                            </Col>
                          </Row>
                      </Col>
                    </Row>
                  </div>

                  {/* {showEdit && editItem.type === 1 ? <SelectQs subItem={subItem} addOption={this.addOption} editItem={editItem} radioValueList={this.state.radioValueList} saveChange={this.saveChange}/> : ''} */}
                  {!newExam && showEdit && editItem.type === 1 ? this.renderSelectQs(editItem) : ''}
                  {showEdit && editItem.type === 2 ? this.renderSelectP() : ''}
                  { newExam &&  renderSelectNewQs(subTopicsListTemp)}
                  {/* {currentEditType === 1 && !showEdit ? this.renderNewSelectQs() : ''} */}
                  {/* {currentEditType === 2 && !showEdit ? this.renderNewSelectP() : ''} */}
                
              </div>
            </Col>
          </Row>

        </div>
      )
    );
  }
}




export default Detail;
