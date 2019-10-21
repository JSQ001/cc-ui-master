import React from 'react';
import { connect } from 'dva';
import { List, Modal, WhiteSpace } from 'antd-mobile';
import back from 'assets/忘记密码/返回.png';
import './Safe.css';

const alert = Modal.alert;
const Item = List.Item;

class SaftCenter extends React.Component {

  confirm1 = () => {
    this.props.history.push({ pathname: '/editPasswordLogin' })
  }
  confirm2 = () => {
    this.props.history.push({ pathname: '/editTranPassword' })
  }

  //退出登录
  logout = () => {
    this.props.dispatch({
      type: 'application/logout',

    });
  }

  render() {
    return (
      <div style={{ paddingTop: '8.333rem',background: 'white'}}>
        <div className='headStyle' style={{ height: '8.333rem'}}>
          <div style={{
            height: '100%',
            width: '6.667rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            left: '0px'
          }} onClickCapture={() => { this.props.history.goBack(-1) }}>
            <img alt='' src={back} style={{ width: '26px', zIndex: '200' }} />
          </div>
          <div style={{ fontSize: '2.3rem', display: 'inline-block' }}>安全中心</div>
        </div>
        <WhiteSpace style={{background: 'rgb(245,244,249)'}}/>
        <div style={{ height: '159px', backgroundColor: 'white', marginTop: '3px' }}>
          <List className="my-list">
            <Item style={{ height: '53px', }} arrow="horizontal" onTouchEnd={this.confirm1}>登录密码修改</Item>
            <Item style={{ height: '53px' }} arrow="horizontal" onTouchEnd={this.confirm2}>交易密码修改</Item>
            <Item style={{ height: '53px' }} >版本管理<span style={{ float: 'right' }}>V1.0.1</span></Item>
          </List>
        </div>
        <div style={{
          width: '200px',
          lineHeight: '40px',
          textAlign: 'center',
          borderRadius: '1.167rem',
          backgroundColor: '#EE614C',
          color: 'white',
          fontSize: '18px',
          margin: '0 auto',
          marginTop: '12.5rem',
        }}
          onClick={
            () =>
              alert('', '确定退出登录么？', [
                { text: '取消', onPress: () => console.log('cancel') },
                { text: '确定', onPress: () => { this.logout() } },
              ])}>
          退出登录
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading.models.application,
  };
}

export default connect(mapStateToProps)(SaftCenter);
