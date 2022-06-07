import React, { Component, lazy, Suspense } from 'react'
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { Menu, Button } from 'antd';
import style from './Index.module.css'
import { loginAction, menuAction } from '../../redux/action/loginAction';
import { getInfo } from '../../api';
import { menuFilter } from '../../utils/menuFilter';
import { asyncRouterMap } from '../../common/routerMap';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import { NavLink } from 'react-router-dom';
import Headers from '../../component/headers/Index'
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
class Index extends Component {
  state = { menuTree: [] }

  componentDidMount() {
    this.checkReducer()
    // console.log(this.renderRoute(menuFilter(asyncRouterMap, 'admin')))

  }
  checkReducer(){
   
      if (this.props.res.menuReducer.length) {
        const menuTree = this.renderMenu(this.props.res.menuReducer);
        this.setState({ menuTree });
      } else {
        getInfo().then(res => {
          const { loginAction, menuAction } = this.props;
          const menuTree = this.renderMenu(menuFilter(asyncRouterMap, res.data.role));
          loginAction({
            role: res.data.role,
            nickname: res.data.nickname
          });
          menuAction(menuFilter(asyncRouterMap, res.data.role));
          // console.log('haha',this.props)
          this.setState({ menuTree });
        }
      )
    }
  }
  renderMenu = (data) => {
    return data.map((item) => {
      if (item.children) {
        return <SubMenu title={item.meta.title} key={item.path}>
          {this.renderMenu(item.children)}
        </SubMenu>
      }
      return <Menu.Item key={item.path}>
        <NavLink to={"/index" + item.path}>
          {item.meta.title}
        </NavLink>
      </Menu.Item>
    })
  }

  // creat async router
  renderRoute=(menu)=>{
    let routerList=[];
    const asyncRoute=(data)=>{
          data.forEach((item)=>{
            if(item.children){
                asyncRoute(item.children)
            }else{
              routerList.push(
                <Route path={`/index${item.path}`} component={lazy(()=>import(`@/views${item.path}/Index.jsx`))} key={item.path}></Route>
              )
            }
          })
      }
      asyncRoute(menu);
      return routerList
  }
  // renderRoute=(menu)=>{
  //   let routerList=[];
  //   const asyncRoute=(data)=>{
  //         data.forEach((item)=>{
  //           if(item.children){
  //               asyncRoute(item.children)
  //           }else{
  //             routerList.push(
  //               <Route path={`/layout${item.path}`} component={lazy(()=>import(`@/views${item.path}/Index.jsx`))} key={item.path}></Route>
  //             )
  //           }
  //         })
  //     }
  //     asyncRoute(menu);
  //     return routerList
  // }



  render() {
    
    return (
      <div>
        <Layout className={style.layout} >
          <Sider style={{ backgroundColor: '#001529' }}>
            <div style={{ width: 200 }}>
              <h1 className={style.title}>Up Education</h1>
              <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
              </Button>
              <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
              >
                {this.state.menuTree}
              </Menu>
            </div>
          </Sider>
          <Layout style={{background:"#f4f4f4",height:"100vh",overflow:'auto'}}>
            <Header className={style.header} >
                <Headers {...this.props}></Headers>
            </Header>
            <Suspense fallback={<div>loading...</div>}>
              <Content className={style.content}>
                {this.renderRoute(menuFilter(asyncRouterMap, 'admin'))}
              </Content>
            </Suspense>
         
          </Layout>
        </Layout>

      </div>
    )
  }
}

export default connect(
  state => ({
    res: state
  }),
  {
    loginAction,
    menuAction
  }

)(Index)