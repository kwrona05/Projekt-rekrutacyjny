import PropTypes from "prop-types";

const ModuleTemperature = ({ targetTemperature, temperature }) => {
  if (isNaN(temperature)) {
    temperature = null;
  }

  const getTemperatureColor = () => {
    if (temperature === null) return "black";
    const diff = Math.abs(temperature - targetTemperature);
    return diff <= 0.5 ? "green" : "red";
  };

  return (
    <div>
      <h3>Target temperature</h3>
      {targetTemperature !== null ? (
        <p>{targetTemperature}°C</p>
      ) : (
        <p>No data</p>
      )}
      <h3>Current temperature:</h3>
      {temperature !== null ? (
        <p style={{ color: getTemperatureColor() }}>{temperature}°C</p>
      ) : (
        <p>No data. Sensor unavailable</p>
      )}
    </div>
  );
};
ModuleTemperature.propTypes = {
  targetTemperature: PropTypes.number,
  temperature: PropTypes.number,
};
export default ModuleTemperature;
