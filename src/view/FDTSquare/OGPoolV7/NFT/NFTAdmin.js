import React, {useEffect, useRef, useState} from 'react';
import {useConnect} from "../../../api/contracts";
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

import {getContractByName, getContractByContract} from "../../../api/connectContract";
import {dealMethod, dealPayMethod, viewMethod} from "../../../utils/contractUtil"

import develop from "../../../env";
import {useLocation, useNavigate} from "react-router-dom";
import judgeStatus from "../../../utils/judgeStatus";
import {dealTime} from "../../../utils/timeUtil";
import bigNode from "../../../imgs/BigNode.png"
import smallNode from "../../../imgs/SmallNode.png"
import superNode from "../../../imgs/SuperNode.png"
import sc from "../../../imgs/sc.png"
import cut from "../../../imgs/remove.png"
import add from "../../../imgs/add.png"
import NFTAdminStyle from './NFTAdminStyle';


const NFTAdmin = (props) => {
    let {state, dispatch} = useConnect();
    const location = useLocation()

    const [pageCount, setPageCount] = useState(20)
    const [curPage, setCurPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [isShowWhite, setIsShowWhite] = useState(false)
    const [isDelMolOpen, setDelOpen] = useState(false)

    const [curDelAddr, setCurDelAddr] = useState()

    const [curLevel, setCurLevel] = useState()
    const [isAddMolOpen, setAddOpen] = useState(false)
    const history = useNavigate();
    const [form] = Form.useForm();
    const [smallNode, setSmallNode] = useState()
    const [bigNode, setBigNode] = useState()
    const [supNode, setSupNode] = useState()
    const [ownerAddr, setOwnerAddress] = useState()
    const [smallInitAmount, setSmallInitAmount] = useState()
    const [bigInitAmount, setBigInitAmount] = useState()
    const [supInitAmount, setSupInitAmount] = useState()

    const [smallAdmin, setSmallAdmin] = useState()
    const [bigAdmin, setBigAdmin] = useState()
    const [supAdmin, setSupAdmin] = useState()


    const [smallWhitelist, setSmallWhiteList] = useState([])
    const [bigWhitelist, setBigWhitelist] = useState([])
    const [supWhitelist, setSupWhitelist] = useState([])
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
        let contractTemp = await getContractByName("spbd", state.api,)
        if (!contractTemp) {
            message.warn("Please connect", 5)
        }
        return await viewMethod(contractTemp, state.account, name, params)
    }
    const handleDealMethod = async (name, params) => {
        let contractTemp = await getContractByName("spbd", state.api,)
        if (!contractTemp) {
            message.warn("Please connect", 5)
        }
        await dealMethod(contractTemp, state.account, name, params)
    }
    const getBigNode = async () => {
        let res = await handleViewMethod("bigNode", [])
        setBigNode(res)
    }
    const getSmallNode = async () => {
        let res = await handleViewMethod("smallNode", [])
        setSmallNode(res)
    }
    const getOwner = async () => {
        let res = await handleViewMethod("owner", [])
        setOwnerAddress(res)
    }
    const getSupNode = async () => {
        let res = await handleViewMethod("supNode", [])
        setSupNode(res)
    }
    const handleSetBigNode = async () => {
        await handleDealMethod("setBigNode", [form.getFieldValue().BigNode])
        getBigNode()
    }
    const handleSetSupNode = async () => {
        await handleDealMethod("setSupNode", [form.getFieldValue().SupNode])
        getSupNode()
    }
    const handleSetSmallNode = async () => {
        await handleDealMethod("setSmallNode", [form.getFieldValue().SmallNode])
        getSmallNode()
    }

    const transferOwnership = async () => {
        if (curLevel == 1) {
            let contractTemp = await getContractByContract("smallnode", smallNode, state.api,)
            await dealMethod(contractTemp, state.account, "transferOwnership", [form.getFieldValue().address])
        }
        if (curLevel == 2) {
            let contractTemp = await getContractByContract("bignode", smallNode, state.api,)
            await dealMethod(contractTemp, state.account, "transferOwnership", [form.getFieldValue().address])
        }
        if (curLevel == 3) {
            let contractTemp = await getContractByContract("supnode", smallNode, state.api,)
            await dealMethod(contractTemp, state.account, "transferOwnership", [form.getFieldValue().address])
        }
    }
    const getAdmin = async () => {
        if (!smallNode) {
            return
        }
        if (!bigNode) {
            return
        }
        if (!supNode) {
            return
        }
        let contractTemp = await getContractByContract("smallnode", smallNode, state.api,)
        const Admin = await viewMethod(contractTemp, state.account, "owner", [])
        setSmallAdmin(Admin)

        let contractTemp2 = await getContractByContract("bignode", bigNode, state.api,)
        const Admin2 = await viewMethod(contractTemp2, state.account, "owner", [])
        setBigAdmin(Admin2)

        let contractTemp3 = await getContractByContract("supnode", supNode, state.api,)
        const Admin3 = await viewMethod(contractTemp3, state.account, "owner", [])
        setSupAdmin(Admin3)
    }
    const getInitAmount = async () => {
        if (!smallNode) {
            return
        }
        if (!bigNode) {
            return
        }
        if (!supNode) {
            return
        }
        let contractTemp = await getContractByContract("smallnode", smallNode, state.api,)
        const initAmount = await viewMethod(contractTemp, state.account, "initAmount", [])
        setSmallInitAmount(initAmount)

        let contractTemp2 = await getContractByContract("bignode", bigNode, state.api,)
        const initAmount2 = await viewMethod(contractTemp2, state.account, "initAmount", [])
        setBigInitAmount(initAmount2)
        let contractTemp3 = await getContractByContract("supnode", supNode, state.api,)
        const initAmount3 = await viewMethod(contractTemp3, state.account, "initAmount", [])
        setSupInitAmount(initAmount3)
    }
    const getWiteList = async () => {
        if (!smallNode) {
            return
        }
        if (!bigNode) {
            return
        }
        if (!supNode) {
            return
        }
        let contractTemp = await getContractByContract("smallnode", smallNode, state.api,)
        const whitelist1 = await viewMethod(contractTemp, state.account, "getWiteList", [])
        setSmallWhiteList(whitelist1)
        let contractTemp2 = await getContractByContract("bignode", bigNode, state.api,)
        const whitelist2 = await viewMethod(contractTemp2, state.account, "getWiteList", [])
        setBigWhitelist(whitelist2)
        let contractTemp3 = await getContractByContract("supnode", supNode, state.api,)
        const whitelist3 = await viewMethod(contractTemp3, state.account, "getWiteList", [])
        setSupWhitelist(whitelist3)
    }
    const handleSetSupInitAmount = async () => {
        let contractTemp = await getContractByContract("supnode", supNode, state.api,)
        await dealMethod(contractTemp, state.account, "setInitAmount", [form.getFieldValue().SupInitAmount])
        getInitAmount()
    }

    const handleSetSmallInitAmount = async () => {
        let contractTemp = await getContractByContract("smallnode", smallNode, state.api,)
        await dealMethod(contractTemp, state.account, "setInitAmount", [form.getFieldValue().SmallInitAmount])
        getInitAmount()
    }
    const handleSetBigInitAmount = async () => {
        let contractTemp = await getContractByContract("bignode", bigNode, state.api,)
        await dealMethod(contractTemp, state.account, "setInitAmount", [form.getFieldValue().BigInitAmount])
        getInitAmount()
    }

    const addWhiteListUser = async () => {
        let arr = []
        for (let i = 0; i < addWhiteArr.length; i++) {
            arr.push(form.getFieldValue()["address" + i])
        }

        if (curLevel == 1) {
            let contractTemp = await getContractByContract("smallnode", smallNode, state.api,)
            await dealMethod(contractTemp, state.account, "addWhiteListUser", [arr])
        }
        if (curLevel == 2) {
            let contractTemp = await getContractByContract("bignode", bigNode, state.api,)
            await dealMethod(contractTemp, state.account, "addWhiteListUser", [arr])
        }
        if (curLevel == 3) {
            let contractTemp = await getContractByContract("supnode", supNode, state.api,)
            await dealMethod(contractTemp, state.account, "addWhiteListUser", [arr])
        }
        getInitAmount()
    }
    const removeFromWhiteList = async () => {

        if (curLevel == 1) {
            let contractTemp = await getContractByContract("smallnode", smallNode, state.api,)
            await dealMethod(contractTemp, state.account, "removeFromWhiteList", [[curDelAddr]])
        }
        if (curLevel == 2) {
            let contractTemp = await getContractByContract("bignode", bigNode, state.api,)
            await dealMethod(contractTemp, state.account, "removeFromWhiteList", [[curDelAddr]])
        }
        if (curLevel == 3) {
            let contractTemp = await getContractByContract("supnode", supNode, state.api,)
            await dealMethod(contractTemp, state.account, "removeFromWhiteList", [[curDelAddr]])
        }
        getWiteList()
    }
    useEffect(async () => {
        setCurLevel(location.search.substring(7, 8))
        let judgeRes = await judgeStatus(state)
        if (!judgeRes) {
            return
        }
        await getSupNode()
        await getSmallNode()
        await getBigNode()

    }, [state.account])
    useEffect(() => {
        if (smallNode && bigNode && supNode) {
            getInitAmount()
            getWiteList()
            getAdmin()

        }
    }, [smallNode, bigNode, supNode])

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
                                {curLevel == 1 && <span>
                                    {smallAdmin}
                                </span>}
                                {curLevel == 2 && <span>
                                    {bigAdmin}
                                </span>}
                                {curLevel == 3 && <span>
                                    {supAdmin}
                                </span>}
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
                <div className="panel-box" style={{display: "none"}}>

                    <div className="panel-container">
                        <div className='panel-title'>
                            Set Small Node NFT Address
                        </div>

                        <Form form={form} name="control-hooks" className="form">
                            <Form.Item
                                label="Super Node NFT Address"
                            >
                                <span>
                                    {smallNode}
                                </span>
                            </Form.Item>
                            <Form.Item
                                name="SmallNode"
                                label="New Small Node NFT Address"
                                validateTrigger="onBlur"
                                validateFirst={true}
                            >
                                <Input/>
                            </Form.Item>
                            <Button type="primary" className="go-btn" onClick={() => {
                                handleSetSmallNode()
                            }}>
                                Confirm
                            </Button>
                        </Form>
                    </div>

                    <div className="panel-container">
                        <div className='panel-title'>
                            Set Big Node NFT Address
                        </div>

                        <Form form={form} name="control-hooks" className="form">
                            <Form.Item
                                label="Super Node NFT Address"
                            >
                                <span>
                                    {bigNode}
                                </span>
                            </Form.Item>
                            <Form.Item
                                name="BigNode"
                                label="New Big Node NFT Address"
                                validateTrigger="onBlur"
                                validateFirst={true}
                            >
                                <Input/>
                            </Form.Item>
                            <Button type="primary" className="go-btn" onClick={() => {
                                handleSetBigNode()
                            }}>
                                Confirm
                            </Button>
                        </Form>
                    </div>
                    <div className="panel-container">
                        <div className='panel-title'>
                            Set Super Node NFT Address
                        </div>

                        <Form form={form} name="control-hooks" className="form">
                            <Form.Item
                                label="Super Node NFT Address"
                            >
                                <span>
                                    {supNode}
                                </span>
                            </Form.Item>
                            <Form.Item
                                name="SupNode"
                                label="New Super Node NFT Address"
                                validateTrigger="onBlur"
                                validateFirst={true}
                            >
                                <Input/>
                            </Form.Item>
                            <Button type="primary" className="go-btn" onClick={() => {
                                handleSetSupNode()
                            }}>
                                Confirm
                            </Button>
                        </Form>
                    </div>

                </div>
                <div className="panel-box">
                    {curLevel == 1 && <div className="panel-container">
                        <div className='panel-title'>
                            Set Small Node NFT Amounts
                        </div>

                        <Form form={form} name="control-hooks" className="form">
                            <Form.Item
                                label="Amounts"
                            >
                                <span>
                                    {smallInitAmount}
                                </span>
                            </Form.Item>
                            <Form.Item
                                name="SmallInitAmount"
                                label="New Amounts"
                                validateTrigger="onBlur"
                                validateFirst={true}
                            >
                                <Input/>
                            </Form.Item>
                            <Button type="primary" className="go-btn" onClick={() => {
                                handleSetSmallInitAmount()
                            }}>
                                Confirm
                            </Button>
                        </Form>
                    </div>}
                    {curLevel == 2 && <div className="panel-container">
                        <div className='panel-title'>
                            Set Big Node NFT Amounts
                        </div>

                        <Form form={form} name="control-hooks" className="form">
                            <Form.Item
                                label="Amounts"
                            >
                                <span>
                                    {bigInitAmount}
                                </span>
                            </Form.Item>
                            <Form.Item
                                name="BigInitAmount"
                                label="New Amounts"
                                validateTrigger="onBlur"
                                validateFirst={true}
                            >
                                <Input/>
                            </Form.Item>
                            <Button type="primary" className="go-btn" onClick={() => {
                                handleSetBigInitAmount()
                            }}>
                                Confirm
                            </Button>
                        </Form>
                    </div>}
                    {curLevel == 3 && <div className="panel-container">
                        <div className='panel-title'>
                            Set Super Node NFT Amounts
                        </div>

                        <Form form={form} name="control-hooks" className="form">
                            <Form.Item
                                label="Amounts"
                            >
                                <span>
                                    {supInitAmount}
                                </span>
                            </Form.Item>
                            <Form.Item
                                name="SupInitAmount"
                                label="New Amounts"
                                validateTrigger="onBlur"
                                validateFirst={true}
                            >
                                <Input/>
                            </Form.Item>
                            <Button type="primary" className="go-btn" onClick={() => {
                                handleSetSupInitAmount()
                            }}>
                                Confirm
                            </Button>
                        </Form>
                    </div>}

                </div>

                {/*<div className="panel-box">*/}
                {/*    <div className="panel-container">*/}
                {/*        <div className='panel-title'>*/}
                {/*            Set Small Node NFT Computing Power*/}
                {/*        </div>*/}

                {/*        <Form form={form} name="control-hooks" className="form">*/}
                {/*            <Form.Item*/}
                {/*                label="Computing Power"*/}
                {/*            >*/}
                {/*                <span>*/}

                {/*                </span>*/}
                {/*            </Form.Item>*/}
                {/*            <Form.Item*/}
                {/*                name="cpmputing"*/}
                {/*                label="New Computing Power"*/}
                {/*                validateTrigger="onBlur"*/}
                {/*                validateFirst={true}*/}
                {/*            >*/}
                {/*                <Input/>*/}
                {/*            </Form.Item>*/}
                {/*            <Button type="primary" className="go-btn" onClick={() => {*/}

                {/*            }}>*/}
                {/*                Confirm*/}
                {/*            </Button>*/}
                {/*        </Form>*/}
                {/*    </div>*/}
                {/*</div>*/}
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
                                    <img src={add} onClick={() => {
                                        addOneWhite()
                                    }}/>
                                    <img src={cut} onClick={() => {
                                        removeOneWhite()
                                    }}/>

                                </div>
                            </Form>
                        </Modal>
                        {curLevel==1&&<div>
                            <div className='panel-title'>
                                Set Small Whitelist
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
                                {smallWhitelist.map((item, index) => {
                                    return (<div className='list-item white-item' key={index}>
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
                        </div>}
                        {curLevel==2&&<div>
                            <div className='panel-title'>
                                Set Big Whitelist
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
                                {bigWhitelist.map((item, index) => {
                                    return (<div className='list-item white-item' key={index}>
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
                        </div>}
                        {curLevel==3&&<div>
                            <div className='panel-title'>
                                Set Sup Whitelist
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
                                {supWhitelist.map((item, index) => {
                                    return (<div className='list-item white-item' key={index}>
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
                        </div>}
                    </div>

                </div>
            </div>

        </NFTAdminStyle>
    )
}
export default NFTAdmin;