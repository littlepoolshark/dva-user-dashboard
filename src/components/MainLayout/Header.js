import React from "react";
import {Menu,Icon } from "antd";
import { Link } from "dva/router";

function Header({location}){
    //console.log(location.pathname);
    return (
        <Menu
            selectedKeys={[location.pathname]}
            theme="dark"
        >
            <Menu.Item key="/users">
                <Link to="/users">
                    <Icon type="bars" />
                    Users
                </Link>
            </Menu.Item>
            <Menu.Item key="/">
                <Link to="/">
                    <Icon type="home" />
                    Home
                </Link>
            </Menu.Item>  
            <Menu.Item key="/notFound">
                <Link to="/notFound">
                    <Icon type="frown-circle" />
                    404
                </Link>
            </Menu.Item>  
            <Menu.Item key="/counter">
                <Link to="/counter">
                    加减器
                </Link>
            </Menu.Item>     
        </Menu>
    )
}

export default Header;