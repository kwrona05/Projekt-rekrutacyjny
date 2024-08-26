import { useEffect, useState } from "react";
import io from "socket.io";

const socket = io("localhost:3001", {
  transports: ["websocket"],
});

const ModuleTemperature = ({ targetTemperature }) => {
  const [temperature, setTemperature] = useState(null);

  useEffect(() => {
    socket.on("temperature", (data) => {
      const { temperature } = data;
      setTemperature(temperature);
    });
    return () => {
      socket.off("temperature");
    };
  }, []);

  const getTemperatureColor = () => {
    if (temperature === null) return "black";
    const diff = Math.abs(temperature - targetTemperature);
    return diff <= 0.5 ? "green" : "red";
  };

  return (
    <div>
      <h3>Current temperature:</h3>
      {temperature !== null ? (
        <p style={{ color: getTemperatureColor() }}>{temperature}°C</p>
      ) : (
        <p>Awaiting for data...</p>
      )}
    </div>
  );
};
export default ModuleTemperature;
