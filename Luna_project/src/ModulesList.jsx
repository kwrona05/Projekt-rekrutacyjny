import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ModuleTemperature from "./ModuleTemperature";
import "./ModuleList.css";

const ModulesList = ({ modules }) => {
  return (
    <ul className="ul-list">
      {modules.map((module) => (
        <li className="list" key={module.id} data-testid="modules-list">
          <h2 data-testid="module-name">{module.name}</h2>
          <p
            className={module.available ? "available-text" : "unavailable-text"}
          >
            Available: {module.available ? "Available" : "Unavailable"}
          </p>
          <ModuleTemperature targetTemperature={module.targetTemperature} />
          <Link className="link" to={`/modules/${module.id}`}>
            --Show details--
          </Link>
        </li>
      ))}
    </ul>
  );
};

ModulesList.propTypes = { modules: PropTypes.array };
export default ModulesList;
