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

@connect(({ examlist, operate }) => ({
  examlist,
  operate,
}))
@Form.create()
class NewExam extends PureComponent {

  // onChangeUpload = (event)=>{
  //     // console.log(fileList, 'fileList');
  //     // console.log(itemIndex, 'itemIndex');
  //     // console.log(optionIndex, 'optionIndex');
  //     console.log(event,'eeee')
  //     // debugger
  //     // // const data = JSON.parse(event.target.response);
  //     // if(data.code === 1) {
  //     //    console.log(data.data,'data.data')
  //   // }
  // }
  onChangeUpload2 = (index,index2)=>{
    console.log(index,'12')
    console.log(index2)


  }

  onChangeUpload= (info)=>{
  // onChangeUpload = (event )=> {
      // console.log(event.ProgressEvent, 'fileList');

      // console.log(event.total, 'fileList');
      console.log(info, 'fileList');

      // if (info.fileList.length > 1) {
      //   info.fileList.shift();
      // }

      // this.setState({
      //   uploadAudioName: info.file.name,
      // });
      // const _this = this;

      // if (info.file.status !== 'uploading') {
      //   console.log(info.file, 'info.file');
      //   console.log(info.fileList, ' info.fileList');
      // }

      // if (info.file.status === 'done') {
      //   message.success(`${info.file.name} file uploaded successfully`);
      //   if (info.file.response.code === 1) {
      //     _this.setState({
      //       uploadAudioDuration: info.file.response.data.duration,
      //     });
      //     console.log(_this.state.uploadAudioDuration, '2');
      //     // debugger;
      //   }
      // } else if (info.file.status === 'error') {
      //   message.error(`${info.file.name} file upload failed.`);
      // }
    };

  uploadFileProps = {
    name: 'file',
    action: 'https://api.jze100.com/hear/admin/file/upload',
    headers: {
      authorization: 'authorization-text',
    },
    showUploadList: false,
    accept:".mp3",
    onChange:(info)=>{
        const _this = this;
        if (info.fileList.length > 1) {
          info.fileList.shift();
        }

      if (info.file.status !== 'uploading') {
        console.log(info.file, 'info.file');
        console.log(info.fileList, ' info.fileList');
      }
      
      if (info.file.status === 'done') {
        // debugger
        message.success(`${info.file.name} file uploaded successfully`);
        if (info.file.response.code === 1) {
          _this.setState({
            uploadAudioDuration: info.file.response.data.duration,
          });
          _this.setState({
            uploadAudioName: info.file.name,
          });
          console.log(_this.state.uploadAudioDuration, '2');
          // debugger;
          }
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      }
  }

  uploadImgProps = {
    name: 'file',
    action: 'https://api.jze100.com/hear/admin/file/upload',
    headers: {
      authorization: 'authorization-text',
    },
    showUploadList: false,
    accept:".jpg, .jpeg, .png"
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      currentEditIndex:'',
      radioValueList:[],
      uploadAudioName: null,
      uploadAudioDuration: null,
      editItem: null,
      currentEditType: 1,
      showEdit: false,
      // editItem.subTopics
      subTopicsListTemp:[], // 新增题目的临时List
      topicsListTemp:[], // 预览题目的临时List
      paperDetailHeader:{
        title:'',
        specialId:null,
        level:0,
        totalScore:null,
        totalDuration:null,
      }, // 试卷头部info
    };
  }



