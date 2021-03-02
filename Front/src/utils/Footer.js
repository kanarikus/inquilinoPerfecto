import './footer.css'

function Footer(){
    return(
        <section className='footer-container'>
            <article className='social-container'>
                <h2><a href='https://github.com/kanarikus/inquilinoPerfecto'>Antonio Pires</a></h2>
                <main className='social-links'>
                    <a className='twitter' href='https://twitter.com'/>
                    <a className='facebook' href='https://es-es.facebook.com/'/>
                    <a className='linkedin' href='https://www.linkedin.com/in/antonio-pires-abad-649307b3/'/>
                    <a className='youtube' href='https://www.youtube.com/'/>
                    <a className='github' href='https://github.com/kanarikus/inquilinoPerfecto'/>
                    <a className='instagram' href='https://www.instagram.com/?hl=es'/>
                </main>
            </article>
            <div className='lafoto'/>
            <div className='message'>
                Este es mi primer proyecto realizado 
                tras cursar el bootcamp en Hack a Boss 
                y en colaboración con <a href='https://www.linkedin.com/in/andr%C3%A9s-sierra-cardalda-09a8b655/' target='-blank'>Andrés Sierra Cardalda</a>
            </div>
        </section>
    )
}

export default Footer