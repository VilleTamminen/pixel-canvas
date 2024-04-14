//import * as utilityConstants from './utilityConstants';

const Grid = (props) => {

   const lineHeight = props.height; //utilityConstants.PrivateCanvasSquareRowSize * utilityConstants.PrivateCanvasSquareSize;
   const lineWidth = props.width; //utilityConstants.PrivateCanvasSquareRowSize * utilityConstants.PrivateCanvasSquareSize;
    /*
        position:absolute so that grid divs stay in place and overlay the squares.
        Div has width/height and on both sides are colored black. border thickness 1px.
        float means element sticks to left(certical) or top(horizontal). 
        Overflow being hidden makes it clipped and rest of the content is visible.
        pointerEvents:none so that mouseClick event works.
    */
    return (
        <>
        <div id="grid-vertical" style={{position: "absolute"}}>
            <div className="vertical-line" style={{borderLeft:"1px solid black", borderRight:"1px solid black", width:"50px", height: lineHeight, float:"left", overflow: "hidden", pointerEvents:"none"}}></div>
            <div className="vertical-line" style={{borderLeft:"1px solid black", borderRight:"1px solid black", width:"50px", height: lineHeight, float:"left", overflow: "hidden", pointerEvents:"none"}}></div>
            <div className="vertical-line" style={{borderLeft:"1px solid black", borderRight:"1px solid black", width:"50px", height: lineHeight, float:"left", overflow: "hidden", pointerEvents:"none"}}></div>
            <div className="vertical-line" style={{borderLeft:"1px solid black", borderRight:"1px solid black", width:"50px", height: lineHeight, float:"left", overflow: "hidden", pointerEvents:"none"}}></div>
            <div className="vertical-line" style={{borderLeft:"1px solid black", borderRight:"1px solid black", width:"50px", height: lineHeight, float:"left", overflow: "hidden", pointerEvents:"none"}}></div>
            <div className="vertical-line" style={{borderLeft:"1px solid black", borderRight:"1px solid black", width:"50px", height: lineHeight, float:"left", overflow: "hidden", pointerEvents:"none"}}></div>
            <div className="vertical-line" style={{borderLeft:"1px solid black", borderRight:"1px solid black", width:"50px", height: lineHeight, float:"left", overflow: "hidden", pointerEvents:"none"}}></div>
            <div className="vertical-line" style={{borderLeft:"1px solid black", borderRight:"1px solid black", width:"50px", height: lineHeight, float:"left", overflow: "hidden", pointerEvents:"none"}}></div>
            <div className="vertical-line" style={{borderLeft:"1px solid black", borderRight:"1px solid black", width:"50px", height: lineHeight, float:"left", overflow: "hidden", pointerEvents:"none"}}></div>
            <div className="vertical-line" style={{borderLeft:"1px solid black", borderRight:"1px solid black", width:"50px", height: lineHeight, float:"left", overflow: "hidden", pointerEvents:"none"}}></div>
        </div>
        <div id="grid-horizontal" style={{position: "absolute"}}>
            <div className="horizontal-line" style={{borderTop:"1px solid black", borderBottom:"1px solid black", width:lineWidth, height: "50px", float:"top", overflow: "hidden", pointerEvents:"none"}}></div>
            <div className="horizontal-line" style={{borderTop:"1px solid black", borderBottom:"1px solid black", width:lineWidth, height: "50px", float:"top", overflow: "hidden", pointerEvents:"none"}}></div>
            <div className="horizontal-line" style={{borderTop:"1px solid black", borderBottom:"1px solid black", width:lineWidth, height: "50px", float:"top", overflow: "hidden", pointerEvents:"none"}}></div>
            <div className="horizontal-line" style={{borderTop:"1px solid black", borderBottom:"1px solid black", width:lineWidth, height: "50px", float:"top", overflow: "hidden", pointerEvents:"none"}}></div>
            <div className="horizontal-line" style={{borderTop:"1px solid black", borderBottom:"1px solid black", width:lineWidth, height: "50px", float:"top", overflow: "hidden", pointerEvents:"none"}}></div>
            <div className="horizontal-line" style={{borderTop:"1px solid black", borderBottom:"1px solid black", width:lineWidth, height: "50px", float:"top", overflow: "hidden", pointerEvents:"none"}}></div>
            <div className="horizontal-line" style={{borderTop:"1px solid black", borderBottom:"1px solid black", width:lineWidth, height: "50px", float:"top", overflow: "hidden", pointerEvents:"none"}}></div>
            <div className="horizontal-line" style={{borderTop:"1px solid black", borderBottom:"1px solid black", width:lineWidth, height: "50px", float:"top", overflow: "hidden", pointerEvents:"none"}}></div>
            <div className="horizontal-line" style={{borderTop:"1px solid black", borderBottom:"1px solid black", width:lineWidth, height: "50px", float:"top", overflow: "hidden", pointerEvents:"none"}}></div>
            <div className="horizontal-line" style={{borderTop:"1px solid black", borderBottom:"1px solid black", width:lineWidth, height: "50px", float:"top", overflow: "hidden", pointerEvents:"none"}}></div>
        </div>
        </>
    )

}


export default Grid;