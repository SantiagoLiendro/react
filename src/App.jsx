import { useState,useEffect } from 'react'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import  {generarId} from './helpers' 
import Header from './components/Header'
import ListadoGasto from './components/ListadoGasto'
import Modal from './components/Modal';
import Filtros from './components/Filtros'



function App() {
  const [presupuesto,setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  );
  const [isvlidPresupuesto,setIsValidPrespuesto] =useState(false)
  const [modal,setModal] = useState(false)
  const [animarModal,setAnimarModal] = useState(false)
  const [gastos,setGastos]=useState(
   localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')): [] )
  const [gastoEditar,setGastoEditar] = useState({})
  const [filtros,setFiltros]=useState('')
  const [gastosFiltrados,setGastosFiltrados]=useState([])

  useEffect (()=> {
    if(Object.keys(gastoEditar).length >0){
      setModal(true)

      setTimeout (() => {
        setAnimarModal(true)
      },500)
    }
  },[gastoEditar])

  useEffect ( ()=> {
    localStorage.setItem('presupuesto',presupuesto?? 0)
  },[presupuesto])

  useEffect ( ()=> {
    localStorage.setItem('gastos',JSON.stringify(gastos)?? [])
  },[gastos])

  useEffect(()=>{
    if(filtros){
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtros)
      setGastosFiltrados(gastosFiltrados)

    }
    
  },[filtros])
  useEffect (() =>{
    const prespuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0
    if(prespuestoLS >0) {
      setIsValidPrespuesto(true)
    }
  },[])



  const handelNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})

    setTimeout (() => {
      setAnimarModal(true)
    },500)
  }

  const guardarGasto = gasto => {
    if(gasto.id) {
      //Actualizar
      const gastosActualizado = gastos.map (gastoState => gastoState.id ===
        gasto.id? gasto:gastoState)
        setGastos(gastosActualizado)
        setGastoEditar({})
    } else {
      gasto.id = generarId()
      gasto.fecha = Date.now()
      setGastos([...gastos,gasto])
    }
   
    setAnimarModal(false)
        setTimeout ( () => {
            setModal(false)           
        },700)  
  }

  const eliminarGasto = id => {
    const gastosActualizado = gastos.filter( gasto => gasto.id !== id)
    setGastos(gastosActualizado)
  }
  

  return (
 
      <div className={modal? 'fijar':''}>
          <Header
            presupuesto ={presupuesto}
            setPresupuesto={setPresupuesto}
            isvlidPresupuesto={isvlidPresupuesto}
            setIsValidPrespuesto={setIsValidPrespuesto}
            gastos={gastos}   
            setGastos ={setGastos} 
          />

        {isvlidPresupuesto && (
          <>
          <main>
            <Filtros
              filtros={filtros}
              setFiltros={setFiltros}
              
            />
            <ListadoGasto
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              gastosFiltrados={gastosFiltrados}
              filtros={filtros}
            />

          </main>
            <div className="nuevo-gasto">
              <img 
                src={IconoNuevoGasto} 
                alt="icono de nuevo gasto"
                onClick={handelNuevoGasto}
                />
            </div>
          </>
        )}

        {modal && <Modal 
                    setModal={setModal} 
                    animarModal={animarModal} 
                    setAnimarModal ={setAnimarModal} 
                    guardarGasto={guardarGasto}
                    gastoEditar={gastoEditar}
                    setGastoEditar={setGastoEditar}
                    >
                  </Modal>}
        

      </div>
      
 
  )
}

export default App
