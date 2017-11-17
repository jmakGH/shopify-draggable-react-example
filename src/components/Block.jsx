import PropTypes from 'prop-types';
import React from 'react';

import './Block.css';

const randomNum = () => Math.floor(Math.random() * 256);
const randomColor = () => `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;

export default function Block({ label }) {
  return (
    <div className="Block" style={{backgroundColor: randomColor()}}>
      {label}
    </div>
  );
}

Block.propTypes = {
  label: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Block.defaultProps = {
  label: '#',
};

Block.displayName = 'Block';
