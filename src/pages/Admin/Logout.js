import React, {Component} from 'react' 


export default class Logout extends Component{

  componentWillMount(){
    localStorage['XTOKEN'] = ''
    window.location.href = '/admin/login'
  }

  render(){
    return null
  }
}