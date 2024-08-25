import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ModuleDetails() {
    
    const { id } = useParams();
    const [module, setModule] = useState(null);
    const [error, setError] = useState({isError: false, error: null})
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchModuleDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3001/modules/${id}`);
                if(response.status === 404){
                    throw new Error('Page not found')
                }
                console.log(response)
                const data = await response.json();
                setModule(data);
            } catch (error) {
                console.error('Error fetching module details:', error);
                setError({error, isError: true})
            }
        };

    fetchModuleDetails();
  }, [id]);

  if(error.isError){

    return <div>
        <h3>Something went wrong...</h3>
        {error?.error?.message && (<h4>{error.error.message}</h4>)}
    </div>
  }

  if (!module) {
    return <div>Loading details...</div>
  }

    return(
        <div>
            <h2>{module.name}</h2>
            <p>{module.description}</p>
            <p><strong>Available:</strong> {module.available ? 'Yes' : 'No'}</p>
            <p><strong>Target Temperature:</strong> {module.targetTemperature} °C</p>

            {module.available ? (
                <button>Edit module details</button>
            ) : (
                <button disabled>Module unavailable</button>
            )}

            <button onClick={() => navigate('/')}>Back to Module List</button>
        </div>
    );
};
export default ModuleDetails;

// add import useState, Params, navigate and Effect
// add import ModuleDetails to App