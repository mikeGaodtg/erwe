import React, { Component } from 'react'

export default class finace extends Component {
  componentDidMount(){
    console.log(this.a)
  }

  render() {
    return (
      <div>finace
        <div ref={c=>this.a=c}>你好</div>
      </div>
    )
  }
}
