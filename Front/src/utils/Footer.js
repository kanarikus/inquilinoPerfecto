import { Link } from 'react-router-dom'
import './footer.css'

function Footer(){
    return(
        <section className='footer-container'>
            <article>
                <h2><Link to='www.hithub.com'>Antonio Pires</Link></h2>
                <main>
                    <a href='https://twitter.com' target='_blank'></a>
                </main>
            </article>
            <div>
                Este es mi primer proyecto realizado 
                tras cursar el bootcamp en Hack a Boss 
                y en colaboración con <a href>Andrés Sierra Cardalda</a>
            </div>
        </section>
    )
}

export default Footer