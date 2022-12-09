import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Outlet, useNavigate} from 'react-router-dom'
import { useEffect } from 'react';
import ZoneEcharts from './ZoneEcharts';
import ZoneMusic from './ZoneMusic';
import Draggable from 'react-draggable';
import './index.scss';
import { Link, NavLink } from 'react-router-dom'
// import EchartsEffectScatter from './EchartsEffectScatter';

const Zone=(props)=>{
 const linkList=["/","/zone/zonemusic","/zone/zonechart"];
 const contextList=['home','music','charts']
   const navigate = useNavigate();
   const {isAuthenticated}=props
   const[Item,setItem]=useState(0)
   const[Hidden,setHidden]=useState(false)
   console.log("isAuthenticated",isAuthenticated)
   useEffect(()=>{
    if(!isAuthenticated){
        navigate('/signin')
    }
    if(Hidden){
        menu()
    }
   },[isAuthenticated,Item,Hidden]);
   
const menu=()=>{
   var res=[]
   for(let i=0;i<3;i++){
    res.push(<NavLink to={`${linkList[i]}`} className={`item _${i+1}`} key={i}></NavLink>)
   }
//    console.log(res)
   return res
}

const onClick=()=>{
    Hidden===false?setHidden(true):setHidden(false)
    }


    
    
return(
    <div  className='zonePage'>
   <Outlet/>
<Draggable>
<div className="myMenu">
<div className='item start' onClick={onClick}></div>
 <div  className='animate__animated'>
    {Hidden && menu()}</div>
</div>
</Draggable>
    </div>
)
}
const mapStateToProps = state =>{
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps)(Zone) 

