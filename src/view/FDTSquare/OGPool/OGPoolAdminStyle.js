import styled from "styled-components";
const OGPoolStyle = styled.div`
.ant-form-item-label>label{
  color: rgba(138, 128, 128, 1);
  font-size:16px;
}
  .ant-btn {
    margin-right: 20px;
    padding: 0 30px;
    font-size: 18px;
background: linear-gradient(32deg, #FF4E50 0%, #F9D423 100%);
    height: 40px;
  }
  .flex-box{
    align-items: center;
  }
  .panel-title {
    margin: 1em 0;
    font-size: 18px;
    font-weight: 500;
  }
  .ant-form {
    margin-bottom: 1.8em;
    .ant-form-item{
      margin-bottom:20px;
    }
  }

  .ant-form-item-control-input {
    width: 450px;
    border-radius:25px;
  }
  .current-status{
    font-size: 16px;
    white-space: nowrap;
    margin-right: 10px;
  }
  .tip-box {
    padding: 1.6em 0;
  }
  .ant-switch-checked{
    /* margin-left: 50px; */
background: linear-gradient(32deg, #FF4E50 0%, #F9D423 100%);
  }
  .switchh{
    width: 25%;
   p{
    font-size:16px;
    color: white;
    display: flex;
    font-weight: 500;
    justify-content:space-between;
   }
    
  }
  .ant-switch-handle{
    width: 24px;
    height:24px;
    top:0px;
  }
  .ant-switch{
    margin-left: 55px;
    min-width: 45px;
    height: 25px;
  }
  .page-title {
    margin-left: 5%;
    padding: 0 8%;
    font-size: 30px;
    font-family: Roboto-Bold, Roboto;
    font-weight: bold;
  }

  .panel-container {
    width: 90%;
    margin: 10px auto;
    padding: 1em 8%;

    .operate-box {
      margin-top: 20px;

      .add {
        width: 160px;
      }
    }

    .info {
      font-size: 14px;
      font-family: Roboto-Medium, Roboto;
      font-weight: 500;
      color: #AC8989;
      line-height: 18px;
    max-width: 420px;
    }
  }

  .part3 {
    .operate-btns {
      width: 100%;

      Button {
        width: 100%;
        height: 40px;
        margin-top: 1em;
      }
    }

    .donate-info {
      margin-top: 2em;

      .flex-box {
        justify-content: space-between;

        .info-item {

          .value {
            line-height: 50px !important;
            font-size: 24px !important;
          }
        }
      }

      .info-item {

        .name {
          font-size: 20px;
          font-family: Roboto-Bold, Roboto;
          font-weight: bold;
          color: #796B6B;
          line-height: 30px;
        }

        .value {
          font-size: 32px;
          font-family: Roboto-Bold, Roboto;
          font-weight: bold;
          color: #FFA756;
          line-height: 70px;
          background: linear-gradient(320deg, #DD3642 0%, #FFC02C 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
    }

    .donate-pid {
      .flex-box {
        margin: 1.5em 0;
        justify-content: space-between;
        align-items: center;

        .pid {
          padding: 6px 10px;
          border-radius: 10px;
          background: linear-gradient(90deg, rgba(#dd3642, 0.3) 0%, rgba(#FFC02C, 0.5) 100%);
          border: 1px solid #DD3642;
          font-size: 18px;
          font-family: Roboto-Bold, Roboto;
          font-weight: bold;
          color: #FFA756;
          background: linear-gradient(320deg, #DD3642 0%, #FFC02C 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .value {
          font-size: 18px;
          font-family: Roboto-Bold, Roboto;
          font-weight: bold;
          color: #796B6B;
          line-height: 28px;
        }
      }
    }

    .input-box {
      position: relative;

      .exchangeAmount {
        height: 50px;
        display: flex;
        align-items: center;
        font-size: 18px;
        padding: 0 20px;
      }

      .ant-input-number, .ant-select {
        height: 50px;
        padding: 0 66px 0 40px;
        width: 100% !important;

        .ant-input-number-input-wrap, .ant-select-selector, input {
          height: 100%;
          width: 100% !important;

          &:focus-visible {
            outline: none;
          }
        }

        .ant-select-clear {
          margin-right: 66px;
        }
      }

      .max-btn {
        width: 60px;
        position: absolute;
        right: 10px;
        top: 10px;
      }

      .coin-icon {
        position: absolute;
        top: 10px;
        left: 10px;
        width: 30px;
        height: 30px;
      }

      .coin-name {
        position: absolute;
        right: 10px;
        top: 10px;
        font-size: 20px;
      }
    }

    .balance-box {
      display: flex;
      justify-content: space-between;
      font-size: 20px;
      font-family: Roboto-Bold, Roboto;

      .name {
        font-weight: bold;
        color: #796B6B;
        line-height: 30px;
      }

      .value {
        font-weight: bold;
        color: #FFFFFF;
        line-height: 30px;
      }
    }

    .down-icon {
      width: 40px;
      height: 40px;
      margin: 0.5em 0 1em calc(50% - 20px);

    }

    .donate {
      margin-top: 1em;
      width: 100%;
      height: 50px;
      font-size: 20px;
      font-family: Helvetica-Bold, Helvetica;
      font-weight: bold;
    }

    .tip {
      margin-top: 2em;
      font-size: 16px;
      font-family: Roboto-Bold, Roboto;
      font-weight: bold;
      color: #FFFFFF;
    }
  }
  .header-nav {
    width: 90%;
    margin-left: 5%;
    display: flex;
    padding: 0 8%;

  .fire-nav-list {
    .nav-item{
      width: 150px;
      height: 55px;
      font-size:18px;
      color:rgba(138, 128, 128, 1);
      line-height:20px;
      /* background: rgba(255, 255, 255, 0.10); */
    }
    .nav-item.active{
color: white;
    }
  }
  }
  .part4 {
    .sum-list {
      .sum-item-box {
        margin-top: 20px;
        padding: 10px 10px;
        box-shadow: #fff1f0 0 0 10px;
        text-align: center;

        .col {
          &:nth-child(1) {
            width: 60px;
          }

          &:nth-child(2) {
            width: 60px;
          }

          &:nth-child(3) {
            width: 60px;
          }

          &:nth-child(4) {
            width: 250px;
          }

          &:nth-child(5) {
            width: 50px;
          }

          &:nth-child(6) {
            width: 30px;
          }

          &:nth-child(7) {
            width: 100px;
          }

        }

        .sum-list-header {
          display: flex;

          .index {
            margin-right: 10px;
            font-weight: bold;
          }
        }

        .sum-item-header {
          border-bottom: 1px solid #eee;
          margin-top: 10px;
          display: flex;
          justify-content: space-between;
          padding: 10px 0;

          .col:nth-child(4) {
            width: 160px;
            overflow: hidden;
          }
        }

        .sum-list-footer {
          border-top: 1px solid #eee;
          display: flex;
          padding-top: 10px;

          .col {
            margin-right: 10px;

            &:nth-child(1) {
              width: 150px !important;
            }

            &:nth-child(2) {
              width: 120px !important;
            }

            &:nth-child(3) {
              width: 120px !important;
            }
          }
        }

        .sum-item {
          .col:nth-child(4) {
            width: 160px;
            overflow: hidden;
          }

          padding: 5px 0px;
          display: flex;

          justify-content: space-between;
        }
      }

    }
  }
`;
export default OGPoolStyle;
