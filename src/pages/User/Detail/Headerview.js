import React, { Component } from 'react';
import { Row, Col, Avatar } from 'antd';
import { connect } from 'dva';
import styles from './BaseView.less';
// import { getTimeDistance } from '@/utils/utils';

// const FormItem = Form.Item;

@connect(({ user }) => ({
    currentUser: user.currentUser,
}))

class HeaderView extends Component {
    state = {
        url: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
    }

    componentDidMount() {

    }




    render() {
        const { url } = this.state;
        const { value } = this.props;
        const {
            city,
            sex,
            nickname,
            createAt,
            lastLogin,
            className,
            studyTime,
            overUser
        } = value;
        return (
            <div className={styles.baseView} ref={this.getViewDom}>
                <Avatar src={url} size={64} />
                <Row>
                    <Col>

                    </Col>
                </Row>
            </div>
        );
    }
}

export default HeaderView;
