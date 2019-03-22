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
    // currentSpecial:'',
    specialId: '',
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
  cbSpecialId = (v)=>{
    this.setState({
      specialId:v
    })
  }

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
   
    dispatch({
      type: 'operate/fetchSpecialList',
      callback: this.callback,
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
  callback = id => {
    const {dispatch} = this.props;
    // const {dateType} = this.state;
    if (!id) return;
    // const dateType = type ==='today'?1:2;

    this.setState({
      specialId: id,
    },()=>{
      dispatch({
        type: 'chart/getReportPaper',
        payload:{
          specialId:id,
          dateType:1,
          startDate:0,
          endDate:0
        }
      });
    })

  };
  componentWillUnmount() {
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'report/clear',
    // });
    // cancelAnimationFrame(this.reqRef);
    // clearTimeout(this.timeoutId);
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const paperData= nextProps.report.paperData;
    let salesData = [];
    if(nextProps.chart.paperData !== prevState.salesData) {

      return {
        salesData:nextProps.report.paperData
      }

      // const salesData = [];
      const rankingListData = paperData && paperData.sort((a,b)=>a.accessAmount -b.accessAmount ).slice(0,7);
    // const salesData = paperList.map(item=>item.title).slice(0,10);
  
        // const salesData = [];
        for (let i = 0; i < paperData.slice(0,7).length; i += 1) {
          // salesData.push({
          //   x: `${i + 1}月`,
          //   y: Math.floor(Math.random() * 1000) + 200,
          // });
          salesData[i] = {
            x: salesData[i].paperTitle,
            y:salesData[i].accessAmount
          }
        }
    }
    debugger
    return null
    // this.setState({
    //   salesData,
    //   rankingListData
    // })

    
  }
  

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




    const { salesData,rankingListData,specialId,startDate,endDate,dataType,rangePickerValue, salesType } = this.state;

    const {report,loading,operate:{specialList} } = this.props;
    const { paperData } = report;

    debugger

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
          rankingListData={rankingListData}
          specialList={specialList}
            rangePickerValue={rangePickerValue}
            salesData={salesData}
            isActive={this.isActive}
            handleRangePickerChange={this.handleRangePickerChange}
            loading={loading}
            dataType={dataType}
            endDate = {endDate}
            // specialId={specialId}
            cbSpecialId = {this.cbSpecialId}
            startDate = {startDate}
            selectDate={this.selectDate}
          />
        </Suspense>


      </div>
    )
  }
}

export default Analysis;
