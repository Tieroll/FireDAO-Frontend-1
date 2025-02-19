import {Routes, Route, Link, useNavigate, useLocation} from "react-router-dom";
import Register from "./view/HolyFireAltar/MintPassport/Register";
import UserInfo from "./view/UserInfo"
import CreateLock from "./view/createLock"
import LockList from "./view/LockList"
import Home from "./view/Home"
import "animate.css";

import SbtAdmin from "./view/sbtAdmin"
import PassFireSeed from "./view/HolyFireAltar/PassFireSeed"
import MintFireSoul from "./view/HolyFireAltar/MintFireSoul"
import AdminPage from "./view/passportAdmin"
import MyPassport from "./view/HolyFireAltar/MyPassport"
import GlobalStyle from "./style/style";
import CommonStyle from "./style/commonStyle";
import AntdOverride from "./style/antdOverride";
import React from "react";
import {ConnectProvider, useConnect} from "./api/contracts";
import FireDAOHeader from "./component/FireDAOHeader/FireDAOHeader";
import FireDAOFooter from "./component/FireDAOFooter/FireDAOFooter";
import OnBuilding from "./view/OnBuilding";
import Passport from "./view/HolyFireAltar/Passport";

import MintFireSeed from "./view/HolyFireAltar/MintFireSeed";
import PidList from "./view/HolyFireAltar/PidList";
import FIDList from "./view/HolyFireAltar/FIDList";
import SBTList from "./view/HolyFireAltar/SBTList";
import ChangeUserInfo from "./view/HolyFireAltar/ChangeUserInfo";
import Reputation from "./view/HolyFireAltar/Reputation";
import ReputationManage from "./view/HolyFireAltar/ReputationManage";


import firebg from "./imgs/firebg.mp4"
import NavList from "./component/NavList/NavList";

//Seed Manage
import FireSeedManage from "./view/HolyFireAltar/FireSeedManage"
import FireSoulManage from "./view/HolyFireAltar/FireSoulManage"

//Treasury
import IncomeDistribution from "./view/Treasury/IncomeDistribution";
import IncomeSource from "./view/Treasury/IncomeSource";
import PidAirdrop from "./view/HolyFireAltar/PidAirdrop";
import TreasuryDistributionManage from "./view/Treasury/TreasuryDistributionManage";
import Distribution from "./view/Treasury/Distribution"
import TreasurySource from "./view/Treasury/Source"
import SourceDetail from "./view/Treasury/SourceDetail"
import RepurchaseAndBurnManage from "./view/Treasury/RepurchaseAndBurnManage"
import RepurchaseAndBurn from "./view/Treasury/RepurchaseAndBurn"
import CommunityVault from "./view/Treasury/CommunityVault";
import CreateProposal from "./view/Treasury/CommunityVault/CreateProposal";
import CommunityMyDraft from "./view/Treasury/CommunityVault/MyDraft";
//FDTSquare
import OGPool from "./view/FDTSquare/OGPool/OGPool";
import OGPoolAdmin from "./view/FDTSquare/OGPool/OGPoolAdmin";
import OGUserAdmin from "./view/FDTSquare/OGPool/OGUserAdmin";

import OGPoolV5 from "./view/FDTSquare/OGPoolV5/OGPool";
import OGPoolV5Admin from "./view/FDTSquare/OGPoolV5/OGPoolAdmin";
import OGV5UserAdmin from "./view/FDTSquare/OGPoolV5/OGUserAdmin";

import OGPoolV9 from "./view/FDTSquare/OGPoolV9/OGPool";
import OGPoolV9Admin from "./view/FDTSquare/OGPoolV9/OGPoolAdmin";
import OGV9UserAdmin from "./view/FDTSquare/OGPoolV9/OGUserAdmin";

import OGPoolV7 from "./view/FDTSquare/OGPoolV7/OGPool";
import OGPoolV7Admin from "./view/FDTSquare/OGPoolV7/OGPoolAdmin";
import OGV7UserAdmin from "./view/FDTSquare/OGPoolV7/OGUserAdmin";

import NFTView from "./view/FDTSquare/OGPoolV7/NFT/NFTView"
import NFTAdmin from "./view/FDTSquare/OGPoolV7/NFT/NFTAdmin"

