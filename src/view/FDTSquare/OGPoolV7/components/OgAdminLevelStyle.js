import styled from "styled-components";
export default  styled.div`
  .list-item,.list-header {
    padding-left: 20px!important;
    padding-right: 20px!important;
  
  }
  .model-dialog {
    h3 {
      color: #796B6B;
    }

    .value {
      margin-top: 10px;
    }
  }
  .active-list-row{
    .col:nth-child(2){
      width: 60%!important;
    }
  }
  .admin3-list{
    .col{
      &.address{
        width: 60%;
      }
    }
  }
  .part3 {

    .btns {
      display: flex;
      justify-content: space-between;
    }

    .tip {
      strong {
        color: #d84a1b;
      }
    }

    .icon-box {
      width: 200px;
      display: flex;
      justify-content: space-between;
      margin: 20px auto;

      .icon {
        cursor: pointer;
      }
    }

    .add-btn {
      margin: 1em 0;
    }
  }
  @media screen and (max-width: 1000px) {
  .admin3-list{
    .col{
      &.address{
        width: 50%;
      }
    }
  }
}

`

