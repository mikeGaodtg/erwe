import React, { Component } from 'react'
import { Button, Result } from 'antd';
export default class finace extends Component {
 toHomePage=()=>{
   this.props.history.push("/index/home")
 }

  render() {
    return (
      <div>
   
          <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary" 
            onClick={this.toHomePage}
            >Back Home</Button>}
          />
      
      </div>
    )
  }
}
