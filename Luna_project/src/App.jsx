import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";

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
            <Route path="/" element={<Module_list modules={modules} />} />
            <Route path="/modules/:id" element={<ModuleDetails />} />
            </Routes>
            </div>
        </Router>

    );
};

const Module_list = ( {modules} ) => {
    return(
        <ul>
                {modules.map((module) => (
                    <li key={module.id}>
                        <h2>{module.name}</h2>
                        <p className="available">Available: {module.available ? 'Available' : 'Unavailable'}</p>
                        <p className="temperature">Target Temperature: {module.targetTemperature} °C</p>
                        <Link to={`/modules/${module.id}`}></Link>
                    </li>
                ))}
            </ul>
    );
};

export default App;