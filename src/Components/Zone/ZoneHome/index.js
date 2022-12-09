import React, {useState} from 'react';
import {connect} from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react';
import './index.scss';
const ZoneHome=(props)=>{


    return(
        <div className='body_style'>
            <p className='p_style'>
chen zhou ce pan 
<span className='span_style'>
  Welcome to my zone
</span>
&mdash; chen zhou ce pan &mdash;
</p>
        </div>
    )
}




export default ZoneHome