function Tabla_regresion(props){
    // const vecrow= props.vecxk.map(e => <tr><th>{e}</th></tr>)
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
                {/* {vecrow} */}
            </tbody>
        </table>
    )
}

export default Tabla_regresion