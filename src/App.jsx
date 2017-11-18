import React, { Component } from 'react';

import BlockGenerator from 'components/BlockGenerator';
import WindowHeight from 'components/WindowHeight';
import './App.css';

class App extends Component {
  state = {
    blockCount: 14, // Default
  }

  onChangeCount = ({ target }) => {
    // Prevent NaN values.
    const value = target.value || 0;

    // Clamp value. Setting a max of 100 blocks for now.
    const blockCount = Math.min(Math.max(parseInt(value, 10), 0), 100);

    this.setState({ blockCount });
  }

  render() {
    const { blockCount } = this.state;

    // Generate blocks.
    let blocks = [];

    for (let i = 0; i < blockCount; i++) {
      blocks.push(i + 1);
    }

    // Use a blank value for 0 in input to prevent leading zeroes such as '01'.
    const inputValue = blockCount > 0 ? blockCount : '';

    return (
      <WindowHeight>
        {({ height }) => (
          <div className="App" style={{height}}>
            <div className="App-body">
              <div className="App-body-count">
                <h1 className="App-body-count-text">
                  Block count:
                </h1>
                <input
                  className="App-body-count-input"
                  onChange={this.onChangeCount}
                  type="number"
                  value={inputValue}
                />
              </div>
              <BlockGenerator blocks={blocks} />
            </div>
          </div>
        )}
      </WindowHeight>
    );
  }
}

export default App;
