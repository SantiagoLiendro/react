import Mensaje from './Mensaje'
import {useState}from 'react'


const NuevoPresupuesto = ({presupuesto,setPresupuesto,setIsValidPrespuesto}) => {

  const[mensaje,setMensaje] =useState("")
  const handlePresupuesto = (e)=>{
    e.preventDefault()
    if(!presupuesto||presupuesto<0){
      setMensaje("No es un presupuesto valido")
      setTimeout ( ()=> {
        setMensaje('')
      },3000 )
      return;
    } 
    setIsValidPrespuesto(true)

  
  }

  
  return (
    <div className="contenedor-presupuesto contenedor sombra">
        <form action="" className="formulario" onSubmit={handlePresupuesto} id='prespuesto'>
            <div className="campo">
                <label htmlFor="presupuesto">Nuevo Presupuesto</label>
                <input 
                    type="number" 
                    className="nuevo-presupuesto"
                    placeholder="Añade tu Presupuesto"
                    value={presupuesto}
                    onChange={ e => setPresupuesto(Number(e.target.value))}    
                             
                />
            </div>
            <input type="submit" value="Añadir"/>
            {mensaje && <Mensaje tipo="error"> {mensaje}</Mensaje>}

        </form>
    </div>
  )
}

export default NuevoPresupuesto