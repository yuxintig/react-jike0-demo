import {useEffect, useRef} from "react";
import * as echarts from "echarts";

function Bar({title, xData, yData, style}) {
  const domRef = useRef();


  useEffect(() => {
    const chartInit = () => {
      const myChart = echarts.init(domRef.current)
      myChart.setOption({
        title: {
          text: title
        },
        tooltip: {},
        xAxis: {
          data: xData
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: yData
          }
        ]
      })
    }
    chartInit()
  }, [title,xData,yData])

  return (
    <div>
      <div style={style} ref={domRef}/>
    </div>
  )
}

export default Bar
