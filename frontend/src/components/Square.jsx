//ei valmis
//kopio Row.jsx

const Square = (props => {
    //SVG rectangle
    return (
        <tr>
            <td>{props.square.coordX}</td>
            <td>{props.square.coordY}</td>
            <td>{props.square.color}</td>

        </tr>
    )

})
/*
        <svg width="50" height="50">
          <rect width="50" height="50" x={props.coordX} y={props.coordY} fill={props.color} />
        </svg>
*/
export default Square;