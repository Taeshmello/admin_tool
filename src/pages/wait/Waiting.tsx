import WatingStyles from './Waiting.module.css'
import { PacmanLoader } from 'react-spinners'
const Waiting = () => {

    return (
        <div className={WatingStyles.container}>

            <h1>승인을 대기중입니다..</h1>
            <div className={WatingStyles.loading}>
                <PacmanLoader size={50} margin={5} color='#ff8a00' />
            </div>
            <a href="/" className={WatingStyles.spaceshipButton}>홈으로 돌아가기</a>
            {Array.from({ length: 20 }).map((_, index) => (
                <div key={index} className={`${WatingStyles.star} ${WatingStyles[`star${index}`]}`}></div>
            ))}
        </div>
    )

}

export default Waiting;