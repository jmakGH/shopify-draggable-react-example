import { Sortable } from '@shopify/draggable';
import PropTypes from 'prop-types';
import { Component } from 'react';

export default class SortableList extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
  }

  initSortable = (containerEl, dragIdentifier) => {
    this.sortable = this.sortable || new Sortable(containerEl, {
      draggable: dragIdentifier,
      droppable: dragIdentifier,
    });

    this.sortable.on('sortable:start', () => console.log('sortable:start'));
    this.sortable.on('sortable:sorted', () => console.log('sortable:sorted'));
    this.sortable.on('sortable:stop', () => console.log('sortable:stop'));
  }

  render() {
    return this.props.children({ initSortable: this.initSortable });
  }
}
