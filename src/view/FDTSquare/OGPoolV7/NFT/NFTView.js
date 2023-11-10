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
import {useNavigate} from "react-router-dom";
import judgeStatus from "../../../../utils/judgeStatus";
import {dealTime} from "../../../../utils/timeUtil";
import bigNodeIMG from "../../../../imgs/rainbownft2.jpg"
import smallNodeIMG from "../../../../imgs/rainbownft2.jpg"
import superNodeIMG from "../../../../imgs/rainbownft2.jpg"
import NFTStyle from './NFTStyle';
import sc from "../../../../imgs/sc.png";
import {getBigNftMintRecord, getSmallNftMintRecord, getSupNftMintRecord} from "../../../../graph/NFTGQL";
import {formatAddress} from "../../../../utils/publicJs";


const NFTView = (props) => {
    let {state, dispatch} = useConnect();
    const [activeNav, setActiveNav] = useState(1)
    const [pageCount, setPageCount] = useState(20)
    const [curPage, setCurPage] = useState(1)
    const [total, setTotal] = useState(0)

    const [smallInitAmount, setSmallInitAmount] = useState()
    const [bigInitAmount, setBigInitAmount] = useState()
    const [supInitAmount, setSupInitAmount] = useState()

    const [smallMinted, setSmallMinted] = useState()
    const [bigMinted, setBigMinted] = useState()
    const [supMinted, setSupMinted] = useState()
    const [smallCreated, setSmallCreated] = useState()
    const [bigCreated, setBigCreated] = useState()
    const [supCreated, setSupCreated] = useState()

    const [smallNode, setSmallNode] = useState()
    const [bigNode, setBigNode] = useState()
    const [supNode, setSupNode] = useState()
    const [smallAdmin, setSmallAdmin] = useState("")
    const [bigAdmin, setBigAdmin] = useState("")
    const [supAdmin, setSupAdmin] = useState("")

    const [smallWhitelist, setSmallWhiteList] = useState([])
    const [bigWhitelist, setBigWhitelist] = useState([])
    const [supWhitelist, setSupWhitelist] = useState([])


    const [insmallWhitelist, setInSmallWhiteList] = useState(false)
    const [inbigWhitelist, setInBigWhitelist] = useState(false)
    const [insupWhitelist, setInSupWhitelist] = useState(false)

    const [isShowWhite, setIsShowWhite] = useState(false)
    const [curLevel, setCurLevel] = useState()

    const [smallRecord, setSmallRecord] = useState([])
    const [bigRecord, setBigRecord] = useState([])
    const [supRecord, setSupRecord] = useState([])
    const [totalNFT, setTotalNFT] = useState([])

    const history = useNavigate();
    const [form] = Form.useForm();
    const onChangePage = async (page) => {
        await setCurPage(page)
    }
    const handleShowSizeChange = async (page, count) => {
        setPageCount(count)
    }
    const handleViewMethod = async (name, params) => {
        let contractTemp = await getContractByName("spbd", state.api,)
        if (!contractTemp) {
            message.warn("Please connect", 5)
        }
        return await viewMethod(contractTemp, state.account, name, params)
    }
    const handleBigNodeDealMethod = async (name, params) => {
        let contractTemp = await getContractByContract("bignode", bigNode, state.api,)
        if (!contractTemp) {
            message.warn("Please connect", 5)
        }
        await dealMethod(contractTemp, state.account, name, params)
    }
    const handleSmallNodeDealMethod = async (name, params) => {
        let contractTemp = await getContractByContract("smallnode", smallNode, state.api,)
        if (!contractTemp) {
            message.warn("Please connect", 5)
        }
        await dealMethod(contractTemp, state.account, name, params)
    }
    const handleSupNodeDealMethod = async (name, params) => {

        let contractTemp = await getContractByContract("supnode", supNode, state.api,)
        if (!contractTemp) {
            message.warn("Please connect", 5)
        }
        await dealMethod(contractTemp, state.account, name, params)
    }
    const mintNode = async () => {
        if (activeNav == 1) {
            // if (smallCreated) {
            //     message.error("You have minted it")
            // }
            handleSmallNodeDealMethod("mintForWhiteList", [])
        }
        if (activeNav == 2) {
            // if (bigCreated) {
            //     message.error("You have minted it")
            // }
            handleBigNodeDealMethod("mintForWhiteList", [])
        }
        if (activeNav == 3) {
            // if (supCreated) {
            //     message.error("You have minted it")
            // }
            handleSupNodeDealMethod("mintForWhiteList", [])
        }
        getInitAmount()
    }
    const getBalance = async () => {
        let totalNFT = []

        let contractTemp = await getContractByContract("smallnode", smallNode, state.api,)
        for (let i = 0; i < smallMinted; i++) {
            let addr1 = await viewMethod(contractTemp, smallNode, "ownerOf", [i])
            if (addr1.toLowerCase() == state.account.toLowerCase()) {
                totalNFT.push({
                    type: "small",
                    id: i
                })
            }
        }
        let contractTemp2 = await getContractByContract("bignode", bigNode, state.api,)
        for (let i = 0; i < bigMinted; i++) {
            let addr1 = await viewMethod(contractTemp2, smallNode, "ownerOf", [i])
            if (addr1.toLowerCase() == state.account.toLowerCase()) {
                totalNFT.push({
                    type: "big",
                    id: i
                })
            }
        }
        let contractTemp3 = await getContractByContract("supnode", supNode, state.api,)
        for (let i = 0; i < supMinted; i++) {
            let addr1 = await viewMethod(contractTemp3, smallNode, "ownerOf", [i])
            if (addr1.toLowerCase() == state.account.toLowerCase()) {
                totalNFT.push({
                    type: "sup",
                    id: i
                })
            }
        }
        setTotalNFT(totalNFT)
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
        let smallMinted = await viewMethod(contractTemp, smallNode, "totalMint", [])
        // let smallCasted = await viewMethod(contractTemp, smallNode, "Casted", [state.account])
        // setSmallCreated(smallCasted)


        setSmallInitAmount(initAmount)
        setSmallMinted(smallMinted)
        let contractTemp2 = await getContractByContract("bignode", bigNode, state.api,)
        const initAmount2 = await viewMethod(contractTemp2, state.account, "initAmount", [])
        let bigMinted = await viewMethod(contractTemp2, bigNode, "totalMint", [])
        // let bigCasted = await viewMethod(contractTemp2, bigNode, "Casted", [state.account])
        // setBigCreated(bigCasted)

        setBigMinted(bigMinted)
        setBigInitAmount(initAmount2)

        let contractTemp3 = await getContractByContract("supnode", supNode, state.api,)
        const initAmount3 = await viewMethod(contractTemp3, state.account, "initAmount", [])
        let supMinted = await viewMethod(contractTemp3, supNode, "totalMint", [])
        // let supCasted = await viewMethod(contractTemp3, supNode, "Casted", [state.account])
        // setSupCreated(supCasted)

        setSupMinted(supMinted)
        setSupInitAmount(initAmount3)
    }
    const getBigNode = async () => {
        let res = await handleViewMethod("bigNode", [])
        setBigNode(res)
    }
    const getSmallNode = async () => {
        let res = await handleViewMethod("smallNode", [])
        setSmallNode(res)
    }

    const getSupNode = async () => {
        let res = await handleViewMethod("supNode", [])
        setSupNode(res)
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

        const inW1 = whitelist1.some(item => {
            console.log(item)
            return item.toLowerCase() == state.account.toLowerCase()
        })
        setInSmallWhiteList(inW1)

        setSmallWhiteList(whitelist1)
        let contractTemp2 = await getContractByContract("bignode", bigNode, state.api,)
        const whitelist2 = await viewMethod(contractTemp2, state.account, "getWiteList", [])
        setBigWhitelist(whitelist2)

        const inW2 = whitelist2.some(item => {
            return item.toLowerCase() == state.account.toLowerCase()
        })
        setInBigWhitelist(inW2)
        let contractTemp3 = await getContractByContract("supnode", supNode, state.api,)
        const whitelist3 = await viewMethod(contractTemp3, state.account, "getWiteList", [])
        setSupWhitelist(whitelist3)

        const inW3 = whitelist3.some(item => {
            return item.toLowerCase() == state.account.toLowerCase()
        })
        setInSupWhitelist(inW3)
    }
    useEffect(async () => {
        const smallR = await getSmallNftMintRecord()
        const bigR = await getBigNftMintRecord()
        const supR = await getSupNftMintRecord()
        if (smallR && smallR.data) {
            setSmallRecord(smallR.data.records)
        }
        if (bigR && bigR.data) {
            setBigRecord(bigR.data.records)
        }
        if (supR && supR.data) {
            setSupRecord(supR.data.records)
        }

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
            getAdmin()
            getWiteList()
            getInitAmount()
        }
    }, [smallNode, bigNode, supNode])
    useEffect(() => {
        if (smallMinted >= 0 && bigMinted >= 0 && supMinted >= 0) {
            getBalance()
        }
    }, [smallMinted, bigMinted, supMinted])
    return (

        <NFTStyle>

            <Modal className="nft-dialog" title="Whitelist" open={isShowWhite} footer={null} onCancel={() => {
                setIsShowWhite(false)
            }}>
                <div className='superdao-list-box up-list-box'>
                    <div className='list-header up-header'>
                        <div className='col'>
                            No.
                        </div>
                        <div className='col'>
                            Address
                        </div>
                    </div>
                    {activeNav == 1 && smallWhitelist.map((item, index) => {
                        return (<div className='list-item up-item' key={index}>
                            <div className='col no'>
                                {index + 1}
                            </div>
                            <div className='col address'>
                                <a>
                                    {item}
                                </a>
                            </div>


                        </div>)
                    })}
                    {activeNav == 2 && bigWhitelist.map((item, index) => {
                        return (<div className='list-item up-item' key={index}>
                            <div className='col no'>
                                {index + 1}
                            </div>
                            <div className='col address'>
                                <a>
                                    {item}
                                </a>
                            </div>


                        </div>)
                    })}
                    {activeNav == 3 && supWhitelist.map((item, index) => {
                        return (<div className='list-item up-item' key={index}>
                            <div className='col no'>
                                {index + 1}
                            </div>
                            <div className='col address'>
                                <a>
                                    {item}
                                </a>
                            </div>


                        </div>)
                    })}
                </div>
                <div className="pagination">

                    <Pagination current={curPage} showSizeChanger
                                onShowSizeChange={handleShowSizeChange}
                                onChange={onChangePage} total={total}
                                defaultPageSize={pageCount}/>

                </div>
            </Modal>

            <div className="header-nav">
                <div className="nft-nav-list">
                    <div className={"nav-item " + (activeNav == 1 ? "active" : "")} onClick={() => {
                        setActiveNav(1)
                    }}>
                        Small Node NFT
                    </div>
                    <div className={"nav-item " + (activeNav == 2 ? "active" : "")} onClick={() => {
                        setActiveNav(2)
                    }}>
                        Big Node NFT
                    </div>
                    <div className={"nav-item " + (activeNav == 3 ? "active" : "")} onClick={() => {
                        setActiveNav(3)
                    }}>
                        Super Node NFT
                    </div>
                    <div className={"nav-item " + (activeNav == 4 ? "active" : "")} onClick={() => {
                        setActiveNav(4)
                    }}>
                        My NFT
                    </div>
                </div>
            </div>

            {activeNav == 1 && (
                <div className="part1">
                    <div className="panel-box">
                        <div className="panel-container">
                            <div className='fun-container'>
                                <div className='fun-box'>
                                    <div className="message-box">
                                        <div className="in-line">
                                            <div className="left">
                                                NFT Contract Address
                                            </div>
                                            <div className="right">
                                                <a style={{color: "yellow"}}
                                                   href={develop.ethScan + "/address/" + smallNode}>
                                                    {formatAddress(smallNode)}
                                                </a>
                                            </div>
                                        </div>
                                        <div className="in-line">
                                            <div className="left">
                                                Total Amounts
                                            </div>
                                            <div className="right">
                                                {smallInitAmount}
                                            </div>
                                        </div>
                                        <div className="in-line">
                                            <div className="left">
                                                Minted Amounts
                                            </div>
                                            <div className="right">
                                                {smallMinted}
                                            </div>
                                        </div>
                                        <div className="in-line">
                                            <div className="left">
                                                Available
                                            </div>
                                            <div className="right">
                                                {smallInitAmount - smallMinted}
                                            </div>
                                        </div>
                                    </div>

                                    <img src={smallNodeIMG}/>
                                    {insmallWhitelist && <div className='mint-btn'>
                                        <p onClick={() => {
                                            mintNode()
                                        }}>Mint</p>
                                    </div>}
                                    {!insmallWhitelist && <div className='mint-btn'>
                                        <p onClick={() => {

                                        }}>Not In Whitelist</p>
                                    </div>}
                                    <div className='btn-box'>
                                        <div className='ant-btn' onClick={() => {
                                            setIsShowWhite(true)
                                            setCurLevel(1)
                                        }}>
                                            <p>Whitelist</p>
                                        </div>
                                        {smallAdmin.toString().toLowerCase() == state.account.toLowerCase() &&
                                            <div className='ant-btn' onClick={() => {
                                                history("/NFTAdmin?level=1")
                                            }}>
                                                <p>Admin</p>
                                            </div>}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='panel-box'>
                        <div className='panel-container'>
                            <div className='panel-title'>
                                Mint Small Node NFT Records
                            </div>
                            <div className='superdao-list-box nft-list-box'>
                                <div className='list-header nft-header'>
                                    <div className='col'>
                                        No.
                                    </div>
                                    <div className='col'>
                                        Address
                                    </div>
                                    <div className='col'>
                                        Time(UTC)
                                    </div>
                                </div>
                                {activeNav == 1 && smallRecord.map((item, index) => {
                                    return (
                                        index >= pageCount * (curPage - 1) && index < pageCount * curPage &&
                                        <div className='list-item nft-item' key={index}>
                                            <div className='col no'>
                                                {smallRecord.length - index}
                                            </div>
                                            <div className='col address'>
                                                <a target="_blank" href={develop.ethScan + "/address/" + item.addr}>
                                                    {formatAddress(item.addr)}
                                                </a>
                                            </div>

                                            <div className='col'>
                                                {dealTime(item.blockTimestamp)}
                                            </div>
                                        </div>)
                                })}

                            </div>
                            <div className="pagination">

                                <Pagination current={curPage} showSizeChanger
                                            onShowSizeChange={handleShowSizeChange}
                                            onChange={onChangePage} total={total}
                                            defaultPageSize={pageCount}/>

                            </div>
                        </div>

                    </div>
                </div>
            )}
            {activeNav == 2 && (
                <div className="part2">
                    <div className="panel-box">
                        <div className="panel-container">
                            <div className='fun-container'>
                                <div className='fun-box'>
                                    <div className="message-box">
                                        <div className="in-line">
                                            <div className="left">
                                                NFT Contract Address
                                            </div>
                                            <div className="right">
                                                <a style={{color: "yellow"}}
                                                   href={develop.ethScan + "/address/" + bigNode}>
                                                    {formatAddress(bigNode)}
                                                </a>
                                            </div>
                                        </div>
                                        <div className="in-line">
                                            <div className="left">
                                                Total Amounts
                                            </div>
                                            <div className="right">
                                                {bigInitAmount}
                                            </div>
                                        </div>
                                        <div className="in-line">
                                            <div className="left">
                                                Minted Amounts
                                            </div>
                                            <div className="right">
                                                {bigMinted}
                                            </div>
                                        </div>
                                        <div className="in-line">
                                            <div className="left">
                                                Available
                                            </div>
                                            <div className="right">
                                                {bigInitAmount - bigMinted}
                                            </div>
                                        </div>
                                    </div>

                                    <img src={bigNodeIMG}/>

                                    {inbigWhitelist && <div className='mint-btn'>
                                        <p onClick={() => {
                                            mintNode()
                                        }}>Mint</p>
                                    </div>}
                                    {!inbigWhitelist && <div className='mint-btn'>
                                        <p onClick={() => {

                                        }}>Not In Whitelist</p>
                                    </div>}

                                    <div className='btn-box'>
                                        <div className='ant-btn' onClick={() => {
                                            setIsShowWhite(true)
                                            setCurLevel(2)
                                        }}>
                                            <p>Whitelist</p>
                                        </div>
                                        {bigAdmin.toString().toLowerCase() == state.account.toString().toLowerCase() &&
                                            <div className='ant-btn' onClick={() => {
                                                history("/NFTAdmin?level=2")
                                            }}>
                                                <p>Admin</p>
                                            </div>}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='panel-box'>
                        <div className='panel-container'>
                            <div className='panel-title'>
                                Mint Big Node NFT Records
                            </div>
                            <div className='superdao-list-box nft-list-box'>
                                <div className='list-header nft-header'>
                                    <div className='col'>
                                        No.
                                    </div>
                                    <div className='col'>
                                        Address
                                    </div>
                                    <div className='col'>
                                        Time(UTC)
                                    </div>
                                </div>
                                {activeNav == 2 && bigRecord.map((item, index) => {
                                    return (
                                        index >= pageCount * (curPage - 1) && index < pageCount * curPage &&
                                        <div className='list-item nft-item' key={index}>
                                            <div className='col no'>
                                                {bigRecord.length - index}
                                            </div>
                                            <div className='col address'>
                                                <a target="_blank" href={develop.ethScan + "/address/" + item.addr}>
                                                    {formatAddress(item.addr)}
                                                </a>
                                            </div>

                                            <div className='col'>
                                                {dealTime(item.blockTimestamp)}
                                            </div>
                                        </div>)
                                })}

                            </div>
                            <div className="pagination">

                                <Pagination current={curPage} showSizeChanger
                                            onShowSizeChange={handleShowSizeChange}
                                            onChange={onChangePage} total={total}
                                            defaultPageSize={pageCount}/>

                            </div>
                        </div>

                    </div>
                </div>
            )}
            {activeNav == 3 && (
                <div className="part3">
                    <div className="panel-box">
                        <div className="panel-container">
                            <div className='fun-container'>
                                <div className='fun-box'>
                                    <div className="message-box">
                                        <div className="in-line">
                                            <div className="left">
                                                NFT Contract Address
                                            </div>
                                            <div className="right">
                                                <a style={{color: "yellow"}}
                                                   href={develop.ethScan + "/address/" + supNode}>
                                                    {formatAddress(supNode)}
                                                </a>
                                            </div>
                                        </div>
                                        <div className="in-line">
                                            <div className="left">
                                                Total Amounts
                                            </div>
                                            <div className="right">
                                                {supInitAmount}
                                            </div>
                                        </div>
                                        <div className="in-line">
                                            <div className="left">
                                                Minted Amounts
                                            </div>
                                            <div className="right">
                                                {supMinted}
                                            </div>
                                        </div>
                                        <div className="in-line">
                                            <div className="left">
                                                Available
                                            </div>
                                            <div className="right">
                                                {supInitAmount - supMinted}
                                            </div>
                                        </div>
                                    </div>

                                    <img src={superNodeIMG}/>

                                    {insupWhitelist && <div className='mint-btn'>
                                        <p onClick={() => {
                                            mintNode()
                                        }}>Mint</p>
                                    </div>}
                                    {!insupWhitelist && <div className='mint-btn'>
                                        <p onClick={() => {

                                        }}>Not In Whitelist</p>
                                    </div>}

                                    <div className='btn-box'>
                                        <div className='ant-btn' onClick={() => {
                                            setIsShowWhite(true)
                                            setCurLevel(3)
                                        }}>
                                            <p>Whitelist</p>
                                        </div>
                                        {supAdmin.toString().toLowerCase() == state.account.toString().toLowerCase() &&
                                            <div className='ant-btn' onClick={() => {
                                                history("/NFTAdmin?level=3")
                                            }}>
                                                <p>Admin</p>
                                            </div>}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='panel-box'>
                        <div className='panel-container'>
                            <div className='panel-title'>
                                Mint Super Node NFT Records
                            </div>
                            <div className='superdao-list-box nft-list-box'>
                                <div className='list-header nft-header'>
                                    <div className='col'>
                                        No.
                                    </div>
                                    <div className='col'>
                                        Address
                                    </div>
                                    <div className='col'>
                                        Time(UTC)
                                    </div>
                                </div>
                                {activeNav == 3 && supRecord.map((item, index) => {
                                    return (
                                        index >= pageCount * (curPage - 1) && index < pageCount * curPage &&
                                        <div className='list-item nft-item' key={index}>
                                            <div className='col no'>
                                                {supRecord.length - index}
                                            </div>
                                            <div className='col address'>
                                                <a target="_blank" href={develop.ethScan + "/address/" + item.addr}>
                                                    {formatAddress(item.addr)}
                                                </a>
                                            </div>

                                            <div className='col'>
                                                {dealTime(item.blockTimestamp)}
                                            </div>
                                        </div>)
                                })}
                            </div>
                            <div className="pagination">

                                <Pagination current={curPage} showSizeChanger
                                            onShowSizeChange={handleShowSizeChange}
                                            onChange={onChangePage} total={total}
                                            defaultPageSize={pageCount}/>

                            </div>
                        </div>

                    </div>
                </div>
            )}
            {activeNav == 4 && (
                <div className="my-nft">
                    <div className="nft-list">
                        {totalNFT.map((item, index) => {
                            return (<div className="nft-item" key={index}>
                                {item.type == "small" && <img src={smallNodeIMG}/>}
                                {item.type == "big" && <img src={bigNodeIMG}/>}
                                {item.type == "sup" && <img src={superNodeIMG}/>}
                                <div className="id-box">
                                    <div className="left">ID</div>
                                    <div className="right">
                                        {item.id}
                                    </div>
                                </div>
                            </div>)
                        })}

                    </div>
                </div>
            )
            }

        </NFTStyle>
    )
}
export default NFTView