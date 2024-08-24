import React, { useEffect, useState } from "react";

function App() {
    const [modules, setModules] = useState([]);

    useEffect(() => {
        const fetchModules = async () => {
            try{
                const response = await fetch('/modules');
                const data = await response.json();
                
                setModules(data);
            } catch (error) {
                console.error('Module download error', error);
            }
        };

        fetchModules();
    }, []);

    return(
        <div className="container">
            <h1>Modules list</h1>
            <ul>
                {modules.map((module) => (
                    <li key={module.id}>
                        <h2>{module.name}</h2>
                        <p className="available">Available: {module.available ? 'Available' : 'Unavailable'}</p>
                        <p className="temperature">Target Temperature: {module.targetTemperature} °C</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default App;