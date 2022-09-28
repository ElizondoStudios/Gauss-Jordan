function Matriz_aumentada_2x2(props){
    return(
        <div className="matriz-aumentada">
            <div className="matriz-aumentada--simbolos">
                <p>[</p>
            </div>
            <div>
                <table className="matriz-aumentada--datos">
                    <tr>
                        <td>{props.matriz[0]}</td>
                        <td>{props.matriz[1]}</td>
                    </tr>
                    <tr>
                        <td>{props.matriz[3]}</td>
                        <td>{props.matriz[4]}</td>
                    </tr>
                </table>
            </div>
            <div className="matriz-aumentada--simbolos">
                <p>|</p>
            </div>
            <div>
                <table className="matriz-aumentada--datos">
                    <tr>
                        <td>{props.matriz[2]}</td>
                    </tr>
                    <tr>
                        <td>{props.matriz[5]}</td>
                    </tr>
                </table>
            </div>
            <div className="matriz-aumentada--simbolos">
                <p>]</p>
            </div>
        </div>
    )
}

export default Matriz_aumentada_2x2