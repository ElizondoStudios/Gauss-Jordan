function Matriz_aumentada_3x3(props){
    return(
        <div className="matriz-aumentada">
            <div className="matriz-aumentada--simbolos">
                <p>[</p>
            </div>
            {/* <div className="matriz-aumentada--datos">
                <p>{props.matriz[0]} {props.matriz[1]} {props.matriz[2]}</p>
                <p>{props.matriz[4]} {props.matriz[5]} {props.matriz[6]}</p>
                <p>{props.matriz[8]} {props.matriz[9]} {props.matriz[10]}</p>
            </div> */}
            <div>
                <table className="matriz-aumentada--datos">
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
                </table>
            </div>
            <div className="matriz-aumentada--simbolos">
                <p>|</p>
            </div>
            {/* <div className="matriz-aumentada--datos">
                <p>{props.matriz[3]}</p>
                <p>{props.matriz[7]}</p>
                <p>{props.matriz[11]}</p>
            </div> */}
            <div>
                <table className="matriz-aumentada--datos">
                    <tr>
                        <td>{props.matriz[3]}</td>
                    </tr>
                    <tr>
                        <td>{props.matriz[7]}</td>
                    </tr>
                    <tr>
                        <td>{props.matriz[11]}</td>
                    </tr>
                </table>
            </div>
            <div className="matriz-aumentada--simbolos">
                <p>]</p>
            </div>
        </div>
    )
}

export default Matriz_aumentada_3x3