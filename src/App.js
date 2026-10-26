import "./Form.css";
// import FiveInputForm from './FiveInputForm';

import CurtainForm from "./CurtainForm";
import React, { useState } from "react";
import { useEffect } from "react";



function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
          const timer = setTimeout(() => {
              setLoading(false);
          }, 2000); // 3 seconds
  
          return () => clearTimeout(timer); // cleanup
      }, []);

  return (
    <div className="App">
      <div>
        {loading ? (
          <div className="loader">
            <img src="/logo.jpeg" alt="Loading..." />
          </div>
        ) : (
          <CurtainForm />
        )}
      </div>


    </div>
  );
}

export default App;
