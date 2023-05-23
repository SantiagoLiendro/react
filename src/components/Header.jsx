import NuevoPresupuesto from "./NuevoPresupuesto"
import ControlPresupuesto from "./ControlPresupuesto"

const Header = ({presupuesto,setPresupuesto,
                isvlidPresupuesto,setIsValidPrespuesto,
                gastos,setGastos}) => {
  
  return (
    <div>
        <header> 
            <h1>Planificador de Gastos</h1>

            {isvlidPresupuesto? 
            (<ControlPresupuesto
              presupuesto={presupuesto}
              setPresupuesto={setPresupuesto}
              gastos={gastos}
              setGastos={setGastos}
              setIsValidPrespuesto={setIsValidPrespuesto}

            />):(
              <NuevoPresupuesto
              presupuesto ={presupuesto}
              setPresupuesto={setPresupuesto}
              setIsValidPrespuesto={setIsValidPrespuesto}
              />     
            )}
                
        </header>
    </div>
  )
}

export default Header