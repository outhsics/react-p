import React, { PureComponent, Component, Fragment } from 'react';

import router from 'umi/router';
import moment from 'moment';
import { connect } from 'dva';
import {
  Tabs,
  Icon,
  Row,
  Col,
  InputNumber,
  Input,
  Select,
  Button,
  Radio,
  Table,
  Modal,
  Tag,
  DatePicker
} from 'antd';
import styles from './List.less';

import { supportsGoWithoutReloadUsingHash } from 'history/DOMUtils';
const { RangePicker } = DatePicker;

const TabPane = Tabs.TabPane;
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;
const CheckableTag = Tag.CheckableTag;
const Option = Select.Option;
// const RadioGroup = Radio.Group;

const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_696758_riuzzc04t8.js', // 在 iconfont.cn 上生成
});

const tagsCreateTime = ['今天', '最近3天', '一周内', '一个月', '一季度'];
const tagsStudyTime = [
  '0-20',
  '20-40',
  '40-60',
  '60-100',
  '100-150',
  '150-250',
  '250-350',
  '350-450',
  '450以上',
];



const tagsNickname = ['有昵称', '无昵称'];


function itemRender(current, type, originalElement) {
  if (type === 'prev') {
    return <a>上一页</a>;
  }
  if (type === 'next') {
    return <a>下一页</a>;
  }
  return originalElement;
}

@connect(({ userlist, loading }) => ({
  userlist,
  loading: loading.models.userlist,
}))
// @Form.create()
class UserList extends Component {
  state = {
    // modalVisible: false,
    // updateModalVisible: false,
    currentPageNum: 1,
    selectedTags: [],
    expandForm: false,
    filterVal: '',
    filterCreateTime: '',
    filterStudyTime: '',
    filterNickname: '',
    // selectedRows: [],
    list:[],
    total:null,
    rangeTime:'',
    filterData:{
      qcts:null,
      qcte:null,
      qds:null,
      qde:null,
    // 排序（10：创建时间-升序，11：创建时间-降序，20：学习时长-升序，21：学习时长-降序）
  },
  hasNickName:1
  };


   onChangeTime =  (value, dateString) =>{

    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
    // console.log(dateString[0].getTime(),'1')
    // this.state.filterData.qcts = value[0].valueOf();
    // this.state.filterData.qcte = value[1].valueOf();
  
    this.setState({
      filterData:{
        ...this.state.filterData,
        qcts:value[0].valueOf(),
        qcte:value[1].valueOf(),
      },
      rangeTime:value
    })
    // console.log(value[0].valueOf(),'1')
    // console.log(this.state.filterData,'state.filterData')
  }
  
   onOk = (value) =>{
    console.log('onOk: ', value);
  }
  

  // handleGetInputValue= (index,event)=>{
    changeQds = (e)=>{
      // event.target.value;
      // this.state.filterData.qde = event.target.value;
      this.setState({
        filterData:{
          ...this.state.filterData,
          qds:Number(e.target.value)
        }
      })
      // console.log(this.state.filterData.qds,'this.state.filterData')
      console.log(event,'cc')
    }
    changeQde = (e)=>{
      // this.state.filterData.qde = event.target.value;
      // console.log(typeof e.target.value)
      this.setState({
        filterData:{
          ...this.state.filterData,
          qde:Number(e.target.value)
        }
      })
      // console.log(event.data,'this.state.filterData')
      // console.log(this.state.filterData.qde,'state.filterData.qde')
    }

    onChangeRadio = (e) => {
      console.log('radio checked', e.target.value);
      this.setState({
        hasNickName: e.target.value
      });
    }
  


  showConfirm = (flag, record) => {
    let title = flag ? `是否确认启用用户${record.nickname}` : `是否确认停用用户${record.nickname}?`;
    let content = flag ? '启用后用户可重新使用小程序' : '停用后用户不可使用小程序';

    const { dispatch } = this.props;

    confirm({
      title,
      content,
      onOk() {
        dispatch({
          type: 'userlist/updateUser',
          payload: {
            id: record.id,
            state: flag ? 1 : 2,
          },
        });
        dispatch({
          type: 'userlist/fetch',
          payload: {
            pageNum: this.state.currentPageNum,
            pageSize: 10,
          },
        });
      },
      onCancel() {},
    });
  };

  handleToDetail = (id, nickname) => {
    const { location, dispatch } = this.props;

    router.push({
      pathname: '/user/detail',
      query: {
        id,
        nickname: encodeURIComponent(nickname),
      },
    });
  };

