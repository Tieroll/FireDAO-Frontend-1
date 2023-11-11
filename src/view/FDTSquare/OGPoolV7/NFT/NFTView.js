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

import NFT1 from "../../../../imgs/rainbownft1.jpg"
import NFT2 from "../../../../imgs/rainbownft2.jpg"
import NFT3 from "../../../../imgs/rainbownft3.jpg"
import NFT4 from "../../../../imgs/rainbownft4.jpg"
import NFT5 from "../../../../imgs/rainbownft5.jpg"
import NFT6 from "../../../../imgs/rainbownft6.jpg"
import NFT7 from "../../../../imgs/rainbownft7.jpg"

import {getBigNftMintRecord, getSmallNftMintRecord, getSupNftMintRecord} from "../../../../graph/NFTGQL";
import {formatAddress} from "../../../../utils/publicJs";

const NFTIMGMap = [NFT1,NFT2,NFT3,NFT4,NFT5,NFT6,NFT7]

const NFTView = (props) => {
    let {state, dispatch} = useConnect();
    const [activeNav, setActiveNav] = useState(0)
    const [pageCount, setPageCount] = useState(20)
    const [curPage, setCurPage] = useState(1)
    const [total, setTotal] = useState(0)

    const [initAmountArr, setInitAmountArr] = useState([])
    const [mintedArr, setMintedArr] = useState([])

    const [nftAddrArr, setNFTAddrArr] = useState([])

    const [smallNode, setSmallNode] = useState()
    const [bigNode, setBigNode] = useState()
    const [supNode, setSupNode] = useState()
    const [smallAdmin, setSmallAdmin] = useState("")
    const [bigAdmin, setBigAdmin] = useState("")
    const [supAdmin, setSupAdmin] = useState("")
    const [adminArr, setAdminArr] = useState([])



    const [whitelistArr, setWhiteListArr] = useState([])

    const [inWhitelistArr, setInWhitelistArr] = useState([])


    const [isShowWhite, setIsShowWhite] = useState(false)
    const [curLevel, setCurLevel] = useState()

    const [recordArr, setRecordArr] = useState([])

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
        let contractTemp = await getContractByName("ogV7", state.api,)
        if (!contractTemp) {
            message.warn("Please connect", 5)
        }
        return await viewMethod(contractTemp, state.account, name, params)
    }

    const handleNFTDealMethod = async (name, params) => {
        let contractTemp = await getContractByContract("rainbowNFT", nftAddrArr[activeNav], state.api,)
        if (!contractTemp) {
            message.warn("Please connect", 5)
        }
        await dealMethod(contractTemp, state.account, name, params)
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
    const mintNode = async () => {
        handleNFTDealMethod("mintForWhiteList", [])

        getInitAmount()
    }
    const getBalance = async () => {
        let totalNFT = []

        for (let j = 0; j < 7; j++) {
            let contractTemp = await getContractByContract("rainbowNFT", nftAddrArr[j], state.api,)
            for (let i = 0; i < mintedArr[j]; i++) {
                let addr1 = await viewMethod(contractTemp, nftAddrArr[i], "ownerOf", [i])
                if (addr1.toLowerCase() == state.account.toLowerCase()) {
                    totalNFT.push({
                        type: j,
                        id: i
                    })
                }
            }
        }
        setTotalNFT(totalNFT)
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


    const getAdmin = async () => {

        let adminArr = []
       for(let i=0;i<7;i++){
           let contractTemp = await getContractByContract("rainbowNFT", nftAddrArr[i], state.api,)
           const Admin = await viewMethod(contractTemp, state.account, "owner", [])
           adminArr.push(Admin)
       }
        setAdminArr(adminArr)
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
    useEffect(async () => {
        const bigR = await getBigNftMintRecord()

        if (bigR && bigR.data) {
            setRecordArr(bigR.data.records)
        }


        let judgeRes = await judgeStatus(state)
        if (!judgeRes) {
            return
        }
        getValidNumbers()


    }, [state.account])
    useEffect(() => {
        if (nftAddrArr.length > 0) {
            getBalance()
            getInitAmount()
            getWiteList()
            getAdmin()
        }
    }, [nftAddrArr])
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
                    { activeNav!=undefined && whitelistArr[activeNav]  && whitelistArr[activeNav].map((item, index) => {
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
                <div className="fire-nav-list">
                    {nftAddrArr.map((item, index) =>
                        <div className={"nav-item " + (activeNav == index ? "active" : "")} onClick={() => {
                            setActiveNav(index)
                        }}>
                            NFT{index + 1}
                        </div>
                    )}
                    <div className={"nav-item " + (activeNav == 11 ? "active" : "")} onClick={() => {
                        setActiveNav(11)
                    }}>
                        My NFT
                    </div>
                </div>
            </div>
            {
                nftAddrArr.map((item, index) => {
                    return (
                        <div>
                            {
                                activeNav == index && (
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
                                                                        {formatAddress(nftAddrArr[index])}
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div className="in-line">
                                                                <div className="left">
                                                                    Total Amounts
                                                                </div>
                                                                <div className="right">
                                                                    {initAmountArr[index]}
                                                                </div>
                                                            </div>
                                                            <div className="in-line">
                                                                <div className="left">
                                                                    Minted Amounts
                                                                </div>
                                                                <div className="right">
                                                                    {mintedArr[index]}
                                                                </div>
                                                            </div>
                                                            <div className="in-line">
                                                                <div className="left">
                                                                    Available
                                                                </div>
                                                                <div className="right">
                                                                    {initAmountArr[index] - mintedArr[index]}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <img src={NFTIMGMap[index]}/>

                                                        {inWhitelistArr[index] && <div className='mint-btn'>
                                                            <p onClick={() => {
                                                                mintNode()
                                                            }}>Mint</p>
                                                        </div>}
                                                        {!inWhitelistArr[index] && <div className='mint-btn'>
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
                                                            {adminArr[index]&&adminArr[index].toString().toLowerCase() == state.account.toString().toLowerCase() &&
                                                                <div className='ant-btn' onClick={() => {
                                                                    history("/NFTAdmin?level=" + index)
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
                                                    Mint {index} NFT Records
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
                                                    {activeNav == 2 && recordArr.map((item, index) => {
                                                        return (
                                                            index >= pageCount * (curPage - 1) && index < pageCount * curPage &&
                                                            <div className='list-item nft-item' key={index}>
                                                                <div className='col no'>
                                                                    {recordArr.length - index}
                                                                </div>
                                                                <div className='col address'>
                                                                    <a target="_blank"
                                                                       href={develop.ethScan + "/address/" + item.addr}>
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
                                )
                            }
                        </div>
                    )
                })
            }

            {activeNav == 11 && (
                <div className="my-nft">
                    <div className="nft-list">
                        {totalNFT.map((item, index) => {
                            return (<div className="nft-item" key={index}>
                                <img src={NFTIMGMap[item.type]}/>
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