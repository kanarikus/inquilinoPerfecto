import useFetch from "../useFetch"


function HomeList() {
    const homes = useFetch('http://localhost:9999/vivienda') || []
    if(!homes) return 'Cargando...'
    return(
        <div>
            <h1>Pisos</h1>
            <div className='homelist'>
                {homes.map(h=>
                    <div className='home'>
                        <h2>
                            Precio: {h.precio}
                        </h2>
                        <h5>
                            Dirección: {h.direccion}
                        </h5>
                    </div>
                       
                )}
            </div>
        </div>
    )
}
export default HomeList;