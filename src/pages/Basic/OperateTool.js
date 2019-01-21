import React, { Component } from 'react';
import { Icon } from 'antd';
import { connect } from 'dva';
import styles from './List.less';



const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_696758_riuzzc04t8.js', // 在 iconfont.cn 上生成
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

        //at.alicdn.com/t/font_1025319_dzdp1dcdli.js
        op

                <MyIcon type="icon-sort" />

      </div>
    )
  }
}


export default OperateTool;