import {useEffect,useState} from 'react'
import {CircularProgressbar,buildStyles} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const ControlPresupuesto = ({presupuesto,gastos,
                             setGastos,setPresupuesto,
                             setIsValidPrespuesto}) => {
    const [porcentaje,setPorcentaje] = useState(0) 
    const [disponible,setDisponible] = useState(0)
    const [gastado,setGastado] = useState(0)

    useEffect (() => {
        const totalGastado = gastos.reduce( (total,gasto)=> gasto.cantidad + total,0)
        const totalDisponible = presupuesto - totalGastado
        //Calcular el prosentaje
        const nuevoPorsentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2)
        

        setGastado(totalGastado)
        setDisponible(totalDisponible)
        
        setTimeout (() => {
            setPorcentaje(nuevoPorsentaje)
        },1000)
        
    },[gastos])

    const formatearCantidad = (cantidad) => {
       return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })

    }

    const handleResetaerApp =() => {
        const resultado = confirm('¿Deseas reiniciar prespuesto y gastos?')
        if(resultado) {
            setGastos([])
            setPresupuesto(0)
            setIsValidPrespuesto(false)
        }
        
    }
  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
        <button
            className='reset-app'
            type='button'
            onClick={handleResetaerApp}
            
        >
            Resetear App
        </button>
        <div>
            <CircularProgressbar 
                value={porcentaje}
                text={`${porcentaje}% Gastado`} 
                styles={buildStyles ({
                    pathColor:porcentaje >100?'#dc2626':'#3b82f6',
                    trailColor:'#f5f5f5',
                    textColor:porcentaje >100?'#dc2626' :'#3b82f6'
                
                })}>

            </CircularProgressbar>
        </div>

        <div className="contenido-presupuesto">
            <p>
                <span>Prespuesto:</span>{formatearCantidad(presupuesto)}
            </p>

            <p className={`${disponible<0? 'negativo':''}`}>
                <span>Disponible:</span>{formatearCantidad(disponible)}
            </p>

            <p>
                <span>Gastado:</span>{formatearCantidad(gastado)}
            </p>
        </div>
    
    </div>
  )
}

export default ControlPresupuesto