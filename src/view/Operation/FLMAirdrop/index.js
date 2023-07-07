import React, {useEffect, useRef, useState} from 'react';
import {useConnect} from "../../../api/contracts";
import {Card, Button, Descriptions, message, Form, List, Input, notification} from 'antd';
import {getContractByName, getContractByContract} from "../../../api/connectContract";
import {dealMethod, viewMethod} from "../../../utils/contractUtil"

import {useNavigate} from "react-router-dom";
import judgeStatus from "../../../utils/judgeStatus";
import DistributionStyle from "./style"
import addressMap from "../../../api/addressMap";
import {showNum} from "../../../utils/bigNumberUtil";

const Distribution = (props) => {


    let {state, dispatch} = useConnect();
    const history = useNavigate();
    const goPage = (url) => {
        history(url);
    }
    const [form] = Form.useForm();
    const [curNav, setCurNav] = useState(1)
    const [withdrawNum, setWithdrawNum] = useState(undefined)
    const [canClaim, setCanClaim] = useState(0)

    const openNotification = (message) => {
        notification.error({
            message: message,
            description:
                "",
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
    };

    const handleViewMethod = async (name, params) => {
        let contractTemp = await getContractByName("FLMAirdrop", state.api,)
        if (!contractTemp) {
            openNotification("Please connect")
        }
        return await viewMethod(contractTemp, state.account, name, params)
    }
    const handleDealMethod = async (name, params) => {
        let contractTemp = await getContractByName("FLMAirdrop", state.api,)
        if (!contractTemp) {
            openNotification("Please connect")
        }
        return dealMethod(contractTemp, state.account, name, params)
    }
    const Claim = async ()=>{
        await handleDealMethod("Claim",[withdrawNum])
        getCanClaim()
    }
    const getCanClaim = async ()=>{
        const res = await handleViewMethod("checkUserCanClaim",[state.account])
        setCanClaim(res)
    }
    useEffect(async () => {
        let judgeRes = await judgeStatus(state)
        if (!judgeRes) {
            return
        }
        getCanClaim()

    }, [state.account, state.networkId]);


    return (
        <DistributionStyle>

            <div className="panel-box userinfo-box">

                <div className="panel-container">
                    <div className="panel-title">
                        FLM Airdrop
                    </div>
                    <div className="content-box">
                        <div className="left-part">
                            <div className="title">
                                FLM Airdrop Pool
                            </div>
                            <div className="num-box">
                                {showNum(canClaim)}
                            </div>
                        </div>
                        <div className="right-part">
                            FID : {state.fid}
                            <Form form={form}>
                                {/* <p className='pool-wz'></p> */}
                                <Form.Item label="Withdraw" name="flmw">
                                    <div className="input-box">
                                        <Input className='input' placeholder="0" step="any" type="number"
                                               value={withdrawNum}
                                               onChange={e => setWithdrawNum(e.target.value)}/>
                                        <div className="max-btn">
                                            MAX
                                        </div>
                                    </div>
                                </Form.Item>
                            </Form>
                            <Button type="primary" className="withdraw-btn" onClick={Claim}>Withdraw</Button>
                        </div>
                    </div>
                </div>
                <div className="panel-container">
                    <div className="panel-title">
                        Withdraw Records
                    </div>
                    <div className="nav-box">
                        <div className="fire-nav-list">
                            <div className={"nav-item " + (curNav == 1 ? "active" : "")} onClick={() => {
                                setCurNav(1)
                            }}>
                                All Records
                            </div>
                            <div className={"nav-item " + (curNav == 2 ? "active" : "")} onClick={() => {
                                setCurNav(2)
                            }}>
                                My Records
                            </div>
                        </div>
                    </div>
                    <div className="fire-list-box">
                        <div className="list-header">
                            <div className="col">
                                No.
                            </div>
                            <div className="col">
                                PID
                            </div>
                            <div className="col">
                                Username
                            </div>
                            <div className="col">
                                FID
                            </div>
                            <div className="col">
                                Address
                            </div>
                            <div className="col">
                                Amount(s)
                            </div>
                            <div className="col">
                                Time(UTC)
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </DistributionStyle>
    )
}
export default Distribution
