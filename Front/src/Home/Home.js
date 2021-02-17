import './home.css'
import MainSearch from './MainSearch'
import lalandingvideo from '../img/lalandingvideo.mp4'


function Home() {

    return (
        <div className="lalanding">
            <video className='lalanding-video' src={lalandingvideo} autoPlay
            loop/>
            <main className='all-mainsearch'>
                <MainSearch/>
            </main>
        </div>
    )
}

export default Home;