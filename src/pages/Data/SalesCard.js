import React, { Component } from 'react';
import { Row, Col, Card, Tabs, DatePicker } from 'antd';
import { FormattedMessage, formatMessage } from 'umi/locale';
import numeral from 'numeral';
import styles from './Analysis.less';
import { Bar } from '@/components/Charts';
import { connect } from 'dva';
import { getTimeDistance } from '@/utils/utils';
import { deflateRaw } from 'zlib';


const { RangePicker } = DatePicker;
const { TabPane } = Tabs;


// const salesData = [];
// for (let i = 0; i < 12; i += 1) {
//   salesData.push({
//     x: `${i + 1}月`,
//     y: Math.floor(Math.random() * 1000) + 200,
//   });
// }
@connect(({loading,chart}) => ({
  chart,
  loading: loading.effects['chart/getReportPaper'],
}))
class SalesCard extends Component {

  state = {
    rangePickerValue: getTimeDistance('today'),
    dateType:1, //日期类型（1：当天，2：非当天）
    startDate:null,
    endDate:null,
    activeKey:null,
    specialList:[],
    specialId:null,
    paperData:[],
    chartData:[]
  }

  handleTabChange = key => {

    const {dispatch} = this.props;
    const {dateType,startDate,endDate} = this.state;
    // debugger
  
    let obj = {
      specialId:Number(key),
      dateType:dateType
    }
    if(dateType===2 && startDate && endDate){
      obj.startDate = startDate
      obj.endDate = endDate

    }

    dispatch({
      type: 'chart/getReportPaper',
      payload:obj
    });

    this.setState({
      specialId:Number(key),
      activeKey:key
    })

  };
  

  selectDate = type => {
    console.log(type,'type');
    const { dispatch } = this.props;
  

    const {startDate,endDate,specialId} = this.state;
    let dateType=1;

    type ==='today'? dateType = 1: dateType = 2;


    const start = getTimeDistance(type)[0].valueOf();
    const end = getTimeDistance(type)[1].valueOf();
    let obj = {
      specialId,
      dateType:dateType
    }
    if(dateType===2 && start && end){
      obj.startDate = start
      obj.endDate = end
    }

    


    this.setState({
      dateType:dateType,
      rangePickerValue: getTimeDistance(type),
      startDate:start,
      endDate:end
    });

    dispatch({
      type: 'chart/getReportPaper',
      payload:obj
    });
  };

  componentWillReceiveProps(nextProps){

    let  data= nextProps.chart.paperData && nextProps.chart.paperData.map(item=> {
      return {
       x:item.paperTitle, y:item.completeAmount
      }
    })

    if(nextProps.chart.paperData !== this.state.paperData)
// debugger

     

      this.setState({
        paperData:nextProps.chart.paperData,
        chartData:data || []
      })
  }

  componentDidMount(){
    const {dispatch} = this.props;

    dispatch({
      type: 'operate/fetchSpecialList',
      callbackPaper:this.callback
    });


  // const rankingListData = [];
  // for (let i = 0; i < 7; i += 1) {
  //   rankingListData.push({
  //     title: `因果训练day${i}`,
  //     total: 323234,
  //   });
  // }

// console.log(321)
  }


  callback = v => {
    const {dispatch} = this.props;
    // const {dateType} = this.state;
    const _this = this;
    if (!v[0].id) return;
    // const dateType = type ==='today'?1:2;
    this.setState({
      specialId: v[0].id,
      specialList:v
    },()=>{
      dispatch({
        type: 'chart/getReportPaper',
        payload:{
          specialId:v[0].id,
          dateType:1
        },
        callbackPaperData:_this.callbackPaperData
      });
    })

  };

  callbackPaperData = (v)=>{
    // debugger
    this.setState({
      paperData:v
    })
  }


  isActive = type => {
    const { rangePickerValue } = this.state;
    const value = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return '';
    }
    if (
      rangePickerValue[0].isSame(value[0], 'day') &&
      rangePickerValue[1].isSame(value[1], 'day')
    ) {
      return styles.currentDate;
    }
    return '';
  };

  handleRangePickerChange = rangePickerValue => {
    const { dispatch } = this.props;
    this.setState({
      rangePickerValue,
    });

    dispatch({
      type: 'chart/getReportPaper',
      payload:{
        rangePickerValue
      }
    });
  };

  render(){
    const {loading} = this.props;
    const {activeKey,specialId,chartData,paperData,specialList,rangePickerValue} = this.state;
    // debugger

    return(
      <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
     <div className={styles.salesCard}>
        <Tabs
         defaultActiveKey={String(specialId)}
        //  defaultActiveKey={activeKey}

          onChange={this.handleTabChange}
          tabBarExtraContent={
            <div className={styles.salesExtraWrap}>
              <div className={styles.salesExtra}>
                <a className={this.isActive('today')} onClick={() => this.selectDate('today')}>
                  今日
                </a>
                <a className={this.isActive('week')} onClick={() => this.selectDate('week')}>
                  本周
                </a>
                <a className={this.isActive('month')} onClick={() => this.selectDate('month')}>
                  本月
                </a>
                <a className={this.isActive('year')} onClick={() => this.selectDate('year')}>
                  全年
                </a>
              </div>
              <RangePicker
                value={rangePickerValue}
                onChange={this.handleRangePickerChange}
                style={{ width: 256 }}
              />
            </div>
            }
            size="large"
            tabBarStyle={{ marginBottom: 24 }}
        >

        {specialList.map((sitem,idx)=>{
          return (
            <TabPane
              tab={sitem.title}
              key={sitem.id}
              // key={idx}
            >
            <Row>
                <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                  <div className={styles.salesBar}>
                    <Bar
                      height={295}
                      title={'试卷完成量'}
                      data={chartData}
                    />
                  </div>
                </Col>
                <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                  <div className={styles.salesRank}>
                    <h4 className={styles.rankingTitle}>
                      试卷访问排名
                    </h4>
                    <ul className={styles.rankingList}>
                      {paperData.map((item, i) => (
                        <li key={item.paperId}>
                          <span
                            className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}
                          >
                            {i + 1}
                          </span>
                          <span className={styles.rankingItemTitle} title={item.paperTitle}>
                            {item.paperTitle}
                          </span>
                          <span className={styles.rankingItemValue}>
                            {numeral(item.accessAmount).format('0,0')}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Col>
              </Row>
            </TabPane>
          )
        })
        }
         
        </Tabs>
      </div>

    </Card>
    )
  }


}


export default SalesCard;
