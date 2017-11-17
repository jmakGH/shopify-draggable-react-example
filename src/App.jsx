import React, { Component } from 'react';

import BlockGenerator from 'components/BlockGenerator';
import WindowHeight from 'components/WindowHeight';
import './App.css';

const BLOCKS = [1, 2, 3, 4, 5, 6, 7, 8, 8, 10]

class App extends Component {
  render() {
    return (
      <WindowHeight>
        {({ height }) => (
          <div className="App" style={{height}}>
            <div className="App-body">
              <BlockGenerator blocks={BLOCKS} />
            </div>
          </div>
        )}
      </WindowHeight>
    );
  }
}

export default App;
