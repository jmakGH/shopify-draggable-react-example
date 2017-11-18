import { Sortable } from '@shopify/draggable';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import './SortableList.css';

/**
 * A React component that integrates Shopify's Draggable library. It provides a
 * method to initialize a list of Sortable objects to its children prop.
 * @class SortableList
 * @extends React.PureComponent
 */
export default class SortableList extends PureComponent {
  static propTypes = {
    children: PropTypes.func.isRequired,
    /**
     * CSS class added to element when being dragged.
     */
    dragClass: PropTypes.string,
    /**
     * CSS selector to identify which elements inside the container should be
     * draggable.
     */
    draggableSelector: PropTypes.string.isRequired,
    /**
     * HTML attribute containing the element's index within the collection.
     */
    indexAttribute: PropTypes.string,
    /**
     * Callback on sort events that will get passed the indices of the elements
     * that were swapped.
     */
    onSort: PropTypes.func,
  }

  static defaultProps = {
    dragClass: 'hideDragSource',
    indexAttribute: 'data-index',
    onSort: (sourceIndex, overIndex) => console.log(`A sort event occurred in the wild between index ${sourceIndex} and index ${overIndex}`),
  }

  /**
   * Initializes a list of Sortable objects.
   * @param  {HTMLElement} containerEl the container element for your list elements
   */
  initSortable = (containerEl) => {
    const { draggableSelector } = this.props;

    // Ignore if Sortable instance has already been initialized.
    if (this.sortable) {
      return;
    }

    this.sortable = this.sortable || new Sortable(containerEl, {
      draggable: draggableSelector,
      droppable: draggableSelector, // TODO: Move this to options
    });

    this.sortable.on('sortable:sorted', this.onDragSorted);
    this.sortable.on('sortable:stop', this.onDragStop);
    this.sortable.on('sortable:start', this.onDragStart);
  }

  /**
   * Handler for 'drag:start' events.
   * @return {Func} event handler
   */
  onDragStart = ({ data }) => {
    const { dragClass } = this.props;
    const { dragEvent } = data;
    const { mirror, source } = dragEvent;

    // Add default class to mirror element.
    mirror.classList.add('defaultMirror');

    // Add drag class to the source element.
    source.classList.add(dragClass);
  }

  onDragSorted = ({ data }) => {
    const { indexAttribute, onSort } = this.props;
    const { dragEvent } = data;
    const { over, source } = dragEvent;

    // Get the indices from the desired HTML attribute in order to pass them to
    // our callback to update the state in React.
    const overIndex = over.getAttribute(indexAttribute);
    const sourceIndex = source.getAttribute(indexAttribute);

    // We have to update the HTML index attribute for the source element.
    source.setAttribute(indexAttribute, overIndex);

    onSort(sourceIndex, overIndex);
  }

  /**
   * Handler for 'drag:stop' events.
   * @return {Func} event handler
   */
  onDragStop = ({ data }) => {
    const { dragClass } = this.props;
    const { dragEvent } = data;
    const { source } = dragEvent;

    // Remove drag class from source element.
    source.classList.remove(dragClass);
  }

  render() {
    return this.props.children({ initSortable: this.initSortable });
  }
}
