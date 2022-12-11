import {Layout, Menu, Popconfirm} from 'antd'
import {Outlet, useLocation, useNavigate} from 'react-router-dom'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import './index.scss'
import {useEffect} from "react";
import {useStore} from "../../store";
import {observer} from 'mobx-react-lite'


const {Header, Sider} = Layout

const GeekLayout = () => {
  const {pathname} = useLocation()
  const navigate = useNavigate()
  const MenuList = [
    {
      key: '/',
      label: '数据概览',
      icon: <HomeOutlined/>
    },
    {
      key: '/article',
      label: '内容管理',
      icon: <DiffOutlined/>
    },
    {
      key: '/publish',
      label: '发布文章',
      icon: <EditOutlined/>
    },
  ]
  const onClick = (MenuItem) => {
    navigate(MenuItem.key, {replace: false})
  }

  const {userStore, loginStore} = useStore()
  useEffect(() => {
    userStore.getUserInfo().then(() => {
    })
    console.log(userStore, userStore.userInfo.name)
  }, [userStore])

  const onConfirm = () => {
    loginStore.clearToken()
    navigate('/login', {replace: false})
  }

  return (
    <Layout>
      <Header className="header">
        <div className="logo"/>
        <div className="user-info">
          <span className="user-name">{userStore.userInfo.name}</span>
          <span className="user-logout">
            <Popconfirm
              onConfirm={onConfirm}
              title="是否确认退出？" okText="退出" cancelText="取消">
              <LogoutOutlined/> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={[pathname]}
            style={{height: '100%', borderRight: 0}}
            items={MenuList}
            onClick={onClick}
          />
        </Sider>
        <Layout className="layout-content" style={{padding: 20}}>
          <Outlet/>
        </Layout>
      </Layout>
    </Layout>
  )
}
export default observer(GeekLayout)
