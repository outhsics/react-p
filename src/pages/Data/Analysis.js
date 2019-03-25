import React, { Component, Suspense } from 'react';
import { Icon } from 'antd';
import { connect } from 'dva';
import styles from './Analysis.less';
import PageLoading from '@/components/PageLoading';
import { getTimeDistance } from '@/utils/utils';


const IntroduceRow = React.lazy(() => import('./IntroduceRow'));
const SalesCard = React.lazy(() => import('./SalesCard'));





// const rankingListData = [];
// for (let i = 0; i < 7; i += 1) {
//   rankingListData.push({
//     title: `因果训练day${i}`,
//     total: 323234,
//   });
// }

@connect(({operate,report,loading,chart}) => ({
  report,
  operate,
  chart,
  loading: loading.effects['report/fetch'],
}))
class Analysis extends Component {
  state = {
    
    salesType: 'all',
    rangePickerValue: getTimeDistance('today'),
    dateType:1,
    startDate:null,
    endDate:null,
    rankingListData:[]
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


  selectDate = type => {
    console.log(type,'type');
    const { dispatch } = this.props;
    // console.log(getTimeDistance(type)[1].valueOf(),'11')
    // this.state.filterData.qcte = value[1].valueOf();
    // this.state.filterData.qcte = value[1].valueOf();
    const dateType = type ==='today'?1:2;

    this.setState({
      dateType,
      rangePickerValue: getTimeDistance(type),
      startDate:getTimeDistance(type)[0].valueOf(),
      endDate:getTimeDistance(type)[1].valueOf(),
    });

    dispatch({
      type: 'chart/getReportPaper',
    });
  };

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
  

  componentDidMount() {
    const { dispatch } = this.props;
    // this.reqRef = requestAnimationFrame(() => {
    //   dispatch({ß卷完成量
    //     type: 'report/fetch',
    //   });
    // });
    dispatch({
        type: 'report/fetch',
    });
   
    

    // dispatch({
    //   type: 'examlist/fetchPaperList',
    //   payload: {
    //     pageNum: 1,
    //     pageSize: 100,
    //     specialId: this.state.specialId||36,
    //   } 
    // });
  }
 


  componentWillUnmount() {
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'report/clear',
    // });
    // cancelAnimationFrame(this.reqRef);
    // clearTimeout(this.timeoutId);
  }
  // static getDerivedStateFromProps(nextProps, prevState) {
    
  
  // }
  

  handleChangeSalesType = e => {
    this.setState({
      salesType: e.target.value,
    });
  };

  // handleTabChange = key => {
  //   this.setState({
  //     specialId: key,
  //   });
  //   console.log(key,'specialId')
  // };

  // renderList = (resources = []) => resources.map(resource => {
  //         return (
  //           <div className={styles.row} key={resource.id}>

  //             <a href={resource.url} className={styles.left}>
  //               <Icon type="file-text" theme="twoTone" />
  //                     &nbsp;&nbsp;&nbsp;
  //               {resource.nickname}

  //             </a>
  //             <span className={styles.last}>
  //               {resource.city}
  //             </span>
  //           </div>
  //         )
  // })


  render() {

    const { salesData,rankingListData,startDate,endDate,dataType,rangePickerValue, salesType } = this.state;

    const {report,loading } = this.props;
    // const { paperData } = report;



    const {
      specialStats,
      userStats
    } = report;

    // debugger

    return (
      <div className="container">
        <Suspense fallback={<PageLoading />}>
          <IntroduceRow loading={loading} specialStats={specialStats} userStats={userStats}/>
        </Suspense>
        <Suspense fallback={null}>
          <SalesCard
          // rankingListData={rankingListData}
            // rangePickerValue={rangePickerValue}
            salesData={salesData}
            // isActive={this.isActive}
            // handleRangePickerChange={this.handleRangePickerChange}
            loading={loading}
            dataType={dataType}
            // endDate = {endDate}
            // cbSpecialId = {this.cbSpecialId}
            // startDate = {startDate}
            // selectDate={this.selectDate}
          />
        </Suspense>


      </div>
    )
  }
}

export default Analysis;
