import React, { Component } from 'react'
import './App.css'

import Block from './Block'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Block layout='row' gutter='8px'>
          <div>Col 1</div>
          <Block layout='column' basis='grow'>
            <div basis='grow'>Nest 1</div>
            <div>Nest 2</div>
          </Block>
          <div>Col 2</div>
        </Block>
      </div>
    )
  }
}

export default App
