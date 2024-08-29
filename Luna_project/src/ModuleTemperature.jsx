import { useEffect, useState } from "react";
// import { io } from "socket.io-client";
import PropTypes from "prop-types";

// const socket = io("localhost:3001", {
//   transports: ["websocket"],
// });

const ModuleTemperature = ({ targetTemperature, temperature }) => {
  // const [temperature, setTemperature] = useState(null);
  useEffect(() => {
    // socket.on("msg", () => {
    //   console.log("ws msg");
    // });
    // socket.on("moduleUpdate", (data) => {
    //   console.log("moduleUpdate", data);
    // });
    // socket.on("temperature", (data) => {
    //   const { temperature } = data;
    //   console.log({ temperature });
    //   setTemperature(temperature);
    // });
    // return () => {
    //   socket.off("temperature");
    //   socket.off("msg");
    // };
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
ModuleTemperature.propTypes = {
  targetTemperature: PropTypes.number,
  temperature: PropTypes.number,
};
export default ModuleTemperature;
