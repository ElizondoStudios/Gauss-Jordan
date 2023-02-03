import React from 'react'
import Entrada_sistema from '../components/Entrada_sistema'
import Resolver from '../components/Resolver';
import Entrada_regresion from '../components/Entrada_regresion';

function App() {
  //Estado general
  const[tipoProblema, setTipoProblema]= React.useState("GJ")

  //Gauss-Jordan
  const [dimensionSistema, setDimensionSistema]= React.useState("2x2");
  const [mostrarRes, setMostrarRes]= React.useState(false)
  const [MA, setMA]= React.useState([])

  function cambiarSistema(dim){
    setDimensionSistema(dim);

    setMostrarRes(false);
    setMA([]);
  }


  function interpretar(ecuacion, num){
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
    if(dimensionSistema=="3x3" || dimensionSistema=="3x3 (matriz inversa)"){
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

    if(dimensionSistema=="3x3" || dimensionSistema=="2x2"){
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
    }else{ //Si es matriz inversa
      if(num===1){
        if(dimensionSistema=="3x3 (matriz inversa)"){
          setMA(prevMA => (
            [...prevMA, "1","0","0"]
            )
          )
        }else{
          setMA(prevMA => (
            [...prevMA, "1","0"]
            )
          )
        }
      }else if(num===2){
        if(dimensionSistema=="3x3 (matriz inversa)"){
          setMA(prevMA => (
            [...prevMA, "0","1","0"]
            )
          )
        }else{
          setMA(prevMA => (
            [...prevMA, "0","1"]
            )
          )
        }
      }else{
        setMA(prevMA => (
          [...prevMA, "0","0","1"]
          )
        )
      }
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
      
    interpretar(corregirEc(ecuacion1), 1)
    interpretar(corregirEc(ecuacion2), 2)
    if(dimensionSistema=="3x3" || dimensionSistema=="3x3 (matriz inversa)") interpretar(corregirEc(ecuacion3), 3)
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
