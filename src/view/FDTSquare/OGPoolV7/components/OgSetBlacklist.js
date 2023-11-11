import React, {useEffect, useRef, useState} from 'react';
import {formatAddress} from "../../../../utils/publicJs";
import {useConnect} from "../../../../api/contracts";
import {
    Button,
    message,
    Form,
    Input, Modal,

} from 'antd';
import {getContractByName, getContractByContract} from "../../../../api/connectContract";
import {dealMethod, dealPayMethod, viewMethod} from "../../../../utils/contractUtil"
import develop from "../../../../env";
import AddThreeWhiteListStyle from "./OgAdminLevelStyle";
import {getBlackUsers} from "../../../../graph/donateV7";

const AddThreeWhiteList = ({allRecords}) => {
    let {state, dispatch} = useConnect();
    const [blackList, setBlackList] = useState([])
    const [addWhiteArr, setAddWArr] = useState([{}])
    const [curWhiteUser, setCurWhiteUser] = useState("")

    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    const [isDelMolOpen, setDelOpen] = useState(false)
    const [adminWhiteList, setAdminWhiteList] = useState([])
    const [refRecords, setREFRecords] = useState([])
    const [maxThree, setMaxThree] = useState(0)

    const handleDealMethod = async (name, params) => {
        let contractTemp = await getContractByName("ogV7", state.api,)
        if (!contractTemp) {
            message.warn("Please connect", 5)
        }
        await dealMethod(contractTemp, state.account, name, params)
    }
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

    const getBlackList = async () => {
        try {
            const res = await getBlackUsers()
            console.log(res)
            if (res && res.data) {
                const arr = res.data.blackUsers
                let tempArr = []
                for (let i = 0; i < arr.length; i++) {
                    const item = arr[i]
                    if (tempArr.indexOf(item.user) < 0) {
                        tempArr.push(item.user)
                    } else {
                        tempArr.splice(tempArr.indexOf(item.user), 1)
                    }
                }
                setBlackList(tempArr)
            }
        } catch (e) {

        }
    }
    const handleSetBlackList = async () => {
        let arr = []
        for (let i = 0; i < addWhiteArr.length; i++) {
            arr.push(form2.getFieldValue()["address" + i])
        }
        await handleDealMethod("setBlackList", [arr[0]])
        setTimeout(() => {
            getBlackList()
        }, 3000)
    }
    const getMaxThree = async () => {
        let res = await handleViewMethod("maxLevels", [2])
        setMaxThree(res.toString())
    }

    const removeWhiteListUser = async () => {
        await handleDealMethod("setBlackList", [curWhiteUser])
        setDelOpen(false)
        getBlackList()
    }

    const deleteWhite = async (user) => {
        setCurWhiteUser(user)
        setDelOpen(true)
    }

    useEffect(() => {
        if (!state.account) return
        getBlackList()
        getMaxThree()
    }, [state.account]);


    return (
        <AddThreeWhiteListStyle>

            <div className="part3">
                <Modal className="model-dialog" title="Delete  Dialog" open={isDelMolOpen} onOk={removeWhiteListUser}
                       onCancel={() => {
                           setDelOpen(false)
                       }}>
                    <h3>
                        Wallet Address
                    </h3>
                    <div className="value">
                        {curWhiteUser}
                    </div>
                </Modal>
                <div className="panel-box">
                    <div className="panel-container">
                        <div className="panel-title">
                            Set Blacklist
                        </div>
                        <Form form={form2} name="control-hooks" className="form">

                            {addWhiteArr.map((item, index) => {
                                return (
                                    <Form.Item
                                        name={"address" + index}
                                        validateTrigger="onBlur"
                                        label="Address"
                                        validateFirst={true}
                                    >
                                        <div className="input-box">
                                            {/*<Input type="text" value={addressValue} onChange={handleInputChange}*/}
                                            {/*       onPaste={handlePaste}/>*/}
                                            <Input type="text"></Input>
                                        </div>
                                    </Form.Item>
                                )
                            })}

                        </Form>
                        <div className="btns">
                            <Button className="add-btn" type="primary" onClick={() => {
                                handleSetBlackList()
                            }}>Submit</Button>

                        </div>
                        <div className="fire-list-box admin3-list">
                            <div className="list-header3 list-header">
                                <div className="col">
                                    No.
                                </div>


                                <div className="col ">
                                    Address
                                </div>
                                <div className="col">
                                    Del
                                </div>

                            </div>

                            {
                                blackList.map((item, index) => (
                                    <div className="list-item " key={index}>
                                        <div className="col no">
                                            {index + 1}
                                        </div>

                                        <div className="col address">
                                            {state.isMobile?formatAddress(item):item}
                                        </div>

                                        <div className="col">
                                            <Button className="del-button" onClick={() => {
                                                deleteWhite(item)
                                            }}>
                                                Delete
                                            </Button>
                                        </div>

                                    </div>)
                                )
                            }

                        </div>


                    </div>
                </div>
            </div>


        </AddThreeWhiteListStyle>
    )
}
export default AddThreeWhiteList
