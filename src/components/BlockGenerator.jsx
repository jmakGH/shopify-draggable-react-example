import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Block from './Block';
import SortableList from './SortableList';
import './BlockGenerator.css';

/**
 * Returns a copy of the array with items swapped at the specified indices. This
 * is non-mutative.
 * @param  {Array} arr array
 * @param  {Number} fromIndex
 * @param  {Number} toIndex
 */
const swapAtIndex = (arr, fromIndex, toIndex) => {
  const newArr = arr.slice();
  const val = newArr[fromIndex];

  newArr.splice(fromIndex, 1);
  newArr.splice(toIndex, 0, val);

  return newArr;
};

/**
 * A React component that generates a list of sortable blocks.
 */
export default class BlockGenerator extends Component {
  static propTypes = {
    blocks: PropTypes.array,
  }

  static defaultProps = {
    blocks: [],
  }

  constructor(props) {
    super(props);

    this.state = {
      blocks: props.blocks,
    };
  }

  componentWillReceiveProps({ blocks }) {
    if (blocks !== this.props.blocks) {
      this.setState({ blocks });
    }
  }

  onSwapBlocks = (oldIndex, newIndex) => {
    this.setState({
      blocks: swapAtIndex(this.state.blocks, oldIndex, newIndex),
    });
  }

  render() {
    return (
      <SortableList
        dragClass="Block-dragging"
        draggableSelector=".Block"
        indexAttribute="data-index"
        onSort={this.onSwapBlocks}
      >
        {({ initSortable }) => (
          <div className="BlockGenerator" ref={el => initSortable(el)}>
            {this.state.blocks.map((block, i) => (
              <Block
                className="Block"
                data-index={i}
                key={block}
                label={block}
              />
            ))}
          </div>
        )}
      </SortableList>
    );
  }
}