  handleFilterChange = e => {
    this.setState({ filterVal: e.target.value });
    console.log(this.state.filterVal);
  };
  handleFilterCreateTime = e => {
    this.setState({ FilterCreateTime: e.target.value });
    console.log(this.state.filterCreateTime);
  };
  handleFilterStudyTime = e => {
    this.setState({ FilterStudyTime: e.target.value });
    console.log(this.state.filterStudyTime);
  };
  handleFilterNickname = e => {
    this.setState({ filterVal: e.target.value });
    console.log(this.state.filterNickname);
  };

  handleSearch = () => {
    const {dispatch} = this.props;
    const { currentPageNum}= this.state;


    dispatch({
      type: 'userlist/fetch',
      payload: {
        pageNum: currentPageNum,
        pageSize: 10
      },
      callback: this.cbUserData,
      cbSearch:this.cbSearch
    })
  };

  cbSearch = ()=>{

    const { list,filterData:{qcts,qcte,qds,qde}}= this.state;
    let userList = list;
    // let res = [];
    if(qcts && qcte) {
      userList = userList.filter(item=>item.createTime >=qcts && item.createTime <= qcte);
    }
    if(qds && qde) {
debugger

      userList = userList.filter(item=>item.duration >=qds*60 && item.duration <= qde*60);
    }
   
    this.setState({
      list:userList
    })
  }

  
  handleFormReset = () => {
    // const { form, dispatch } = this.props;
    // form.resetFields();
    this.setState({
      filterData:{
        qds:'',
        qde:''
      },
      hasNickName:1,
      rangeTime:''
    });
  };
  

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  renderAdvancedForm() {
    const {
      // form: { getFieldDecorator },
      loading,
    } = this.props;

    const { selectedTags,rangeTime } = this.state;
    return (
      <Fragment>
        <Row className={styles.filterRow}>
          {/* <Col span={21}>
            <Radio.Group defaultValue="a" buttonStyle="solid" onChange={this.handleFilterChange}>
              <Radio.Button value="a">
                创建时间
                <MyIcon type="icon-sort" />
              </Radio.Button>
              <Radio.Button value="b">
                学习时长
                <MyIcon type="icon-sort" />
              </Radio.Button>
            </Radio.Group>
          </Col> */}
          <Col span={3} offset={20}>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              筛选收起 <Icon type="up" />
            </a>
          </Col>
        </Row>

        <Row className={styles.filterRow}>
          <Col span={3}>创建时间:</Col>
          <Col span={18}>
            {/* {tagsCreateTime.map(tag => (
              <CheckableTag
                key={tag}
                checked={selectedTags.indexOf(tag) > -1}
                onChange={checked => this.handleChange(tag, checked)}
              >
                {tag}
              </CheckableTag>
            ))} */}
            <RangePicker
                // showTime={{ format: 'HH:mm' }}
                // format="YYYY-MM-DD HH:mm"
                value={rangeTime}
                onChange={this.onChangeTime}
                separator={'至'}
                onOk={this.onOk}
              />
          </Col>
        </Row>

        <Row className={styles.filterRow}>
          <Col span={3}>学习时长:</Col>

          <Col span={18}>
            {/* {tagsStudyTime.map(tag => (
              <CheckableTag
                key={tag}
                checked={selectedTags.indexOf(tag) > -1}
                onChange={checked => this.handleChange(tag, checked)}
              >
                {tag}
              </CheckableTag> */}
            {/* ))} */}
            <Input className={styles.gray} value={this.state.filterData.qds} onChange={this.changeQds}  suffix="min" style={{width:100}}/>
            &nbsp;
            &nbsp;
            至
            &nbsp;
            &nbsp;

            <Input  className={styles.gray} value={this.state.filterData.qde}  onChange={this.changeQde} suffix="min" style={{width:100}}/>

            {/* <Input disabled value={subItem.title} onChange={()=>this.handleGetInputValue(subItem.topicNo,event)} /> */}


          </Col>
        </Row>

        {/* <Row className={styles.filterRow}>
          <Col span={3}>昵称:</Col>
          <Col span={18}> */}
            {/* {tagsNickname.map(tag => (
              <CheckableTag
                key={tag}
                checked={selectedTags.indexOf(tag) > -1}
                onChange={checked => this.handleTagChange(tag, checked)}
              >
                {tag}
              </CheckableTag>
            ))} */}
            {/* <Radio.Group onChange={this.onChangeRadio} value={this.state.hasNickName}>
                <Radio value={1}>全部</Radio>
                <Radio value={2}>有昵称</Radio>
                <Radio value={3}>无昵称</Radio>
              </Radio.Group>
          </Col>
        </Row> */}

        <Row className={styles.filterRow}>
          {/* <Col span={19}>
            <Row>
              <Col span={4}>筛选条件:</Col>
              <Col>
                {selectedTags &&
                  selectedTags.map(tag => (
                    <Tag closable key={tag}>
                      {' '}
                      {tag}{' '}
                    </Tag>
                  ))}
              </Col>
            </Row>
          </Col> */}
          <Col span={5} offset={19}>
            <Button onClick={this.handleFormReset}>复原</Button>
            <Button onClick={this.handleSearch} style={{ marginLeft: 8 }} type="primary">
              确认筛选
            </Button>
          </Col>
        </Row>
      </Fragment>
    );
  }

