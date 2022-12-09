import React from 'react'
import { useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import './index.scss'
import * as signupActions from '../../actions/signupActions';
import * as flashActions from '../../actions/flashMessages';

const Register = (props) => {
   
    // console.log("props",props)
    const navigate = useNavigate();
    const {signupActions,flashActions}=props;
    const form = useRef(null);
    const [SignInfo,setSignInfo]=useState({
            errors:{},
            isLoading: false, 
            inValid: false
    });
    const onChange = (e) => {
        e.preventDefault();
        setSignInfo({
            ...SignInfo,
            [e.target.name]: e.target.value})
        
   
    }
    const checkUser=(e)=>{
        console.log("SignInfo",SignInfo) 
        const field = e.target.name;
        const val = e.target.value;
        if(val){signupActions.checkUserExist({[field]:val}).then(
            (res)=>{
                if(res.data){
                    let errors=SignInfo.errors
                    errors[field] = res.data[field];
                  setSignInfo({
                    ...SignInfo,
                    errors:errors
                  })
    
                }else{
                    let errors=SignInfo.errors
                    delete errors[field]
                    setSignInfo({
                        ...SignInfo,
                        errors:errors
                      })
                }
            },
            (err)=>{
                console.log(err);
            }
        ).then(()=>{
            console.log((Object.keys(SignInfo.errors).length==0))
            if((Object.keys(SignInfo.errors).length==0)){
                console.log("if")
                setSignInfo({
                    ...SignInfo,
                    inValid:false
                });
            }else{
                console.log("else")
                setSignInfo({
                    ...SignInfo,
                    inValid:true
                });
            }
        })
        };
       
        
    }

    const onSubmit=(e)=>{
        e.preventDefault();
        setSignInfo({
            ...SignInfo,
            errors:{},
            isLoading:true
        });
        signupActions.userSignupRequest(SignInfo).then(
            ()=>{
                navigate('/signin');
                flashActions.addFlashMessage({
                    type: 'success',
                    text: '欢迎你，注册成功~请登录'
                })
            },
            ({response})=>{
                // console.log("response",response)
                let errors=SignInfo.errors
                // console.log('errors',errors)
                setSignInfo({
                    ...SignInfo,
                    errors: response.data,
                    isLoading:false,
                })
            }
        );


    }

    return(
        <>
        <div className="text-center m-5-auto">
        
            <h2>Join us</h2>
            <h5>Create your personal account</h5>
            <form action="/home" ref={form} onSubmit={onSubmit}>
                <p>
                    <label>Username</label><br/>
                    <input type="text" name="username" onChange={onChange} onBlur={checkUser} required />
                    {SignInfo.errors.username && <span className="text-mute">{SignInfo.errors.username} </span>}
                </p>
               
                <p>
                    <label>Email address</label><br/>
                    <input type="email" name="email" onChange={onChange} onBlur={checkUser} required />
                    {SignInfo.errors.email && <span className="text-mute">{SignInfo.errors.email} </span>}
                </p>
                
                <p>
                    <label>Password</label><br/>
                    <input type="password" name="password"  onChange={onChange}  requiredc />
                    {SignInfo.errors.password && <span className="text-mute">{SignInfo.errors.password} </span>}
                </p>
                
                <p>
                    <label>Password Confirmation</label><br/>
                    <input type="password" name="passwordConfirmation"  onChange={onChange} required /> 
                    {SignInfo.errors.passwordConfirmation && <span className="text-mute">{SignInfo.errors.passwordConfirmation} </span>}
                </p>
               
                <p>
                <span>I agree all statements in <a href="https://google.com" target="_blank" rel="noopener noreferrer">terms of service</a></span> <br/> <input type="checkbox" name="checkbox" id="checkbox"  onChange={onChange}  required /> 
                </p>
                <p>
                <button disabled={SignInfo.isLoading || SignInfo.inValid} className={SignInfo.inValid? "primary-button inValid":"primary-button"}>Sign Up</button>
                </p>
     
            </form>
        </div>
        
        </>
    )
}
const mapDispatchToProps = dispatch => {
    return {
        signupActions: bindActionCreators(signupActions, dispatch),
        flashActions: bindActionCreators(flashActions, dispatch),
    }
}

export default connect(null, mapDispatchToProps)(Register)