import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import Link from 'umi/link';
import { Menu } from 'antd';
import styles from './Info.less';
import BaseView from './BaseView';


const { Item } = Menu;

@connect(({ userdetail }) => ({
    userdetail
}))
class Info extends Component {

    componentDidMount() {

        const { location, dispatch } = this.props;

        console.log(location.query.id)
        // debugger
        dispatch({
            type: 'userdetail/fetch',
            payload: {
                id: location.query.id,
            }
        })
    }




    constructor(props) {
        super(props);
        const { match, location } = props;
        const menuMap = {
            base: '听力专项挑战',
            security: '仿真模拟练习',
            binding: '历年真题闯关',
        };
        const key = location.pathname.replace(`${match.path}/`, '');
        this.state = {
            mode: 'inline',
            menuMap,
            selectKey: menuMap[key] ? key : 'base',
        };
    }

    static getDerivedStateFromProps(props, state) {
        const { match, location } = props;
        let selectKey = location.pathname.replace(`${match.path}/`, '');
        selectKey = state.menuMap[selectKey] ? selectKey : 'base';
        if (selectKey !== state.selectKey) {
            return { selectKey };
        }
        return null;
    }


    getmenu = () => {
        const { menuMap } = this.state;
        return Object.keys(menuMap).map(item => <Item key={item}>{menuMap[item]}</Item>);
    };

    getRightTitle = () => {
        const { selectKey, menuMap } = this.state;
        return menuMap[selectKey];
    };

    selectKey = ({ key }) => {
        // router.push(`/account/settings/${key}`);
        // this.setState({
        //   selectKey: key,
        // });
        console.log(key, 'key');
    };

    render() {
        const { userdetail } = this.props;
        const { data: { userDetail } } = userdetail;
        // if (!currentUser.userid) {
        //   return '';
        // }
        const { mode, selectKey } = this.state;
        return (
            <div
                className={styles.main}
            >
                <div className={styles.leftmenu}>
                    <Menu mode={mode} selectedKeys={[selectKey]} onClick={this.selectKey}>
                        {this.getmenu()}
                    </Menu>
                </div>
                <div className={styles.right}>
                    {/* <div className={styles.title}>{this.getRightTitle()}</div> */}
                    {/* <Link to="/user/detail/2">324</Link> */}
                    {userDetail && <BaseView />}
                </div>
            </div>

        );
    }
}

export default Info;