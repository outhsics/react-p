import React, { Component, Fragment } from 'react';
import { Icon, Tabs, Table, Button, Modal } from 'antd';
import Link from 'umi/link';
import { connect } from 'dva';
import moment from 'moment';
import router from 'umi/router';
import styles from './List.less';
import { create } from 'domain';
const { TabPane } = Tabs;
const confirm = Modal.confirm;

@connect(({ operate, examlist, loading }) => ({
  examlist,
  operate,
  loading: loading.models.examlist,
}))
class ExamList extends Component {
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
      render: val => <span>{(val / 60).toFixed(1)}</span>,
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

  showDeleteConfirm = record => {
    confirm({
      title: `是否确认删除${record.title}该试卷`,
      content: '删除后不可复原，并且之前答题过的用户进度和历史数据就不会保留',
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'));
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

    const { dispatch } = this.props;

    confirm({
      title,
      content,
      onOk() {
        dispatch({
          type: 'examlist/updatePapger',
          payload: {
            id: 1,
            state: flag ? 1 : 2,
          },
        });
        dispatch({
          type: 'examlist/fetchPaperList',
          payload: {
            pageNum: 1,
            pageSize: 10,
          },
        });
      },
      onCancel() {},
    });
  };

  onTabChange = tabType => {
    console.log(tabType, 'tabType');
  };

  handleSort = () => {};
  createExam = () => {};

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'examlist/fetchPaperList',
      payload: {
        pageNum: 1,
        pageSize: 10,
      },
    });
    dispatch({
      type: 'operate/fetchSpecialList',
    });
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

    const { paperList } = examlist;
    const { specialList } = operate;
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
                      <span style={{ color: '#1890FF' }}>
                        该专题下共{(paperList && paperList.length) || 0} 份试卷
                      </span>
                    )}
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
