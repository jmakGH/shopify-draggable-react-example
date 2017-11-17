import PropTypes from 'prop-types';
import { Component } from 'react';

export default class WindowHeight extends Component {
  static propTypes = {
    children: PropTypes.func,
  }

  componentDidMount() {
    window.addEventListener('resize', this.rerender);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.rerender);
  }

  rerender = () => {
    this.forceUpdate();
  }

  render() {
    return this.props.children({ height: window.innerHeight });
  }
}
