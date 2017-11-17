import PropTypes from 'prop-types';
import React from 'react';

import Block from './Block';
import SortableList from './SortableList';
import './BlockGenerator.css';

export default function BlockGenerator({ blocks }) {
  return (
    <SortableList>
      {({ initSortable }) => (
        <div
          className="BlockGenerator"
          ref={el => initSortable(el, '.Block')}
        >
          {blocks.map((block, i) => (
            <Block key={i} label={block} />
          ))}
        </div>
      )}
    </SortableList>
  );
}

BlockGenerator.propTypes = {
  blocks: PropTypes.array,
};

BlockGenerator.defaultProps = {
  blocks: [],
};

BlockGenerator.displayName = 'BlockGenerator';
