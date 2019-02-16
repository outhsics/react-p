import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import Link from 'umi/link';
import NavLink from 'umi/navlink';
import { Menu, Breadcrumb, Icon } from 'antd';
import styles from './Info.less';
import BaseView from './BaseView';

const { Item } = Menu;

@connect(({ userdetail, userexam }) => ({
  userdetail,
  userexam,
}))
class Info extends Component {
  componentDidMount() {
    const { location, dispatch, userexam } = this.props;
    const { UserSpecial } = userexam;
    // console.log(location.query.id, 'location');

    // const obj = {};
    // UserSpecial.map(item => {
    //     let id = item.id.toString();
    //     obj[id] = item.title;
    // })
    // const paceList = {};
    // UserSpecial.map(item => {
    //     let id = item.id.toString();
    //     paceList[id] = item.pace;
    // })

    // const pace1 = UserSpecial[0];
    // const pace2 = pace1;
    // if (pace1) {
    //     dispatch({
    //         type: 'userexam/savePace',
    //         payload: pace1.id
    //     });
    // }

    dispatch({
      type: 'userexam/fetch',
      payload: {
        userId: location.query.id,
        specialId: 1,
      },
    });

    dispatch({
      type: 'userexam/fetchUserSpecial',
      payload: {
        userId: location.query.id,
      },
    });

    this.setState({
      nickName: decodeURIComponent(location.query.nickname),
    });

    // if (UserSpecial) {
    //     dispatch({
    //         type: 'userexam/savePace',
    //         payload: UserSpecial[0] && UserSpecial[0].pace
    //     })
    // }
  }

  constructor(props) {
    super(props);
    const { match, location } = props;
    // debugger

    // '1': '听力专项挑战',
    // '2': '仿真模拟练习',
    // '3': '历年真题闯关',
    // const key = location.pathname.replace(`${match.path}/`, '');
    this.state = {
      mode: 'inline',
      selectKey: '1',
      nickName: '',
    };
    // debugger
  }

  // static getDerivedStateFromProps(props, state) {
  //     const { match, location } = props;
  //     let selectKey = location.pathname.replace(`${match.path}/`, '');
  //     selectKey = state.menuMap[selectKey] ? selectKey : '1';
  //     // debugger
  //     if (selectKey !== state.selectKey) {
  //         return { selectKey };
  //     }
  //     return null;
  // }

  getmenu = () => {
    const { userexam } = this.props;
    const { UserSpecial } = userexam;
    return UserSpecial.map(item => (
      <Item key={item.id}>
        {item.title} {item.pace ? `${item.pace}%` : null}
      </Item>
    ));
  };

  selectKey = ({ key }) => {
    // router.push(`/account/settings/${key}`);
    const { userexam } = this.props;

    const { UserSpecial } = userexam;

    this.setState({
      selectKey: key,
    });

    const { dispatch, location } = this.props;
    dispatch({
      type: 'userexam/fetch',
      payload: {
        userId: location.query.id,
        specialId: Number(key),
      },
    });
    // dispatch({
    //     type: 'userexam/savePace',
    //     payload: Number(key)
    // })

    dispatch({
      type: 'userexam/savePace',
      payload: UserSpecial && UserSpecial.filter(item => item.id === Number(key))[0].pace,
    });

    console.log(key, 'key');
  };

  render() {
    // if (!currentUser.userid) {
    //   return '';
    // }

    const { mode, selectKey, nickName } = this.state;
    const { userexam } = this.props;
    const { UserSpecial } = userexam;
    return (
      // <div className={styles.container}>

      <div className={styles.container}>
        <div className={styles.breadcrumb}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <NavLink to="/user/list">用户列表</NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="#" style={{ color: '#1890FF', textDecoration: 'none' }}>
                {nickName}
              </a>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className={styles.box}>
          <div className={styles.left}>
            <Icon type="home" />
            <h2 style={{ marginLeft: 15, display: 'inline-block' }}>专题列表</h2>
            <Menu mode={mode} selectedKeys={[selectKey]} onClick={this.selectKey}>
              {this.getmenu()}
            </Menu>
          </div>
          <div className={styles.right}>
            {/* <div className={styles.title}>{this.getRightTitle()}</div> */}
            {/* <Link to="/user/detail/2">324</Link> */}
            {UserSpecial && <BaseView />}
          </div>
        </div>
      </div>
      // </div>
    );
  }
}

export default Info;
