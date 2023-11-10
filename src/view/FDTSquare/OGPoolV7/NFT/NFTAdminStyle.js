import styled from "styled-components";

export default styled.div`
 .ant-form-item-label > label {
    font-size: 18px;
    color: #FFFFFF;
    font-family: Roboto-Medium, Roboto;
    font-weight: 500;
    line-height: 24px;
    line-height: 26px;
    margin: 0.6em 0;
  }

  .ant-form-item-control-input {
    background: rgb(39, 39, 39);
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    height: 45px;
  }

  .ant-form-item-control-input-content {
    span {
      padding-left: 20px;
      font-size: 18px;
    }
  }

  .ant-input {
    font-size: 18px;
    background: rgb(39, 39, 39);
    border: none;
    height: 45px;
  }


.part1 {

padding: 0 4%;

.panel-box {

  .panel-container {
    width: 100%;
    background: #1C1C1C;
    box-shadow: 0px 4px 15px 4px rgba(0, 0, 0, 0.2);
    border-radius: 15px 15px 15px 15px;
    padding: 50px 50% 25px 100px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    margin: 1em 0;
  }
}
}
.panel-title {
    margin-bottom: 0.5em;
    font-size: 30px;
    font-family: Helvetica-Bold, Helvetica, sans-serif;
    font-weight: bold;
    color: #FFFFFF;
    line-height: 1.6;
  }
  .btn-box{
    display: flex;
    justify-content:space-between;
    width: 35%;
    margin: 2em auto;
  }
  .go-btn {
    background: linear-gradient(229deg, #DAB163 0%, #CC8A35 100%);
    font-size: 18px;
    font-family: Roboto-Bold, Roboto;
    font-weight: bold;
    height: 50px;
    color: #1A1414;
    width: 40%;
    margin: 1em 0;
  }
  .addsbt{
    text-align: center;
    width: 48%;
    line-height:50px;
    font-size: 18px;
    color:#FFAE4E;
    border: 1px solid;
    height: 50px;
border-radius: 8px;
}

  .con-btn {
    background: linear-gradient(229deg, #DAB163 0%, #CC8A35 100%);
    font-size: 18px;
    font-family: Roboto-Bold, Roboto;
    font-weight: bold;
    height: 50px;
    text-align:center;
line-height:50px;
    color: #1A1414;
    width: 48%;
    border-radius: 8px;
  }

  .panel-container1{
    width: 100%;
    padding: 20px 0px 20px 0px;
    margin: 0px;
    
  }
  .sc{
    width: 25px;
  }

  .white-list-box{
    border-radius: 15px;
    margin: 1em 0;
    background: rgba(28, 28, 28, 1);
 border: 1px solid rgba(255, 255, 255, 0.15);
    .white-header {
      display: flex;
      padding: 20px 1.8em;
      border-bottom: 1px solid rgba(234, 234, 234, 0.10);
    }
    
    .white-item, .white-header {
      justify-content: flex-start;
      .col {
        text-align: left;
        font-size: 16px;
      
     &:nth-child(1) {
          margin-left: 70px;
          width: 28%;
        }

        &:nth-child(2) {
          width: 50%;
          margin-left: 10px;
        }

        &:nth-child(3) {
          width: 10%;
          margin-left: 10px;
        }

      }
    }

    .white-item:last-child {
      border-bottom: none;
    }

    .white-item {
      padding: 1em 2em;
      color: #FFFFFF;
      margin: 0 auto;
      border-radius: 0px;
      border-bottom: 1px solid rgba(234, 234, 234, 0.10);;

      &:nth-child(even) {
        
        background: rgba(62, 62, 62, 1);
      }


      .col {
        overflow: hidden;
        padding-left: 0%;

      }

      .address {
        a {
          color: #CD9E57;
        }
      }
    }
  }


@media screen and (max-width: 1440px){
    .ant-input {
      font-size: 15px;
    }

    .ant-form-item-label > label {
      font-size: 16px;
    }

    .ant-form-item-control-input-content span {
      font-size: 15px;
    }

    .part1 .panel-box .panel-container {
      padding: 40px 50% 25px 60px;
    }

    .panel-title {
      font-size: 21px;
      margin: 0px;
    }

    
    .go-btn {
      font-weight: bold;
      color: rgb(26, 20, 20);
      font-size: 16px;
      font-family: Roboto-Bold, Roboto;
      height: 45px;
    }

    .con-btn {
      font-size: 16px;
      height: 45px;
      line-height:45px;
    }

    .addsbt{
      font-size: 16px;
      height: 45px;
      line-height:45px;
    }
    .white-list-box{
    .white-header {
        font-size:15px;

      padding: 20px 1.8em;
    }
    .white-header,.white-item{
        .col{
            font-size:15px;
            &:nth-child(1) {
          margin-left: 45px;
          width: 30%;
        }
        }
    }
}

}

@media screen and (max-width: 450px){
    .ant-form-item-label > label {
      font-size: 14px;
      margin: 5px;
    }

    .ant-form .ant-form-item {
      margin-bottom: 10px;
    }

    .ant-input {
      font-size: 14px;
    }

    .ant-form-item-control-input-content span {
      font-size: 14px;
    }

    .ant-form-item-control-input {
      height: 40px;
    }
    .part1 .panel-box .panel-container {
      padding: 20px;
    }

    .panel-box {
      padding: 5px 0%;
    }

  
    .panel-title {
      font-size: 18px;
      margin: 0px;
    }

    .panel-box {
      padding: 5px 0%;
    }
    .btn-box{
        width: 100%;
    }
    .addsbt {
      width: 40%;
      font-size: 16px;
      line-height: 35px;
      height: 40px;
      margin: 0 auto;
    }
    .con-btn {
      width: 40%;
      font-size: 16px;
      line-height: 35px;
      height: 40px;
      margin:0 auto;
    }
    .ant-btn {
      width: 100%;
      font-size: 16px;
      line-height: 35px;
      height: 40px;
    }
    .white-list-box{
    .white-header {
        font-size:14px;

      padding: 10px 1em;
    }
    .white-item{
        padding: 10px 1em;
    }
    .white-header,.white-item{
        .col{
            font-size:14px;
            &:nth-child(1) {
          margin-left: 15px;
          width: 32%;
        }
        &:nth-child(2) {
          margin-left: 5px;
          width: 42%;
        }
        &:nth-child(3) {
          margin-left: 5px;
          width: 10%;
        }
        }
    }
}

    
}
`
