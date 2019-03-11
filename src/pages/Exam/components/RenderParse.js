import React, { PureComponent } from 'react';
import {
    Button,
    Form,
    Row,
    Col,
    message,
  } from 'antd';
  import E from 'wangeditor';

class RenderParse extends PureComponent {


    state = {
      renderHtml:''
    }
    
    renderEditors=()=>{
      const elem = this.refs.editorElem
      const _this = this;
        const editor = elem && new E(elem)
        editor.customConfig.onchange = html => {
      

        }
        editor.customConfig.menus = [
            "image"
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
    
    
    
    
      render(){
      const {state} = this.props;
    
        return (
            <div className={styles.item1}>
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
                    <div dangerouslySetInnerHTML={{__html:editorContent}}>

                    </div>
                    </div>  
                </Col>
                </Row>
            </div>
        );
      }
    
    }

    export default RenderParse