  componentDidMount() {
    const { location, dispatch, examlist } = this.props;
    // const{paperDetail} =examlist;
    
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


  
// 确认新增题目
onAddSubTopicsSubmit = e => {
    // const { dispatch } = this.props;
    // const { subTopicsListTemp } = this.state;

    const data =  [];

    e.preventDefault();
   
    this.props.form.validateFields({ force: true }, (err, values) => {
      if (!err && values && values.topicNum>0) {

        for(let i =0;i <values.topicNum;i++) {
          data.push({
              "title": "",
              "parse": "",
              "options": [
                {
                  "answer": "",
                  "image": ""
                },
                {
                  "answer": "",
                  "image": ""
                },
                {
                  "answer": "",
                  "image": ""
                }
              ]
          })
      }


      this.setState({
        subTopicsListTemp:data
      })
      // debugger
    }
  })
  }

  handleTopicScore =  (event)=>{
    const {editItem} = this.state;
    const examTmp = _.cloneDeep(editItem);

    examTmp.score = Number(event.target.value);
    this.setState({
      editItem:examTmp
    })
  }

  

  handleTopicSubNum =  (event)=>{
    const {editItem} = this.state;
    const examTmp = _.cloneDeep(editItem);

    examTmp.subNum = Number(event.target.value);
    this.setState({
      editItem:examTmp
    })
  }

  handleGetInputText= (index,event)=>{
    // debugger
    // console.log(e,'e')
    // console.log(event.target.value,'e')
    // console.log(index)
    // debugger
    const {subTopicsListTemp} = this.state;
    const examTmp = _.cloneDeep(subTopicsListTemp);

    examTmp[index].parse = event.target.value;
    this.setState({
      subTopicsListTemp:examTmp
    })
  }

  handleGetInputValue= (index,event)=>{
    // console.log(e,'e')
    // console.log(event.target.value,'e')
    const {subTopicsListTemp} = this.state;
    const examTmp = _.cloneDeep(subTopicsListTemp);

    examTmp[index].title = event.target.value;
    this.setState({
      subTopicsListTemp:examTmp
    })
  }




  handleGetTitle= (event)=>{
    // console.log(e,'e')
    // console.log(event.target.value,'e')

    // const examTmp = _.cloneDeep(editItem);

    // examTmp.subTopics[index].title = event.target.value;
    this.setState({
      paperDetailHeader:{
        ...this.state.paperDetailHeader,
        title:event.target.value
      }
    })
    // debugger
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

    // const examTmp = _.cloneDeep(editItem);

    this.setState({
      paperDetailHeader:{
        ...this.state.paperDetailHeader,
        specialId: Number(event.target.value)
      }
    })
    // debugger

  }

  handleGetLevel = (v)=>{

    this.setState({
      paperDetailHeader:{
        ...this.state.paperDetailHeader,
        level:Number(v)
      }
    })
  }


  handleGetUploadAudio= (v)=>{

    // this.setState({
    //   paperDetailHeader:{
    //     ...this.state.paperDetailHeader,
    //     level:Number(v)
    //   }
    // })
  }

  handleGetInputChoice= (index,optionsIndex,event)=>{
    // console.log(e,'e')
    const {subTopicsListTemp} = this.state;
    const examTmp = _.cloneDeep(subTopicsListTemp);
    
    examTmp[index].options[optionsIndex].answer = event.target.value;
    this.setState({
      subTopicsListTemp:examTmp
    })
  }

  // const {subTopicsListTemp} = this.state;
  // const examTmp = _.cloneDeep(subTopicsListTemp);

  // examTmp[index].title = event.target.value;
  // this.setState({
  //   subTopicsListTemp:examTmp
  // })
  // debugger


  onChangeCurrentEditType = (event)=>{
    this.setState({
      currentEditType:event.target.value
    })
  }

  onChangeRadio = (index,event) => {
    console.log(event.target.value,'e')
    console.log(index)

    const {subTopicsListTemp} = this.state;

    const examTmp = _.cloneDeep(subTopicsListTemp);

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
      subTopicsListTemp: currentItem,
    });
// debugger


  };

  addOption = (index,v) => {
    // let editItem = v
    // const id = this.refs.addOption.props.topicno;
// debugger
    const data =  _.cloneDeep(v);

    data[index].options.push({
      // topicSubId: data.subTopics[id - 1].id,
      answer: '',
      image: '',
      topicNo: data[index].options.length + 1,
    });
    // debugger

    this.setState(
      Object.assign(
        {},
        {
          subTopicsListTemp:data,
        }
      )
    );
  };

  cancelEditOrEmpty = () => {
    const { showEdit}= this.state;
    if(showEdit) {
      // 取消编辑
      this.props.form.resetFields();
      this.setState({
        showEdit:false,
        subTopicsListTemp:[],
        uploadAudioDuration:null,
        uploadAudioName:null,
        currentEditType:1,
      })
      return
    } 
    // 清空重新录入
    this.showEmptyModal();

  };


  showEmptyModal = () => {
    let title = '清空试卷';
    let content = '确认清空重新录入吗'
    let _this = this;
    confirm({
      title,
      content,
      onOk() { 
        this.props.form.resetFields();
        _this.setState({
          paperDetailHeader:{
            title:'',
            specialId:null,
            level:0,
            totalScore:null,
            totalDuration:null,
          },
          topicsListTemp:[],
          subTopicsListTemp:[],
          uploadAudioDuration:null,
          uploadAudioName:null,
          currentEditType:1
        })
      },
      onCancel() {},
    });
  };

  showConfirmDelete = (itemIndex) => {
    let title = '删除试题';
    let content = <Fragment>
      <span style={{color:'#1890ff'}}> 新增试卷时,试题可以删除</span>
    <div>题目删除后不可复原，确认删除第{itemIndex+1}题吗？</div>  </Fragment>;

    const { dispatch, operate } = this.props;
    const { topicsListTemp,paperDetailHeader } = this.state;
    const { specialList } = operate;

    const dataList = _.cloneDeep(topicsListTemp);
    const _this = this;


    confirm({
      title,
      content,
      onOk() {
        dataList.splice(itemIndex,1);

        const totalScore = dataList.reduce(function(accumalator,cur){
          return accumalator+Number(cur.score)
        },0)
        const totalDuration = dataList.reduce(function(accumalator,cur){
          return accumalator+Number(cur.audioDuration)
        },0)
        _this.setState({
          topicsListTemp:dataList,
          showEdit:false,
          subTopicsListTemp:[],
          uploadAudioName:null,
          uploadAudioDuration:null,
          currentEditType:1,
          paperDetailHeader:{
            ...paperDetailHeader,
            totalScore,
            totalDuration
          }
        })
      },
      onCancel() {},
    });
  };


  handleEdit = (item,itemIndex) => {
    
    // this.setState({
    //   subTopicsListTemp:item,
    //   uploadAudioName:item.
    //   paperDetailHeader:{
    //     type:item.type,
    //     audio:uploadAudioName,

    //   }
    // })
    // debugger

    const radioValueList = [];
    for (let k in item.subTopics) {
      for (let kk in item.subTopics[k].options) {
        if (
          item.subTopics[k].options[kk].isCorrect &&
          item.subTopics[k].options[kk].isCorrect === 1
        ) {
          radioValueList.push( Number(kk)+1);
        }
      }
    }
    this.props.form.setFieldsValue({
      topicNum:item.subTopics.length,
      topicScore:item.score
    })

// debugger

    this.setState({
      // editItem: item,
      showEdit: true,
      currentEditType: item.type,
      radioValueList,
      subTopicsListTemp:item.subTopics,
      uploadAudioName:item.audio,
      uploadAudioDuration:item.audioDuration,
      currentEditIndex:itemIndex
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



  dispatchCreatePaper = ()=>{
    const {paperDetailHeader, topicsListTemp} = this.state;
    const {dispatch} = this.props;

    console.log(paperDetailHeader,'pageDetailHeader')
    debugger

    const mergeData = {
      ...paperDetailHeader,
      topics:topicsListTemp
    }
    dispatch({
      type:'examlist/createPaper',
      payload:mergeData,
      callback:this.cbSuccessPaper
    })
  }

  onSubmitPaper = ()=>{

    const { dispatch, operate } = this.props;
    const { topicsListTemp,paperDetailHeader } = this.state;
    const { specialList } = operate;

    if(!paperDetailHeader.title || !paperDetailHeader.level || !paperDetailHeader.specialId ) {
          message.error('请输入试卷信息');
          return
      }
    // paperDetailHeader.totalScore = topicsListTemp.map(item=>{item.score})
    const _this = this;
    let title = '提交试卷';
    let content = <div className={styles.modalList}>

      <span> 默认提交后，试卷状态为启用</span>
      <ul>
        <li>
          试卷名称: {paperDetailHeader.title}
        </li>
        <li>
        专项: {specialList.map(item => {
        return (
            <Fragment key={item.id}>  {item.id  === paperDetailHeader.specialId ? item.title: null}</Fragment>
          );
        })}
        </li>
        <li>
          难度: {paperDetailHeader.level}
        </li>
        <li>
          题目数: {topicsListTemp.length}
        </li>
        <li>
          试卷总分:{paperDetailHeader.totalScore}
        </li>
        <li>
        该试卷音频总长:{paperDetailHeader.totalDuration ? `${((paperDetailHeader.totalDuration/60).toFixed(0))}mins` : '暂无'}
        </li>
      </ul>
    </div>;
  
    confirm({
      title,
      content,
      onOk() {
        _this.dispatchCreatePaper();
      },
      onCancel() {},
    });
  
  }

  cbSuccessPaper = ()=>{
    message.success(
      '创建试卷成功'
    );
    this.props.form.resetFields();
    this.setState({
      topicsListTemp: [],
      paperDetailHeader:{
        title:'',
        specialId:null,
        level:0,
        totalScore:null,
        totalDuration:null,
      }
    })


  }


  saveChangeOrTopic =()=>{
     const {showEdit} = this.state;
     if(showEdit){
       //  保存修改
       this.saveChange()
      return
     }
     this.saveTopic();
  }
  // 编辑题目
  saveChange = () => {
    const { 
      uploadAudioName,
      uploadAudioDuration,
      currentEditType,
      paperDetailHeader,
      topicsListTemp,currentEditIndex,radioValueList,subTopicsListTemp,paperDetail } = this.state;


    const currentItem = mapRadioToOptions(radioValueList,subTopicsListTemp);
    const data = _.cloneDeep(topicsListTemp);


    data[currentEditIndex] = {
      type:currentEditType,
      subTopics:currentItem,
      audio:uploadAudioName,
      audioDuration:uploadAudioDuration,
      score:this.props.form.getFieldsValue().topicScore,
      subNum:this.props.form.getFieldsValue().topicNum,
    }


    const totalScore = data.reduce(function(accumalator,cur){
      return accumalator+Number(cur.score)
    },0)
    const totalDuration = data.reduce(function(accumalator,cur){
      return accumalator+Number(cur.audioDuration)
    },0)
    

    this.props.form.resetFields();

    this.setState({
      showEdit:false,
      topicsListTemp:data,
      subTopicsListTemp:[],
      uploadAudioName:null,
      uploadAudioDuration:null,
      currentEditType:1,
      paperDetailHeader:{
        ...paperDetailHeader,
        totalScore,
        totalDuration
      }
    })


  };

// 新增题目
  saveTopic=()=>{
    const { 
      radioValueList,
      subTopicsListTemp,
      uploadAudioDuration,
      uploadAudioName,
      currentEditType,
      topicsListTemp,
      paperDetailHeader
    } = this.state;

    

      const formData = this.props.form.getFieldsValue();
      // const copyData = _.cloneDeep(topicsListTemp);

      // currentEditType

      
      const topicsList = [];
      const topicsListObj = {
        type:currentEditType,
        audio:uploadAudioName,
        audioDuration:uploadAudioDuration,
        score:formData.topicScore,
        subTopics:subTopicsListTemp,
        subNum:formData.topicNum
      };
      topicsList.push(topicsListObj);



      const mergeData = topicsListTemp.concat(topicsList)

        //  paperDetailHeader.totalScore
    // paperDetailHeader.totalDuration
    const totalScore = mergeData.reduce(function(accumalator,cur){
      return accumalator+Number(cur.score)
    },0)
    const totalDuration = mergeData.reduce(function(accumalator,cur){
      return accumalator+Number(cur.audioDuration)
    },0)
      // this.setState({

      //   topicsListTemp:mergeData,
      //   subTopicsListTemp:[]
      // })


    this.props.form.resetFields();

    this.setState({
      showEdit:false,
      topicsListTemp:mergeData,
      subTopicsListTemp:[],
      uploadAudioName:null,
      uploadAudioDuration:null,
      currentEditType:1,
      paperDetailHeader:{
        ...paperDetailHeader,
        totalScore,
        totalDuration
      }
    })
 

  }


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

  // 编辑
  renderSelectQs = () => {
     const {subTopicsListTemp,showEdit} = this.state;
    // const editItem  = v;
    // subTopicsListTemp
    // debugger
    return (
      <Fragment>
        <div className={styles.item1}>
          {subTopicsListTemp.length &&
            subTopicsListTemp.map((subItem,subIndex) => {
              return (
                <Fragment key={subIndex}>
                  <Row>
                    <Col span={4}>题目（{subIndex+1}):</Col>

                    <Col span={18}>
                      <Input value={subItem.title} onChange={()=>this.handleGetInputValue(subIndex,event)} />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <RadioGroup
                        onChange={() => this.onChangeRadio(subIndex,event)}
                        value={this.state.radioValueList[subIndex]}
                        // topicno={subItem.topicNo}
                        // ref="radioGroup"
                        style={{ width: '100%' }}
                      >
                        {subItem.options.map((optionItem,optionIndex) => {
                          return (
                            <Row gutter={16} key={optionIndex}>
                              <Col span={14}>
                                <Row>
                                  <Col span={6}>选项: {optionIndex+1} </Col>
                                  <Col span={18}>
                                    <Input value={optionItem.answer} onChange={()=>this.handleGetInputChoice(subIndex,optionIndex,event)} />
                                  </Col>
                                </Row>
                              </Col>

                              <Col span={9}>
                                <Row>
                                  <Col span={4}>or</Col>
                                  <Col span={15}>
                                    <div>
                                      <Upload  {...this.uploadImgProps}>
                                      <Button disabled={optionItem.answer}>
                                          <Icon type="upload" /> 上传图片
                                        </Button>
                                      </Upload>
                                    </div>
                                  </Col>
                                  <Col span={5}>
                                    &nbsp;&nbsp;&nbsp;
                                    <Radio value={optionIndex+1} />
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
                        onClick={() => this.addOption(subIndex,subTopicsListTemp)}
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
                        onChange={()=>this.handleGetInputText(subIndex,event)}                        
                        placeholder={'专项说明文本（0/180）'}
                        rows={8}
                      />
                    </Col>
                    {subIndex+1 === subTopicsListTemp.length && (
                      <Col span={7} className={styles.opt}>
                        <Row>
                          <Button onClick={this.cancelEditOrEmpty} style={{ width: '100%' }}>
                            {/*  */}
                      { showEdit ? '取消编辑':'清空重新录入'}
                          </Button>
                        </Row>
                        <Row>
                          <Button
                            onClick={() => this.saveChangeOrTopic()}
                            type="primary"
                            style={{ width: '100%' }}
                          >
                      { showEdit ? '保存修改':'确认试题'}
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

// 新增试题
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
                                    <div 
                                        // onClick={this.onChangeUpload2(itemIndex,optionsIndex)}
                                    
                                    >
                                      <Upload 
                                    {...this.uploadImgProps}
                                      //  action="//jsonplaceholder.typicode.com/posts/"
          // listType="picture-card"
          // fileList={fileList}
          // onPreview={this.handlePreview}
          onChange={()=>this.onChangeUpload}
          // onChange={this.onChangeUpload(event)}
                                      showUploadList={true}
                                      >
                                        <Button

                                         disabled={optionItem.answer}>
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
                          <Button onClick={this.showEmptyModal} style={{ width: '100%' }}>
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


  getSpaceTopic = (item,itemIndex)=>{
    return (
        <div key={itemIndex}>
          <div className={styles.examTitle}>
            <h2 style={{ float: 'left', marginRight: 11 }}>
              {itemIndex+1}.({item.score}分)
            </h2>
            <div style={{ float: 'right' }}>
              <a onClick={() => this.handleEdit(item)} style={{ marginRight: 5 }}>
                编辑
              </a>
            </div>
          </div>
          {item.subTopics.map((subItem,subIndex) => {
            return (
              <div key={subIndex}>
                <h2>
                  {subItem.id} .{subItem.title}
                </h2>
              </div>
            );
          })}
        </div>
    )
  }

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
      paperDetailHeader,
      title,
      subTopicsListTemp,
      topicsListTemp,
      currentEditIndex
    } = this.state;

    const { specialList } = operate;


    return (
      specialList && (
        <div className={styles.container}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <NavLink to="/exam/list">试卷管理</NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="#" style={{ color: '#1890FF', textDecoration: 'none' }}>
              新建试卷
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
                value={paperDetailHeader.title}
                onChange={()=>this.handleGetTitle(event)}
                      placeholder="因果题型训练6/18"/>
                     </Col>
                     </Row>

                  {/* )}
                </Form.Item> */}
                {/* <Form.Item>
                  {getFieldDecorator('id', { initialValue: paperDetail.id })( */}
                    {/* <Input type="hidden"    value={paperDetailHeader.id} /> */}
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
                     onChange={this.handleGetLevel} 
                     min={0} max={5} step={0.1} value={Number(paperDetailHeader.level)} />
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
                    value={ paperDetailHeader.specialId}>
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
                  <span style={{ marginRight: 20 }}>
                    试卷总分： {paperDetailHeader.totalScore || '暂无'}
                  </span>
                  该试卷音频总长:{paperDetailHeader.totalDuration ? `${((paperDetailHeader.totalDuration/60).toFixed(0))}mins` : '暂无'}
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button  style={{ width: 120 }} 
                    disabled={!topicsListTemp.length}
                    onClick={this.onSubmitPaper}
                    type="primary">
                    提交试卷
                    </Button>

              </Col>
            </Row>


          <Row gutter={24}>
            <Col lg={9} md={24}>
              <h2>试卷预览</h2>
              <div className={styles.examLeft}>
                {
                  topicsListTemp.map((item,itemIndex) => (
                    <div
                      key={itemIndex}
                      className={styles.card}
                      onClick={() => this.handleEdit(item,itemIndex)}
                    >
                      {item.type === 1 ? (
                        <div>
                          {item.subTopics.map((subItem,subItemIndex) => {
                            return (
                              <div key={subItemIndex}>
                                <div className={styles.examTitle}>

                                  <h2 style={{ float: 'left', marginRight: 11 }}>
                                  
                                    {/* {itemIndex === subItemIndex ? ItemIndex : ''}  */}

                                    {item.subTopics.length>1 ?`${itemIndex+1} (${subItemIndex})`:itemIndex+1}.{subItem.title}({item.score}分)
                                  </h2>

                                  {subItemIndex === 0 && (
                                    <div style={{float:'right'}}>
                                 
                                    <a
                                      onClick={() => this.handleEdit(item,itemIndex)}
                                      style={{ marginRight: 5}}
                                    >
                                      编辑
                                    </a>
                                    <a
                                      onClick={() => this.showConfirmDelete(itemIndex)}
                                      // style={{ marginRight: 5, float: 'right' }}
                                    >
                                      删除
                                    </a>
                                 
                                    </div>
                                  )}

                                </div>

                                {subItem.options.map((subOption,subOptionIndex) => {
                                  return (
                                    <div key={subOptionIndex} style={{ lineHeight: '31px' }}>
                                      <span> {subOptionIndex+1}</span>
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
                      ) :
                      this.getSpaceTopic(item,itemIndex)
                      }
                    </div>
                  ))}
              </div>
            </Col>

            <Col lg={15} md={24}>
              <h2>
                {showEdit ? `编辑题目${currentEditIndex+1}`:'新增题目'}
              </h2>
              <div className={styles.examRight}>
                <Form onSubmit={this.onAddSubTopicsSubmit}>
                    <Row>
                      <Form.Item label="题型选择" labelCol={{ span: 5 }} wrapperCol={{ span: 17 }}>
                        <RadioGroup 
                        onChange={()=>this.onChangeCurrentEditType(event)}
                        value={currentEditType} size="default">
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
                          上传音频: {uploadAudioName || ''}
                          </span>
                      </Col>
                      <Col span={6}>
                        <span>
                        该音频时长:
                            {uploadAudioDuration ? `${((uploadAudioDuration/60).toFixed(0))}mins` : ''}
                          </span>
                      </Col>
                      <Col span={6}>
                      <Upload {...this.uploadFileProps}>
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
                          })(<InputNumber 
                          onChange={this.handleGetUploadAudio}
                          min={1} max={100}  />)}
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

                         {!subTopicsListTemp.length && <Button htmlType="submit" style={{ width: 120 }} type="primary"> 

                          确认
                        </Button>
                         }
                    </Col>
                    </Row>
                    </div>
                </Form>

                { subTopicsListTemp.length>0 &&  this.renderSelectQs()}
                
                </div>
            </Col>

          </Row>



        </div>
      )
    );
  }
}





export default NewExam;
