import React from 'react';
import './Rating.css';
//import PropTypes from 'prop-types';

export default function Rating(props) {
  const stars = [0, 0, 0, 0, 0].map((_, i) =>
    (i < props.value)
      ? <span key={i}>&#9733; </span>
      : <span key={i}>&#9734; </span>
  );
  return (
    <div className="rating">
      {stars}
    </div>
  );
}

//default props are evaluated before proptypes
//so if no values are passed into component
//then default props are automatically use to provide the value
//next propTypes will execute and component is rendered
Rating.defaultProps = {
    value: 1
};

//custom validator
//3 Parameters: props-props object... {value: 1}
//propName- name of prop... value
//componentName- name of component... Rating
Rating.propTypes = {
  value: (props, propName, componentName) => {

    const prop = props[propName];

    if (!prop) {
      return new Error(`${propName} is required in ${componentName}. Validation Failed`);
    }

    if (typeof prop != 'number') {
      return new Error(`Invalid prop, ${propName} is expected to be a number in ${componentName}. ${typeof prop} is found.`);
    }

    if (prop < 1 || prop > 5) {
      return new Error(`Invalid prop, ${propName} should be in number range 1-5 in ${componentName}. ${prop} is found.`);
    }
  }
};

// Rating.propTypes = {
//   value: PropTypes.oneOf([1,2,3,4,5]).isRequired
// };