function Matriz_aumentada_3x3(props){
    let strAula=""
    props.matriz.forEach(e=> {strAula+=e.replace("/", "")})
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
                            <td>{props.matriz[4]}</td>
                            <td>{props.matriz[5]}</td>
                            <td>{props.matriz[6]}</td>
                        </tr>
                        <tr>
                            <td>{props.matriz[8]}</td>
                            <td>{props.matriz[9]}</td>
                            <td>{props.matriz[10]}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {!props.solucion&&
            <div className="matriz-aumentada--simbolos">
                <p>|</p>
            </div>}

            {!props.solucion&&
            <div>
                <table className="matriz-aumentada--datos">
                    <tbody>
                        <tr>
                            <td>{props.matriz[3]}</td>
                        </tr>
                        <tr>
                            <td>{props.matriz[7]}</td>
                        </tr>
                        <tr>
                            <td>{props.matriz[11]}</td>
                        </tr>
                    </tbody>
                </table>
            </div>}
            <div className="matriz-aumentada--simbolos">
                <p>]</p>
            </div>  
            <button onClick={()=>{navigator.clipboard.writeText(strAula)}}>Copiar</button>
        </div>
    )
}

export default Matriz_aumentada_3x3