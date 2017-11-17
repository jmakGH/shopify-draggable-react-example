import { Sortable } from '@shopify/draggable';
import PropTypes from 'prop-types';
import { Component } from 'react';

import './SortableList.css';

/**
 * A React component that integrates Shopify's Draggable library. It provides a
 * method to initialize a list of Sortable objects to its children prop.
 * @class SortableList
 * @extends React.Component
 */
export default class SortableList extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
  }

  /**
   * Initializes a list of Sortable objects.
   * @param  {HTMLElement} containerEl the container element for your list elements
   * @param  {String} dragIdentifier CSS selector to identify your list elements
   * @param  {Object} [opts={}] options
   * @param  {String} [opts.dragClass] CSS class to add to element on drag events
   */
  initSortable = (containerEl, dragIdentifier, opts = {}) => {
    const { dragClass } = opts;

    this.sortable = this.sortable || new Sortable(containerEl, {
      draggable: dragIdentifier,
      droppable: dragIdentifier, // TODO: Move this to options
    });

    this.sortable.on('sortable:sorted', this.onDragSorted);
    this.sortable.on('sortable:stop', this.onDragStop(dragClass));
    this.sortable.on('sortable:start', this.onDragStart(dragClass));
  }

  /**
   * Creates a handler for 'drag:start' events.
   * @param  {String} [dragClass='hideDragSource'] class to add to element when drag starts
   * @return {Func} event handler
   */
  onDragStart = (dragClass = 'hideDragSource') => ({ data }) => {
    const { dragEvent } = data;
    const { mirror, source } = dragEvent;

    // Add default class to mirror element.
    mirror.classList.add('defaultMirror');

    // Add drag class to the source element.
    source.classList.add(dragClass);
  }

  onDragSorted = (e) => {
    /**
     * You can explore the sorted event here.
     */
  }

  /**
   * Creates a handler for 'drag:stop' events.
   * @param  {String} [dragClass='hideDragSource'] class to remove from element when drag stops
   * @return {Func} event handler
   */
  onDragStop = (dragClass = 'hideDragSource') => ({ data }) => {
    const { dragEvent } = data;
    const { source } = dragEvent;

    // Remove drag class from source element.
    source.classList.remove(dragClass);
  }

  render() {
    return this.props.children({ initSortable: this.initSortable });
  }
}