import FDTRelease from "./view/FDTSquare/FDTRelease/index";
import FDTReleaseManage from "./view/FDTSquare/FDTReleaseManage/index";
import FDTOgToFdt from "./view/FDTSquare/FDTOgToFdt"
import FLMPool from "./view/FDTSquare/FLMPool/index"
import AutoReflowLP from "./view/FDTSquare/AutoReflowLP"
import AutoReflowLPManage from "./view/FDTSquare/AutoReflowLPManage"
import SeedDonation from "./view/FDTSquare/SeedDonation/SeedDonation";
import SeedDonationManage from "./view/FDTSquare/SeedDonation/Manage";

//Operation
import FireLock from "./view/Operation/FireLock/FireLock";
import FireLockView from "./view/Operation/FireLockView"
import CreateFireLock from "./view/Operation/CreateFireLock";
import CreateCityNode from "./view/Operation/CreateCityNode"

import CityNodeManage from "./view/Operation/CityNodeManage"
import CityNode from "./view/Operation/CityNode"
import CityNodeDetail from "./view/Operation/CItyNodeDetail"
import GuildManage from "./view/Operation/GuildManage"
import Guild from "./view/Operation/Guild"
import CreateGuild from "./view/Operation/CreateGuild"
import GuildDetail from "./view/Operation/GuildDetail"

import ForumFLMAirdrop from "./view/Operation/ForumFLMAirdrop"
import FLMAirdropLv1 from "./view/Operation/ForumFLMAirdrop/component/FLMAirdropLv1"
import FLMAirdropLv2 from "./view/Operation/ForumFLMAirdrop/component/FLMAirdropLv2"
import FLMAirdrop from "./view/Operation/FLMAirdrop"
import FLMAirdropManage from "./view/Operation/FLMAirdrop/Manage"


import LPMining from "./view/Operation/LPMining"
import LPMiningManage from "./view/Operation/LPMining/Manage"
import FDTLockMining from "./view/Operation/FDTLockMining"
import FDTLockMiningManage from "./view/Operation/FDTLockMining/Manage"



