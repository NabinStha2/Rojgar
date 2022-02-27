import React from "react";
// import PropTypes from "prop-types";
import { BsStar, BsFillStarFill, BsStarHalf } from "react-icons/bs";

const Rating = ({ value, color }) => {
  return (
    <div className="rating">
      <span>
        {value >= 1 ? (
          <BsFillStarFill style={{ color: `${color} !important` }} />
        ) : value >= 0.5 ? (
          <BsStarHalf style={{ color: color }} />
        ) : (
          <BsStar />
        )}
      </span>
      <span>
        {value >= 2 ? (
          <BsFillStarFill style={{ color: `${color} !important`  }} />
        ) : value >= 1.5 ? (
          <BsStarHalf style={{ color: color }} />
        ) : (
          <BsStar />
        )}
      </span>
      <span>
        {value >= 3 ? (
          <BsFillStarFill style={{ color: `${color} !important`  }} />
        ) : value >= 3.5 ? (
          <BsStarHalf style={{ color: color }} />
        ) : (
          <BsStar />
        )}
      </span>
      <span>
        {value >= 4 ? (
          <BsFillStarFill style={{ color: color }} />
        ) : value >= 3.5 ? (
          <BsStarHalf style={{ color: color }} />
        ) : (
          <BsStar />
        )}
      </span>
      <span>
        {value >= 5 ? (
          <BsFillStarFill style={{ color: color }} />
        ) : value >= 4.5 ? (
          <BsStarHalf style={{ color: color }} />
        ) : (
          <BsStar />
        )}
      </span>
    </div>
  );
};

// Rating.defaultProps = {
//   color: "#f8e825",
// };

// Rating.propTypes = {
//   value: PropTypes.number.isRequired,
//   text: PropTypes.string.isRequired,
//   color: PropTypes.string,
// };

export default Rating;
