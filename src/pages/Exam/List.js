import React, { Component, Fragment } from 'react';
import { Icon, Tabs, Table, Button, Modal, message } from 'antd';
import Link from 'umi/link';
import { connect } from 'dva';
import moment from 'moment';
import router from 'umi/router';
import styles from './List.less';
import { create } from 'domain';
const { TabPane } = Tabs;
const confirm = Modal.confirm;

@connect(({ examlist, operate }) => ({
  examlist,
  operate,
}))
class ExamList extends Component {
  state = {
    currentSpecial: '',
    currentPageNum: 1,
    total: null,
  };

  columns = [
    {
      title: '序列',
      dataIndex: 'id',
    },
    {
      title: '试卷标题',
      dataIndex: 'title',
    },
    {
      title: '难度',
      dataIndex: 'level',
    },
    {
      title: '完成人次/进行中',
      dataIndex: 'finish',
      render: (text, record) => (
        <span>{` ${record.completeAmount} / ${record.createAmount} `}</span>
      ),
    },
    {
      // title: '平均成绩/总分', //todo api2
      title: '总分',
      dataIndex: 'totalScore',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '试卷音频总长度(min)',
      dataIndex: 'totalDuration',
      render: val => <span>{(val / 60).toFixed(2)}</span>,
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.showDeleteConfirm(record)} style={{ marginRight: 10 }}>
            删除
          </a>
          {record.state !== 1 ? (
            <a onClick={() => this.showConfirm(true, record)} style={{ marginRight: 10 }}>
              启用
            </a>
          ) : (
            <a
              onClick={() => this.showConfirm(false, record)}
              style={{ marginRight: 10, color: 'red' }}
            >
              禁用
            </a>
          )}

          {/* <Link to={`'/exam/detail?id='${record.id}`}>查看详情</Link> */}
          <a onClick={() => this.handleToDetail(record.id)}>查看详情</a>
        </Fragment>
      ),
    },
  ];

  static Tab = TabPane;

  deleteSuccess = () => {
    const { dispatch, operate } = this.props;
    const { currentPageNum } = this.state;
    const { specialList } = operate;

    message.success('删除成功');

    dispatch({
      type: 'examlist/fetchPaperList',
      payload: {
        pageNum: currentPageNum,
        pageSize: 10,
        specialId: this.state.currentSpecial,
      },
    });
  };

  onPageChange = v => {
    const { dispatch } = this.props;
    this.setState({
      currentPageNum: v.current,
    });
    dispatch({
      type: 'examlist/fetchPaperList',
      payload: {
        pageNum: v.current,
        pageSize: 10,
        specialId: this.state.currentSpecial,
      },
    });
  };
  showDeleteConfirm = record => {
    const { dispatch } = this.props;
    const _this = this;

    confirm({
      title: `是否确认删除${record.title}该试卷`,
      content: '删除后不可复原，并且之前答题过的用户进度和历史数据就不会保留',
      onOk() {
        // return new Promise((resolve, reject) => {
        //   setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        // }).catch(() => console.log('Oops errors!'));

        dispatch({
          type: 'examlist/deletePaper',
          payload: record.id,
          callback: _this.deleteSuccess,
        });
      },
      onCancel() {},
    });
  };

  handleToDetail = id => {
    const { location, dispatch } = this.props;

    router.push({
      pathname: '/exam/detail',
      query: {
        id,
      },
    });
  };

  showConfirm = (flag, record) => {
    let title = flag ? `是否确认启用${record.title}该试卷？` : `是否确认禁用${record.title}该试卷?`;
    let content = flag ? '启用后，小程序端可以看到该试卷并答题' : '禁用后，小程序端看不到该试卷';

    const { dispatch, operate } = this.props;
    const { currentPageNum } = this.state;
    const { specialList } = operate;
    const _this = this;

    confirm({
      title,
      content,
      onOk() {
        dispatch({
          type: 'examlist/updatePaperState',
          payload: {
            id: record.id,
            state: flag ? 1 : 2,
          },
        });
        dispatch({
          type: 'examlist/fetchPaperList',
          payload: {
            pageNum: currentPageNum,
            pageSize: 10,
            specialId: _this.state.currentSpecial,
          },
        });
      },
      onCancel() {},
    });
  };

  onTabChange = tabType => {
    const { currentPageNum } = this.state;

    const { dispatch } = this.props;
    this.setState({
      currentSpecial: tabType,
    });
    dispatch({
      type: 'examlist/fetchPaperList',
      payload: {
        pageNum: currentPageNum,
        pageSize: 10,
        specialId: tabType,
      },
    });
  };

  handleSort = () => {};
  createExam = () => {};

  callback = id => {
    if (!id) return;
// debugger
    this.setState({
      currentSpecial: id,
    });

    // console.log('this.state.currentSpecial', this.state.currentSpecial);
    const { dispatch, examlist } = this.props;
    // const { paperTotal } = examlist;

    const { currentPageNum } = this.state;

    dispatch({
      type: 'examlist/fetchPaperList',
      payload: {
        pageNum: currentPageNum,
        pageSize: 10,
        specialId: this.state.currentSpecial,
      },
      cbPageTotal: this.cbPageTotal,
    });
  };

  cbPageTotal = v => {
    this.setState({
      total: v,
    });
  };

  componentDidMount() {
    console.log(this.props.examlist.paperTotal, 'this.props.examlist.paperTotal');

    const { dispatch, operate } = this.props;
    dispatch({
      type: 'operate/fetchSpecialList',
      callback: this.callback,
    });
    // console.log(operate.specialList, 'specialList');
  }

  renderList = (resources = []) =>
    resources.map(resource => {
      return <div key={resource.id}>{resource.id}</div>;
    });

  render() {
    const {
      examlist,
      operate,

      tabActiveKey,
      tabDefaultActiveKey,
    } = this.props;

    const { paperList, paperTotal } = examlist;
    const { specialList } = operate;
    const { total } = this.state;
    // const activeKeyProps = {};
    // if (tabDefaultActiveKey !== undefined) {
    //   activeKeyProps.defaultActiveKey = tabDefaultActiveKey;
    // }
    // if (tabActiveKey !== undefined) {
    //   activeKeyProps.activeKey = tabActiveKey;
    // }
    return (
      <div className={styles.container}>
        {/* <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab={userCount} key="1">

           
          </TabPane>

        </Tabs> */}

        {specialList && specialList.length ? (
          <Tabs
            className={styles.tabs}
            // {...activeKeyProps}
            onChange={this.onTabChange}
            tabBarExtraContent={
              <div className={styles.salesExtraWrap}>
                <div className={styles.salesExtra}>
                  <Button style={{ marginRight: 8 }} onClick={this.handleSort}>
                    整理排序
                  </Button>
                  <Button type="primary">
                    <Link to="/exam/newexam">新建试卷</Link>
                  </Button>
                </div>
              </div>
            }
          >
            {specialList.map(item => (
              <TabPane className={styles.tabPane} tab={`${item.title}`} key={item.id}>
                <div>{/* {this.renderForm()} */}</div>

                <div className={styles.tabelList}>
                  <Table
                    footer={() => (
                      <span style={{ color: '#1890FF' }}>该专题下共{total || 0} 份试卷</span>
                    )}
                    pagination={{ total }}
                    onChange={this.onPageChange}
                    rowKey={record => record.id}
                    columns={this.columns}
                    dataSource={paperList}
                  />
                </div>
              </TabPane>
            ))}
          </Tabs>
        ) : null}
      </div>
    );
  }
}

export default ExamList;
