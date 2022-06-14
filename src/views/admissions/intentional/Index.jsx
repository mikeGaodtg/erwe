import React, { Component } from 'react'
import { Card } from 'antd'
import { Col, Row  ,Table , Button,Form,Input,Tag,Badge } from 'antd';
import { intentList } from '../../../api/admission';
export default class international extends Component {
  state={
    data:[],
    loading:false
  }
  renderList=()=>{
    this.setState({loading:true},()=>{
      intentList().then(res=>{
        this.setState({
          data:res.data,
          loading:false
        })
      })
    })
      
  }
  getDetails=()=>{
    this.props.history.push('/index/admissions/solicitation')
  }
componentDidMount(){
  this.renderList()
}
  render() {
    const {loading}=this.state
    const columns = [
      {
        title: "index",
        key:'index',
      render: (text, record, index) =>index+1,
      },
      {
        title: "name",
        dataIndex: "name",
        key:'name',
     
      },
      {
        title: "gender",
        dataIndex: "gender",
        key:'gender',
        render:(text)=>text==1?'male':'female'
  
      },
      {
        title: "status",
        dataIndex: "status",
        key:'status',
        render:(text,record,index)=>{
          if(text==1){
            return <Tag color="magenta" >likely</Tag>
          }
          else if(text==2){
            return <Tag color="volcano" >justsosos</Tag>
          }return  <Tag color="orange" >hopeless</Tag>
        }
 
      },
      {
        title: "audition",
        dataIndex: "audition",
        key:'auditon',
        render:(text,record,index)=>{
          return text==2?  
          <div  >
             <Badge status="success" />
          <span>finished</span>
          </div> 
          :
          <div>
          <Badge status="warning"/>
       <span>  non-finished</span>
       </div> 
        
        }
  
      },
      {
        title: "source",
        key:'source',
        dataIndex: "source",
        align:'center'
      },
      {
        title: "tel",
        dataIndex: "tel",
        key:'tel',
        align:'center'
      },
      {
        title: "grade",
        dataIndex: "grade",
        key:'grade',
        align:'center'
      },
      {
        title: "level",
        dataIndex: "level",
        key:'level',
        align:'center',
        render:(text)=>{
          if(text==1){
            return 'strong'
          }
          else if(text ==2){
            return 'not strong'
          }return 'no intention'
        }
      },
      {
        title: "principal",
        dataIndex: "principal",
        key:'principal',
        align:'center'
      },
      {
        title: "detail",
        key:'detil',
        align:'center',
        render:()=>{
          return <Button 
          type='primary' 
          style={{borderRadius:'10px'}}
          onClick={this.getDetails}
          >details</Button>
        }
      },
    ];

    return ( <div>
        <div className='wrap'>
        <Card className='mt'>
        <Form
              ref={a => this.formRef = a}
              name="basic"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 19 }}
              initialValues={{ remember: true }}
              autoComplete="off"
            >
        <Row>
      <Col span={6} style={{height:'32px'}}>  
        <Form.Item label="name"  >
        <Input placeholder="input placeholder" className='w50'/>
      </Form.Item>
      </Col>
      <Col span={6} style={{height:'32px'}}>
      <Form.Item label="accountable" >
        <Input placeholder="input placeholder" className='w50'/>
      </Form.Item>
      </Col>
      <Col span={6}>
      <Button type="primary">check</Button>
      <Button type="primary" className='ml'>reset</Button>
      </Col>
    </Row>
    </Form>
        </Card>
        <Card className='mt'>
        <Button type="primary">new students</Button>
      <Button type="danger" className='ml'>delte</Button>
      <Button type="primary" className='ml'>admitted</Button>
      <Button type="primary" className='ml'>cancel admission</Button>
        </Card>
        <Card className='mt'>
        <Table
           
                rowKey={(record) => record.id}
                columns={columns}
                dataSource={this.state.data}
                pagination={false}
              />
        </Card>
        </div>
      </div>
    )
  }
}
