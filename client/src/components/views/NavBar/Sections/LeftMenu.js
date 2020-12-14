import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="Home">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="Blog">
        <Link to="/blog">Blogs</Link>
      </Menu.Item>
      <Menu.Item key="Create">
        <Link to="/blog/create">create</Link>
      </Menu.Item>
    </Menu>
  )
}

export default LeftMenu