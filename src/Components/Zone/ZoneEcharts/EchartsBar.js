import React from 'react';
import ReactEcharts from 'echarts-for-react';
import {graphic} from 'echarts';

const  option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        showBackground: true,
        itemStyle:{
            color:'#c23531'
        }
      }
    ]
  };

class EchartsBar extends React.Component {
    render() {
        const heightPX=this.props.height/2;
        console.log(heightPX)
        return (
            <ReactEcharts
                option={option}
                theme={"dark"}
                style={{height:  `${heightPX}px`, width: '100%'}}
                className={'react_for_echarts'}
            />
        )
    }
}

export default EchartsBar;