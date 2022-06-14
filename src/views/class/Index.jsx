import React, { Component } from 'react'
import { Card, List } from 'antd';
import { getClass } from '../../api/class';
import { Avatar, Button,message } from 'antd';
import style from './class.module.css';
import { Col, Row } from 'antd';
import AddModel from './Model';
import { deleteClass } from '../../api/class';


export default class Index extends Component {
  state = {
    data: [],
  }
  renderList=()=>{
      getClass().then(res => {
        this.setState({ data: res.data })
      }
    )
  }
  showModal = () => {
    this.modelRef.newTeacher()
  };

  handleDelete=(a)=>{

        deleteClass({'id':a}).then(res=>{
          message.success(res.msg);
          this.renderList()
        })
  }
  componentDidMount() {
    this.renderList()
  }
  render() {
    const { data } = this.state
    return (
      <div>
        <div className='wrap'>
          <List
            className='mt'
            grid={{
              gutter: 16,
              column: 3,
            }}
            dataSource={data}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <Card >
                  <Avatar

                    className='fl'
                    shape="square"
                    size="large"
                    src="https://joeschmoe.io/api/v1/random"
                  />
                  <div className='fl ml'>
                    <div className={style.w90}>
                      <p className='fl'>classroom :&nbsp; &nbsp; {item.classroom}</p>
                      <p className='fr'>&nbsp; &nbsp; {item.time}</p>
                      <div className='clear'></div>
                    </div>

                    <p>subject :&nbsp; &nbsp; {item.subject}</p>
                    <p>teacher :&nbsp; &nbsp; {item.teacher}</p>
                    <p>type &nbsp; :&nbsp; &nbsp; {item.type}</p>
                  </div>
                  <div className='clear'></div>
                </Card>
                <Row>
                  <Col span={12}> <Button className={style.buttonwidth}
                    onClick={this.showModal}
                  >new class</Button></Col>
                  <Col span={12}> <Button className={style.buttonwidth}
                    onClick={()=>this.handleDelete(item.id)}
                  >delete class</Button></Col>
                </Row>
              </List.Item>
            )}
          />
          <AddModel
            ref={a => this.modelRef = a}
         
            renderList={this.renderList}
          />


        </div>
      </div>
    )
  }
}
