function ModuleDetails() {
    
    const { id } = useParams();
    const [module, setModule] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchModuleDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3001/modules/${id}`);
        const data = await response.json();
        setModule(data);
      } catch (error) {
        console.error('Error fetching module details:', error);
      }
    };

    fetchModuleDetails();
  }, [id]);

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