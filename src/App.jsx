import React from 'react'
import Entrada_sistema from '../components/Entrada_sistema'
import Resolver from '../components/Resolver';
import Entrada_regresion from '../components/Entrada_regresion';

function App() {
  //Estado general
  const[tipoProblema, setTipoProblema]= React.useState("Regresion")

  //Gauss-Jordan
  const [dimensionSistema, setDimensionSistema]= React.useState("2x2");
  const [mostrarRes, setMostrarRes]= React.useState(false)
  const [MA, setMA]= React.useState([])

  function cambiarSistema(dim){
    setDimensionSistema(dim);

    setMostrarRes(false);
    setMA([]);
  }


  function interpretar(ecuacion){
    console.log(ecuacion)
    ecuacion.replace(/\s+/g, '') //quita todos los espacios
    let xposc, yposc, zposc, equalposc
    xposc= ecuacion.indexOf("x")
    yposc= ecuacion.indexOf("y")
    zposc= ecuacion.indexOf("z")
    equalposc= ecuacion.indexOf("=")
      

    if(xposc===-1){
      setMA(prevMA => (
          [...prevMA, "0"]
        )
      )
    }else{
      setMA(prevMA => (
          [...prevMA, ecuacion[0]==="+"? ecuacion.slice(1, xposc): ecuacion.slice(0, xposc)]
        )
      )
    }

    if(yposc===-1){
      setMA(prevMA => (
        [...prevMA, "0"]
        )
      )
    }else{
      setMA(prevMA => (
        [...prevMA, ecuacion[xposc+1]==="+"? ecuacion.slice(xposc+2, yposc): ecuacion.slice(xposc+1, yposc)]
        )
      )
    }
    if(dimensionSistema=="3x3"){
      if(zposc===-1){
        setMA(prevMA => (
          [...prevMA, "0"]
          )
        )
      }else{
        setMA(prevMA => (
          [...prevMA, ecuacion[yposc+1]==="+"? ecuacion.slice(yposc+2, zposc): ecuacion.slice(yposc+1, zposc)]
          )
        )
      }
    }

    if(equalposc===-1){
      setMA(prevMA => (
        [...prevMA, "0"]
        )
      )
    }else{
      setMA(prevMA => (
        [...prevMA, ecuacion.slice(equalposc+1)]
        )
      )
    }
  }

  function corregirEc(ecuacion){
    let xposc, yposc, zposc

    //Corregir ecuacion
    xposc= ecuacion.indexOf("x")
    if(xposc===0 || (xposc===1 && ecuacion[0]==="-"))
      ecuacion=ecuacion.replace("x", "1x")

    yposc= ecuacion.indexOf("y")
    if(yposc>=0 && (ecuacion[yposc-1]==="+" || ecuacion[yposc-1]==="-"))
      ecuacion=ecuacion.replace("y", "1y")
      
    zposc= ecuacion.indexOf("z")
    if(zposc>=0 && (ecuacion[zposc-1]==="+" || ecuacion[zposc-1]==="-"))
      ecuacion=ecuacion.replace("z", "1z")

    return ecuacion
}

  function crearMA(sistema){
    setMA([])
    let[ecuacion1, ecuacion2, ecuacion3]=sistema
    
    if(ecuacion1[0]==="1" || ecuacion1[0]==="x" ||(ecuacion1[0]==="-" && ecuacion1[1]==="x")){
      let aux= ecuacion1
      ecuacion1=ecuacion2
      ecuacion2=aux
    }
      
    interpretar(corregirEc(ecuacion1))
    interpretar(corregirEc(ecuacion2))
    if(dimensionSistema=="3x3") interpretar(corregirEc(ecuacion3))
    setMostrarRes(true)
  }

  return (
    <div className="App">
      <h1 className="App--titulo">Álgebra lineal</h1>

      <div className="App--seleccionar">
        <div>
          <label htmlFor="seleccionar-problema">Seleccione el tipo de problema a resolver</label>
          <select 
          id="seleccionar-problema"
           onChange={e=> 
                      {e.target.value==="Gauss Jordan"?setTipoProblema("GJ"):
                      setTipoProblema("Regresion")
                      setMostrarRes(false)}}>
            <option>Regresión lineal</option>
            <option>Gauss Jordan</option>
          </select>
        </div>
      </div>

      <h4 className="App--nombre">Desarrollado por José Luis Elizondo Figueroa</h4>
      <h4 className="App--repositorio">
        <a 
         href='https://github.com/ElizondoStudios/Gauss-Jordan'
        >Repositorio en Github</a>
      </h4>

      <div className='App--espacio'/>

      {tipoProblema==="GJ" &&
      <Entrada_sistema
       sistema={dimensionSistema}
       cambiarSistema={cambiarSistema}
       crearMA={crearMA}
       dimension={dimensionSistema}
      />}
      <div className='App--espacio'/>
      {mostrarRes && <Resolver matriz={MA} dimension={dimensionSistema}/>}

      {tipoProblema==="Regresion" &&
      <Entrada_regresion
      />
      }
    </div>
  )
}

export default App
