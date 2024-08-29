import { io } from "socket.io-client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ModuleDetails from "./ModuleDetails";
import ModulesList from "./ModulesList";
import PropTypes from "prop-types";
import { useState } from "react";

const socket = io("localhost:3001", {
  transports: ["websocket"],
});

const Modules = ({ modules }) => {
  const [updatedModules, setUpdatedModules] = useState(modules);

  socket.on("moduleUpdate", (moduleUpdateArray) => {
    if (updatedModules.length > 0) {
      moduleUpdateArray.forEach((el) => {
        const { id, temperature } = el;
        const newModules = updatedModules.map((nm) => {
          if (nm.id === id && nm.available) {
            nm.temperature = temperature;
          }
          return nm;
        });

        setUpdatedModules(newModules);
      });
    }
  });

  return (
    <Router>
      <div className="container">
        <h1>Modules list</h1>
        <Routes>
          <Route
            path="/modules/:id"
            element={<ModuleDetails modules={updatedModules} />}
          />
          <Route path="/" element={<ModulesList modules={updatedModules} />} />
          <Route path="/modules" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

Modules.propTypes = {
  modules: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      available: PropTypes.bool,
      name: PropTypes.string,
      description: PropTypes.string,
      targetTemperature: PropTypes.number,
    })
  ),
};
export default Modules;
