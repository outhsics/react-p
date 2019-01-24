import React, { Component } from 'react';
import { Row, Col, Avatar } from 'antd';
import { connect } from 'dva';
import styles from './HeaderView.less';
// import { getTimeDistance } from '@/utils/utils';

// const FormItem = Form.Item;

@connect(({ userdetail }) => ({
    userdetail
}))
class HeaderView extends Component {

    componentDidMount() {

    }




    render() {
        const { userdetail } = this.props;
        const { data: { userDetail } } = userdetail;
        // debugger

        const {
            city,
            sex,
            avatar,
            nickName,
            createAt,
            lastLogin,
            studyTime,
            overUser,
        } = userDetail;
        return (

            <div className={styles.header}>
                <div className={styles.avatar}>

                    <Avatar style={{ marginRight: 10 }} src={avatar} size={45} />
                </div>
                <div className={styles.middle}>

                    <div className={styles.middle_row}>
                        <span>
                            昵称:{nickName}

                        </span>
                        <span>
                            xin:{sex}

                        </span>
                        <span>
                            xin:{city}
                        </span>

                    </div>
                    <div className={styles.middle_row}>
                        <span>
                            昵称:{nickName}

                        </span>
                        <span>
                            xin:{sex}

                        </span>
                        <span>
                            xin:{city}
                        </span>

                    </div>


                </div>
                <div className={styles.right}>
                    <div className={styles.study}>

                        <h2>

                            学习时长： {studyTime}
                        </h2>
                        <div className={styles.overUser}>
                            超过 {overUser}用户
                            </div>
                    </div>


                </div>

            </div>

        );
    }
}

export default HeaderView;
