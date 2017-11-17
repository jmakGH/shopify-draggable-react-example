import React, { Component } from 'react';

import BlockGenerator from 'components/BlockGenerator';
import WindowHeight from 'components/WindowHeight';
import './App.css';

class App extends Component {
  state = {
    blockCount: 14, // Default
  }

  onChangeCount = ({ target }) => {
    // Clamp value
    const blockCount = Math.min(Math.max(parseInt(target.value, 10), 0), 100);

    this.setState({ blockCount });
  }

  render() {
    const { blockCount } = this.state;

    // Generate blocks.
    let blocks = [];

    for (let i = 0; i < blockCount; i++) {
      blocks.push(i + 1);
    }

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
                  value={blockCount}
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
