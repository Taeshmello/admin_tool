import './Waiting.css'
import { PacmanLoader } from 'react-spinners'
const Waiting = () => {

    return (
        <div className='container'>

            <h1>인사팀 승인을 대기중입니다..</h1>
            <div className='loading'>
                <PacmanLoader size={50} margin={5} color='#ff8a00' />
            </div>
        </div>
    )

}

export default Waiting;