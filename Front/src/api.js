export async function login(email,password) {
    const ret= await fetch('http://localhost:9999/login',{
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({email,password}),
        method: 'POST'
    })
    if(ret.ok) {
        return await ret.json()
    }else{
        throw new Error(ret.statusText)
    }
}