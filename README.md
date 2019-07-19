# ccl-react

> Danmaku comments overlay for React

[![NPM](https://img.shields.io/npm/v/ccl-react.svg)](https://www.npmjs.com/package/ccl-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save ccl-react
```

## Usage
This component is designed to be used as a part of a media player component.

```tsx
import * as React from 'react'

import { DanmakuOverlay, ScrollAllocator } from 'ccl-react'

class MyMediaComponent extends React.Component<{}, {isPlaying:boolean, time:number}> {
  constructor (props) {
    super(props);
    this.state = {
      isPlaying: false,
      time: 0
    }
  }

  sync(t) {
    this.setState({
      time: t
    });
  }

  render () {
    return (
      <DanmakuOverlay
        allocators={ [ new ScrollAllocator() ] }
        status={ this.state.isPlaying ? 'playing' : 'stopped' }
        time={ this.state.time }>
        <MediaPlayer onTimeUpdate={ (t) => { this.sync(t); }} />
      </DanmakuOverlay>
    )
  }
}
```

## License
MIT Licenced. Copyright 2019 [Jim Chen](https://github.com/jabbany)
