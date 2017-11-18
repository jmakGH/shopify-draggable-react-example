import PropTypes from 'prop-types';
import React, { Component } from 'react';

const random255 = () => Math.floor(Math.random() * 256);
const randomColor = () => `rgb(${random255()}, ${random255()}, ${random255()})`;

export default class  Block extends Component {
  static propTypes = {
    className: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }

  static defaultProps = {
    className: '',
    label: '#',
  }

  shouldComponentUpdate({ label }) {
    return label !== this.props.label;
  }

  render() {
    const { className, label, ...props } = this.props;

    return (
      <div
        className={className}
        style={{backgroundColor: randomColor()}}
        {...props}
      >
        {label}
      </div>
    );
  }
}
