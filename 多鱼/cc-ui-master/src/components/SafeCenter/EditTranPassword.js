import React from 'react';
import { connect } from 'dva';
import { InputItem, WhiteSpace, Toast } from 'antd-mobile';
import back from 'assets/忘记密码/返回.png';
import './Safe.css';
import '../App.css';
import { checkPass } from '../../utils/appUtils';
import * as storage from '../../utils/browserStorage';
import PageHeader from "components/common/layout/page-header";



const isEmpty = function isEmpty(value) {
  return value === undefined || value === null || value === '';
};

let values = { mobile: '', authCode: '', password: '', passwordAgain: '' };

class EditTranPassword extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 60,
      liked: true,
    };
  }


  //点击出现倒计时
  handleClick = (values) => {

    // const {sendMsg} = this.props;
    const { liked } = this.state;
    if (!liked) {
      return;
    }
    //调用发送短信验证码接口
    this.props.dispatch({
      type: 'cust/sendMessage',
      payload: {
        mobile: storage.get('username'),
        smsType: 'PWD'
      }
    });
    this.countDown();
  };


  countDown() {
    const { count } = this.state;
    if (count === 1) {
      this.setState({
        count: 60,
        liked: true,
      });
    } else {
      this.setState({
        count: count - 1,
        liked: false,
      });
      setTimeout(this.countDown.bind(this), 1000);
    }
  }



  //修改密码
  editPassword = (values) => {

    if (isEmpty(values.authCode)) {
      Toast.info("请输入验证码", 2);
      return;
    }
    if (isEmpty(values.password)) {
      Toast.info("请输入密码", 2);
      return;
    }
    //校验密码设置是否规范
    if (checkPass(values.password) === false) {
      Toast.info("密码格式错误,应输入6位非连续数字", 2);
      return;
    }
    if (isEmpty(values.passwordAgain)) {
      Toast.info("请输入确认密码", 2);
      return;
    }
    //判断两次密码是否一致
    if (values.password !== values.passwordAgain) {
      Toast.info("两次密码输入不一致，请重新输入", 2);
      return;
    }
    values.mobile = storage.get('username')
    this.props.dispatch({
      type: 'cust/updTransPwd',
      payload: values
    });
  }


  render() {

    return (
      <div style={{paddingBottom: 40}}>
        <PageHeader title='交易密码管理'/>
        <WhiteSpace style={{background: 'rgb(245,244,249)'}}/>
        <div style={{ height: '203px', backgroundColor: 'white' }} >
          <InputItem value={storage.get('username')} placeholder="请输入您的手机号" type='phone' onChange={(value) => { values.mobile = value }}  >
            <span>手机号</span>
          </InputItem>
          <WhiteSpace />
          <InputItem placeholder="请输入验证码" onChange={(value) => { values.authCode = value }}  >
            <span>验证码</span>
          </InputItem>
          <WhiteSpace />
          <InputItem placeholder="请输入6位不重复且不连续的数字" type='password' onChange={(value) => { values.password = value }} >
            <span>密码</span>
          </InputItem>
          <WhiteSpace />
          <InputItem placeholder="请再次输入交易密码（6位数字）" type='password' onChange={(value) => { values.passwordAgain = value }} >
            <span>确认密码</span>
          </InputItem>
          <WhiteSpace />

          <p style={{ color: '#FF8B8B', width: '95px', fontSize:'1.333rem', position: 'absolute', right: '1.167rem', top: '12.5rem' }} onTouchEnd={() => this.handleClick(values)}>{this.state.liked ? '获取验证码' : `${this.state.count} 秒后重发`}</p>
        </div>

        <div className='querenRepayPlan' onTouchEnd={this.editPassword.bind(this, values)} style={{ marginTop: '4.167rem' }}>
          确定
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading.models.cust,
  };
}

export default connect(mapStateToProps)(EditTranPassword);
