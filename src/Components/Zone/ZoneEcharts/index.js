import React, { useEffect, useState } from 'react';
import { Col,Row,Card } from 'antd';
import EchartsArea from './EchartsArea';
import EchartsForce from './EchartsForce';
import EchartsPie from './EchartsPie';
import EchartsBar from './EchartsBar';
import './index.scss';
const getWindowSize=()=> {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
  }
const ZoneEcharts=()=>{
    const [windowSize,setWindowSize]=useState(getWindowSize())
   
      useEffect(()=>{function handleWindowResize(){
        setWindowSize(getWindowSize())
      };
    window.addEventListener('resize',handleWindowResize);
    return()=>{
        window.removeEventListener('resize',handleWindowResize);
    };},[])
    return(
      
    <div className='echarts-page'>  
    <Row gutter={[16, 24]}>
        <Col span={12}><div  ><EchartsArea height={windowSize.innerHeight} /> </div></Col>
        <Col span={12}><div  ><EchartsForce height={windowSize.innerHeight} /></div></Col>
    </Row>
    <Row gutter={[16, 24]}>
        <Col span={12}><div  ><EchartsPie height={windowSize.innerHeight}  /></div></Col>
        <Col span={12}><div  ><EchartsBar height={windowSize.innerHeight}  /></div></Col>
    </Row>
    </div>

       
    )


}
export default ZoneEcharts