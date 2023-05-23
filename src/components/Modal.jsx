import {useState,useEffect} from 'react'
import Mensaje from './Mensaje'
import CerrarModal from '../img/cerrar.svg'

const Modal = ({setModal,animarModal,
                setAnimarModal,guardarGasto,
                gastoEditar,setGastoEditar}) => {
    const [mensaje,setMensaje] = useState("")
    const [nombre,setNombre] = useState("")
    const [cantidad, setCantidad] = useState("")
    const [categoria,setCategoria] = useState("")
    const [fecha,setFecha] = useState('')
    const [id, setId] = useState('')

    useEffect ( ()=> {
        if(Object.keys(gastoEditar).length >0){
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
          }
    },[])

    const handelSubmit =(e) => {
        e.preventDefault()

        if([nombre,cantidad,categoria].includes('')) {
            setMensaje("Todos los campos son obligatorios")
            setTimeout ( ()=> {
                setMensaje("")
            },3000)
            return
        }
        guardarGasto({nombre,cantidad,categoria,id,fecha})
        setNombre('')
        setCantidad('')
        setCategoria('')

    }
    
    

    const ocultarModal = () =>{
        setAnimarModal(false)
        setGastoEditar({})
        setTimeout ( () => {
            setModal(false)           
        },700)       
    }

  return (
    <div className='modal'>
        <div className="cerrar-modal">
            <img src={CerrarModal}
             alt="boton cerrar modal"
             onClick={ocultarModal}
             className="puntero"
              />
        </div>
        <form action="" className={`formulario ${animarModal? "animar":"cerrar"}`} onSubmit={handelSubmit}>
            <legend>{gastoEditar.nombre ? "Editar Gasto":"Nuevo Gasto"}</legend>
            {mensaje&& <Mensaje tipo="error" >{mensaje}</Mensaje>}
            <div className="campo">
                <label htmlFor="nombre">Nombre Gasto</label>
                <input 
                    type="text" 
                    placeholder='Añade el nombre del gasto'
                    id='nombre'
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    />
            </div>

            <div className="campo">
                <label htmlFor="cantidad">Cantidad</label>
                <input 
                    type="number" 
                    placeholder='Añade la cantidad: ej: 300'
                    id='cantidad'
                    value={cantidad}
                    onChange={e=>setCantidad(Number(e.target.value))}
                    />
            </div>

            <div className="campo">
                <label htmlFor="categoria">Categoria</label>
                <select name="" id="categoria" value={categoria} onChange={e => setCategoria(e.target.value)}>
                    <option disabled value="">--Seleccione--</option>  
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="gastos">Gastos Varios</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripción">Suscripción</option>
                </select>
            </div>
            <input type="submit"  value={gastoEditar.nombre ? "Guardar Cambios":"Añadir Gasto"}/>


        </form>


    </div>
  )
}

export default Modal