import React, { Component, Fragment } from 'react';
import { Icon, Tabs, Table, Button, Modal } from 'antd';
import Link from 'umi/link';
import { connect } from 'dva';
import moment from 'moment';

import styles from './List.less';
import { create } from 'domain';
const { TabPane } = Tabs;
const confirm = Modal.confirm;





@connect(({ examlist, loading }) => ({
  examlist,
  loading: loading.models.examlist,
}))
class ExamList extends Component {

  columns = [{
    title: '序列',
    dataIndex: 'id',
  },
  {
    title: '试卷标题',
    dataIndex: 'title',
  },
  {
    title: '难度',
    dataIndex: 'difficulty',
  },
  {
    title: '完成人次/进行中',
    dataIndex: 'finish',
  },
  {
    title: '平均成绩/总分',
    dataIndex: 'grade',
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
  },
  {
    title: '试卷音频总长度(min)',
    dataIndex: 'soundSize',
  },

  {
    title: '操作',
    render: (text, record) => (
      <Fragment>
        <a onClick={() => this.showDeleteConfirm(record)} style={{ marginRight: 10 }} >
          删除</a>

        {record.disabled ?
          <a onClick={() => this.showConfirm(true, record)} style={{ marginRight: 10, color: '#178139' }} >
            启用
        </a> :
          <a onClick={() => this.showConfirm(false, record)} style={{ marginRight: 10, color: '#F5222D' }} >
            禁用
        </a>

        }
        <a href={record.href}>查看</a>
      </Fragment>
    ),
  }
  ];

  static Tab = TabPane;

  static defaultProps = {
    onTabChange: () => { },
  }

  showDeleteConfirm = (record) => {
    confirm({
      title: `是否确认删除${record.title}该试卷`,
      content: '删除后不可复原，并且之前答题过的用户进度和历史数据就不会保留',
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() { },
    });
  }


  showConfirm = (flag, record) => {

    let title = flag ? `是否确认启用${record.title}该试卷？` : `是否确认禁用${record.title}该试卷?`
    let content = flag ? '启用后，小程序端可以看到该试卷并答题' : '禁用后，小程序端看不到该试卷'

    confirm({
      title,
      content,
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() { },
    });
  }


  onTabChange = tabType => {
    const { onTabChange } = this.props;
    onTabChange(tabType);
  };

  handleSort = () => {

  }
  createExam = () => {

  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'examlist/fetch'
    })
  }


  renderList = (resources = []) => resources.map(resource => {
    return (
      <div key={resource.id}>
        {resource.id}

      </div>
    )
  })

  render() {
    const tabList = [
      {
        key: 'challenge',
        tab: '听力专项挑战',
        count: '12'
      },
      {
        key: 'practice',
        tab: '仿真模拟练习',
        count: '11'
      },
      {
        key: 'overyears',
        tab: '历年真题闯关',
        count: '12'
      },
    ];
    const {
      examlist,
      // title,
      // logo,
      // action,
      // content,
      // extraContent,
      // tabList,
      // className,
      tabActiveKey,
      tabDefaultActiveKey,
      // tabBarExtraContent,
      // loading = false,
      // wide = false,
      // hiddenBreadcrumb = false,
    } = this.props;


    const { data: { list } } = examlist;
    const activeKeyProps = {};
    if (tabDefaultActiveKey !== undefined) {
      activeKeyProps.defaultActiveKey = tabDefaultActiveKey;
    }
    if (tabActiveKey !== undefined) {
      activeKeyProps.activeKey = tabActiveKey;
    }
    return (
      <div className={styles.container} >


        {/* <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab={userCount} key="1">

           
          </TabPane>

        </Tabs> */}

        {tabList && tabList.length ? (
          <Tabs
            className={styles.tabs}
            {...activeKeyProps}
            onChange={this.onTabChange}
            tabBarExtraContent={
              <div className={styles.salesExtraWrap}>
                <div className={styles.salesExtra}>
                  <Button style={{ marginRight: 8 }} onClick={this.handleSort}>
                    整理排序
                  </Button>
                  <Button type="primary" onClick={this.createExam}>
                    <Link to="/exam/newexam">新建试卷</Link>
                  </Button>
                </div>

              </div>

            }
          >
            {tabList.map(item => (
              <TabPane className={styles.tabPane} tab={`${item.tab}${item.count}`} key={item.key} >
                <div>
                  {/* {this.renderForm()} */}

                </div>

                <div className={styles.tabelList}>
                  <Table
                    footer={() => <span style={{ color: '#1890FF' }}>该专题下共26份试卷</span>}
                    rowKey={record => record.id} columns={this.columns} dataSource={list} />
                </div>

              </TabPane>
            ))}
          </Tabs>
        ) : null}

      </div>

    )
  }
}

export default ExamList;