function App() {
    const history = useNavigate();
    const location = useLocation()

    return (

        <ConnectProvider>
            <CommonStyle/>
            <GlobalStyle/>
            <AntdOverride/>

            {
                location.pathname === "/" && <Home/>
            }
            {location.pathname !== "/" &&
                <div className="content">
                    <video webkit-playsinline="true" playsInline={true} x5-video-orientation="portraint"
                           x5-playsinline="true" className="firebg" width="100%" autoPlay="autoplay" loop="loop"
                           muted="muted">
                        <source src={firebg} type="video/mp4"/>
                    </video>
                    <FireDAOHeader/>
                    <NavList className="app-nav"/>
                    <div className="App" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        paddingTop: "6em"
                    }}>

                        <div className="flex-container" style={{
                            width: "100%",
                            flexGrow: "1"
                        }}>
                            <Routes>
                                <Route path="/" element={<Home/>}/>
                                <Route path="/OnBuilding" element={<OnBuilding/>}/>
                                <Route path="/MintPassport" element={<Register/>}/>
                                <Route path="/MyPassport" element={<MyPassport/>}/>
                                <Route path="/PIDList" element={<PidList/>}/>
                                <Route path="/ChangeUserInfo" element={<ChangeUserInfo/>}/>
                                <Route path="/Passport" element={<Passport/>}/>
                                <Route path="/PidAirdrop" element={<PidAirdrop/>}/>

                                <Route path="/FireSeedManage" element={<FireSeedManage/>}/>
                                <Route path="/FireSoulManage" element={<FireSoulManage/>}/>

                                <Route path="/UserInfo" element={<UserInfo/>}/>
                                <Route path="/PassportAdmin" element={<AdminPage/>}/>
                                <Route path="/CreateLock" element={<CreateLock/>}/>
                                <Route path="/LockList" element={<LockList/>}/>
                                <Route path="/MintFireSeed" element={<MintFireSeed/>}/>
                                <Route path="/MintFireSoul" element={<MintFireSoul/>}/>
                                <Route path="/PassFireSeed" element={<PassFireSeed/>}/>
                                <Route path="/SbtAdmin" element={<SbtAdmin/>}/>
                                <Route path="/FIDList" element={<FIDList/>}/>
                                <Route path="/SBTList" element={<SBTList/>}/>
                                <Route path="/Reputation" element={<Reputation/>}/>

                                <Route path="/ReputationManage" element={<ReputationManage/>}/>
                                {/*Treasury*/}
                                <Route path="/IncomeDistribution" element={<IncomeDistribution/>}/>
                                <Route path="/IncomeSource" element={<IncomeSource/>}/>
                                <Route path="/TreasuryDistributionManage" element={<TreasuryDistributionManage/>}/>
                                <Route path="/Distribution" element={<Distribution/>}/>
                                <Route path="/Source" element={<TreasurySource/>}/>
                                <Route path="/SourceDetail" element={<SourceDetail/>}/>
                                <Route path="/RepurchaseAndBurnManage" element={<RepurchaseAndBurnManage/>}/>
                                <Route path="/RepurchaseAndBurn" element={<RepurchaseAndBurn/>}/>
                                <Route path="/CommunityVault" element={<CommunityVault/>}/>
                                <Route path="/CreateProposal" element={<CreateProposal/>}/>
                                <Route path="/CommunityMyDraft" element={<CommunityMyDraft/>}/>

                                {/* FDTSquare*/}
                                <Route path="/OGPool" element={<OGPool/>}/>
                                <Route path="/OGPoolAdmin" element={<OGPoolAdmin/>}/>
                                <Route path="/OGUserAdmin" element={<OGUserAdmin/>}/>

                                <Route path="/OGPoolV5" element={<OGPoolV5/>}/>
                                <Route path="/OGPoolV5Admin" element={<OGPoolV5Admin/>}/>
                                <Route path="/OGV5UserAdmin" element={<OGV5UserAdmin/>}/>

                                <Route path="/OGPoolV9" element={<OGPoolV9/>}/>
                                <Route path="/OGPoolV9Admin" element={<OGPoolV9Admin/>}/>
                                <Route path="/OGV9UserAdmin" element={<OGV9UserAdmin/>}/>


                                <Route path="/OGPoolV7" element={<OGPoolV7/>}/>
                                <Route path="/OGPoolV7Admin" element={<OGPoolV7Admin/>}/>
                                <Route path="/OGV7UserAdmin" element={<OGV7UserAdmin/>}/>

                                <Route path="/NFTView" element={<NFTView/>}/>
                                <Route path="/NFTAdmin" element={<NFTAdmin/>}/>

                                <Route path="/FDTRelease" element={<FDTRelease/>}/>
                                <Route path="/FDTReleaseManage" element={<FDTReleaseManage/>}/>
                                <Route path="/FDTOgToFdt" element={<FDTOgToFdt/>}/>
                                <Route path="/FLMPool" element={<FLMPool/>}/>
                                <Route path="/AutoReflowLP" element={<AutoReflowLP/>}/>
                                <Route path="/AutoReflowLPManage" element={<AutoReflowLPManage/>}/>
                                <Route path="/SeedDonation" element={<SeedDonation/>}/>
                                <Route path="/SeedDonationManage" element={<SeedDonationManage/>}/>
                                {/*Operation*/}
                                <Route path="/FireLock" element={<FireLock/>}/>
                                <Route path="/FireLockView" element={<FireLockView/>}/>
                                <Route path="/CreateFireLock" element={<CreateFireLock/>}/>
                                <Route path="/CityNode" element={<CityNode/>}/>

                                <Route path="/CityNodeManage" element={<CityNodeManage/>}/>
                                <Route path="/CreateCityNode" element={<CreateCityNode/>}/>
                                <Route path="/CityNodeDetail/:id" element={<CityNodeDetail/>}/>
                                <Route path="/GuildManage" element={<GuildManage/>}/>
                                <Route path="/Guild" element={<Guild/>}/>
                                <Route path="/CreateGuild" element={<CreateGuild/>}/>
                                <Route path="/GuildDetail/:id" element={<GuildDetail/>}/>
                                <Route path="/FLMAirdrop" element={<FLMAirdrop/>}/>
                                <Route path="/FLMAirdropManage" element={<FLMAirdropManage/>}/>

                                <Route path="/ForumFLMAirdrop" element={<ForumFLMAirdrop/>}/>

                                <Route path="/FLMAirdropLv1" element={<FLMAirdropLv1/>}/>
                                <Route path="/FLMAirdropLv2" element={<FLMAirdropLv2/>}/>

                                <Route path="/LPMining" element={<LPMining/>}/>
                                <Route path="/LPMiningManage" element={<LPMiningManage/>}/>
                                <Route path="/FDTMining" element={<FDTLockMining/>}/>
                                <Route path="/FDTMiningManage" element={<FDTLockMiningManage/>}/>


                            </Routes>
                        </div>
                        <div className='twindow'>

                        </div>
                    </div>
                    <FireDAOFooter/>
                </div>

            }
        </ConnectProvider>

    )
}

export default App;