  renderSimpleForm() {
    const {
      // form: { getFieldDecorator },
      filterVal,
      loading,
    } = this.props;

    return (
      <Row className={styles.filterRow}>
        {/* <Col span={21}>
          <Radio.Group defaultValue="a" buttonStyle="solid" onChange={this.handleFilterChange}>
            <Radio.Button value="a">
              创建时间
              <MyIcon type="icon-sort" />
            </Radio.Button>
            <Radio.Button value="b">
              学习时长
              <MyIcon type="icon-sort" />
            </Radio.Button>
          </Radio.Group>
        </Col> */}
        <Col span={3} offset={20}>
          <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
            筛选展开 <Icon type="down" />
          </a>
        </Col>
      </Row>
    );
  }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  columns = [
    {
      title: '头像',
      dataIndex: 'avatar',
      render: text => <img src={text} />,
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
    },
    {
      title: '城市',
      dataIndex: 'city',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      render: val => <span> {val === 1 ? '男' : '女'} </span>,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      // sorter: true,
      sorter: (a, b) => a.createTime - b.createTime,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '学习时长',
      dataIndex: 'duration',
      sorter: (a, b) => a.duration - b.duration,
      render: val => <Fragment>   
      {val>60 ? `${((val/60).toFixed(2))}分钟` : ''}{val<60 ?`${val}秒钟` : ''}
       </Fragment>,
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          {record.state !== 1 ? (
            <a onClick={() => this.showConfirm(true, record)} style={{ marginRight: 10 }}>
              启用
            </a>
          ) : (
            <a onClick={() => this.showConfirm(false, record)} style={{ marginRight: 10 }}>
              停用
            </a>
          )}
          <a onClick={() => this.handleToDetail(record.id, record.nickName)}>查看详情</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    const { currentPageNum } = this.state;

    dispatch({
      type: 'userlist/fetch',
      payload: {
        pageNum: currentPageNum,
        pageSize: 10
      },
      callback: this.cbUserData
    });
  }


  cbUserData = v=>{
    // debugger
    this.setState({
      list:v.list,
      total:v.total
    })
  }


  handleTagChange = (tag, checked) =>{
    const { selectedTags } = this.state;
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
    console.log('You are interested in: ', nextSelectedTags);
    this.setState({ selectedTags: nextSelectedTags });
  }

  onPageChange = v => {
    const { dispatch } = this.props;
    const { qcts,qcte,qds,qde } = this.state;

    const payload = {
      pageNum: v.current,
      pageSize: 10,
      qcts,
      qcte,
      qds,
      qde
    }
    this.setState({
      currentPageNum: v.current,
    });
    dispatch({
      type: 'userlist/fetch',
      payload: {
        pageNum: v.current,
        pageSize: 10,
      },
      callback:this.cbUserData
    });
  };

  render() {
    // const { userlist } = this.props;
    const { list,total } = this.state;

    return (
      <div className={styles.container}>
        <Tabs className={styles.tabs} defaultActiveKey="1">
          <TabPane tab={<span> 全部用户({total})</span>} key="1">
            <div>{this.renderForm()}</div>

            <div className={styles.tabelList}>
              <Table
                pagination={{
                  showQuickJumper: true,
                  // showSizeChanger: true,
                  total
                }}
                onChange={this.onPageChange}
                rowKey={record => record.id}
                columns={this.columns}
                dataSource={list}
              />
            </div>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default UserList;
