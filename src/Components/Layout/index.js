import React, { useEffect, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'
import './index.scss'
import { Link, NavLink } from 'react-router-dom'
import {Space} from 'antd'
import { RedditOutlined  } from '@ant-design/icons'
import {connect} from 'react-redux';
import {canvasEffect} from '../../utils/canvas'
import { bindActionCreators } from 'redux'
import * as authActions from '../../actions/authActions';
import * as flashActions from '../../actions/flashMessages';
// import canvasEffect from '../../utils/canvas'


const getWindowSize=()=> {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
  }
const Layout = (props) => {
  const {isAuthenticated,authActions}=props
    const [windowSize,setWindowSize]=useState(getWindowSize())
   
      useEffect(()=>{function handleWindowResize(){
        setWindowSize(getWindowSize())
      };
    window.addEventListener('resize',handleWindowResize);
    return()=>{
        window.removeEventListener('resize',handleWindowResize);
    };},[])
    const myCanvas=useRef()
    useEffect(()=>{canvasEffect(myCanvas,windowSize)},[myCanvas,windowSize])
    const onClickHandler=()=>{
      authActions.logout()
    }
    return(
        <div className="App-page">
          {isAuthenticated ?
        <div className="nav-bar">
        <Link to="/" ><Space><RedditOutlined /></Space></Link>
            <nav>
            <NavLink to="/zone" className='nav-button'>Zone</NavLink>
         
            <NavLink to="/" className='nav-button' onClick={onClickHandler} >Log out</NavLink>
            
            </nav>
            </div>
            :
        <div className="nav-bar">
        <Link to="/" ><Space><RedditOutlined /></Space></Link>
            <nav>
            <NavLink to="/register" className='nav-button'>Register</NavLink>
            <NavLink to="/signin" className='nav-button' >Sign In</NavLink>
            </nav>
            
        </div>}
                
        

        <div className="page">
        
        <Outlet context={[isAuthenticated]}/>
        
      </div>
      <canvas  ref={myCanvas} id='canvas'></canvas>
        </div>

    )

}
const mapStateToProps = state =>{
  console.log("state",state)
  return {
      isAuthenticated: state.auth.isAuthenticated
  }
}
const mapDispatchToProps = dispatch =>{
  return {
      authActions: bindActionCreators(authActions, dispatch),
      flashActions: bindActionCreators(flashActions, dispatch),
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Layout)