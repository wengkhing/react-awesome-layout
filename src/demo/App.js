import React, { Component } from 'react'
import './App.css'

import Block from '../lib'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Block layout='row' gutter='8px' wrap style={{ backgroundColor: '#aaa' }}>
          <div>Col 1</div>
          <Block layout='row' basis='fill'>
            <div basis='fill'>Nest 1</div>
            <div>Nest 2</div>
          </Block>
          <div>Col 2</div>
        </Block>
      </div>
    )
  }
}

export default App
