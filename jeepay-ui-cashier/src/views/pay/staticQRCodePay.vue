<template>
  <div class="content">
    <div class="page-title">收银台</div>
    <div class="page-head">
      <img :src="require('@/assets/image/pay-img.png')"/>
    </div>
    <div class="empty-box">
      <p class="title">请输入支付金额</p>
      <div class="emptyBtn">
        <input type="text" v-model="amount" class="num"/>
        <input type="button" class="btn" value="清空"/>
      </div>
    </div>
    <div class="shopinfo">
      <p class="title">商家信息</p>
      <div class="text">
        <p>Rosecrans Ave, Suite 200 El Segundo, USA</p>
        <p>(+501) 425 906 4618</p>
        <p>Zip code: 92053</p>
      </div>
    </div>

    <div class="footbox">
      <div @click="pay" class="btn">Continue</div>
    </div>
  </div>
</template>

<script>

import {
  base64Encode
} from '@ony3000/base64-converter';


export default {
  components: {},
  data() {
    return {
      browserType: null,
      amount: null
    }
  },
  async created() {
    const version = this.$tUtil.getVersion();

    const query = this.$route.query;

    if (version.weixin) {

      this.browserType = 1;

      if (!query.openId) {

        location.href = this.$baseUrl + '/weixin/authorize?service=' + base64Encode(location.href)
      }
    }
  },
  mounted() {


  },
  methods: {
    async pay() {
      if (this.browserType === 1) {

        const query = {
          "amount": this.amount*100,
          "mchNo": this.$route.params.mchNo,
          "subject": "静态码支付",
          "wayCode": "WX_GLOBAL_JSAPI",
          "body": "静态码支付",
          "version": "1.0",
          "channelExtra": `{"openId":"${this.$route.query.openId}"}`,
          "currency": "SGD",
          "divisionMode": 1
        }

        const {data} = await this.$api.post('/api/pay/createOrder', query)


        // eslint-disable-next-line no-undef
        WeixinJSBridge.invoke('getBrandWCPayRequest', JSON.parse(data.payData),
            function (res) {
              if (res.err_msg == "get_brand_wcpay_request:ok") {
                // 使用以上方式判断前端返回,微信团队郑重提示：
                //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
              }
            });


      }
    }
  }
}


</script>

<style scoped lang="scss">
.content {
  font-family: '思源黑体';

  .page-title {
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 38px;
    color: rgba(5, 28, 63, 1);
    text-align: center;
    padding-top: 13px;
  }

  .page-head {
    padding-top: 21px;
    display: flex;
    justify-content: end;

    img {
      width: 123px;
      height: 51.79px;
    }
  }

  .empty-box {
    padding-top: 37px;
    padding-left: 11px;
    padding-right: 18px;
    box-sizing: border-box;
    text-align: left;

    .title {
      font-size: 18px;
      font-weight: 500;
      letter-spacing: -0.3px;
      line-height: 0px;
      color: rgba(0, 0, 0, 1);
      text-align: left;
      vertical-align: top;
      margin-bottom: 20px;
    }

    .emptyBtn {
      width: 100%;
      opacity: 1;
      border-radius: 5px;
      background: rgba(42, 130, 228, 0.2);
      font-size: 14px;
      font-weight: 700;
      color: rgba(15, 110, 255, 1);
      text-align: right;
      padding: 0 13px;
      box-sizing: border-box;

      display: flex;
      justify-content: space-between;

      .num {
        background: rgba(42, 130, 228, 0);
        border: none;
        outline: none;
      }

      .btn {
        background: rgba(42, 130, 228, 0);
        color: rgba(15, 110, 255, 1);
        font-size: 14px;
        font-weight: 700;
        padding: 15px 13px;
        border: none;
        outline: none;
      }
    }
  }

  .shopinfo {
    width: 345px;
    height: 137px;
    opacity: 1;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 8px 28px 0px rgba(218, 218, 218, 0.5);
    margin: 47px auto 0 auto;
    padding: 14px 10px;
    box-sizing: border-box;

    .title {
      font-size: 16px;
      font-weight: 700;
      letter-spacing: 0px;
      line-height: 24px;
      color: rgba(51, 58, 66, 1);
      text-align: left;
      vertical-align: top;
      padding: 0;
      margin-bottom: 13px;
    }

    .text {
      text-align: left;

      p {
        font-size: 14px;
        font-weight: 300;
        letter-spacing: 0px;
        line-height: 16px;
        color: rgba(51, 58, 66, 1);
        margin-bottom: 8px;
      }
    }
  }

  .footbox {
    position: fixed;
    bottom: 70px;
    left: 0;
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;

    .btn {
      background: rgba(42, 130, 228, 1);
      font-size: 18px;
      font-weight: 700;
      color: rgba(255, 255, 255, 1);
      text-align: center;
      padding: 12px 0;
      opacity: 1;
      border-radius: 5px;
    }
  }
}
</style>
