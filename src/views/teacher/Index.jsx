import React, { Component } from 'react'
import { Card, Form, Input } from 'antd'
import { Row, Col, Button } from 'antd';
import { Select } from 'antd';
import { Table, } from 'antd';
import style from './teacher.module.css'
import {  } from '../../api/teacher';
import AddList from './addList';
import { Pagination } from 'antd';
import moment from 'moment';
import { deletesOne,batchDelete,getTeacherList } from '../../api/teacher';
import { message } from 'antd';

const { Option } = Select;

export default class teacher extends Component {
  state={
        disable:true,
        data:[],
        pageData:{
          page:1,
          pageSize:10
        },
        loading:false,
        visible:false,
        total:0,
        formData:{},
        record:{},
        title:'',
        selectedRowKeys:[]
  }
  formRef = React.createRef()
  loadData=()=>{
    this.setState({loading:true})
    const {pageData,formData}=this.state
    getTeacherList({...formData,...pageData}).
    then(res=>this.setState({
      data:res.data,
      loading:false,
      total: res.total,
    }))
  }
  search = () => {

    const formData = this.formRef.current.getFieldsValue(true);
    console.log(formData)
    this.setState({formData},()=>{
      this.loadData();
      this.setState({formData:{}})
    
    })
  }
  reset=()=>{
    this.formRef.current.resetFields()
    
    this.setState( 
      {page:1,
      pageSize:10,
    },()=>{
      this.loadData()
    })
  }
  showModel=()=>{
    this.setState({visible:true,title:'add employee'});
    this.addRef.myRef.resetFields();
    // this.formRef.addRef.resetFields()
  }
  toggleVis=(vis)=>{
    this.setState({visible:vis})
  }

  pageChange = (page, pageSize) => {
    
    this.setState({
      pageData: {
        page,
        pageSize
      }
    }, function () {
      this.loadData()
    })

  }
  edit=(record)=>{
    this.setState({
      record,
    visible:true,
      title:'edit techer'
  },
    ()=>{
      const birth = moment(record.birth);
      const date = moment(record.date);
      this.addRef.myRef.setFieldsValue({...record,birth,date});
    });
  }
  singleDelete=(id)=>{
    deletesOne({id}).then(res=>
      {
        this.loadData();
        if(res.code===0){
          message.success(res.msg);
        }
      });
  }
  DeleteMany=()=>{
    batchDelete({ids:this.state.selectedRowKeys}).then(
      res=>{
    
        this.loadData();
        if(res.code===0){
          message.success(res.msg);
          this.setState({disable:true})
        }
      }
    )
  }
  selectChange=(selectedRowKeys)=>{
    this.setState({selectedRowKeys,
    disable:selectedRowKeys.length?false:true
    })
  }
  componentDidMount(){
    this.loadData();
   
  }
  render() {
    const {disable,data,loading,visible,total,record,title,selectedRowKeys}=this.state
    const columns = [
      {
        title: "num",
        dataIndex: "index",
        key: "index",
        align:'center',
        render:(text,record,index)=>{
          return index+1
        }
      },
      {
        title: "name",
        dataIndex: "name",
        key: "name",
        align:'center'
      },
      {
        title: "gender",
        dataIndex: "gender",
        key: "gender",
        align:'center',
        render:(text)=>{
          return text==1?'male':'female'
        }
      },
      {
        title: "level",
        dataIndex: "level",
        key: "level",
        align:'center',
        render:(text)=>{
          if(text==1){
            return 'junior';
          }else if(text==2){
            return 'intermedia'
          }return 'senior'
        }
      },
      {
        title: "grade",
        dataIndex: "grade",
        key: "grade",
        align:'center'
      },
      {
        title: "startday",
        dataIndex: "date",
        key: "date",
        align:'center'
      },
      {
        title: "type",
        dataIndex: "type",
        key: "type",
        align:'center',
        render:(text)=>{
          if(text==1){
            return 'fulltime'
          }return 'partime'
        }
      },
      {
        title: "school",
        dataIndex: "school",
        key: "school",
        align:'center'
      },
      {
        title: "DOB",
        dataIndex: "birth",
        key: "birth",
        align:'center'
      },
      {
        title: "address",
        dataIndex: "address",
        key: "address",
        align:'center'
      },
      {
        title: "operation",
        dataIndex: "operation",
        key: "operation",
        fixed:'right',
        align:'center',
        width:'160px',
        render:(text,record)=>{
          return(
            <div>
              <Button 
              type='primary' 
              size='small'
              onClick={()=>this.edit(record)}
              >&nbsp;&nbsp;Edit&nbsp;&nbsp; </Button>
              <Button 
              danger size='small' 
              className='mt ml'
              onClick={()=>{this.singleDelete(record.id)}}
              > 
              Delete</Button>
            </div>
          )
        }
      },
    ]
    return (
      <div>
        <Card className={style.card}>
          <Form ref={this.formRef}
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}>
            <Row gutter={16}>
              <Col className="gutter-row" span={6}>
                <Form.Item
                  label="name"
                  name="name"
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={6}>
              <Form.Item
                  label="subject"
                  name="subject"
                >
                  <Select >
                    <Option value="">all</Option>
                    <Option value="语文">Chinese</Option>
                    <Option value="数学">Math</Option>
                    <Option value="英语">English</Option>
                    <Option value="物理">Physics</Option>
                    <Option value="化学">Chemistry</Option>
                    <Option value="生物">Biology</Option>
                  </Select>
                  </Form.Item>
              </Col>
              <Col className="gutter-row" span={6}>
                <Form.Item
                  label="phone"
                  name="phone"
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={6}>
                <Button className='ml' onClick={this.search}> search  </Button>
                <Button className='ml'onClick={this.reset}> reset</Button>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card className={style.card}>
          <Button className='ml' danger disabled={disable}
          onClick={this.DeleteMany}
          > BatchDelete </Button>
          <Button className='ml' onClick={this.showModel}> New Employee</Button>
        </Card>
        <Card className={style.card}>
        <Table 
        loading={loading}
        dataSource={data} 
        columns={columns} 
        scroll={{x:1400}}
        rowKey={(record)=>record.id}
        pagination={false}
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys: selectedRowKeys,
          onChange: this.selectChange
         
        }}
        />
             <Pagination 
             showQuickJumper 
             showSizeChanger
             total={total} 
             onChange={this.pageChange} 
             />
        </Card>
        <AddList 
        ref={a=>this.addRef=a}
        visible={visible} 
        toggleVis={this.toggleVis} 
        loadData={this.loadData}
        record={record}
        title={title}
        ></AddList>
   
      </div >
    )
  }
}
