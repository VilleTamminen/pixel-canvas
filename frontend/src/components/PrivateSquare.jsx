import * as utilityConstants from './utilityConstants';

const PrivateSquare = (props) => {
    //SVG rectangle. tässä määritellään squaren koko.
    return (
        <svg id={props.id} width={utilityConstants.PrivateCanvasSquareSize} height={utilityConstants.PrivateCanvasSquareSize} >
              <rect width={utilityConstants.PrivateCanvasSquareSize} height={utilityConstants.PrivateCanvasSquareSize} fill={props.square.color} />
        </svg>

    )

}

export default PrivateSquare;