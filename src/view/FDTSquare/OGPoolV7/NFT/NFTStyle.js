import styled from "styled-components";

export default styled.div`

  .my-nft {
    .nft-list {
      display: grid;
      grid-template-columns: repeat(5, minmax(130px, 1fr));
      gap: 10px;
      margin: 50px 0;

      .nft-item {
        padding: 5%;
        border-radius: 5%;
        background: rgba(128, 128, 122, 0.7);

        img {
          width: 100%;
        }

        .id-box {
          display: flex;
          justify-content: space-between;
          padding: 5px 0;
          font-size: 18px;
        }
      }
    }
  }

  .header-nav {
    padding: 0 4%;
    margin: 10px auto;

  }

  .fun-container {
    background: #1C1C1C;
    box-shadow: 0px 5px 20px 5px rgba(0, 0, 0, 0.2);
    border-radius: 20px 20px 20px 20px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    width: 50%;
    min-width: 300px;
    margin: 0 auto;
    text-align: center;

    .fun-box {
      margin: 1.6em auto;
      width: 90%;
      position: relative;

      .message-box {

        width: 100%;
        padding: 0 20px 10px;

        .in-line {
          line-height: 30px;
          width: 100%;
          font-weight: 600;
          display: flex;
          justify-content: space-between;
          margin: 1em 0;

          .left {
            font-size: 18px;
            font-family: Roboto-Medium, Roboto;
            font-weight: 500;
            color: rgb(138, 128, 128);
          }

          .right {
            font-size: 18px;
          }
        }
      }

      img {
        margin: 0em auto;
        width: 100%;
      }

      .mint-btn {
        margin: 1.5em auto;
        width: 100%;
        background: linear-gradient(320deg, #DD3642 0%, #FFC02C 100%);
        border-radius: 10px 10px 10px 10px;
        height: 50px;
        cursor: pointer;

        p {
          font-size: 18px;
          font-family: Roboto-Bold, Roboto;
          font-weight: bold;
          color: #1A1414;
          line-height: 50px;
        }
      }

      .btn-box {
        margin: 1em auto;
        height: 50px;
        width: 100%;
        display: flex;
        justify-content: space-between;

        .ant-btn {
          height: 50px;
          line-height: 40px;
          flex-grow: 1;
          background: #272727;
          border-radius: 10px 10px 10px 10px;
          border: 1px solid rgba(255, 255, 255, 0.1);

          p {
            font-size: 18px;
            font-family: Roboto-Bold, Roboto;
            font-weight: bold;
            color: #FFFFFF;
          }
        }
      }
    }
  }


  .part1 {
    width: 100%;
  }

  .panel-box {
    .panel-container {

      .nft-list-box {
        margin: 1em 0;
        background: rgba(28, 28, 28, 1);

        .nft-header {
          display: flex;
          padding: 20px 2em;
          border-bottom: 1px solid rgba(234, 234, 234, 0.10);
        }

        .nft-item, .nft-header {
          justify-content: flex-start;

          .col {
            text-align: left;
            font-size: 16px;

            &:nth-child(1) {
              margin-left: 180px;
              width: 20%;
            }

            &:nth-child(2) {
              width: 35%;
              margin-left: 10px;
            }

            &:nth-child(3) {
              width: 18%;
              margin-left: 10px;
            }


          }
        }

        .nft-item:last-child {
          border-bottom: none;
        }

        .nft-item {
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

    }
  }


  .up-list-box {
    margin: 1em 0;
    background: rgba(28, 28, 28, 1);

    .up-header {
      display: flex;
      padding: 10px 0em;
      border-bottom: 1px solid rgba(234, 234, 234, 0.10);
    }

    .up-item, .up-header {
      justify-content: flex-start;

      .col {
        text-align: left;
        font-size: 16px;

        &:nth-child(1) {
          margin-left: 10px;
          width: 25%;
        }

        &:nth-child(2) {
          width: 50%;
          margin-left: 10px;
        }
      }
    }

    .up-item:last-child {
      border-bottom: none;
    }

    .up-item {
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

  .pagination {
    display: block !important;
    text-align: center;
  }

  @media screen and (max-width: 1440px) {
    .header-nav .nft-nav-list .nav-item {
      width: 18% !important;
      height: 40px;
      font-size: 15px;
      line-height: 40px;
    }

    .fun-container {
      .fun-box {
        margin: 1.2em auto;

        .mint-btn {
          height: 40px;

          p {
            font-size: 16px;
            line-height: 40px;
          }
        }

        .btn-box {
          .ant-btn {
            height: 40px;

            p {
              font-size: 16px;
              line-height: 30px;
            }
          }
        }

        .message-box .in-line {
          margin: 0.5em 0;

          .left {
            font-size: 15px;
          }

          .right {
            font-size: 15px;
          }
        }
      }
    }


    .panel-box {
      .panel-container {
        .nft-list-box {
          .nft-header {
            font-size: 15px;
            padding: 20px 2em;
          }

          .nft-item {
            padding: 1em 2em;
          }

          .nft-header, .nft-item {

            .col {
              font-size: 15px;

              &:nth-child(1) {
                width: 18%;
                margin-left: 80px;

              }

              &:nth-child(2) {
                width: 45%;
                margin-left: 10px;

              }

              &:nth-child(3) {
                width: 20%;
                margin-left: 10px;

              }
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 450px) {
    .header-nav {
      padding: 0;
      overflow-x: scroll;

      .nft-nav-list {
        display: flex;
        justify-content: space-between;
        width: 550px;

        .nav-item {
          width: 130px !important;
          height: 40px;
          font-size: 14px;
          line-height: 40px;
          margin: 0 5px;
          padding: 0 2px;
        }
      }
    }

    .panel-container {
      padding: 0 2%;
      overflow: hidden;
    }

    .fun-container {
      width: 100%;

      .fun-box {
        margin: 1.2em auto;

        .mint-btn {
          height: 40px;

          p {
            font-size: 15px;
            line-height: 40px;
          }
        }

        .btn-box {
          .ant-btn {
            height: 40px;

            p {
              font-size: 15px;
              line-height: 30px;
            }
          }
        }

        .message-box .in-line {
          margin: 0.5em 0;

          .left {
            font-size: 14px;
          }

          .right {
            font-size: 14px;
          }
        }
      }
    }

    .part1 {
    }

    .panel-box {
      .panel-container {
        .nft-list-box {
          .nft-header {
            font-size: 14px;
            padding: 10px 0em;
          }

          .nft-item {
            padding: 10px 0em;
          }

          .nft-header, .nft-item {

            .col {
              font-size: 14px;

              &:nth-child(1) {
                width: 20%;
                margin-left: 18px;

              }

              &:nth-child(2) {
                width: 30%;
                margin-left: 5px;

              }

              &:nth-child(3) {
                width: 38%;
                margin-left: 5px;

              }
            }
          }
        }

      }
    }
  }
`