import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { UlStyled } from "./ModuleList.styled";
import ModuleTemperature from "./ModuleTemperature";
import { LiStyled } from "./liStyled";

const ModulesList = ({ modules }) => {
  return (
    <ul className="ul-list">
      {modules.map((module) => (
        <li className="list" key={module.id}>
          <h2>{module.name}</h2>
          <p className="available">
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
