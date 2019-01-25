import React, { Component, Fragment } from 'react';
import { Row, Col, Avatar } from 'antd';
import { connect } from 'dva';
import styles from './HeaderView.less';
import moment from 'moment';
import withRouter from 'umi/withRouter';


// import { getTimeDistance } from '@/utils/utils';

// const FormItem = Form.Item;

@connect(({ userdetail }) => ({
    userdetail
}))
class HeaderView extends Component {




    render() {
        const { userdetail } = this.props;
        const { userDetail } = userdetail;
        // debugger

        const {
            user,
            userExt
        } = userDetail;
        return (
            <Fragment>

                {userdetail &&

                    <div className={styles.header}>
                        <div className={styles.avatar}>

                            <Avatar style={{ marginRight: 10 }} src={!!user.avatar ? user.avatar : 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png'} size={45} />
                        </div>
                        <div className={styles.middle}>

                            <div className={styles.middle_row}>
                                <span>
                                    昵称:{user.nickName}

                                </span>
                                <span>
                                    性别:{user.sex ? '男' : '女'}

                                </span>
                                <span>
                                    城市:{user.city}
                                </span>

                            </div>
                            <div className={styles.middle_row}>
                                <span>

                                    创建时间:{moment(user.createTime).format('YYYY-MM-DD HH:mm:ss')}

                                </span>
                                <span>
                                    最近登录:{moment(userExt.lastLoginTime).format('YYYY-MM-DD HH:mm:ss')}


                                </span>

                            </div>


                        </div>
                        <div className={styles.right}>
                            <div className={styles.study}>

                                <h2>

                                    学习时长： {userExt.duration}
                                </h2>
                                <div className={styles.overUser}>
                                    超过 {userExt.surpass}用户
                            </div>
                            </div>


                        </div>
                    </div>
                }
            </Fragment>
        );
    }
}

export default withRouter(HeaderView);
