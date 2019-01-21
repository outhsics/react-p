import React, { Component } from 'react';
import { Icon, Row, Col } from 'antd';
import { connect } from 'dva';
import styles from './List.less';



const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1025319_x6knp53yai.js', // 在 iconfont.cn 上生成
});


@connect(({ operate }) => ({
  operate,
}))
class OperateTool extends Component {


  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'operate/fetch'
    })
  }




  render() {


    return (
      <div className="container">
        <Row>

          <MyIcon
            className={styles.blue}
            type="icon-number2" />
          <h2>

            文案管理
</h2>


        </Row>

      </div>
    )
  }
}


export default OperateTool;