import React, { useState } from "react";
import ResultPage from "./ResultPage";
import "./Form.css";

function CurtainForm() {


    const [panelsNeeded, setPanelsNeeded] = useState(0);
    const [totalRunningLength, setTotalRunningLength] = useState(0);

    const [resultPage, setResultPage] = useState(false);
    const [formVisibility, setformVisibility] = useState(true);

    // const [inputs, setInputs] = useState([0, 0, 0, 0, 0]);
    // const [stitchType, setStitchType] = useState("triplePleats");

    // const [params, setParams] = useState({
    //     fullness: 0,
    //     hem: 0,
    //     sideSeam: 0
    // });

    // const [result, setResult] = useState(0);



    const [formData, setFormData] = useState({
        windowWidth: "",
        windowLength: "",
        fabricWidth: "",
        repeat: "0",
        stitchingType: "",
        fullness: "",
        hem: "",
        sideSeam: "",
        unit: "meters"
    });



    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(e.target.value);

        if (name === "stitchingType") {
            const defaults = stitchingDefaults[value] || {};

            setFormData((prev) => ({
                ...prev,
                stitchingType: value,
                fullness: defaults.fullness || "",
                hem: defaults.hem || "",
                sideSeam: defaults.sideSeam || ""
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const calculateFabric = () => {
        const ww = formData.unit === "meters" ? parseFloat(formData.windowWidth) : parseFloat(formData.windowWidth) / 39.3701;
        const wl = formData.unit === "meters" ? parseFloat(formData.windowLength) : parseFloat(formData.windowLength) / 39.3701;
        const fw = formData.unit === "meters" ? parseFloat(formData.fabricWidth) : parseFloat(formData.fabricWidth) / 39.3701;
        const rp = formData.unit === "meters" ? parseFloat(formData.repeat) : parseFloat(formData.repeat) / 39.3701;
        const fullness = parseFloat(formData.fullness);
        const hem = formData.unit === "meters" ? parseFloat(formData.hem) : parseFloat(formData.hem) / 39.3701;
        const sideSeam = formData.unit === "meters" ? parseFloat(formData.sideSeam) : parseFloat(formData.sideSeam) / 39.3701;

        const requiredGatheredWidth = ww * fullness;
        // console.log(requiredGatheredWidth);

        const usableWidthPerPanel = fw - (2 * sideSeam);
        // console.log(usableWidthPerPanel);

        const panelsNeeded = Math.ceil(requiredGatheredWidth / usableWidthPerPanel);
        // console.log(panelsNeeded);


        let cutDrop = 0;
        rp === 0 ? cutDrop = (wl + hem) : cutDrop = Math.ceil((wl + hem) / rp) * rp;

        if (!fw || isNaN(fw)) {
            alert("Fabric width cannot be 0");
            return;
        }

        const totalRunningLength = (panelsNeeded * cutDrop);
        setTotalRunningLength(totalRunningLength.toFixed(2));

        setPanelsNeeded(panelsNeeded);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        calculateFabric();
        setformVisibility(false);
        setResultPage(true);
    };


    let stitchingDefaults = null;
    formData.unit === "meters" ?
        stitchingDefaults = {
            "Triple Pleats": { fullness: 2.45, hem: 0.31, sideSeam: 0.02 },
            "Eyelet": { fullness: 2.1, hem: 0.4, sideSeam: 0.02 },
            "Two Pleats": { fullness: 2.1, hem: 0.31, sideSeam: 0.02 },
            "Loop Stitch": { fullness: 2, hem: 0.6, sideSeam: 0.02 }
        }
        :
        stitchingDefaults = {
            "Triple Pleats": { fullness: 2.45, hem: 12.20, sideSeam: 0.79 },
            "Eyelet": { fullness: 2.1, hem: 15.75, sideSeam: 0.79 },
            "Two Pleats": { fullness: 2.1, hem: 12.20, sideSeam: 0.79 },
            "Loop Stitch": { fullness: 2, hem: 23.62, sideSeam: 0.79 }
        }


    console.log("Selected stitching:", formData.stitchingType);

    console.log("unit is " + formData.unit);

    return (
        <>
            <div className="form-container">
                <h2>Curtain Calculator</h2>

                <div className="unit-row">
                    <span className="unit-label">Measurement Unit</span>

                    <div className="unit-toggle">
                        <label className={formData.unit === "meters" ? "active" : ""}>
                            <input
                                type="radio"
                                name="unit"
                                value="meters"
                                checked={formData.unit === "meters"}
                                onChange={handleChange}
                            />
                            Meters
                        </label>

                        <label className={formData.unit === "inches" ? "active" : ""}>
                            <input
                                type="radio"
                                name="unit"
                                value="inches"
                                checked={formData.unit === "inches"}
                                onChange={handleChange}
                            />
                            Inches
                        </label>
                    </div>
                </div>

                {formVisibility &&
                    <form onSubmit={handleSubmit}>
                        <label>Window Width</label>
                        <input type="number" step="any" name="windowWidth" value={formData.windowWidth} onChange={handleChange} />

                        <label>Window Length</label>
                        <input type="number" step="any" name="windowLength" value={formData.windowLength} onChange={handleChange} />

                        <label>Fabric Width</label>
                        <input type="number" step="any" name="fabricWidth" value={formData.fabricWidth} onChange={handleChange} />

                        <label>Repeat</label>
                        <input type="number" step="any" name="repeat" value={formData.repeat} onChange={handleChange} />

                        <label>Type of Stitching</label>
                        <select
                            name="stitchingType"
                            value={formData.stitchingType}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            <option value="Triple Pleats">Triple Pleats</option>
                            <option value="Eyelet">Eyelet</option>
                            <option value="Two Pleats">Two Pleats</option>
                            <option value="Loop Stitch">Loop Stitch</option>
                        </select>
                        {formData.stitchingType && (
                            <div className="sub-options">
                                <div className="field">
                                    <label>Fullness</label>
                                    <input
                                        type="number"
                                        step="any"
                                        name="fullness"
                                        value={formData.fullness}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="field">
                                    <label>Hem</label>
                                    <input
                                        type="number"
                                        step="any"
                                        name="hem"
                                        value={formData.hem}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="field">
                                    <label>Side Seam</label>
                                    <input
                                        type="number"
                                        step="any"
                                        name="sideSeam"
                                        value={formData.sideSeam}
                                        onChange={handleChange}
                                    />
                                </div>

                            </div>
                        )}
                        <button type="submit">Calculate</button>
                    </form>
                }

                {
                    resultPage && <ResultPage panels={panelsNeeded} fabric={totalRunningLength} data={formData} />
                }

            </div>
        </>
    );
}

export default CurtainForm;