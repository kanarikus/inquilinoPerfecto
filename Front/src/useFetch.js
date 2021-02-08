import { useState, useEffect } from 'react'
import {useLogin} from './LoginContext'

function useFetch(url) {
    const [data, setData] = useState()
    const [login] = useLogin()
    useEffect(() => {
      const opts = {}
      if(login) {
        opts.headers = {'Authorization':'Bearer '+login.token}
      }
      fetch(url)
        .then(res => res.json())
        .then(data => {
          setData(data)
        })
    }, [url,login])
    return data
}

export default useFetch;
