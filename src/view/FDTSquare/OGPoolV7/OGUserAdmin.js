import React, {useEffect, useRef, useState} from 'react';
import {useConnect} from "../../../api/contracts";
import BigNumber from "bignumber.js"
import AddNomalWhiteList from "./ThreelWhiteList";
import AddThreeWhiteList from "./components/OgAdminLevel2";
import {formatAddress} from "../../../utils/publicJs";

import {
    message,
    Form, Pagination,
} from 'antd';
import {getContractByName, getContractByContract} from "../../../api/connectContract";
import {dealMethod, dealPayMethod, viewMethod} from "../../../utils/contractUtil"

import develop from "../../../env";
import {useNavigate} from "react-router-dom";
import judgeStatus from "../../../utils/judgeStatus";
import {getDonateRecord, getAllRegisters, getAllFlmRate, getBlackUsers} from "../../../graph/donateV7";
import OGUserAdminStyle from "./OGUserAdminStyle";
import OgSetActive from "./components/OgSetActive";
import OgSetBlacklist from "./components/OgSetBlacklist";
import FDTIcon from "../../../imgs/fdt.png";
import ethereum from "../../../imgs/ethereum.png";
import {ETHDecimals, FDTDecimals, FLMDecimals, USDTDecimals} from "../../../config/constants";
import {showNum} from "../../../utils/bigNumberUtil";
import {dealTime} from "../../../utils/timeUtil";
import USDTIcon from "../../../imgs/usdt.png";

