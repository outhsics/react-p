import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import Link from 'umi/link';
import NavLink from 'umi/navlink';
import { Menu, Breadcrumb } from 'antd';
import styles from './Info.less';
import BaseView from './BaseView';


const { Item } = Menu;

@connect(({ userdetail, userexam }) => ({
    userdetail,
    userexam
}))
class Info extends Component {

    componentDidMount() {

        const { location, dispatch } = this.props;


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
        const menuMap = {
            '1': '听力专项挑战',
            '2': '仿真模拟练习',
            '3': '历年真题闯关',
        };
        const key = location.pathname.replace(`${match.path}/`, '');
        this.state = {
            mode: 'inline',
            menuMap,
            selectKey: menuMap[key] ? key : '1',
        };
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
        return Object.keys(menuMap).map(item => <Item key={item}>{menuMap[item]}</Item>);
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

        console.log(key, 'key');
    };


    render() {

        // if (!currentUser.userid) {
        //   return '';
        // }
        const { mode, selectKey } = this.state;
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

                <div className={styles.leftmenu}>
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
            // </div>
        );
    }
}

export default Info;