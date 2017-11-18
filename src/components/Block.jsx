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

  render() {
    const { className, label } = this.props;

    return (
      <div className={className} style={{backgroundColor: randomColor()}}>
        {label}
      </div>
    );
  }
}
