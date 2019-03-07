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
import RenderEditSelectP from './components/RenderEditSelectP'


import moment from 'moment';
import _ from 'lodash'
import mapRadioToOptions from '@/utils/mapRadioToOptions';
import {formatDuration} from '@/utils/utils';


import styles from './List.less';
import { create } from 'domain';
const { TabPane } = Tabs;
const confirm = Modal.confirm;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


const optionTransfer = [
  'A',
  'B','C','D','E','F','G','H','I','J','K','L'
]
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
      currentEditIndex:'',
      editorContent:'',
      subTopicsListTemp:[],
      uploadAudioName: '',
      uploadAudioDuration: 0,
      editItem: {
        score:0,
        audioDuration:0
      },
      currentEditType: 1,
      showEdit: false,
      paperDetail:{},
      title:'',
      newExam:false
    };
  }

  uploadImgProps = {
    name: 'file',
    action: 'https://api.jze100.com/hear/admin/file/upload',
    headers: {
      authorization: 'authorization-text',
    },
    showUploadList: false,
    accept:".jpg, .jpeg, .png",
    beforeUpload:(file)=>{
      // const isJPG = file.type === 'image/jpeg';
      // if (!isJPG) {
      //   message.error('You can only upload JPG file!');
      // }
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!isLt1M) {
        message.error('图片不能大于1MB!');
      }
      return isLt1M;
    },
  };


  uploadFileProps = {
    name: 'file',
    action: 'https://api.jze100.com/hear/admin/file/upload',
    headers: {
      authorization: 'authorization-text',
    },
    showUploadList: false,
    accept:".mp3",
    beforeUpload:(file)=>{
      // const isJPG = file.type === 'image/jpeg';
      // if (!isJPG) {
      //   message.error('You can only upload JPG file!');
      // }
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error('音频不能大于5MB!');
      }
      return isLt5M;
    },
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
        message.success(`${info.file.name} 音频上传成功!`,5);
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


  onChangeUploadImgProps =(info,subItemIndex,optionIndex)=>{
    
    const { editItem } = this.state;
    const copySub = _.cloneDeep(editItem.subTopics);
   
    // console.log(info)
    // debugger

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
    message.success(`${info.file.name} 图片上传成功!`,5);
    if (info.file.response.code === 1) {
      // _this.setState({
      //   uploadAudioDuration: info.file.response.data.duration,
      // });
      // _this.setState({
      //   uploadAudioName: info.file.name,
      // });
      copySub[subItemIndex].options[optionIndex].image = info.file.response.data.path;
      this.setState({
        editItem:{
          ...editItem,
          subTopics:copySub
        }
      })
    // debugger

      // console.log(_this.state.uploadAudioDuration, '2');
      // debugger;
      }
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
  
  cbSetPageDetail = (v)=>{
    const {  dispatch } = this.props;
// debugger
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

    const currentItem = mapRadioToOptions(copyData,examTmp.subTopics);

    // debugger

    this.setState({
      radioValueList:copyData,
      editItem: {
        ...editItem,
        subTopics:currentItem
      }
    })



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



  handleEdit = (item,itemIndex) => {

    
    const radioValueList = [];


// debugger
  if(item.type ===1){

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
    }

    let editorContentData= '';
    if(item.type ===2){
      editorContentData  = item.subTopics[0].title;
    }
    // debugger

    this.setState({
      editItem: item,
      showEdit: true,
      currentEditType: item.type,
      currentEditIndex: itemIndex,
      editorContent:editorContentData,
      radioValueList,
    });
    // debugger

  };
  deleteExam = () => {};

  calcScore = v => {
    // let score = 0;
    // for (let k in v.topics) {
    //   score += v.topics[k].score;
    // }
    // return score;


    const totalScore = v.topics.reduce(function(accumalator,cur){
      return accumalator+Number(cur.score*cur.subTopics.length)
    },0)
    // debugger
    return totalScore;

  };

  calcDuration = v => {
    // let duration = 0;
    // for (let k in v.topics) {
    //   duration += v.topics[k].audioDuration;
    // }
    // return duration;
    const totalDuration = v.topics.reduce(function(accumalator,cur){
      return accumalator+Number(cur.audioDuration)
    },0)
    return totalDuration;
  };


 dispatchSubTopicsListTemp = (cloneSubTopicsListTemp)=>{
   const {editItem} = this.state;
  this.setState({
    editItem :{
      ...editItem,
      subTopics:cloneSubTopicsListTemp
    }
  })
}



dispatchEditContent = (html)=>{
  const {editItem} = this.state;
  const data = _.cloneDeep(editItem);
  data.subTopics[0].title = html;

  this.setState({
    editorContent:html,
    editItem:data
  })
  // debugger
  // this.setState({
  // })
}

  saveChange = (v) => {
    const { radioValueList,paperDetail } = this.state;
    const {editItem,editorContent} = this.state;
    const cloneEditItem = _.cloneDeep(editItem);

    const { dispatch, location } = this.props;

    cloneEditItem.audio = this.state.uploadAudioName;
    cloneEditItem.audioDuration = Number(this.state.uploadAudioDuration);
    //  currentItem subList
    // let currentItem= cloneEditItem.subTopics;
    if(editItem.type ===1){
      cloneEditItem.subTopics = mapRadioToOptions(radioValueList,cloneEditItem.subTopics);
    }




    for (let index = 0; index < cloneEditItem.subTopics.length; index++) {
      // const element = array[index];
      // if(currentItem[index].parse == '' || currentItem[index].title ==''){
      if(cloneEditItem.subTopics[index].title ==''){
        message.error(`题目和解析为必填`);
        return false;
      }
    
      for (let index2 = 0; index2 < cloneEditItem.subTopics[index].options.length; index2++) {
        if(cloneEditItem.subTopics[index].options[index2].image === '' && cloneEditItem.subTopics[index].options[index2].answer === '') {
          message.error(`缺少选项信息`);
          return false;
        }

      }
    }
    if(cloneEditItem.type ===2){
      // const tmpdata = _.cloneDeep(currentItem);
      cloneEditItem.subTopics[0].title=editorContent;
      // currentItem = [{
      //   ...currentItem,
      //   subTopics:tmpdata
      // }]

    }
    // debugger

    // const mcurrentItem = {
    //   ...cloneEditItem,
    //   subTopics:currentItem
    // }
    

   
    paperDetail.topics[cloneEditItem.topicNo - 1] = cloneEditItem;

    let formData = this.props.form.getFieldsValue();
    // debugger
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
    // debugger;

    }

    // debugger;



    // const radioValueList; [1]


    // isCorrect

    // TODO
    // return

    console.log(saveData,'saveData')
    // return;
    dispatch({
      type: 'examlist/updatePaper',
      payload: saveData,
      callback:this.cbSuccessUdatePaper
    });

    dispatch({
      type: 'examlist/fetchPaperDetail',
      payload: location.query.id,
    });

    // location.reaload();

  };

  cbSuccessUdatePaper = ()=>{
    message.success(`试卷更新成功`);
    this.setState({
      showEdit:false
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

  renderSelectQs = () => {
    const {editItem,paperDetail} = this.state ;
    // debugger
    return (
      <Fragment>
        <div className={styles.item1}>
          {editItem && editItem.subTopics && 
            editItem.subTopics.map((subItem,index) => {
              return (
                <Fragment key={subItem.topicNo}>
                  <Row>
                    <Col span={6}>题目（{subItem.topicNo}）:</Col>

                    <Col span={18}>
                      <Input disabled value={subItem.title} onChange={()=>this.handleGetInputValue(subItem.topicNo,event)} />
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
                                  <Col span={6}>选项: {optionTransfer[optionItem.topicNo-1]}</Col>
                                  <Col span={18}>
                                    <Input  disabled value={optionItem.answer} onChange={()=>this.handleGetInputChoice(index,index2,event)} />
                                  </Col>
                                </Row>
                              </Col>

                              <Col span={9}>
                                <Row>
                                  <Col span={4}>or</Col>
                                  <Col span={15}>
                                    <div>
                                   
                                      <Upload
                                      // data={{subIndex,optionIndex}}
                                      onChange={(info)=>this.onChangeUploadImgProps(info,subItem.topicNo-1,optionItem.topicNo-1)}
                                      {...this.uploadImgProps}>
                                      <Button disabled={optionItem.answer} disabled>
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

                  {/* <Row>
                    <Col span={24}>
                      <Button
                        type="primary"
                        onClick={() => this.addOption(subItem.topicNo,editItem)}
                        // topicno={}
                        // ref="addOption"
                        // disabled={paperDetail.state===1}
                        disabled
                        style={{ width: '100%' }}
                        icon={'plus'}
                      >
                        新增选项
                      </Button>
                    </Col>
                  </Row> */}
                  {/* <Row>
                    <Col span={3}>答案:</Col>
                    <Col span={13}>
                      <InputNumber defaultValue={subItem.answer} min={1} max={10} />
                    </Col>
                  </Row> */}
                  {subItem.topicNo === editItem.subTopics.length && (

                  <Row className={styles.rightFooter}>
                    <Col span={3}>解析:</Col>

                    <Col span={20}>
                      <Input.TextArea
                      disabled
                        value={subItem.parse}
                        onChange={()=>this.handleGetInputText(index,event)}                        
                        placeholder={'专项说明文本（0/180）'}
                        rows={8}
                      />
                    </Col>
                  </Row>
                    )}
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
      currentEditIndex,
      editorContent,
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
                disabled
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
                    disabled
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
                          <RadioButton  disabled key={item.id} value={item.id}>
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
        该试卷音频总长:{paperDetail.totalDuration ? `${((paperDetail.totalDuration/60).toFixed(2))}分钟` : '暂无'}

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
                  paperDetail.topics.map((item,itemIndex) => (
                    <div
                      key={item.topicNo}
                      className={styles.card}
                      onClick={() => this.handleEdit(item,itemIndex)}
                    >

                      {item.type === 1 ? (
                        <div key={item.id}>
                          {item.subTopics.map(subItem => {
                            return (
                              <div key={subItem.topicNo}>
                                <div className={styles.examTitle}>
                                  <h2 style={{ float: 'left', marginRight: 11 }}>
                                    {/* {item.topicNo === subItem.topicNo ? item.topicNo : ''} (
                                    {subItem.topicNo}).{subItem.title}({item.score}分) */}

                                    {item.subTopics.length>1 ?`${item.topicNo} (${subItem.topicNo})`:item.topicNo}.{subItem.title}({item.score}分)

                                  </h2>
                                </div>


                                {subItem.options.map((subOption) => {
                                  return (
                                    <ul  key={subOption.topicNo} style={{padding:0, lineHeight: '31px' }}>
                                      <li> { optionTransfer[subOption.topicNo-1]}.&nbsp;
                                      {/* {subOption.image && !subOption.image.includes('http') || } */}
                                      {subOption.answer || subOption.image && subOption.image.includes('http') && (
                                        <img style={{width:75,height:'auto'}} src={subOption.image} />
                                      )}</li>
                                    </ul>
                                  );
                                })}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div key={item.id}>

                        {item.subTopics.map(subItem => {
                            return (
                              <div key={subItem.topicNo}>
                                <div className={styles.examTitle}>
                                  <div 
                                  
                                  style={{ float: 'left', marginRight: 11 }}>
                                    {item.topicNo }.
                                    ({item.score}分)

                                    <div className={styles.richText} dangerouslySetInnerHTML={{__html:subItem.title||''}}>

                                    </div>

                                  </div>
                                </div>
                                <div className={styles.flex}>
                                  {subItem.options && subItem.options.length &&  subItem.options.map((optionItem,optionIndex) => {
                                    return (
                                      <Fragment key={optionIndex}>
                                      {item.topicNo}({optionIndex+1})
                                      <div className={styles.flexItem}> 
                                      <input   className={styles.spanAnswer}/>
                                      </div>
                                    </Fragment>
                                    )
                                  })}
                                  </div>

                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </Col>

          </Row>

        </div>
      )
    );
  }
}




export default Detail;
