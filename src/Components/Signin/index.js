import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import './index.scss'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link  } from 'react-router-dom'
import * as authActions from '../../actions/authActions';
import * as flashActions from '../../actions/flashMessages';
const Signin = (props) => {
    const navigate = useNavigate();
    const {authActions,flashActions}=props
    const[info,setInfo]=useState({
        errors:{},
            isLoading: false,
            isValid: false,
    })
    const onChange=(e)=>{
        e.preventDefault();
        setInfo({
            ...info,
            [e.target.name]:e.target.value
        })
    }
    const onSubmit=(e)=>{
        e.preventDefault();
        setInfo({
            ...info,
            errors:{},
            isLoading:true
        })
        console.log("info",info)
        authActions.login(info).then(
            (res)=>{flashActions.addFlashMessage({
                type:'success',
                text:'欢迎您，登录成功！'
            });
                navigate("/zone")
            },
            ({response})=>{
                setInfo({
                    ...info,
                    errors:response.data.errors,
                    isLoading: false
                }
                )
            }

        )

       
    }

    return(
        <>
       <div className="text-center signin">
            <h2>Sign in to us</h2>
            <form onSubmit={onSubmit}>
                <p>
                    <label>Username or email address</label><br/>
                    <input type="text" name="identifier"   onChange={onChange} required />
                </p>
                <p>
                    <label>Password</label>
                    {/* <Link to="/forget-password"><label className="right-label">Forget password?</label></Link> */}
                    <br/>
                    <input type="password" name="password"  onChange={onChange} required />
                </p>
                {info.errors.form && <span className="text-mute">{info.errors.form} </span>}
                <p>
                    <button id="sub_btn" type="submit" className="primary-button ">Login</button>
                </p>
                
            </form>
            <footer>
                <p>First time? <Link to="/register">Create an account</Link>.</p>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
        </>
    )
}
const mapDispatchToProps = dispatch =>{
    return {
        authActions: bindActionCreators(authActions, dispatch),
        flashActions: bindActionCreators(flashActions, dispatch),
    }
}
export default connect(null,mapDispatchToProps)(Signin) 