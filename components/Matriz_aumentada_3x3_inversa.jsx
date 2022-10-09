function Matriz_aumentada_3x3_inversa(props){
    //Copiar matriz para aula virtual
    function CopiarMat(){
        let strAula='<math xmlns="http://www.w3.org/1998/Math/MathML"><mfenced><mtable><mtr>', matImp
        matImp=props.matriz.map(e => e)

        for(let i=0; i<matImp.length; i++){
            if(i===6 || i===12)
                strAula+="<mtr>"

            strAula+=matImp[i].indexOf("/")===-1?`<mtd><mn>${matImp[i]}</mn></mtd>`:
            `<mtd><mfrac><mn>${matImp[i].substring(0, matImp[i].indexOf("/"))}</mn><mn>${matImp[i].substring(matImp[i].indexOf("/")+1)}</mn></mfrac></mtd>`

            if(i===5 || i===11 || i===17)
                strAula+="</mtr>"
        }
        strAula+="</mtable></mfenced></math>"
        return strAula
    }

    return(
        <div className="matriz-aumentada">
            <div className="matriz-aumentada--simbolos">
                <p>[</p>
            </div>
            <div>
                <table className="matriz-aumentada--datos">
                    <tbody>
                        <tr>
                            <td>{props.matriz[0]}</td>
                            <td>{props.matriz[1]}</td>
                            <td>{props.matriz[2]}</td>
                        </tr>
                        <tr>
                            <td>{props.matriz[6]}</td>
                            <td>{props.matriz[7]}</td>
                            <td>{props.matriz[8]}</td>
                        </tr>
                        <tr>
                            <td>{props.matriz[12]}</td>
                            <td>{props.matriz[13]}</td>
                            <td>{props.matriz[14]}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="matriz-aumentada--simbolos">
                <p>|</p>
            </div>
            <div>
                <table className="matriz-aumentada--datos">
                    <tbody>
                        <tr>
                            <td>{props.matriz[3]}</td>
                            <td>{props.matriz[4]}</td>
                            <td>{props.matriz[5]}</td>
                        </tr>
                        <tr>
                            <td>{props.matriz[9]}</td>
                            <td>{props.matriz[10]}</td>
                            <td>{props.matriz[11]}</td>
                        </tr>
                        <tr>
                            <td>{props.matriz[15]}</td>
                            <td>{props.matriz[16]}</td>
                            <td>{props.matriz[17]}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="matriz-aumentada--simbolos">
                <p>]</p>
            </div>
            <button onClick={()=>{navigator.clipboard.writeText(CopiarMat())}}>Copiar</button>  
        </div>
    )
}

export default Matriz_aumentada_3x3_inversa