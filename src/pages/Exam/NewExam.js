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
import E from 'wangeditor';
import moment from 'moment';
import cloneDeep from 'lodash/cloneDeep'
import mapRadioToOptions from '@/utils/mapRadioToOptions';
import RenderSelectP from './components/RenderSelectP'
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

@connect(({ examlist, operate }) => ({
  examlist,
  operate,
}))
@Form.create()
class NewExam extends PureComponent {

 
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
        // console.log(info.file, 'info.file');
        // console.log(info.fileList, ' info.fileList');
      }
      
      if (info.file.status === 'done') {
        // debugger
        message.success(`${info.file.name} 音频上传成功!`,5);
        if (info.file.response.code === 1) {
          // const {currentEditIndex,uploadList} = _this.state;
          // const arr = clonedeep(uploadList);

          // arr[currentEditIndex] = {
          //   uploadAudioDuration:info.file.response.data.duration,
          //   uploadAudioPath: info.file.response.data.path,
          //   uploadAudioName: info.file.name,

          // }

          _this.setState({
            uploadAudioDuration:info.file.response.data.duration,
            uploadAudioName:info.file.response.data.path,
          }
          );
          }
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
    }
  }
  onChangeUploadImgProps =(info,subItemIndex,optionIndex)=>{
    const { subTopicsListTemp } = this.state;
    const copySub = clonedeep(subTopicsListTemp);
   
    // console.log(info)
    // debugger

    const _this = this;
    if (info.fileList.length > 1) {
      info.fileList.shift();
    }

  if (info.file.status !== 'uploading') {
    // console.log(info.file, 'info.file');
    // console.log(info.fileList, ' info.fileList');
  }
  
  if (info.file.status === 'done') {

    message.success(`${info.file.name} 图片上传成功!`,5);
    if (info.file.response.code === 1) {
      copySub[subItemIndex].options[optionIndex].image = info.file.response.data.path;
      this.setState({
        subTopicsListTemp:copySub
      })
      }
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  onChangeUploadImgParseProps =(info,subItemIndex)=>{
    const { subTopicsListTemp } = this.state;
    const copySub = clonedeep(subTopicsListTemp);
   
    const _this = this;
    if (info.fileList.length > 1) {
      info.fileList.shift();
    }

  if (info.file.status !== 'uploading') {
    // console.log(info.file, 'info.file');
    // console.log(info.fileList, ' info.fileList');
  }
  
  if (info.file.status === 'done') {

    message.success(`${info.file.name} 图片上传成功!`,5);
    if (info.file.response.code === 1) {
      copySub[subItemIndex].parse = info.file.response.data.path;
      this.setState({
        subTopicsListTemp:copySub
      })
      }
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
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
  constructor(props, context) {
    super(props, context);
    this.state = {
      ctxImg:'',
      count:0,
      editorContent: '',
      currentEditIndex:0,
      radioValueList:[],
      isUploading:false,
      uploadAudioDuration:'',
      uploadAudioName:'',
      // uploadList:[
      //   {
      //     uploadAudioName: '',
      //     uploadAudioDuration: 0,
      //     uploadAudioPath:'',
      //   }
      // ],
      editItem: null,
      currentEditType: 1,
      showEdit: false,
      // editItem.subTopics
      subTopicsListTemp:[], // 新增题目的临时List
      topicsListTemp:[], // 预览题目的临时List
      paperDetailHeader:{
        title:'',
        specialId:null,
        level:0.1,
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

  clickHandle() {
    alert(this.state.editorContent)
}

  // onSubmitExam = () => {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'exam/createPaper',
  //     payload: '',
  //   });
  // };


  

  addSelectTopic = ()=>{
    const data =  [];
   
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
      }
    })
  }
// 确认 新增题目
onAddSubTopicsSubmit = e => {

    // const { dispatch } = this.props;
    const { currentEditType } = this.state;

    // const data =  [];

    e.preventDefault();
   
    if(currentEditType ===1) {
      this.addSelectTopic()
      return 
    }

    this.props.form.validateFields({ force: true }, (err, values) => {
      const options =[];
      const data = [];
// debugger

      if (!err && values && values.topicNum>0) {

        for(let i =0;i <values.topicNum;i++) {
          options.push({
              "answer": "",
              "image": ""
          })
      }
      data.push({
        "title": "",
        "parse": "",
        options
      })

      // debugger

        this.setState({
          subTopicsListTemp:data,
          editItem:null,
          editorContent:'',
        })
      }
    })


}

  handleTopicScore =  (event)=>{
    const {editItem} = this.state;
    const examTmp = clonedeep(editItem);

    examTmp.score = Number(event.target.value);
    this.setState({
      editItem:examTmp
    })
  }

  

  handleTopicSubNum =  (event)=>{
    const {editItem} = this.state;
    const examTmp = clonedeep(editItem);

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
    const examTmp = clonedeep(subTopicsListTemp);

    examTmp[index].parse = event.target.value;
    this.setState({
      subTopicsListTemp:examTmp
    })
  }

  handleGetInputValue= (index,event)=>{
    // console.log(e,'e')
    // console.log(event.target.value,'e')
    const {subTopicsListTemp} = this.state;
    const examTmp = clonedeep(subTopicsListTemp);

    examTmp[index].title = event.target.value;
    this.setState({
      subTopicsListTemp:examTmp
    })
  }




  handleGetTitle= (event)=>{
    // console.log(e,'e')
    // console.log(event.target.value,'e')

    // const examTmp = clonedeep(editItem);

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

    // const examTmp = clonedeep(editItem);

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
    const examTmp = clonedeep(subTopicsListTemp);
    
    examTmp[index].options[optionsIndex].answer = event.target.value;
    this.setState({
      subTopicsListTemp:examTmp
    })
  }

  // const {subTopicsListTemp} = this.state;
  // const examTmp = clonedeep(subTopicsListTemp);

  // examTmp[index].title = event.target.value;
  // this.setState({
  //   subTopicsListTemp:examTmp
  // })
  // debugger


  onChangeCurrentEditType = (event)=>{

    this.setState({
      currentEditType: Number(event.target.value),
      subTopicsListTemp:[],
      editItem:null,
      uploadAudioDuration:'',
      uploadAudioName:''
    })
    // debugger
  }

  onChangeRadio = (index,event) => {
    // console.log(event.target.value,'e')
    // console.log(index)

    const {subTopicsListTemp} = this.state;

    const examTmp = clonedeep(subTopicsListTemp);

    // this.state.radioValueList[index] = event.target.value;
    // const v = this.refs.radioGroup.props.topicno;
    const copyData =  clonedeep(this.state.radioValueList)
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
    const data =  clonedeep(v);

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
        _this.props.form.resetFields();
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

    const dataList = clonedeep(topicsListTemp);
    const _this = this;


    confirm({
      title,
      content,
      onOk() {
        dataList.splice(itemIndex,1);

        const totalScore = dataList.reduce(function(accumalator,cur){
          // return accumalator+Number(cur.score)
            return accumalator+Number(cur.score*cur.subTopics.length)
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
    let editorContent = '';

    const radioValueList = [];
    if(item.type ===1 ) {
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
    }
    
    if(item.type ===2) {
      editorContent = item.subTopics[0].title
    }
    this.props.form.setFieldsValue({
      topicNum:item.subNum,
      topicScore:item.score
    })


    this.setState({
      // editItem: item,
      editorContent,
      showEdit: true,
      currentEditType: item.type,
      radioValueList,
      subTopicsListTemp:item.subTopics,
      // currentItem:item.subTopics,
      uploadAudioName:item.audio,
      uploadAudioDuration:item.audioDuration,
      currentEditIndex:itemIndex
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



  dispatchCreatePaper = ()=>{
    const {paperDetailHeader, topicsListTemp} = this.state;
    const {dispatch} = this.props;

    // console.log(paperDetailHeader,'pageDetailHeader')
    // debugger

    const mergeData = {
      ...paperDetailHeader,
      topics:topicsListTemp
    }

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

      {/* <span> 默认提交后，试卷状态为启用</span> */}
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
        该试卷音频总长:{paperDetailHeader.totalDuration ? `${((paperDetailHeader.totalDuration/60).toFixed(2))}分钟` : '暂无'}
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

  }


  saveChangeOrTopic =()=>{

    this.setState({
      uploadAudioName:'',
      uploadAudioDuration:''
    })
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
      topicsListTemp,currentEditIndex,radioValueList,subTopicsListTemp,paperDetail,editorContent } = this.state;
      let currentItem =[];

      if(currentEditType ===2) {
        // subTopicsListTemp[0].title = 
        let cloneSub = clonedeep(subTopicsListTemp[0])
        cloneSub = {
          ...subTopicsListTemp[0],
          title:editorContent
        }
        const tmpObj =cloneSub
        currentItem.push(tmpObj)
        
      } else {
         currentItem = mapRadioToOptions(radioValueList,subTopicsListTemp);
      }

    const data = clonedeep(topicsListTemp);


    // debugger


    for (let index = 0; index < currentItem.length; index++) {
      // const element = array[index];
      if(currentItem[index].parse == '' || currentItem[index].title ==''){
        message.error(`题目和解析为必填`);
        return false;
      }
    

      const isInputCorrect =  currentItem[index].options.filter(item=>item.isCorrect === 1);
      
      if(isInputCorrect.length<=0) {
        message.error(`请选择正确答案`);
        return false;
      }

      //TODO
      if(currentItem[index].options&& currentItem[index].options.length) {

        for (let index2 = 0; index2 < currentItem[index].options.length; index2++) {
          if(currentItem[index].options[index2].image === '' && currentItem[index].options[index2].answer === '') {
            message.error(`缺少选项信息`);
            return false;
          }
  
        }
      }
    }
    
// debugger
    data[currentEditIndex] = {
      type:currentEditType,
      subTopics:currentItem,
      audio:uploadAudioName,
      audioDuration:uploadAudioDuration,
      score:this.props.form.getFieldsValue().topicScore,
      subNum:this.props.form.getFieldsValue().topicNum,
    }

    // bug
    const totalScore = data.reduce(function(accumalator,cur){
      // return accumalator+Number(cur.score)
      return accumalator+Number(cur.score*cur.subNum)
    },0)
    const totalDuration = data.reduce(function(accumalator,cur){
      return accumalator+Number(cur.audioDuration)
    },0)

    // const totalScore = mergeData.reduce(function(accumalator,cur){
    //   return accumalator+Number(cur.score)*Number(cur.subNum)
    // },0)
    // const totalDuration = mergeData.reduce(function(accumalator,cur){
    //   return accumalator+Number(cur.audioDuration)
    // },0)
    

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
    
    // subTopicsListTemp.forEach(item=>{
    //   // item.
    //   if(item.parse == '' || item.title ==''){
    //     message.error(`请输入完整信息`);
    //     return false;
    //   }
    //   item.options.forEach(oitem=>{
    //     if(oitem.answer === '') {
    //       message.error(`请输入完整信息`);
    //       return false;
    //     }

    //   })

    // });


    for (let index = 0; index < subTopicsListTemp.length; index++) {
      // const element = array[index];
      // if(subTopicsListTemp[index].parse == '' || subTopicsListTemp[index].title ==''){
      if(subTopicsListTemp[index].title ==''){
        message.error(`题目和解析为必填`);
        return false;
      }

      const isInputCorrect =  subTopicsListTemp[index].options.filter(item=>item.isCorrect === 1);
      
      if(isInputCorrect.length<=0) {
        message.error(`请选择正确答案`);
        return false;
      }

      // const isInputCorrect =  currentItem[index].options.filter(item=>item.isCorrect === 1);
      
      // if(isInputCorrect.length<=0) {
      //   message.error(`请选择正确答案`);
      //   return false;
      // }

    
      for (let index2 = 0; index2 < subTopicsListTemp[index].options.length; index2++) {
        if(subTopicsListTemp[index].options[index2].image === '' && subTopicsListTemp[index].options[index2].answer === '') {

          message.error(`缺少选项信息`);
          return false;
        }

      }
    }
    
    // debugger
    // return;
    const sub = [];
    const obj = subTopicsListTemp;

    const formData = this.props.form.getFieldsValue();

    if(currentEditType === 2) {
      const obj = [{
        ...this.subTopicsListTemp,
        title:this.state.editorContent
      } ]
      // subTopicsListTemp[0].title = this.state.editorContent;
    }

      const topicsList = [];

      // tmpSubNum 
      const topicsListObj = {
        type:currentEditType,
        audio:uploadAudioName,
        audioDuration:uploadAudioDuration,
        score:formData.topicScore,
        subTopics:obj,
        subNum:formData.topicNum
      };
      topicsList.push(topicsListObj);



      const mergeData = topicsListTemp.concat(topicsList)

        //  paperDetailHeader.totalScore
    // paperDetailHeader.totalDuration
    const totalScore = mergeData.reduce(function(accumalator,cur){
      return accumalator+Number(cur.score)*Number(cur.subNum)
    },0)
    const totalDuration = mergeData.reduce(function(accumalator,cur){
      return accumalator+Number(cur.audioDuration)
    },0)

    // debugger

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

  componentDidUpdate(nextProps, nextState){
    // debugger
      // let count =0;
     const {count}  = this.state;
     if(nextState.currentEditType===1) {
       this.setState({
         count:0
       })
     }
    if(count ===0 && nextState.currentEditType===2) {
      this.setState({
        count:1
      })
      // count++;
      // debugger
      // if(count) {
     

    }


  }

  renderEditor=()=>{
    // debugger

    const elem = this.refs.editorElem
    if(!elem){
      const editor = elem && new E(elem)
      editor.customConfig.onchange = html => {
        this.setState({
          editorContent: html
        })
      }
      editor.customConfig.menus = [
        'image',  // 插入图片
      ];
      editor.customConfig.uploadImgMaxSize = 5 * 1024 * 1024;
      editor.customConfig.uploadImgMaxLength = 1
      editor.customConfig.uploadImgServer = 'https://api.jze100.com/hear/admin/file/upload';
      editor.customConfig.uploadImgHooks = {
        before: function (xhr, editor, files) {
            // 图片上传之前触发
            // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
            
            // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
            // return {
            //     prevent: true,
            //     msg: '放弃上传'
            // }
        },
        success: function (xhr, editor, result) {
            // 图片上传并返回结果，图片插入成功之后触发
            // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
            // console.log(xhr)
            // console.log(editor)
            // console.log(result)
             const path = result.data.path;
            //  var btnId = editor.imgMenuId;
             editor.cmd.do('insertHtml', '<img src="' + path + '" style="max-width:100%;"/>')

            // this.setState({
            //   ctxImg:path
            // })
            //  debugger

            //  btnId.src = path;
            //  this.setState({
              //  subTopicsListTemp=
            //  })
            // debugger
        },
        fail: function (xhr, editor, result) {
            // 图片上传并返回结果，但图片插入错误时触发
            // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
        },
        error: function (xhr, editor) {
            // 图片上传出错时触发
            // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
        },
        timeout: function (xhr, editor) {
            // 图片上传超时时触发
            // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
        },
    
        // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
        // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
        customInsert: function (insertImg, result, editor) {
            // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
            // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
    
            // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
            var url = result.url
            insertImg(url)
    
            // result 必须是一个 JSON 格式字符串！！！否则报错
        }
      }
      editor.customConfig.showLinkImg = false
      editor.customConfig.zIndex = 100
      editor.create()
    
  }
  }

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
    return (
      <Fragment>
        <div className={styles.item1}>
          {subTopicsListTemp.length &&
            subTopicsListTemp.map((subItem,subIndex) => {
              return (
                <Fragment key={subIndex}>
                  <Row>
                    <Col span={4}>题目({subIndex+1}):</Col>

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
                                  <Col span={6}>选项: {optionTransfer[optionIndex]} </Col>
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
                                      <Upload
                                      // data={{subIndex,optionIndex}}
                                      onChange={(info)=>this.onChangeUploadImgProps(info,subIndex,optionIndex)}
                                      {...this.uploadImgProps}>
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
                  {subIndex+1 === subTopicsListTemp.length && (
                  <Row className={styles.rightFooter}>
                    <Col span={3}>解析:</Col>

                    <Col span={13}>
                      {/* <Input.TextArea
                        value={subItem.parse}
                        onChange={()=>this.handleGetInputText(subIndex,event)}                        
                        placeholder={'专项说明文本（0/180）'}
                        rows={8}
                      /> */}
                      <Upload
                        onChange={(info)=>this.onChangeUploadImgParseProps(info,subIndex)}
                        {...this.uploadImgProps}>
                        <Button >
                            <Icon type="upload" /> 上传图片
                          </Button>
                        </Upload>
                    </Col>
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
                  </Row>
                    )}
                    <Row>
                    {subTopicsListTemp[subIndex].parse 
                    &&
                      <img style={{width:200,height:200}} src={subTopicsListTemp[subIndex].parse} alt=""/>
                    }
                    </Row>
                </Fragment>
              );
            })}
        </div>
      </Fragment>
    );
  };



//  dispatchEditContent = (html)=>{
//    this.setState({
//      editorContent:html
//    })
//  }



dispatchEditContent = (html)=>{
  const {subTopicsListTemp} = this.state;
  const data = clonedeep(subTopicsListTemp);
  data[0].title = html;
  this.setState({
    editorContent:html
  })
  // debugger
  this.setState({
    subTopicsListTemp:data
  })
}

 dispatchSubTopicsListTemp = (cloneSubTopicsListTemp)=>{
   this.setState({
     subTopicsListTemp:cloneSubTopicsListTemp
   })
 }
  getSpaceTopic = (item,itemIndex)=>{
    return (
      <div key={itemIndex}>

      {item.subTopics.map((subItem,subIndex)=> {
          return (
            <div key={subIndex}>
              <div className={styles.examTitle}>
                <div 
                
                style={{ float: 'left', marginRight: 11 }}>
                  {itemIndex+1 }.
                  ({item.score}分)

                  <div className={styles.richText} dangerouslySetInnerHTML={{__html:subItem.title||''}}>

                  </div>

                </div>
                  <a
                    onClick={() => this.handleEdit(item,itemIndex)}
                    style={{ marginRight: 5 }}
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
              <div className={styles.flex}>
                {subItem.options &&  subItem.options.length &&  subItem.options.map((optionItem,optionIndex) => {
                  return (
                    <Fragment key={optionIndex}>

                    {/* {currentEditIndex+1} ({optionIndex}) */}
                    {itemIndex+1}({optionIndex+1})
                    <div className={styles.flexItem}> 
                    <input  className={styles.spanAnswer}/>
                    </div>
                  </Fragment>
                  )
                })}
                </div>

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
      editorContent,
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
                     min={0.1} max={5} step={0.1} value={Number(paperDetailHeader.level)} />
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
                  该试卷音频总长:{paperDetailHeader.totalDuration ? `${((paperDetailHeader.totalDuration/60).toFixed(2))}分钟` : '暂无'}
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

                                    {item.subTopics.length>1 ?`${itemIndex+1} (${subItemIndex+1})`:itemIndex+1}.{subItem.title}({item.score}分)
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
                                    <ul key={subOptionIndex} style={{padding:0, lineHeight: '31px' }}>
                                      <li> {optionTransfer[subOptionIndex]}.&nbsp;
                                      {/* {!subOption.image.includes('http') && } */}
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
                          <RadioButton  disabled={showEdit && currentEditType===2} value={1}>
                            选择
                          </RadioButton>
                          <RadioButton   disabled={showEdit && currentEditType===1} value={2}>
                            段落填空
                          </RadioButton>
                        </RadioGroup>
                      </Form.Item>
                    </Row>
                  <div className={styles.itemHeader}>
                    <Row>
                      <Col span={10}>
                        <span>

                          上传音频: {editItem && editItem.audio  || uploadAudioName || ''}
                                       
                          {/* {isUploading  && uploadList[currentEditIndex].uploadAudioName} */}

{/* {!isUploading && editItem && editItem.audio } */}

                          </span>
                      </Col>
                      <Col span={6}>
                        <span>
                        该音频时长:
                        {editItem && editItem.audioDuration  || (uploadAudioDuration>0 && formatDuration(uploadAudioDuration)) || ''}
                        {/* audioDuration */}

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
                          initialValue:1
                        })(<InputNumber min={1} max={100}  />)}
                      </Form.Item>


                    </Col>
                      <Col span={6}>

                         {<Button disabled={uploadAudioDuration =='' || uploadAudioName =='' || subTopicsListTemp.length!=0} htmlType="submit" style={{ width: 120,marginLeft:5 }} type="primary"> 

                          确认
                        </Button>

                         }
                    </Col>
                    </Row>
                    </div>
                </Form>

                { currentEditType ===1 && subTopicsListTemp.length>0 &&  this.renderSelectQs()}
                { currentEditType ===2 && subTopicsListTemp.length>0 &&  <RenderSelectP
                showEdit={showEdit}
                cancelEditOrEmpty={this.cancelEditOrEmpty}
                editorContent={editorContent}
                saveChangeOrTopic={this.saveChangeOrTopic}
                dispatchSubTopicsListTemp={this.dispatchSubTopicsListTemp}
                dispatchEditContent={this.dispatchEditContent}
                currentEditIndex={currentEditIndex}
                 subTopicsListTemp={subTopicsListTemp}/>}
                
                </div>
            </Col>

          </Row>



        </div>
      )
    );
  }
}

export default NewExam;

