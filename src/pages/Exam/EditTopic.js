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

import _ from 'lodash'


class EditTopic extends Component {
    render(){
        const {editItem} = this.props;
        return (
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
                {showEdit && editItem.type === 1 ? this.renderSelectQs(editItem) : ''}
                {showEdit && editItem.type === 2 ? this.renderSelectP() : ''}

                {/* {currentEditType === 1 && !showEdit ? this.renderNewSelectQs() : ''} */}
                {/* {currentEditType === 2 && !showEdit ? this.renderNewSelectP() : ''} */}
              
            </div>
        )
    }
}

export default EditTopic