import PropTypes from 'prop-types';
import React from 'react';

const random255 = () => Math.floor(Math.random() * 256);
const randomColor = () => `rgb(${random255()}, ${random255()}, ${random255()})`;

export default function Block({ className, label }) {
  return (
    <div className={className} style={{backgroundColor: randomColor()}}>
      {label}
    </div>
  );
}

Block.propTypes = {
  className: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Block.defaultProps = {
  className: '',
  label: '#',
};

Block.displayName = 'Block';
