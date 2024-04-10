import * as utilityConstants from './utilityConstants';

//kopio Row.jsx
const Square = (props) => {
    //SVG rectangle. tässä määritellään squaren koko.
    return (
        <svg width={utilityConstants.GlobalCanvasSquareSize} height={utilityConstants.GlobalCanvasSquareSize} >
              <rect width={utilityConstants.GlobalCanvasSquareSize} height={utilityConstants.GlobalCanvasSquareSize}  fill={props.square.color} />
        </svg>

    )

}
/*
        <tr>
            <td>{props.square.coordX}</td>
            <td>{props.square.coordY}</td>
            <td>{props.square.color}</td>
         <tr>
         //SVG cant appear as child of <tr>
        <svg width="50" height="50">
           <rect width="50" height="50" x={props.square.coordX} y={props.square.coordY} fill={props.square.color} />
        </svg>
         <svg width={utilityConstants.GlobalCanvasSquareSize} height={utilityConstants.GlobalCanvasSquareSize} >
              <rect width={utilityConstants.GlobalCanvasSquareSize} height={utilityConstants.GlobalCanvasSquareSize}  fill={props.square.color} />
        </svg>
*/
export default Square;