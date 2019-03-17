import React, { Component, Suspense } from 'react';
import { Icon } from 'antd';
import { connect } from 'dva';
import styles from './Analysis.less';
import PageLoading from '@/components/PageLoading';
import { getTimeDistance } from '@/utils/utils';


const IntroduceRow = React.lazy(() => import('./IntroduceRow'));
const SalesCard = React.lazy(() => import('./SalesCard'));





@connect(({ operate,report,loading,chart}) => ({
  report,
  operate,
  chart,
  loading: loading.effects['report/fetch'],
}))
class Analysis extends Component {
  state = {
    salesType: 'all',
    currentSpecial:'',
    currentTabKey: '',
    rangePickerValue: getTimeDistance('year'),
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
    const { dispatch } = this.props;
    this.setState({
      rangePickerValue: getTimeDistance(type),
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
    //   dispatch({ß
    //     type: 'report/fetch',
    //   });
    // });
    dispatch({
        type: 'report/fetch',
    });
    dispatch({
      type: 'chart/getReportPaper',
      payload:{
        specialId:24,
        dateType:1,
        startDate:0,
        endDate:0
      }
    });
    dispatch({
      type: 'operate/fetchSpecialList',
      callback: this.callback,
    });

    
  }
  callback = id => {
    if (!id) return;
// debugger
    this.setState({
      currentSpecial: id,
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

  handleChangeSalesType = e => {
    this.setState({
      salesType: e.target.value,
    });
  };

  handleTabChange = key => {
    this.setState({
      currentTabKey: key,
    });
  };

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
    const { rangePickerValue, salesType, currentTabKey } = this.state;

    const { report,loading,operate:{specialList} } = this.props;

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
          {/* <SalesCard
            rangePickerValue={rangePickerValue}
            salesData={salesData}
            isActive={this.isActive}
            handleRangePickerChange={this.handleRangePickerChange}
            loading={loading}
            selectDate={this.selectDate}
          /> */}
        </Suspense>


      </div>
    )
  }
}

export default Analysis;