const OGPoolPublic = (props) => {
    let {state, dispatch} = useConnect();
    const [activeNav, setActiveNav] = useState(1)

    const [isSecondAdmin, setIsSecondAdmin] = useState(false)
    const [isThreeAdmin, setIsThreeAdmin] = useState(false)
    const [isFourAdmin, setIsFourAdmin] = useState(false)
    const [isFiveAdmin, setIsFiveAdmin] = useState(false)

    const [isSixAdmin, setIsSixAdmin] = useState(true)
    const [isSevenAdmin, setIsSevenAdmin] = useState(true)

    const [teamRecordArr, setTeamRecordArr] = useState([])
    const [totalUSDT, setTotalUSDT] = useState(0)
    const [totalFLM, setTotalFlm] = useState(0)

    const [total, setTotal] = useState(0)
    const [allRecords, setAllRecords] = useState([])
    const [curPage, setCurPage] = useState(1)
    const [pageCount, setPageCount] = useState(20)

    const [flmRateRecordArr, setFlmRateRecord] = useState([])
    const [rateRecordArr, setRateRecord] = useState([])
    const [flmRateForAdminsRecord, setFlmRateForAdminsRecord] = useState([])
    const [teamAddrRecord, setTeamAddrRecord] = useState([])


    const history = useNavigate();
    const [form] = Form.useForm();

    const onChangePage = async (page) => {
        await setCurPage(page)
    }


    const handleShowSizeChange = async (page, count) => {
        setPageCount(count)
    }
    const handleUserViewMethod = async (name, params) => {
        let contractTemp = await getContractByName("user", state.api,)
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


    const handlePayDealMethod = async (name, params, value) => {
        let contractTemp = await getContractByName("ogV7", state.api,)
        if (!contractTemp) {
            message.warn("Please connect", 5)
        }
        await dealPayMethod(contractTemp, state.account, name, params, value)
    }
    const handleViewMethod = async (name, params) => {
        let contractTemp = await getContractByName("ogV7", state.api,)
        if (!contractTemp) {
            message.warn("Please connect", 5)
        }
        return await viewMethod(contractTemp, state.account, name, params)
    }


    const getIsAdmin = async () => {
        const isSecond = await handleViewMethod("checkAddrForAdminLevelTwo", [state.account])
        const isThree = await handleViewMethod("checkAddrForAdminLevelThree", [state.account])
        const isFour = await handleViewMethod("checkAddrForAdminLevelFour", [state.account])
        const isFive = await handleViewMethod("checkAddrForAdminLevelFive", [state.account])

        const isSix = await handleViewMethod("checkAddrForAdminLevelSix", [state.account])
        const isSeven = await handleViewMethod("checkAddrForAdminLevelSeven", [state.account])

        setIsSecondAdmin(isSecond)
        setIsThreeAdmin(isThree)
        setIsFourAdmin(isFour)
        setIsFiveAdmin(isFive)
        setIsSixAdmin(isSix)
        setIsSevenAdmin(isSeven)


    }


    const getData = async () => {
        try {
            let judgeRes = await judgeStatus(state)
            if (!judgeRes) {
                return
            }
            getIsAdmin()
            getInviteRecord()
        } catch (e) {
            console.log(e)
        }
    }



    const getInviteRecord = async () => {
        const res2 = await getAllFlmRate()
        if (res2 && res2.data) {
            setFlmRateRecord(res2.data.allFlmRates)
            setRateRecord(res2.data.allTeamRates)
            setFlmRateForAdminsRecord(res2.data.allFlmRateForAdmins)
            setTeamAddrRecord(res2.data.allTeamAddrs)
        }
    }

    const getLevelInviteRate = async (address, recordTime) => {
        for (let i = 0; i < rateRecordArr.length; i++) {
            const item = rateRecordArr[i]
            const flmItem = flmRateForAdminsRecord[i]
            const addrItem = teamAddrRecord[i]
            if ((item.addr == address) && (item.blockTimestamp == recordTime)) {
                if (addrItem.admin0.toString().toLowerCase() == state.account.toString().toLowerCase()) {
                    return {
                        adminRate: item.adminRate0,
                        adminFlmRate: flmItem.adminFlmRate6,
                    }
                }
                if (addrItem.admin1.toLowerCase() == state.account.toLowerCase()) {
                    return {
                        adminRate: item.adminRate1,
                        adminFlmRate: flmItem.adminFlmRate5,
                    }
                }
                if (addrItem.admin2.toLowerCase() == state.account.toLowerCase()) {
                    return {
                        adminRate: item.adminRate2,
                        adminFlmRate: flmItem.adminFlmRate4,
                    }
                }
                if (addrItem.admin3.toLowerCase() == state.account.toLowerCase()) {
                    return {
                        adminRate: item.adminRate3,
                        adminFlmRate: flmItem.adminFlmRate3,
                    }
                }
                if (addrItem.admin4.toLowerCase() == state.account.toLowerCase()) {

                    return {
                        adminRate: item.adminRate4,
                        adminFlmRate: flmItem.adminFlmRate2,
                    }
                }
                if (addrItem.admin5.toLowerCase() == state.account.toLowerCase()) {

                    return {
                        adminRate: item.adminRate5,
                        adminFlmRate: flmItem.adminFlmRate1,
                    }
                }
                if (addrItem.admin6.toLowerCase() == state.account.toLowerCase()) {

                    return {
                        adminRate: item.adminRate6,
                        adminFlmRate: flmItem.adminFlmRate0,
                    }
                }
            }
        }
        return 0

    }
    const getRefArr = async (address, myTeamArr, level) => {
        let refRes = await getAllRegisters(address)
        if (refRes.data && refRes.data.allRegisters && refRes.data.allRegisters.length > 0) {
            let refArr = refRes.data.allRegisters
            const realRefArr = []
            refArr.forEach(item => {
                let hasAddress = false;
                realRefArr.forEach(refItem => {
                    if (refItem._user == item._user) {
                        hasAddress = true
                    }
                })
                if (!hasAddress) {
                    realRefArr.push(item)
                }
            })
            refArr = realRefArr
            if (refArr[0]._user != address) {
                refArr.forEach(item => {
                    item.level = level
                })
                myTeamArr.push(...refArr)
            }
            level++
            for (let i = 0; i < refArr.length; i++) {
                if (refArr[i]._user != address) {
                    await getRefArr(refArr[i]._user, myTeamArr, level)
                }
            }
        }
        return myTeamArr

    }

    const getRecord = async () => {
        try {
            let res = await getDonateRecord()
            // get blacklist
            const blackUserRes = await getBlackUsers()
            let timeStamp = undefined, timeStampArr = []
            if (blackUserRes && blackUserRes.data) {
                const arr = blackUserRes.data.blackUsers
                // get is in black

                // get timeStampArr
                arr.forEach(item => {
                    if (item.user == state.account) {
                        timeStampArr.push(item.blockTimestamp)
                    }
                })
                // get timeStamp
                if (timeStampArr.length % 2 == 1) {
                    for (let i = 0; i < timeStampArr.length; i++) {
                        const item = timeStampArr[i]
                        if (item.user == state.account) {
                            timeStamp = item.blockTimestamp
                            break;
                        }
                    }
                    timeStampArr.pop()
                }


            }


            if (res.data && res.data.allRecords) {
                const recordArr = res.data.allRecords
                const refArr = await getRefArr(state.account, [], 1)
                if(!refArr){
                    return
                }
                let teamRecordArr = [], totalUSDT = 0, totalFLM = 0
                for (let i = 0; i < refArr.length; i++) {
                    const refItem = refArr[i]
                    for (let j = 0; j < recordArr.length; j++) {
                        const recordItem = recordArr[j]
                        if (recordItem.addr.toLowerCase() == refItem._user.toLowerCase()) {

                            if (timeStamp && BigNumber(timeStamp).lt(recordItem.blockTimestamp)) {
                                continue
                            }
                            if (timeStampArr.length > 0) {
                                let isInBlackTime = false
                                timeStampArr.forEach((timeItem, index) => {
                                    if (index % 2 == 1) {
                                        if (BigNumber(timeStamp).lt(timeItem) && BigNumber(timeStamp).gt(timeStampArr[index - 1])) {
                                            isInBlackTime = true
                                        }
                                    }
                                })
                                if(isInBlackTime){
                                    continue
                                }
                            }
                            recordItem.level = refItem.level
                            recordItem.rate = (await getLevelInviteRate(refItem._user, recordItem.blockTimestamp)).adminRate / 100
                            recordItem.flmRate = (await getLevelInviteRate(refItem._user, recordItem.blockTimestamp)).adminFlmRate/ 100

                            if (!recordItem.rate) {
                                recordItem.rate = 0
                            }
                            if (!recordItem.flmRate) {
                                recordItem.flmRate = 0
                            }
                            teamRecordArr.push(recordItem)

                            totalUSDT = BigNumber(totalUSDT).plus(recordItem.usdtAmount / 10 ** USDTDecimals * recordItem.rate / 100)
                            totalFLM = BigNumber(totalFLM).plus(recordItem.fdtAmount / 10 ** FLMDecimals * recordItem.flmRate / 100)
                        }
                    }
                }
                console.log(teamRecordArr)
                setTotalUSDT(totalUSDT.toString())
                setTotalFlm(totalFLM.toString())
                setTeamRecordArr(teamRecordArr)
            }


        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        setActiveNav()
        getData()
        getRecord()

    }, [state.account]);
    useEffect(async () => {
        if (flmRateRecordArr.length > 0 && flmRateRecordArr.length == rateRecordArr.length) {
            getRecord()

        }

    }, [rateRecordArr, flmRateRecordArr]);

    return (
        <OGUserAdminStyle>

            <div className="page-title">
                OG Pool Manage
            </div>
            <div className="header-nav">
                <div className="fire-nav-list ">
                    {
                        (isSecondAdmin || isSevenAdmin) &&
                        <div className={"nav-item " + (activeNav == 1 ? "active" : "")} onClick={() => {
                            setActiveNav(1)
                        }}>
                            Set Active Accounts
                        </div>
                    }

                    {
                        <div className={"nav-item " + (activeNav == 2 ? "active" : "")} onClick={() => {
                            setActiveNav(2)
                        }}>
                            Team Income
                        </div>
                    }
                    {
                        isSecondAdmin && (
                            <div className={"nav-item " + (activeNav == 5 ? "active" : "")} onClick={() => {
                                setActiveNav(5)
                            }}>
                                Set Blacklist
                            </div>
                        )
                    }
                    {
                        (isSecondAdmin || isThreeAdmin || isFourAdmin || isFiveAdmin || isSixAdmin) &&

                        <div className={"nav-item " + (activeNav == 4 ? "active" : "")} onClick={() => {
                            setActiveNav(4)
                        }}>
                            Admin
                        </div>

                    }

                </div>

            </div>

            {activeNav == 1 && (<OgSetActive isFiveAdmin={isSevenAdmin}/>)}
            {activeNav == 5 && (<OgSetBlacklist/>)}

            {activeNav == 2 && (<div className="panel-box part2">
                <div className="panel-container">
                    <div className="list-top-part">
                        <div className="panel-title">
                            Team Income
                        </div>
                    </div>
                    <div className="flex-box total-box">
                        <div className="item">
                            <div className="name">UDST Total Income</div>
                            <strong><img src={USDTIcon} width={20} height={20} alt=""/> {showNum(totalUSDT)}</strong>
                        </div>
                        <div className="item">
                            <div className="name">FLM Total Income</div>
                            <strong><img src={FDTIcon} width={20} height={20} alt=""/> {showNum(totalFLM)}</strong>
                        </div>
                    </div>
                    <div className="fire-list-box donate-list" style={{minWidth: '100%'}}>
                        <div className="list-header ">
                            <div className="col">
                                No.
                            </div>
                            <div className="col">
                                Level
                            </div>
                            <div className="col">
                                Divide<br/> Percentage
                            </div>
                            <div className="col">
                                Address
                            </div>
                            <div className="col">
                                USDT
                            </div>
                            <div className="col">
                                FDT-OG
                            </div>

                            <div className="col">
                                Price
                            </div>
                         
                            <div className="col">
                                Rewards
                            </div>
                            <div className="col">
                                Time
                            </div>
                        </div>

                        {
                            teamRecordArr.map((item, index) => (
                                index >= pageCount * (curPage - 1) && index < pageCount * curPage &&
                                <div className="list-item" key={index}>
                                    <div className="col no">
                                        {index + 1}
                                    </div>
                                    <div className="col">
                                        {item.level}
                                    </div>
                                    <div className="col">
                                        {item.rate}%
                                    </div>
                                    <div className="col ">
                                        <div className="address">
                                            <a target="_blank"
                                               href={develop.ethScan + "/address/" + item.addr}> {formatAddress(item.addr)} </a>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <img width={20} height={20} style={{marginRight: "3px"}} src={ethereum}
                                             alt=""/>
                                        {BigNumber(item.usdtAmount).dividedBy(10 ** USDTDecimals).toFixed(1)}
                                    </div>
                                    <div className="col">
                                        <img width={20} height={20} style={{marginRight: "3px"}} src={FDTIcon}
                                             alt=""/>
                                        {BigNumber(item.fdtAmount).dividedBy(10 ** FDTDecimals).toFixed(0)}
                                    </div>
                                    <div className="col price">
                                        <img width={20} height={20} style={{marginRight: "3px"}} src={USDTIcon}
                                             alt=""/>
                                        {BigNumber(item.usdtAmount).div(item.fdtAmount).multipliedBy(10**(FDTDecimals-USDTDecimals)).toFixed(3)}

                                    </div>
                               
                                    <div className="col ">
                                        <div className="item">
                                            <img width={20} height={20} style={{marginRight: "3px"}}
                                                 src={ethereum} alt=""/>
                                            {(BigNumber(item.usdtAmount / 10 ** USDTDecimals).multipliedBy(item.rate / 100).toFixed(0))}
                                        </div>
                                        <div className="item" style={{marginLeft: "0"}}>
                                            <img width={20} height={20} style={{marginRight: "3px"}}
                                                 src={FDTIcon} alt=""/>
                                            {BigNumber(item.fdtAmount / 10 ** FLMDecimals).multipliedBy(item.rate / 100).toFixed(0)}
                                        </div>
                                    </div>
                                    <div className="col">
                                        {dealTime(item.blockTimestamp)}
                                    </div>
                                </div>
                            ))
                        }


                    </div>
                    <div className="pagination">
                        {
                            <Pagination current={curPage} showSizeChanger
                                        onShowSizeChange={handleShowSizeChange}
                                        onChange={onChangePage} total={total}
                                        defaultPageSize={pageCount}/>
                        }
                    </div>
                </div>

            </div>)}
            {
                activeNav == 4 && (
                    <AddThreeWhiteList
                        isLevel2={isSecondAdmin}
                        isThreeAdmin={isThreeAdmin}
                        isFourAdmin={isFourAdmin}
                        isFiveAdmin={isFiveAdmin}
                        isSixAdmin={isSixAdmin}

                        allRecords={allRecords}/>)
            }

        </OGUserAdminStyle>
    )
}
export default OGPoolPublic
