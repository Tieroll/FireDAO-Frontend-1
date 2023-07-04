import styled from "styled-components";
import {Component, useReducer} from "react";
import React, { useState } from 'react';
import logo from "../imgs/logo.webp"
import fireIcon1 from "../imgs/fire_icon1.webp"
import fireIcon2 from "../imgs/fire_icon2.webp"
import fireIcon3 from "../imgs/fire_icon3.webp"
import fireIcon4 from "../imgs/fire_icon4.webp"
import fireIcon7 from "../imgs/fire_icon7.webp"
import fireIcon5 from "../imgs/fire_icon5.webp"
import fireIcon6 from "../imgs/fire_icon6.webp"
import english from "../imgs/english.webp"
import { Button, Menu } from 'antd';
import {useNavigate} from "react-router-dom";
import develop from  "../env"
import navMap from "../config/navMap";
import {useConnect} from "../api/contracts";
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items =navMap;
const NavList = () => {
    const NavListBox = styled.div`
  
      height: 100vh;
      font-weight: bold;
      .ant-menu-submenu-title{
        i{
          display: none;
        }
      }
      .ant-menu-sub{
        .ant-menu-title-content{
          padding-left: 0.8em;
        }
      }
      .ant-menu-root{
        >.ant-menu-item-selected{
          position: relative;
          &:after{
            content: '';
            position: absolute;
            right: 0;
            top: 0;
            width: 2px;
            height: 50px;
            background: linear-gradient(320deg, #DD3642 0%, #FFC02C 100%);
          }
        }
      }
      
      .ant-menu-submenu-selected{
        background: #070000;
        .ant-menu-submenu-title{
          position: relative;
          &:after{
            content: '';
            position: absolute;
            right: 0;
            top: 0;
            width: 2px;
            height: 50px;
            background: linear-gradient(320deg, #DD3642 0%, #FFC02C 100%);
          }
        }
      }
    
      .logo-box{
        width: 100%;
        text-align: center;
        margin-bottom: 1em;
        .logo{
          width: 40%;
          margin:  0.5em;
        }
      }
     
      .m-nav-box{
        height: 100%;
        &::-webkit-scrollbar-thumb{
          width: 3px;
        }
        &::-webkit-scrollbar{
          width: 3px;
        }
      }
      .navBox{
        background: #201414;
        display: flex;
        padding-bottom: 2em;
        flex-direction: column;
        .ant-menu{
          width: 100%;
        }
        &::-webkit-scrollbar-thumb{
          width: 3px;
        }
        &::-webkit-scrollbar{
          width: 3px;
        }
        height: 100%;
        overflow-y: scroll;

        .menu{
         flex-grow: 1;
        }
        .lng-choose{
          display: flex;
          align-items: center;
          background: #070000;
          border-radius: 5px;
          border: 1px solid #414141;
          width: 160px;
          height: 40px;
          padding:0 1em;
          justify-content: space-between;
          margin: 0 auto;
          flex-shrink: 0;
          img{
            width: 20px;
            height: 20px;
            border-radius: 50%;
          }
        }
      }
      .fireIcon{
        width: 26px;
        height: 26px;
      }
      .selectNav{
        position: absolute;
        right: -10em;
        top: calc(0.9em );
        font-size: 18px;
      }
    `
    let {state, dispatch} = useConnect();
    const [collapsed, setCollapsed] = useState(false);
    const [selectedKeys, setSelectedKeys] = useState(["Holy Fire Altar","MintPassport"]);
    const [selectNav, setSelectNav] = useState("Holy Fire Altar");
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    const history = useNavigate();
    const goPage = (obj) => {
        if(develop.ENV === "dev"){
            setSelectedKeys(obj.keyPath)
            history("/"+ obj.key );
            setSelectNav(obj.keyPath[1])
            localStorage.setItem("activeNav",obj.keyPath[1])
        }else if(develop.ENV === "production"){
            if(obj.key=="MintPassport" ||obj.key== "PIDList" ||obj.key== "MyPassport"  ){
                setSelectedKeys(obj.keyPath)
                history("/"+ obj.key );
                setSelectNav(obj.keyPath[1])
            }else{
                history("/OnBuilding" );
            }
        }else{
            if(obj.key=="MintPassport" ||obj.key== "PIDList" ||obj.key== "MyPassport"||obj.key== "PidAirdrop"   ){
                setSelectedKeys(obj.keyPath)
                history("/"+ obj.key );
                setSelectNav(obj.keyPath[1])
            }else{
                history("/OnBuilding" );
            }
        }
        dispatch({type: "SET_IsShowNav", payload: false})

    }

    const rootSubmenuKeys = ['Holy Fire Altar', 'FDT Square', 'Operation'];
    const [openKeys, setOpenKeys] = useState(['Holy Fire Altar']);
    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };
    return (
        <NavListBox>
            <div className="m-nav-box">
                <div
                    className="navBox"
                    style={{
                        width: 256,
                    }}
                >

                    <Menu
                        className="menu"
                        defaultSelectedKeys={[]}
                        defaultOpenKeys={[selectNav]}
                        selectedKeys={selectedKeys }
                        mode="inline"
                        theme="dark"
                        inlineCollapsed={collapsed}
                        items={items}
                        onClick={(e)=>goPage(e)}
                    />
                    <div className="lng-choose">
                        <img src={english} alt=""/>
                        <span>English</span>
                    </div>
                </div>
            </div>
        </NavListBox>
    )

}

export default NavList
