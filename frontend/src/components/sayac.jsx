import { useState } from 'react'

function Sayac() {
    const [sayac, setSayac] = useState(3) 


    return (
        <div>
            <h2>Sayaç = {sayac}</h2>
            <button onClick={() => setSayac(sayac + 1)}>Artır</button>
        </div>
    )
}

export default Sayac;