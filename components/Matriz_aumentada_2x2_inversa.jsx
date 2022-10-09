function Matriz_aumentada_2x2_inversa(props){
    //Copiar matriz para aula virtual
    function CopiarMat(){
        let strAula='<math xmlns="http://www.w3.org/1998/Math/MathML"><mfenced><mtable><mtr>', matImp
        matImp=props.matriz.map(e => e)

        for(let i=0; i<matImp.length; i++){
            if(i===4)
                strAula+="<mtr>"

            strAula+=matImp[i].indexOf("/")===-1?`<mtd><mn>${matImp[i]}</mn></mtd>`:
            `<mtd><mfrac><mn>${matImp[i].substring(0, matImp[i].indexOf("/"))}</mn><mn>${matImp[i].substring(matImp[i].indexOf("/")+1)}</mn></mfrac></mtd>`

            if(i===3 || i===7)
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
                        </tr>
                        <tr>
                            <td>{props.matriz[4]}</td>
                            <td>{props.matriz[5]}</td>
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
                            <td>{props.matriz[2]}</td>
                            <td>{props.matriz[3]}</td>
                        </tr>
                        <tr>
                            <td>{props.matriz[6]}</td>
                            <td>{props.matriz[7]}</td>
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

export default Matriz_aumentada_2x2_inversa