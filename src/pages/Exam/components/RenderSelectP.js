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
  import E from 'wangeditor';
import styles from '../List.less';
import cloneDeep from 'lodash/cloneDeep'





class RenderSelectP extends PureComponent {


    //  constructor(props){
    //    super(props)
    
    
    //  }

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
    
    state = {
      renderHtml:''
    }
    
    renderEditors=()=>{
      const elem = this.refs.editorElem
      const _this = this;
      const img = _this.props.state ===1 ? '':'image'
      // debugger
      // if(elem!== undefined){
        const editor = elem && new E(elem)
        editor.customConfig.onchange = html => {
          // this.setState({
          //   editorContent: html

          // })
        

        }
        editor.customConfig.menus = [
          img,  // 插入图片
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
              //  editor.cmd.do('insertHtml', '<img src="' + path + '" style="max-width:100%;"/>')
              //  _this.setState({
              //   renderHtml:'<img src="' + path + '" style="max-width:100%;"/>'
              //  })

               const {dispatchEditContent,subTopicsListTemp,currentEditIndex} = _this.props;
              //  debugger
               dispatchEditContent('<img src="' + path + '" style="max-width:100%;"/>')
     
              //  subTopicsListTemp[currentEditIndex].title = html;
            
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
      
    // }
    }
    
    componentDidMount(){
      // ;
      this.renderEditors();
      // console.log(this.parent).
      // props.form.getFieldsValue()
    
    }
    
    handleGetInputText= (index,event)=>{
      // debugger
      // console.log(e,'e')
      // console.log(event.target.value,'e')
      // console.log(index)
      // debugger
      const {subTopicsListTemp} = this.props;
      const cloneSubTopicsListTemp = cloneDeep(subTopicsListTemp);
    
      cloneSubTopicsListTemp[index].parse = event.target.value;
      this.props.dispatchSubTopicsListTemp (
        cloneSubTopicsListTemp
      )
    }
    
    onChangeUploadImgParseProps =(info,subItemIndex)=>{
      const {subTopicsListTemp} = this.props;
      const copySub = cloneDeep(subTopicsListTemp);
     
      const _this = this;
      if (info.fileList.length > 1) {
        info.fileList.shift();
      }
  
    if (info.file.status !== 'uploading') {
      console.log(info.file, 'info.file');
      console.log(info.fileList, ' info.fileList');
    }
    
    if (info.file.status === 'done') {
  
      message.success(`${info.file.name} 图片上传成功!`,5);
      if (info.file.response.code === 1) {
        // debugger
        copySub[subItemIndex].parse = info.file.response.data.path;
        // this.setState({
        //   subTopicsListTemp:copySub
        // })
        this.props.dispatchSubTopicsListTemp (
          copySub
        )
        }
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    }


    handleGetInputAnswer= (index,optionIndex,event)=>{
        // debugger
        // console.log(e,'e')
        // console.log(event.target.value,'e')
        // console.log(index)
        const {subTopicsListTemp} = this.props;
        const cloneSubTopicsListTemp = cloneDeep(subTopicsListTemp);
        
        // debugger
        cloneSubTopicsListTemp[index].options[optionIndex].answer = event.target.value;
        this.props.dispatchSubTopicsListTemp (
          cloneSubTopicsListTemp
        )
      }

    //   onChangeRadio = (index,event) => {
    //     console.log(event.target.value,'e')
    //     console.log(index)
    
    //     const {subTopicsListTemp} = this.state;
    
    //     const examTmp = cloneDeep(subTopicsListTemp);
    
    //     // this.state.radioValueList[index] = event.target.value;
    //     // const v = this.refs.radioGroup.props.topicno;
    //     const copyData =  cloneDeep(this.state.radioValueList)
    //     // const copyData = this.state.radioValueList.slice(0);
    
    
    //     copyData[index] = Number(event.target.value);
    
    
    
    //     this.setState({
    //       radioValueList:copyData
    //     })
        
    //     const currentItem = mapRadioToOptions(copyData,examTmp);
    
    //     this.setState({
    //       subTopicsListTemp: currentItem,
    //     });
    // // debugger
    
    
    //   };
    
    
    
      render(){
      const {cancelEditOrEmpty,saveChangeOrTopic,editorContent,subTopicsListTemp,showEdit,currentEditIndex,dispatchEditContent,state} = this.props;
      // const {renderHtml} =this.state;
    //   debugger
    
        return (
          <Fragment>
            <div className={styles.item1}>
              {subTopicsListTemp.length ?
                subTopicsListTemp.map((subItem,subIndex) => {
                  return (
                    <Fragment key={subIndex}>
                      <Row>
                        <Col span={4}>题目:</Col>
      
                        <Col span={18} className={styles.richZindex}>
                          {/* <Input value={subItem.title} onChange={()=>this.handleGetInputValue(subIndex,event)} /> */}
                          {/* <Input.TextArea
                             value={subItem.title}
                             onChange={()=>this.handleGetInputValue(index,event)}                        
                             placeholder={'专项说明文本（0/180）'}
                             rows={8}
                           /> */}
                           <div ref="editorElem" style={{textAlign: 'left'}}>
                           <div dangerouslySetInnerHTML={{__html:editorContent}} >

                           </div>
                           </div>  
                           {/* {this.renderEditor()}} */}
                           
                           {/* <button onClick={this.clickHandle.bind(this)}>获取内容</button> */}
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24}>
                          
                        </Col>
                      </Row>
      
                      <Row>
                        <Col span={4}>答案:</Col>
                        <Col span={18}>
                        <div className={styles.flex}>
                        {subItem.options && subItem.options.length &&  subItem.options.map((optionItem,optionIndex) => {
                          return (
                           <Fragment key={optionIndex}>
      
                            {/* {currentEditIndex+1} ({optionIndex}) */}
                             {showEdit && currentEditIndex+1}
                             ({optionIndex+1})
                            <div className={styles.flexItem}> 
                           <Input 
                            onChange={()=>this.handleGetInputAnswer(subIndex,optionIndex,event)}                        
                            value={optionItem.answer}></Input>
                            </div>
                          </Fragment>
                          )
                        })}
                        </div>
      
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

                        {/* {state ===2  && ( */}
                          <Col span={7} className={styles.opt}>
                            <Row>
                              <Button onClick={()=>cancelEditOrEmpty()} style={{ width: '100%' }}>

                          { showEdit ? '取消编辑':'清空重新录入'}
                              </Button>
                            </Row>
                            <Row>
                              <Button
                                onClick={()=>saveChangeOrTopic()}
                                type="primary"
                                style={{ width: '100%' }}
                              >
                          { showEdit ? '保存修改':'确认试题'}
                              </Button>
                            </Row>
                          </Col>
                        {/* ))} */}
                      </Row>
                      <Row>
                    {subTopicsListTemp[subIndex].parse 
                    &&
                      <img style={{width:200,height:200}} src={subTopicsListTemp[subIndex].parse} alt=""/>
                    }
                    </Row>
                    </Fragment>
                  );
                }) :null}
            </div>
          </Fragment>
        );
      }
    
    }

    export default RenderSelectP