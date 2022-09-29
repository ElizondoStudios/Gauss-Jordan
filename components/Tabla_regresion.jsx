function Tabla_regresion(props){
    let tabla=props.tabla.map( e=> <tr>{e.map(f=><td>{f}</td>)}</tr>)

    return(
        <table className="tabla-regresion">
            <tbody>
                <tr>
                    <th>n</th>
                    <th>xk</th>
                    <th>yk</th>
                    <th>x²k</th>
                    <th>xkyk</th>
                </tr>
                {tabla}
                <tr>
                    
                    <td><b>Σ</b></td>
                    <td>{props.sigma[0]}</td>
                    <td>{props.sigma[1]}</td>
                    <td>{props.sigma[2]}</td>
                    <td>{props.sigma[3]}</td>
                </tr>
            </tbody>
        </table>
    )
}

export default Tabla_regresion