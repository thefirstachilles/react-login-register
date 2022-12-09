import React from 'react'
import './index.scss'
import { Link, useOutletContext  } from 'react-router-dom'
import * as authActions from '../../actions/authActions';
import * as flashActions from '../../actions/flashMessages';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
const Home = (props) => {
    const [isAuthenticated]=useOutletContext();
    const {authActions}=props;
    const onClickHandler=()=>{
        authActions.logout()
        // console.log('hello world')
      }
    return(
       <div className='homepage'>
            <h1 className="main-title text-center">login / register page</h1>
            <p className="main-para text-center">join us now and don't waste time</p>
        
       {isAuthenticated? 
                <div><Link to="/zone">
                <button className="primary-button">zone</button>
            </Link>
            <Link to="/" onClick={onClickHandler}>
                <button className="primary-button" id="reg_btn" ><span>log out</span></button>
            </Link></div>
                :<div><Link to="/signin">
                <button className="primary-button">log in</button>
            </Link>
            <Link to="/register">
                <button className="primary-button" id="reg_btn"><span>register </span></button>
            </Link></div>}
                </div>
       
    )
}
const mapDispatchToProps = dispatch =>{
    return {
        authActions: bindActionCreators(authActions, dispatch),
        flashActions: bindActionCreators(flashActions, dispatch),
    }
  }
export default connect(null,mapDispatchToProps)(Home) 