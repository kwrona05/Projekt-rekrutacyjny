import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./App.css";
import ModuleTemperature from "./ModuleTemperature";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function ModuleDetails() {
  const { id } = useParams();
  const [module, setModule] = useState(null);
  const [error, setError] = useState({ isError: false, error: null });
  const [isEditModal, setIsEditModal] = useState(false);
  const [historyData, setHistoryData] = useState();
  const [editData, setEditData] = useState({
    name: "",
    description: "",
    targetTemperature: "",
  });
  const [validation, setValidation] = useState({});
  const [dataRange, setDataRange] = useState({
    start: "",
    stop: "",
  });
  const [mode, setMode] = useState("hourly");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchModuleDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/modules/${id}`);
        if (response.status === 404) {
          throw new Error("Page not found");
        }
        console.log(response);
        const data = await response.json();
        setModule(data);
      } catch (error) {
        console.error("Error fetching module details:", error);
        setError({ error, isError: true });
      }
    };

    fetchModuleDetails();
  }, [id]);

  const fetchHistoryData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/modules/${id}/history?start=${dateRange.start}&stop=${dateRange.stop}&mode=${mode}`
      );
      if (!response.ok) {
        throw new Error("Something goes wrong during fetching history data");
      }
      const data = await response.json();
      setHistoryData(data);
    } catch (error) {
      console.error(
        "Something goes wrong during fetching history data:",
        error
      );
      setError({ error, isError: true });
    }
  };

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setDataRange((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleModeChange = (e) => {
    setMode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchHistoryData();
  };

  if (error.isError) {
    return (
      <div>
        <h3>Something went wrong...</h3>
        {error?.error?.message && <h4>{error.error.message}</h4>}
      </div>
    );
  }

  const handleOpenModal = () => {
    setEditData({
      name: module.name,
      description: module.description,
      targetTemperature: module.targetTemperature,
    });
    setIsEditModal(true);
  };

  const handleCloseModal = () => {
    setIsEditModal(false);
    setValidation({});
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevState) => ({ ...prevState, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    if (!editData.name.trim()) errors.name = "Name is required";
    if (!editData.description.trim())
      errors.description = "Description is required";
    if (
      isNaN(editData.targetTemperature) ||
      editData.targetTemperature < 0 ||
      editData.targetTemperature > 40
    ) {
      errors.targetTemperature = "Temperature has to be between 0 and 40";
    }
    return errors;
  };

  const handleSaveChanges = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setValidation(validationErrors);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/modules/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editData),
      });

      if (!response.ok) {
        throw new Error("Update module details failed");
      }

      const updateModule = await response.json();
      setModule(updateModule);
      handleCloseModal();
    } catch (error) {
      console.error("Error during updating module details:", error);
      setError({ error, isError: true });
    }
  };

  if (error.isError) {
    return (
      <div>
        <h3>Something went wrong...</h3>
        {error?.error?.message && <h4>{error.error.message}</h4>}
      </div>
    );
  }

  if (!module) {
    return <div>Loading details...</div>;
  }

  return (
    <div>
      <h2>{module.name}</h2>
      <p>{module.description}</p>
      <p>
        <strong>Available:</strong> {module.available ? "Yes" : "No"}
      </p>
      <p>
        <strong>Target Temperature:</strong> {module.targetTemperature} °C
      </p>
      <ModuleTemperature targetTemperature={module.targetTemperature} />

      {module.available ? (
        <button onClick={handleOpenModal}>Edit module details</button>
      ) : (
        <button disabled>Module unavailable</button>
      )}

      <button onClick={() => navigate("/")}>Back to Module List</button>

      {/*History*/}
      <h3>Module Temperature History</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Start Date:
          <input
            type="datetime-local"
            name="start"
            value={dataRange.start}
            onChange={handleDataChange}
            required
          />
        </label>
        <label>
          Stop Date:
          <input
            type="datetime-local"
            name="stop"
            value={dataRange.stop}
            onChange={handleDataChange}
            required
          />
        </label>
        <label>
          Mode:
          <select value={mode} onChange={handleModeChange}>
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
          </select>
        </label>
        <button type="submit">Fetch History</button>
      </form>

      {/*Chart*/}
      {historyData.length > 0 && (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={historyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(tick) => new Date(tick).toLocaleString()}
            />
            <YAxis />
            <Tooltip
              labelFormatter={(label) => new Date(label).toLocaleString()}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}

      {/* Modal */}
      {isEditModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Module</h3>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleEditChange}
              />
              {validation.name && (
                <span className="error">{validation.name}</span>
              )}
            </label>
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={editData.description}
                onChange={handleEditChange}
              />
              {validation.description && (
                <span className="error">{validation.description}</span>
              )}
            </label>
            <label>
              Target Temperature (°C):
              <input
                type="number"
                name="targetTemperature"
                value={editData.targetTemperature}
                onChange={handleEditChange}
              />
              {validation.targetTemperature && (
                <span className="error">{validation.targetTemperature}</span>
              )}
            </label>
            <button onClick={handleSaveChanges}>Save changes</button>
            <button onClick={handleCloseModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
export default ModuleDetails;
