import React, {useEffect, useRef, useState} from 'react';
import {useConnect} from "../../../../api/contracts";
import BigNumber from "bignumber.js"
import {
    Button,
    message,
    AutoComplete,
    Switch,
    Select,
    Form,
    Empty,
    Pagination, Input, Modal
} from 'antd';

import {getContractByName, getContractByContract} from "../../../../api/connectContract";
import {dealMethod, dealPayMethod, viewMethod} from "../../../../utils/contractUtil"

import develop from "../../../../env";
import {useLocation, useNavigate} from "react-router-dom";
import judgeStatus from "../../../../utils/judgeStatus";
import {dealTime} from "../../../../utils/timeUtil";

import sc from "../../../../imgs/sc.png"
import cut from "../../../../imgs/remove.png"
import add from "../../../../imgs/add.png"
import NFTAdminStyle from './NFTAdminStyle';


const NFTAdmin = (props) => {
    let {state, dispatch} = useConnect();
    const location = useLocation()



    const [isDelMolOpen, setDelOpen] = useState(false)

    const [curDelAddr, setCurDelAddr] = useState()

    const [curLevel, setCurLevel] = useState()
    const [isAddMolOpen, setAddOpen] = useState(false)
    const history = useNavigate();
    const [form] = Form.useForm();



    const [whitelistArr, setWhiteListArr] = useState([])

    const [inWhitelistArr, setInWhitelistArr] = useState([])

    const [adminArr, setAdminArr] = useState([])

    const [nftAddrArr, setNFTAddrArr] = useState([])
    const [initAmountArr, setInitAmountArr] = useState([])
    const [mintedArr, setMintedArr] = useState([])

    const [addWhiteArr, setAddWArr] = useState([{}])

    const addOneWhite = async () => {
        let addWhiteArrT = JSON.parse(JSON.stringify(addWhiteArr))
        addWhiteArrT.push({})
        setAddWArr(addWhiteArrT)
    }
    const removeOneWhite = async () => {
        let addWhiteArrT = JSON.parse(JSON.stringify(addWhiteArr))
        addWhiteArrT.shift()
        setAddWArr(addWhiteArrT)
    }

    const handleViewMethod = async (name, params) => {
        let contractTemp = await getContractByName("ogV7", state.api,)
        if (!contractTemp) {
            message.warn("Please connect", 5)
        }
        return await viewMethod(contractTemp, state.account, name, params)
    }
    const handleDealMethod = async (name, params) => {
        let contractTemp = await getContractByName("ogV7", state.api,)
        if (!contractTemp) {
            message.warn("Please connect", 5)
        }
        await dealMethod(contractTemp, state.account, name, params)
    }


    const transferOwnership = async () => {
        let contractTemp = await getContractByContract("rainbowNFT", nftAddrArr[curLevel], state.api,)
        await dealMethod(contractTemp, state.account, "transferOwnership", [form.getFieldValue().address])
    }
    const getAdmin = async () => {

        let adminArr = []
        for(let i=0;i<7;i++){
            let contractTemp = await getContractByContract("rainbowNFT", nftAddrArr[i], state.api,)
            const Admin = await viewMethod(contractTemp, state.account, "owner", [])
            adminArr.push(Admin)
        }
        setAdminArr(adminArr)
    }
    const getInitAmount = async () => {
        let tempArr = [], initAmountArr = []
        for (let i = 0; i < 7; i++) {
            let contractTemp = await getContractByContract("rainbowNFT", nftAddrArr[i], state.api,)
            const initAmount = await viewMethod(contractTemp, state.account, "initAmount", [])
            let mintAmount = await viewMethod(contractTemp, nftAddrArr[i], "totalMint", [])
            tempArr.push(mintAmount)
            initAmountArr.push(initAmount)
        }
        setInitAmountArr(initAmountArr)
        setMintedArr(tempArr)

    }
    const getWiteList = async () => {
        let tempArr = [], whiteArr = []
        for (let i = 0; i < 7; i++) {
            let contractTemp = await getContractByContract("rainbowNFT", nftAddrArr[i], state.api,)
            const whitelist1 = await viewMethod(contractTemp, state.account, "getWiteList", [])

            const inW1 = whitelist1.some(item => {
                return item.toLowerCase() == state.account.toLowerCase()
            })
            tempArr.push(inW1)
            whiteArr.push(whitelist1)
        }
        setWhiteListArr(whiteArr)
        setInWhitelistArr(tempArr)


    }



    const handleSetInitAmount = async () => {
        let contractTemp = await getContractByContract("rainbowNFT", nftAddrArr[curLevel], state.api,)
        await dealMethod(contractTemp, state.account, "setInitAmount", [form.getFieldValue().InitAmount])
        getInitAmount()
    }

    const addWhiteListUser = async () => {
        let arr = []
        for (let i = 0; i < addWhiteArr.length; i++) {
            arr.push(form.getFieldValue()["address" + i])
        }
        let contractTemp = await getContractByContract("rainbowNFT", nftAddrArr[curLevel], state.api,)
        await dealMethod(contractTemp, state.account, "addWhiteListUser", [arr])
        getWiteList()
    }
    const removeFromWhiteList = async () => {
        let contractTemp = await getContractByContract("rainbowNFT", nftAddrArr[curLevel], state.api,)
        await dealMethod(contractTemp, state.account, "removeFromWhiteList", [[curDelAddr]])

        getWiteList()
    }
    const getValidNumbers = async () => {
        let tempArr = []
        for (let i = 0; i < 7; i++) {
            let res = await handleViewMethod("validNumbers", [i])
            let addr = await handleViewMethod("ValueToNft", [res])
            tempArr.push(addr)
        }
        setNFTAddrArr(tempArr)
    }
    useEffect(async () => {
        setCurLevel(location.search.substring(7, 8))
        let judgeRes = await judgeStatus(state)
        if (!judgeRes) {
            return
        }
        await getValidNumbers()


    }, [state.account])
    useEffect(() => {
        if (nftAddrArr.length>0) {
            getInitAmount()
            getWiteList()
            getAdmin()

        }
    }, [nftAddrArr])

    return (

        <NFTAdminStyle>
            <div className="part1">
                <div className="panel-box">
                    <div className="panel-container">
                        <div className='panel-title'>
                            Transfer Administrator
                        </div>
                        <Form form={form} name="control-hooks" className="form">
                            <Form.Item
                                label="Administrator Address"
                            >
                                {adminArr[curLevel]}
                            </Form.Item>
                            <Form.Item
                                name="address"
                                label="New Address"
                                validateTrigger="onBlur"
                                validateFirst={true}
                            >
                                <Input/>
                            </Form.Item>
                            <Button type="primary" className="go-btn" onClick={() => {
                                transferOwnership()
                            }}>
                                Confirm
                            </Button>
                        </Form>
                    </div>
                </div>

                <div className="panel-box">
                    <div className="panel-container">
                        <div className='panel-title'>
                            Set   NFT {parseInt(curLevel)+1} Amounts
                        </div>

                        <Form form={form} name="control-hooks" className="form">
                            <Form.Item
                                label="Amounts"
                            >
                                <span>
                                    {initAmountArr[curLevel]}
                                </span>
                            </Form.Item>
                            <Form.Item
                                name="InitAmount"
                                label="New Amounts"
                                validateTrigger="onBlur"
                                validateFirst={true}
                            >
                                <Input/>
                            </Form.Item>
                            <Button type="primary" className="go-btn" onClick={() => {
                                handleSetInitAmount()
                            }}>
                                Confirm
                            </Button>
                        </Form>
                    </div>


                </div>


                <Modal className="model-dialogdel" title="Delete" open={isDelMolOpen}
                       onOk={() => {
                           removeFromWhiteList()
                       }}
                       onCancel={() => {
                           setDelOpen(false)
                       }}>
                    <p>
                        Wallet Address
                    </p>
                    <div className="value">
                        {curDelAddr}
                    </div>
                </Modal>
                <div className='panel-box'>
                    <div className='panel-container1'>
                        <Modal className="model-dialogadd" title="Add" open={isAddMolOpen}
                               onOk={() => {
                                   addWhiteListUser()
                               }}
                               onCancel={() => {
                                   setAddOpen(false)
                               }}>
                            <Form form={form} name="control-hooks" className="form">
                                {addWhiteArr.map((item, index) => {
                                    return (
                                        <Form.Item
                                            name={"address"
                                                + index
                                            }
                                            validateTrigger="onBlur"
                                            label="Address"
                                            validateFirst={true}
                                        >
                                            <div className="input-box">
                                                <Input type="text"></Input>
                                            </div>
                                        </Form.Item>
                                    )
                                })}
                                <div className="icon-box">
                                    <img width={30} src={add} onClick={() => {
                                        addOneWhite()
                                    }}/>
                                    <img width={30} src={cut} onClick={() => {
                                        removeOneWhite()
                                    }}/>

                                </div>
                            </Form>
                        </Modal>
                        <div>
                            <div className='panel-title'>
                                Set NFT {parseInt(curLevel)+1} Whitelist
                            </div>

                            <div className='superdao-list-box white-list-box'>
                                <div className='list-header white-header'>
                                    <div className='col'>
                                        No.
                                    </div>
                                    <div className='col'>
                                        Address
                                    </div>
                                    <div className='col'>
                                        Delete
                                    </div>
                                </div>
                                {whitelistArr[curLevel]&&whitelistArr[curLevel].map((item, index) => {
                                    return (<div className='list-item white-item' key={index} style={{display:"flex"}}>
                                        <div className='col no'>
                                            {index + 1}
                                        </div>
                                        <div className='col address'>
                                            <a>
                                                {item}
                                            </a>
                                        </div>
                                        <div className="col sc1">
                                            <img src={sc} className="sc" id='scc' onClick={() => {
                                                setDelOpen(true)
                                                setCurDelAddr(item)
                                            }}/>
                                        </div>

                                    </div>)
                                })}
                                <div className='btn-box'>
                                    <div className='addsbt' onClick={() => {
                                        setAddOpen(true)
                                    }}>Add
                                    </div>

                                </div>

                            </div>
                        </div>


                    </div>

                </div>
            </div>

        </NFTAdminStyle>
    )
}
export default NFTAdmin;