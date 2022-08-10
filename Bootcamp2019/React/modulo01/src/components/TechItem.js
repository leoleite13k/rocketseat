import React from "react";
import PropTypes from "prop-types";

const TechItem = ({ tech, onDelete }) => (
  <li key={tech}>
    {tech}
    <button type="button" onClick={onDelete}>
      Remover
    </button>
  </li>
);

TechItem.defaultProps = {
  tech: "Oculto"
};

TechItem.propTypes = {
  tech: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default TechItem;
