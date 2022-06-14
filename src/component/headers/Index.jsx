import React, { Component } from 'react'
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { Avatar, Badge } from 'antd';
import { loginAction, menuAction } from '../../redux/action/loginAction';

class Index extends Component {
    logout = () => {
        sessionStorage.clear('token');
        // delete token
        this.props.loginAction({ role: '', nickname: '' })
        this.props.menuAction([])
        //clean date in reducer

        this.props.history.push('/login')
    }
    render() {
        console.log(this.props)
        const menu = (
            <Menu
                items={[
                    {
                        icon: (<UserOutlined />),
                        key: '1',
                        label: (
                            <a rel="noopener noreferrer" href="/index/personal">
                                personal center
                            </a>
                        ),
                    },
                    {
                        icon: (<HomeOutlined />),
                        key: '2',
                        label: (
                            <a rel="noopener noreferrer"
                                onClick={this.logout}
                            >
                                logout
                            </a>
                        ),
                    }
                ]}
            />
        );

        return (
            <div>
                <span className="avatar-item">
                    <Badge count={1}>
                        <Avatar shape="square" icon={<UserOutlined />} />
                    </Badge>
                </span>
                <Dropdown overlay={menu} placement="topRight" arrow className='ml'>
                    <Button>Menu  <DownOutlined /></Button>
                </Dropdown>
            </div>
        )
    }
}
export default connect(state => ({
    res: state
}), { loginAction, menuAction }

)(Index)