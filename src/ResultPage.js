import React from "react";
import "./Form.css";


function ResultPage({ panels, fabric, data }) {
  if (!panels) return null;

  return (
    <>
      <p style={{textAlign:"center"}}>Result: </p>
      <div className="result">

        <p>Window width: {data.windowWidth}</p>
        <p>Window length: {data.windowLength}</p>
        <p>Fabric width: {data.fabricWidth}</p>
        <p>Stitch type: {data.stitchingType}</p>
      <h4>No. of Panels required:<br/> </h4>
      <h2><strong>{panels} </strong></h2>
      <h4>Total running Length / Fabric Required: <br/></h4>
      <h2><strong>{fabric} running mtrs</strong></h2>
    </div>
    </>
  );
}

export default ResultPage;