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
import _ from 'lodash'





class RenderSelectP extends PureComponent {


    //  constructor(props){
    //    super(props)
    
    
    //  }
    
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
      const cloneSubTopicsListTemp = _.cloneDeep(subTopicsListTemp);
    
      cloneSubTopicsListTemp[index].parse = event.target.value;
      this.props.dispatchSubTopicsListTemp (
        cloneSubTopicsListTemp
      )
    }
    
    handleGetInputAnswer= (index,optionIndex,event)=>{
        // debugger
        // console.log(e,'e')
        // console.log(event.target.value,'e')
        // console.log(index)
        const {subTopicsListTemp} = this.props;
        const cloneSubTopicsListTemp = _.cloneDeep(subTopicsListTemp);
        
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
    
    //     const examTmp = _.cloneDeep(subTopicsListTemp);
    
    //     // this.state.radioValueList[index] = event.target.value;
    //     // const v = this.refs.radioGroup.props.topicno;
    //     const copyData =  _.cloneDeep(this.state.radioValueList)
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
      const {cancelEditOrEmpty,saveChange,editorContent,subTopicsListTemp,showEdit,currentEditIndex,dispatchEditContent,state} = this.props;
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
                          <Input.TextArea
                            value={subItem.parse}
                            onChange={()=>this.handleGetInputText(subIndex,event)}                        
                            placeholder={'专项说明文本（0/180）'}
                            rows={8}
                          />
                        </Col>

                        {/* {state ===2 && (subIndex+1 === subTopicsListTemp.length && (
                          <Col span={7} className={styles.opt}>
                            <Row>
                              <Button onClick={cancelEditOrEmpty} style={{ width: '100%' }}>

                          { showEdit ? '取消编辑':'清空重新录入'}
                              </Button>
                            </Row>
                            <Row>
                              <Button
                                onClick={() => saveChange()}
                                type="primary"
                                style={{ width: '100%' }}
                              >
                          { showEdit ? '保存修改':'确认试题'}
                              </Button>
                            </Row>
                          </Col>
                        ))} */}
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