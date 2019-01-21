import React, { Component } from 'react';
import { Icon } from 'antd';
import { connect } from 'dva';
import styles from './List.less';



class UserList extends Component {

  
  componentDidMount() {
    const { dispatch } = this.props;
      dispatch({
        type:'userlist/loadUserList'
      })
    }


    renderList = (resources = []) => resources.map(resource => {
            return (
              <div className={styles.row} key={resource.id}>

                <a href={resource.url} className={styles.left}>
                  <Icon type="file-text" theme="twoTone" />
                        &nbsp;&nbsp;&nbsp;
                  {resource.nickname}

                </a>
                <span className={styles.last}>
                  {resource.city}
                </span>
              </div>
            )
    })


    render() {
        const { userlist } = this.props;

        const { list } = userlist;

        return (
          <div className="container">

            {list && this.renderList(list)}


          </div>
        )
    }
  }
const mapStateToProps = (state) => ({
        userlist: state.userlist,
    })

export default connect(
    mapStateToProps
)(UserList);
