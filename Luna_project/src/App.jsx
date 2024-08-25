import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ModuleDetails from "./ModuleDetails";
import ModulesList from "./ModulesList";

function App() {
    const [modules, setModules] = useState([]);

    useEffect(() => {
        const fetchModules = async () => {
            try{
                const response = await fetch('http://localhost:3001/modules');
                const data = await response.json();
                
                setModules(data);
            } catch (error) {
                console.error('Module download error', error);
            }
        };

        fetchModules();
    }, []);

    return(
        <Router>
            <div className="container">
            <h1>Modules list</h1>
            <Routes>
            <Route path="/modules/:id" element={<ModuleDetails />} />
            <Route path="/" element={<ModulesList modules={modules} />} />
            </Routes>
            </div>
        </Router>

    );
};
export default App;