import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

const random255 = () => Math.floor(Math.random() * 256);
const randomColor = () => `rgb(${random255()}, ${random255()}, ${random255()})`;

export default class  Block extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }

  static defaultProps = {
    className: '',
    label: '#',
  }

  // We'll only generate the background style once when a Block is created.
  constructor(props) {
    super(props);

    this.style = { backgroundColor: randomColor() };
  }

  render() {
    const { className, label, ...props } = this.props;

    return (
      <div
        className={className}
        style={this.style}
        {...props}
      >
        {label}
      </div>
    );
  }
}
