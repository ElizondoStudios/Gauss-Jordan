import React from "react";
import Tabla_regresion from "./Tabla_regresion";
import Resolver from "./Resolver";

function Entrada_regresion(){
    const [entradaxk, setEntradaxk]= React.useState("")
    const [entradayk, setEntradayk]= React.useState("")
    const [solucion, setSolucion]= React.useState(false)
    const [matriz, setMatriz]= React.useState([])
    const [sigmaSt, setSigmast]= React.useState([])
    const [tablaSt, setTablaSt]= React.useState([[]])

    let vecxk, vecyk, vecx2k, vecxkyk, sigma, tablaReng, tabla

    //Interpretar entrada y crear vecxk y vecyk
    function interpretar(){
        vecxk=[], vecyk=[], vecx2k=[], vecxkyk=[], sigma=[0,0,0,0], tablaReng=[], tabla=[]
        setMatriz([])
        
        //Crear vecxk
        let prevComma=0, entrada= entradaxk
        entrada+=","
        for(let i=0; i<entrada.length; i++){
            if(entrada[i]===","){
                vecxk.push((parseInt(entrada.substring(prevComma, i))))
                prevComma=i+1
            }
        }

        //Crear vecyk
        prevComma=0, entrada=entradayk
        entrada+=","
        for(let i=0; i<entrada.length; i++){
            if(entrada[i]===","){
                vecyk.push(parseInt(entrada.substring(prevComma, i)))
                prevComma=i+1
            }
        }

        //crear vecx2k y vecxkyk
        for(let i=0; i<vecxk.length; i++){
            vecx2k[i]= vecxk[i]*vecxk[i]
            vecxkyk[i]= vecxk[i]*vecyk[i]
        }

        //Crear sigma
        for(let i=0; i<vecxk.length; i++){
            sigma[0]+=vecxk[i]
            sigma[1]+=vecyk[i]
            sigma[2]+=vecx2k[i]
            sigma[3]+=vecxkyk[i]
        }

        // Crear tabla
        for(let i= 0; i<vecxk.length; i++){
            tablaReng=[]
            tablaReng.push(i+1)
            tablaReng.push(vecxk[i])
            tablaReng.push(vecyk[i])
            tablaReng.push(vecx2k[i])
            tablaReng.push(vecxkyk[i])
            tabla.push(tablaReng)
        }
        setTablaSt(()=>(tabla.map(e=> e.map(f=>f))))

        //Crear sigmaSt
        setSigmast([sigma[0],sigma[1], sigma[2], sigma[3]])

        //Crear MA
        setMatriz([""+sigma[2], ""+sigma[0], ""+sigma[3], 
        ""+sigma[0], ""+vecxk.length, ""+sigma[1]])

        setSolucion(true)

    }

    return(
        <div className="entrada-sistemas">
            <form 
             onSubmit={e=>e.preventDefault()}
             className="entrada-sistemas--form"
            >
                <h1>Resolver regresión lineal</h1>
                <label htmlFor="entrada-xk">Entrada xk:</label>
                <input
                 id="entrada-xk" 
                 placeholder="x1,x2,x3..."
                 onChange={e=>{setEntradaxk(e.target.value)}}
                 value={entradaxk}
                 />
                <label htmlFor="entrada-yk">Entrada yk:</label>
                <input
                 id="entrada-yk" 
                 placeholder="y1,y2,y3..."
                 onChange={e=>{setEntradayk(e.target.value)}}
                 value={entradayk}
                />
                <button onClick={interpretar}>Resolver</button>
            </form>
            {solucion && <Tabla_regresion
             tabla={tablaSt}
             sigma={sigmaSt}
            />}
            {solucion && <Resolver
             matriz={matriz}
             dimension="2x2"
             regresion={true}
            />}
        </div>
    )
}

export default Entrada_regresion;