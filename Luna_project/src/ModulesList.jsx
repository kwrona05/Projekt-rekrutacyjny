import PropTypes from "prop-types"
import { Link } from 'react-router-dom';
import {UlStyled} from './ModuleList.styled';

const ModulesList = ( {modules} ) => {
    return(
        <UlStyled>
                {modules.map((module) => (
                    <li key={module.id}>
                        <h2>{module.name}</h2>
                        <p className="available">Available: {module.available ? 'Available' : 'Unavailable'}</p>
                        <p className="temperature">Target Temperature: {module.targetTemperature} °C</p>
                        <Link to={`/modules/${module.id}`}>Show details</Link>
                    </li>
                ))}
            </UlStyled>
    );
};

ModulesList.propTypes = {modules: PropTypes.array}
export default ModulesList;