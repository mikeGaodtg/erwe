import React, { Component } from 'react'
import style from './Index.module.css'
import { Card, Tabs, message } from 'antd';
import { Form, Input, Button, Checkbox } from 'antd';
import { login } from '../../api/index'
import { connect } from 'react-redux';
import { loginAction, menuAction } from '../../redux/action/loginAction';
import { asyncRouterMap } from '../../common/routerMap'
import { menuFilter } from '../../utils/menuFilter';
import { register } from '../../api/index';

const { TabPane } = Tabs;
class Login extends Component {

    login = () => {
        const { loginAction, menuAction, history } = this.props
        this.formRef.validateFields().then(res =>
            //validateField is an encapulated function developed by antd,for form element
            login(res).then(res => {
                //axios request by login function(encapusulated)

                //console.log aixos request result, which shows successful request
                sessionStorage.setItem('token', res.token);
                loginAction({
                    role: res.role,
                    nickname: res.nickname
                });
                menuAction(menuFilter(asyncRouterMap, res.role));
                //both action for storing data into redux store

                history.push("/edu-management/index/home");
            }

            ).catch(err => console.log(err))
            //failed aixos request and return error

        ).catch(err => console.log(err))
        //failed form validation
    }
    register = () => {
        this.formRef2.validateFields().then(res => {
            register(res).then(data => {
                message.success(
                    data.msg, 3);
            }).catch(res => console.log(res))
        }).catch(res => console.log(res))
    }
    componentDidMount() {
        message.success(
            'Account : xuchao', 10);
        message.success(
            'password : 123456', 10)
    }
    render() {

        return (
            <div>
                <div className={style.wrap}>

                    <Card title="Up Education Manangement System"
                        bodyStyle={{ textAlign: 'center' }}
                        bordered={true}
                        style={{ width: 500 }}>
                        <Tabs defaultActiveKey="1" >
                            <TabPane tab="Login by phone" key="1">
                                <Form
                                    ref={(a) => this.formRef = a}
                                    name="basic"
                                    labelCol={{ span: 0 }}
                                    wrapperCol={{ span: 24 }}
                                    autoComplete="off"
                                >
                                    <Form.Item
                                        name="username"
                                        rules={[{
                                            message: 'Min eight chara, a upper char, a lower char & a num',
                                            pattern: /^\w{4,8}$/
                                        },
                                        {
                                            required: true, message: 'Please input your username!',
                                        }]}
                                    >
                                        <Input placeholder="Username" />
                                    </Form.Item>

                                    <Form.Item

                                        name="password"
                                        rules={[{
                                            message: 'Minimum eight characters, at least one letter and one number',
                                            pattern: /^\w{4,8}$/
                                        }, {
                                            required: true, message: 'Please input your username!'
                                        }]}
                                    >
                                        <Input.Password placeholder="password" />
                                    </Form.Item>

                                    <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 10, span: 14 }}>
                                        <Checkbox>Remember me</Checkbox>
                                    </Form.Item>

                                    <Button type="primary" style={{ width: '100%' }} onClick={this.login}>
                                        Submit
                                    </Button>
                                </Form>
                            </TabPane>
                            <TabPane tab="register" key="2">
                                <Form
                                    ref={(a) => this.formRef2 = a}
                                    name="basic"
                                    labelCol={{ span: 5 }}
                                    wrapperCol={{ span: 19 }}
                                    autoComplete="off"
                                >
                                    <Form.Item
                                        style={{ width: '100%' }}
                                        label="Username"
                                        name="username"
                                        rules={[{
                                            message: 'Min eight chara, a upper char, a lower char & a num',
                                            pattern: /^\w{4,8}$/
                                        },
                                        {
                                            required: true, message: 'Please input your username!',
                                        }]}
                                    >
                                        <Input placeholder="Username" />
                                    </Form.Item>

                                    <Form.Item
                                        style={{ width: '100%' }}
                                        label="Password"
                                        name="password"
                                        rules={[{
                                            message: 'Minimum eight characters, at least one letter and one number',
                                            pattern: /^\w{4,8}$/
                                        }, {
                                            required: true, message: 'Please input your username!'
                                        }]}
                                    >
                                        <Input.Password placeholder="password" />
                                    </Form.Item>
                                    <Form.Item
                                        style={{ width: '100%' }}
                                        label="Name"
                                        name="nickname"
                                        rules={[{
                                            message: 'Minimum eight characters, at least one letter and one number',
                                            pattern: /^\w{3,10}$/
                                        }, {
                                            required: true, message: 'Please input your name!'
                                        }]}
                                    >
                                        <Input placeholder="name" />
                                    </Form.Item>
                                    <Button type="primary" style={{ width: '100%' }} onClick={this.register}>
                                        Register
                                    </Button>
                                </Form>
                            </TabPane>

                        </Tabs>

                    </Card>
                </div>

            </div>
        )
    }
}

export default connect(
    state => ({ res: state }),
    { loginAction, menuAction }
)(Login)