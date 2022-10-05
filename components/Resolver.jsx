import { racionales } from "../src/racionales";
import Matriz_aumentada_2x2 from "./Matriz_aumentada_2x2";
import Matriz_aumentada_3x3 from "./Matriz_aumentada_3x3";
import Matriz_aumentada_2x2_inversa from "./Matriz_aumentada_2x2_inversa";
import Matriz_aumentada_3x3_inversa from "./Matriz_aumentada_3x3_inversa";

function Resolver(props){
    // Lógica para resolver por el método de Gauss Jordan
    let a11, a12, a21, a22, b1, b2, matrizPasos=[]
    let Pasos=[]

    function operacionRenglon(dato1, dato2, alfa){
        dato1.dato= dato1.restar(new racionales(dato2.multiplicar(alfa)))
    }
    
    if(props.dimension==="3x3"){ //Resolver 3x3
        function generarPaso(){
            matrizPasos=[a11.dato, a12.dato, a13.dato, b1.dato, a21.dato, a22.dato,
                 a23.dato, b2.dato, a31.dato, a32.dato, a33.dato, b3.dato]

            Pasos.push(<Matriz_aumentada_3x3
                            matriz={matrizPasos}
                        />)
        }
        Pasos.push(
            <Matriz_aumentada_3x3 
                matriz={props.matriz}
            />)

        let a13, a23, a31, a32, a33, b3, alfa
        a11= new racionales(props.matriz[0])
        a12= new racionales(props.matriz[1])
        a13= new racionales(props.matriz[2])
        b1= new racionales(props.matriz[3])

        a21= new racionales(props.matriz[4])
        a22= new racionales(props.matriz[5])
        a23= new racionales(props.matriz[6])
        b2= new racionales(props.matriz[7])

        a31= new racionales(props.matriz[8])
        a32= new racionales(props.matriz[9])
        a33= new racionales(props.matriz[10])
        b3= new racionales(props.matriz[11])

        //R2-(a21/a11)R1➡R2   
        Pasos.push(<h2 className="resolver--paso">R2-({a21.dividir(a11)})R1 ➡ R2</h2>)  
        alfa= new racionales(a21.dividir(a11)) 
        a21.dato="0"
        operacionRenglon(a22, a12, alfa)
        operacionRenglon(a23, a13, alfa)
        operacionRenglon(b2, b1, alfa)

        // R3-(a31/a11)R1➡R3
        Pasos.push(<h2 className="resolver--paso">R3-({a31.dividir(a11)})R1 ➡ R3</h2>)  
        alfa= new racionales(a31.dividir(a11)) 
        a31.dato="0"
        operacionRenglon(a32, a12, alfa)
        operacionRenglon(a33, a13, alfa)
        operacionRenglon(b3, b1, alfa)

        if(a22.dato==="0"){
            // R2 ↔ R3
            function intercambiar(dato1, dato2){
                let aux= dato1.dato
                dato1.dato= dato2.dato
                dato2.dato=aux
            }

            let fila2=[a21, a22, a23, b21, b22, b23], fila3=[a31, a32, a33, b31, b32, b33]
            for (let i = 0; i < 6; i++) {
                intercambiar(fila2[i], fila3[i])
            }
            Pasos.push(<h2 className="resolver--paso">R2 ↔ R3</h2>)  
            generarPaso()
        }


        generarPaso()
        
        //R1-(a12/a22)R2➡R1   
        Pasos.push(<h2 className="resolver--paso">R1-({a12.dividir(a22)})R2 ➡ R1</h2>)  
        alfa= new racionales(a12.dividir(a22))
        a12.dato="0"
        operacionRenglon(a11, a21, alfa)
        operacionRenglon(a13, a23, alfa)
        operacionRenglon(b1, b2, alfa)

        //R3-(a32/a22)R2➡R3   
        Pasos.push(<h2 className="resolver--paso">R3-({a32.dividir(a22)})R2 ➡ R3</h2>)  
        alfa= new racionales(a32.dividir(a22))
        a32.dato="0"
        operacionRenglon(a33, a23, alfa)
        operacionRenglon(b3, b2, alfa)

        generarPaso()

        if(a22.dato==="0"){
            if(b2.dato==="0"){
                Pasos.push(<h2 className="resolver--paso">({new racionales("1").dividir(a11)})R1 ➡ R1</h2>)  
                Pasos.push(<h2 className="resolver--paso">({new racionales("1").dividir(a11)})R3 ➡ R3</h2>)  

                a13.dato=a13.dividir(a11)
                b1.dato=b1.dividir(a11)
                a11.dato="1"

                a33.dato=a33.dividir(a32)
                b3.dato=b3.dividir(a32)
                a32.dato="1"
                generarPaso()

                Pasos.push(
                    <div className="resolver--solucion">
                        <h1>Solución del sistema:</h1>
                        <h2>El sistema tiene infinitas soluciones</h2>
                        <h2>S={`{(${b1.dato+"+("+a13.multiplicar(new racionales("-1"))+")"}z, ${b3.dato+"+("+a33.multiplicar(new racionales("-1"))+")"}z, z)|z∈R}`}</h2>
                    </div>
                )
            }else{
                Pasos.push(
                    <div className="resolver--solucion">
                        <h1>Solución del sistema:</h1>
                        <h2>El sistema no tiene solución</h2>
                    </div>
                )
            }
        }else if(a33.dato==="0"){
            if(b3.dato==="0"){
                Pasos.push(<h2 className="resolver--paso">({new racionales("1").dividir(a11)})R1 ➡ R1</h2>)  
                Pasos.push(<h2 className="resolver--paso">({new racionales("1").dividir(a11)})R2 ➡ R2</h2>)

                a13.dato=a13.dividir(a11)
                b1.dato=b1.dividir(a11)
                a11.dato="1"

                a23.dato=a23.dividir(a22)
                b2.dato=b2.dividir(a22)
                a22.dato="1"
                generarPaso()

                Pasos.push(
                    <div className="resolver--solucion">
                        <h1>Solución del sistema:</h1>
                        <h2>El sistema tiene infinitas soluciones</h2>
                        <h2>S={`{(${b1.dato+"+("+a13.multiplicar(new racionales("-1"))+")"}z, ${b2.dato+"+("+a23.multiplicar(new racionales("-1"))+")"}z, z)|z∈R}`}</h2>
                    </div>
                )
            }else{
                Pasos.push(
                    <div className="resolver--solucion">
                        <h1>Solución del sistema:</h1>
                        <h2>El sistema no tiene solución</h2>
                    </div>
                )
            }
        }else{
            //R1-(a13/a33)R3➡R1
            Pasos.push(<h2 className="resolver--paso">R1-({a13.dividir(a33)})R3 ➡ R1</h2>)  
            alfa= new racionales(a13.dividir(a33))
            a13.dato="0"
            operacionRenglon(b1, b3, alfa)

            //R2-(a23/a33)R3➡R2
            Pasos.push(<h2 className="resolver--paso">R2-({a23.dividir(a33)})R3 ➡ R2</h2>)  
            alfa= new racionales(a23.dividir(a33))
            a23.dato="0"
            operacionRenglon(b2, b3, alfa)

            generarPaso()

            //(1/a11)R1➡R1
            Pasos.push(<h2 className="resolver--paso">({new racionales("1").dividir(a11)})R1 ➡ R1</h2>)  
            b1.dato=b1.dividir(a11);
            a11.dato="1"

            //(1/a22)R2➡R2
            Pasos.push(<h2 className="resolver--paso">({new racionales("1").dividir(a22)})R2 ➡ R2</h2>)  
            b2.dato=b2.dividir(a22);
            a22.dato="1"
            
            //(1/a33)R3➡R3
            Pasos.push(<h2 className="resolver--paso">({new racionales("1").dividir(a33)})R3 ➡ R3</h2>)  
            b3.dato=b3.dividir(a33);
            a33.dato="1"

            generarPaso()

            Pasos.push(
                <div className="resolver--solucion">
                    <h1>Solución del sistema:</h1>
                    <h2>x= {b1.dato}</h2>
                    <h2>y= {b2.dato}</h2>
                    <h2>z= {b3.dato}</h2>
                </div>
            )
        }
    } else if(props.dimension=="3x3 (matriz inversa)"){ //Matriz inversa 3x3
        function generarPaso(){
            matrizPasos=[a11.dato, a12.dato, a13.dato, b11.dato, b12.dato, b13.dato, a21.dato, a22.dato,
                 a23.dato, b21.dato, b22.dato, b23.dato, a31.dato, a32.dato, a33.dato, b31.dato, b32.dato, b33.dato]

            Pasos.push(<Matriz_aumentada_3x3_inversa
                            matriz={matrizPasos}
                        />)
        }
        Pasos.push(
            <Matriz_aumentada_3x3_inversa
                matriz={props.matriz}
            />)

        let a13, a23, a31, a32, a33, alfa, b11, b12, b13, b21, b22, b23, b31, b32, b33
        a11= new racionales(props.matriz[0])
        a12= new racionales(props.matriz[1])
        a13= new racionales(props.matriz[2])
        b11= new racionales(props.matriz[3])
        b12= new racionales(props.matriz[4])
        b13= new racionales(props.matriz[5])


        a21= new racionales(props.matriz[6])
        a22= new racionales(props.matriz[7])
        a23= new racionales(props.matriz[8])
        b21= new racionales(props.matriz[9])
        b22= new racionales(props.matriz[10])
        b23= new racionales(props.matriz[11])

        a31= new racionales(props.matriz[12])
        a32= new racionales(props.matriz[13])
        a33= new racionales(props.matriz[14])
        b31= new racionales(props.matriz[15])
        b32= new racionales(props.matriz[16])
        b33= new racionales(props.matriz[17])

        //R2-(a21/a11)R1➡R2   
        Pasos.push(<h2 className="resolver--paso">R2-({a21.dividir(a11)})R1 ➡ R2</h2>)  
        alfa= new racionales(a21.dividir(a11)) 
        a21.dato="0"
        operacionRenglon(a22, a12, alfa)
        operacionRenglon(a23, a13, alfa)

        operacionRenglon(b21, b11, alfa)
        operacionRenglon(b22, b12, alfa)
        operacionRenglon(b23, b13, alfa)


        // R3-(a31/a11)R1➡R3
        Pasos.push(<h2 className="resolver--paso">R3-({a31.dividir(a11)})R1 ➡ R3</h2>)  
        alfa= new racionales(a31.dividir(a11)) 
        a31.dato="0"
        operacionRenglon(a32, a12, alfa)
        operacionRenglon(a33, a13, alfa)

        operacionRenglon(b31, b11, alfa)
        operacionRenglon(b32, b12, alfa)
        operacionRenglon(b33, b13, alfa)

        generarPaso()

        if(a22.dato==="0"){
            // R2 ↔ R3
            function intercambiar(dato1, dato2){
                let aux= dato1.dato
                dato1.dato= dato2.dato
                dato2.dato=aux
            }

            let fila2=[a21, a22, a23, b21, b22, b23], fila3=[a31, a32, a33, b31, b32, b33]
            for (let i = 0; i < 6; i++) {
                intercambiar(fila2[i], fila3[i])
            }
            Pasos.push(<h2 className="resolver--paso">R2 ↔ R3</h2>)  
            generarPaso()
        }
        
        //R1-(a12/a22)R2➡R1   
        Pasos.push(<h2 className="resolver--paso">R1-({a12.dividir(a22)})R2 ➡ R1</h2>)  
        alfa= new racionales(a12.dividir(a22))
        a12.dato="0"
        operacionRenglon(a11, a21, alfa)
        operacionRenglon(a13, a23, alfa)

        operacionRenglon(b11, b21, alfa)
        operacionRenglon(b12, b22, alfa)
        operacionRenglon(b13, b23, alfa)


        //R3-(a32/a22)R2➡R3   
        Pasos.push(<h2 className="resolver--paso">R3-({a32.dividir(a22)})R2 ➡ R3</h2>)  
        alfa= new racionales(a32.dividir(a22))
        a32.dato="0"
        operacionRenglon(a33, a23, alfa)

        operacionRenglon(b31, b21, alfa)
        operacionRenglon(b32, b22, alfa)
        operacionRenglon(b33, b23, alfa)


        generarPaso()

         //R1-(a13/a33)R3➡R1
         Pasos.push(<h2 className="resolver--paso">R1-({a13.dividir(a33)})R3 ➡ R1</h2>)  
         alfa= new racionales(a13.dividir(a33))
         a13.dato="0"
         
         operacionRenglon(b11, b31, alfa)
         operacionRenglon(b12, b32, alfa)
         operacionRenglon(b13, b33, alfa)

         //R2-(a23/a33)R3➡R2
         Pasos.push(<h2 className="resolver--paso">R2-({a23.dividir(a33)})R3 ➡ R2</h2>)  
         alfa= new racionales(a23.dividir(a33))
         a23.dato="0"
         operacionRenglon(b21, b31, alfa)
         operacionRenglon(b22, b32, alfa)
         operacionRenglon(b23, b33, alfa)


         generarPaso()

         //(1/a11)R1➡R1
         Pasos.push(<h2 className="resolver--paso">({new racionales("1").dividir(a11)})R1 ➡ R1</h2>)  
         b11.dato=b11.dividir(a11);
         b12.dato=b12.dividir(a11);
         b13.dato=b13.dividir(a11);

         a11.dato="1"

         //(1/a22)R2➡R2
         Pasos.push(<h2 className="resolver--paso">({new racionales("1").dividir(a22)})R2 ➡ R2</h2>)  
         b21.dato=b21.dividir(a22);
         b22.dato=b22.dividir(a22);
         b23.dato=b23.dividir(a22);

         a22.dato="1"
         
         //(1/a33)R3➡R3
         Pasos.push(<h2 className="resolver--paso">({new racionales("1").dividir(a33)})R3 ➡ R3</h2>)  
         b31.dato=b31.dividir(a33);
         b32.dato=b32.dividir(a33);
         b33.dato=b33.dividir(a33);

         a33.dato="1"

         generarPaso()

         Pasos.push(
             <div className="resolver--solucion">
                 <h1>Solución del sistema:</h1>
                 <Matriz_aumentada_3x3
                    solucion={true}
                    matriz={[b11.dato, b12.dato, b13.dato, "", b21.dato, b22.dato, b23.dato, "", b31.dato, b32.dato, b33.dato, "",]}
                 />
             </div>
         )
    } else if(props.dimension=="2x2"){ //Resolver 2x2
        function generarPaso(){
            matrizPasos=[a11.dato, a12.dato, b1.dato, a21.dato, a22.dato, b2.dato]

            Pasos.push(<Matriz_aumentada_2x2
                matriz={matrizPasos}
                />)
        }

        Pasos.push(
            <Matriz_aumentada_2x2 
                matriz={props.matriz}
            />)

        a11= new racionales(props.matriz[0])
        a12= new racionales(props.matriz[1])
        b1= new racionales(props.matriz[2])

        a21= new racionales(props.matriz[3])
        a22= new racionales(props.matriz[4])
        b2= new racionales(props.matriz[5])

        // R2-(a21/a11)R1 ➡ R2
        Pasos.push(<h2 className="resolver--paso">R2-({a21.dividir(a11)})R1 ➡ R2</h2>)  
        let alfa= new racionales(a21.dividir(a11))
        a21.dato="0"
        operacionRenglon(a22, a12, alfa)
        operacionRenglon(b2, b1, alfa)

        generarPaso()

        //Comprobar si tiene solución única
        if(a22.dato==="0"){
            if(b2.dato==="0"){
                let x=a11.multiplicar(new racionales("-1"))
                x= new racionales(x).dividir(a12)

                Pasos.push(
                    <div className="resolver--solucion">
                        <h1>Solución del sistema:</h1>
                        <h2>El sistema tiene infinitas soluciones</h2>
                        <h2>S={`{(x, ${b1.dividir(a12)} ${x[0]==="-"? x : "+"+x}x)| x∈R}`}</h2>
                    </div>
                )
            }else{
                Pasos.push(
                    <div className="resolver--solucion">
                        <h1>Solución del sistema:</h1>
                        <h2>El sistema no tiene solución</h2>
                    </div>
                )
            }
        }else{
            //(1/a11)R1 ➡ R1
            Pasos.push(<h2 className="resolver--paso">({new racionales("1").dividir(a11)})R1 ➡ R1</h2>)  
            a12.dato= a12.dividir(a11)
            b1.dato= b1.dividir(a11)
            a11.dato="1"

            //(1/a22)R2 ➡ R2
            Pasos.push(<h2 className="resolver--paso">({new racionales("1").dividir(a22)})R2 ➡ R2</h2>)  
            b2.dato= b2.dividir(a22)
            a22.dato="1"
            
            generarPaso()   
            
            //R1- (a12/a22)R2 ➡ R1
            Pasos.push(<h2 className="resolver--paso">R1-({a12.dividir(a22)})R2 ➡ R1</h2>) 
            alfa= new racionales(a12.dividir(a22))
            a12.dato="0"    
            operacionRenglon(b1, b2, alfa)

            generarPaso() 
            
            Pasos.push(
                <div className="resolver--solucion">
                    <h1>Solución del sistema:</h1>
                    <h2>{props.regresion? "A": "x"}= {b1.dato}</h2>
                    <h2>{props.regresion? "B": "y"}= {b2.dato}</h2>
                    {props.regresion && 
                    <h2>y= {b1.dato}x {b2.primerDato()>=0 && "+"}{b2.dato}</h2>}
                    {props.regresion && 
                    <h2>y= 
                        {b1.segundoDato()?(b1.primerDato()/b1.segundoDato()).toFixed(3): b1.dato}
                        x {b2.primerDato()>=0 && "+"}
                        {b2.segundoDato()?(b2.primerDato()/b2.segundoDato()).toFixed(3): b2.dato}
                    </h2>}
                    {props.regresion && props.createPlot(b1.segundoDato()?(b1.primerDato()/b1.segundoDato()).toFixed(3): b1.dato,
                     b2.segundoDato()?(b2.primerDato()/b2.segundoDato()).toFixed(3): b2.dato)}
                </div>
            )
        }
    }else{ //Resolver 2x2 inversa
        function generarPaso(){
            matrizPasos=[a11.dato, a12.dato, b11.dato, b12.dato, a21.dato, a22.dato, b21.dato, b22.dato]

            Pasos.push(<Matriz_aumentada_2x2_inversa
                matriz={matrizPasos}
                />)
        }

        Pasos.push(
            <Matriz_aumentada_2x2_inversa 
                matriz={props.matriz}
            />)

        let b11, b12, b21, b22
        a11= new racionales(props.matriz[0])
        a12= new racionales(props.matriz[1])
        b11= new racionales(props.matriz[2])
        b12= new racionales(props.matriz[3])

        a21= new racionales(props.matriz[4])
        a22= new racionales(props.matriz[5])
        b21= new racionales(props.matriz[6])
        b22= new racionales(props.matriz[7])

        // R2-(a21/a11)R1 ➡ R2
        Pasos.push(<h2 className="resolver--paso">R2-({a21.dividir(a11)})R1 ➡ R2</h2>)  
        let alfa= new racionales(a21.dividir(a11))
        a21.dato="0"
        operacionRenglon(a22, a12, alfa)

        operacionRenglon(b21, b11, alfa)
        operacionRenglon(b22, b12, alfa)


        generarPaso()

        //Generar backups de los valores de la matriz
        let matrizPasosBack= [...matrizPasos]

        Pasos.push(<h2 className="resolver--paso">--------CONVERTIR EN 1 LA DIAGONAL PRINCIPAL--------</h2>)

        //(1/a11)R1 ➡ R1
        Pasos.push(<h2 className="resolver--paso">({new racionales("1").dividir(a11)})R1 ➡ R1</h2>)  
        a12.dato= a12.dividir(a11)

        b11.dato= b11.dividir(a11)
        b12.dato= b12.dividir(a11)

        a11.dato="1"

        //(1/a22)R2 ➡ R2
        Pasos.push(<h2 className="resolver--paso">({new racionales("1").dividir(a22)})R2 ➡ R2</h2>)  

        b21.dato= b21.dividir(a22)
        b22.dato= b22.dividir(a22)

        a22.dato="1"
        
        generarPaso()   
        
        //R1- (a12/a22)R2 ➡ R1
        Pasos.push(<h2 className="resolver--paso">R1-({a12.dividir(a22)})R2 ➡ R1</h2>) 
        alfa= new racionales(a12.dividir(a22))
        a12.dato="0"    
        operacionRenglon(b11, b21, alfa)
        operacionRenglon(b12, b22, alfa)

        generarPaso() 

        //Usar los backups
        a11.dato=matrizPasosBack[0]
        a12.dato=matrizPasosBack[1]
        b11.dato=matrizPasosBack[2]
        b12.dato=matrizPasosBack[3]

        a21.dato=matrizPasosBack[4]
        a22.dato=matrizPasosBack[5]
        b21.dato=matrizPasosBack[6]
        b22.dato=matrizPasosBack[7]


        Pasos.push(<h2 className="resolver--paso">--------ELIMINAR LA ENTRADA a12--------</h2>)

        //R1- (a12/a22)R2 ➡ R1
        Pasos.push(<h2 className="resolver--paso">R1-({a12.dividir(a22)})R2 ➡ R1</h2>) 
        alfa= new racionales(a12.dividir(a22))
        a12.dato="0"    
        operacionRenglon(b11, b21, alfa)
        operacionRenglon(b12, b22, alfa)

        generarPaso() 

        //(1/a11)R1 ➡ R1
        Pasos.push(<h2 className="resolver--paso">({new racionales("1").dividir(a11)})R1 ➡ R1</h2>)  
        a12.dato= a12.dividir(a11)

        b11.dato= b11.dividir(a11)
        b12.dato= b12.dividir(a11)

        a11.dato="1"

        //(1/a22)R2 ➡ R2
        Pasos.push(<h2 className="resolver--paso">({new racionales("1").dividir(a22)})R2 ➡ R2</h2>)  

        b21.dato= b21.dividir(a22)
        b22.dato= b22.dividir(a22)

        a22.dato="1"
        
        generarPaso()   
        
        Pasos.push(
            <div className="resolver--solucion">
                <h1>Solución del sistema:</h1>
                <Matriz_aumentada_2x2
                 solucion={true}
                 matriz={[b11.dato, b12.dato, "", b21.dato, b22.dato, ""]}
                />
            </div>
        )
    }

    //Retorno
    return(
        <div>
            {Pasos}
        </div>
    )
}

export default Resolver;