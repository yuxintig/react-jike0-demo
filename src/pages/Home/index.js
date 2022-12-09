import './index.scss'
import Bar from "../../components/Bar";

function Home() {

  return (
    <div style={{display: 'flex'}}>
      <Bar
        title={'主流框架满意度'}
        xData={['React', 'Vue', 'Angular']}
        yData={[10, 20, 30]}
        style={{width: "500px", height: '400px'}}
      />
      <Bar
        title={'主流框架满意度2'}
        xData={['React', 'Vue', 'Angular']}
        yData={[50, 60, 70]}
        style={{width: "500px", height: '400px'}}
      />
    </div>
  )
}

export default Home

