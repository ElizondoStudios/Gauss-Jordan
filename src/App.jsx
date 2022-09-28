import React from 'react'
import Entrada_sistema from '../components/Entrada_sistema'
import Matriz_aumentada_3x3 from '../components/Matriz_aumentada_3x3';
import Matriz_aumentada_2x2 from '../components/Matriz_aumentada_2x2';
import Resolver from '../components/Resolver';

function App() {
  const [dimensionSistema, setDimensionSistema]= React.useState("2x2");
  const [mostrarRes, setMostrarRes]= React.useState(false)
  const [MA, setMA]= React.useState([])

  function cambiarSistema(dim){
    setDimensionSistema(dim);

    setMostrarRes(false);
    setMA([]);
  }

  function interpretar(ecuacion){
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

  function crearMA(sistema){
    const[ecuacion1, ecuacion2, ecuacion3]=sistema
    setMA([])
    interpretar(ecuacion1)
    interpretar(ecuacion2)
    if(dimensionSistema=="3x3") interpretar(ecuacion3)
    setMostrarRes(true)
  }

  return (
    <div className="App">
      <h1 className='App--titulo'>Resolver sistema {dimensionSistema}</h1>
      <Entrada_sistema
       sistema={dimensionSistema}
       cambiarSistema={cambiarSistema}
       crearMA={crearMA}
      />
      <div className='App--espacio'/>
      {mostrarRes && dimensionSistema=="3x3" &&
        <Matriz_aumentada_3x3 
          matriz={MA}
        />
      }
      {mostrarRes && dimensionSistema=="2x2" &&
        <Matriz_aumentada_2x2
          matriz={MA}
        />
      }
      {mostrarRes && <Resolver matriz={MA} dimension={dimensionSistema}/>}
    </div>
  )
}

export default App
