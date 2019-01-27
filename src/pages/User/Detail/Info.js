import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import Link from 'umi/link';
import NavLink from 'umi/navlink';
import { Menu, Breadcrumb, Icon } from 'antd';
import styles from './Info.less';
import BaseView from './BaseView';
import cloneDeep from 'lodash/cloneDeep';




const { Item } = Menu;

@connect(({ userdetail, userexam }) => ({
    userdetail,
    userexam
}))
class Info extends Component {

    componentDidMount() {

        const { location, dispatch, userexam } = this.props;
        const { UserSpecial } = userexam;

        const obj = {};
        UserSpecial.map(item => {
            let id = item.id.toString();
            obj[id] = item.title;
        })
        const paceList = {};
        UserSpecial.map(item => {
            let id = item.id.toString();
            paceList[id] = item.pace;
        })


        const pace1 = UserSpecial[0];
        const pace2 = pace1;
        if (pace1) {
            dispatch({
                type: 'userexam/savePace',
                payload: pace1.id
            });
        }


        // obj.keys()

        // debugger
        this.setState({
            menuMap: obj,
            paceList
        })




        dispatch({
            type: 'userexam/fetch',
            payload: {
                userId: '100',
                specialId: 1
            }
        })

        dispatch({
            type: 'userexam/fetchUserSpecial',
            payload: {
                userId: '100'
            }
        });

    }




    constructor(props) {
        super(props);
        const { match, location } = props;
        // debugger


        // let menuMap = {

        // };



        // '1': '听力专项挑战',
        // '2': '仿真模拟练习',
        // '3': '历年真题闯关',
        // const key = location.pathname.replace(`${match.path}/`, '');
        this.state = {
            mode: 'inline',
            selectKey: '1',
            menuMap: [],
            paceList: ''
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
        const { menuMap } = this.state;
        const { userexam } = this.props;
        const { UserSpecial } = userexam;
        // return Object.keys(menuMap).map(item => <Item key={item}>{menuMap[item]}</Item>);
        // debugger
        return UserSpecial.map(item => <Item key={item.id}>{item.title} {item.pace}</Item>);
    };


    selectKey = ({ key }) => {
        // router.push(`/account/settings/${key}`);

        this.setState({
            selectKey: key,
        });
        const { dispatch } = this.props;
        dispatch({
            type: 'userexam/fetch',
            payload: {
                userId: '100',
                specialId: Number(key)
            }
        });
        dispatch({
            type: 'userexam/savePace',
            payload: paceList[key]
        })

        console.log(key, 'key');
    };


    render() {

        // if (!currentUser.userid) {
        //   return '';
        // }
        const { mode, selectKey } = this.state;
        const { userexam } = this.props;
        const { UserSpecial } = userexam;
        return (
            // <div className={styles.container}>

            <div
                className={styles.container}
            >
                <div className={styles.breadcrumb}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <NavLink to="/user/list">用户列表</NavLink>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <NavLink to="/user/detail" activeStyle={{
                                color: "#1890FF"
                            }}>用户详情</NavLink>

                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className={styles.box}>
                    <div className={styles.left}>
                        <Icon type="home" />
                        <h2 style={{ marginLeft: 15, display: 'inline-block' }}>
                            专题列表

                        </h2>
                        <Menu mode={mode} selectedKeys={[selectKey]} onClick={this.selectKey}>
                            {this.getmenu()}
                        </Menu>
                    </div>
                    <div className={styles.right}>
                        {/* <div className={styles.title}>{this.getRightTitle()}</div> */}
                        {/* <Link to="/user/detail/2">324</Link> */}
                        <BaseView />
                    </div>

                </div>

            </div>
            // </div>
        );
    }
}

export default Info;