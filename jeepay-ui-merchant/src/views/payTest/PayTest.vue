<template>
  <div>
    <a-card style="box-sizing:border-box;padding:30px">

      <!-- 选择下单的应用列表 -->
      <a-form>
        <div style="display:flex;flex-direction:row">
          <!-- <p style="margin-top:9px;margin-right:10px;"></p> -->
          <a-form-item label="" class="table-head-layout">
            <a-select v-model="appId" @change="changeAppId" style="width:300px">
              <a-select-option key="">应用APPID</a-select-option>
              <a-select-option v-for="(item) in mchAppList" :key="item.appId">{{ item.appName }} [{{
                item.appId
              }}]
              </a-select-option>
            </a-select>
          </a-form-item>
        </div>
      </a-form>

      <!-- 未配置支付方式提示框 -->
      <a-divider v-if="!appId">请选择应用APPID</a-divider>
      <a-divider v-else-if="noConfigText">您尚未配置任何支付方式</a-divider>
      <a-divider v-else></a-divider>

      <!-- 支付测试面板 v-if=""-->
      <div style="width: 100%;" class="paydemo" v-if="payTestShow()">
        <div class="paydemo-type-content">
          <div class="paydemo-type-name article-title" v-show="showTitle('WX')">微信支付</div>
          <div class="paydemo-type-body">

            <div
              class="paydemo-type color-change"
              v-show="appPaywayList.indexOf('WX_NATIVE') >= 0"
              @click="changeCurrentWayCode('WX_NATIVE', 'codeImgUrl')"
              :class="{this:(currentWayCode === 'WX_NATIVE')}">
              <img src="@/assets/payTestImg/wx_native.svg" class="paydemo-type-img"><span
                class="color-change">微信二维码</span>
            </div>

            <div
              class="paydemo-type color-change"
              v-show="appPaywayList.indexOf('WX_BAR') >= 0"
              @click="changeCurrentWayCode('WX_BAR', '')"
              :class="{this:(currentWayCode === 'WX_BAR')}">
              <img src="@/assets/payTestImg/wx_bar.svg" class="paydemo-type-img"><span
                class="color-change">微信条码</span>
            </div>

            <div
              class="paydemo-type color-change"
              v-show="appPaywayList.indexOf('WX_JSAPI') >= 0"
              @click="changeCurrentWayCode('WX_JSAPI', 'codeImgUrl')"
              :class="{this:(currentWayCode === 'WX_JSAPI')}">
              <img src="@/assets/payTestImg/wx_jsapi.svg" class="paydemo-type-img"><span
                class="color-change">公众号/小程序</span>
            </div>

            <div
              class="paydemo-type-h5"
              v-show="appPaywayList.indexOf('WX_H5') >= 0"
              @click="changeCurrentWayCode('WX_H5', 'payurl')"
              :class="{this:(currentWayCode === 'WX_H5')}">
              <img src="@/assets/payTestImg/wx_h5.svg" class="paydemo-type-img"><span class="color-change">微信H5</span>
            </div>

          </div>

          <div class="paydemo-type-name article-title" v-show="showTitle('ALI_GLOBAL')">支付宝(国际)支付</div>
          <div class="paydemo-type-body">
            <div
              class="paydemo-type color-change"
              v-show="appPaywayList.indexOf('ALI_GLOBAL_APP') >= 0"
              @click="changeCurrentWayCode('ALI_GLOBAL_APP', 'codeImgUrl')"
              :class="{this:(currentWayCode === 'ALI_GLOBAL_APP')}">
              <img src="@/assets/payTestImg/ali_jsapi.svg" class="paydemo-type-img"><span
                class="color-change">支付宝APP支付</span>
            </div>

            <div
              class="paydemo-type color-change"
              v-show="appPaywayList.indexOf('ALI_GLOBAL_WAP') >= 0"
              @click="changeCurrentWayCode('ALI_GLOBAL_WAP', 'codeImgUrl')"
              :class="{this:(currentWayCode === 'ALI_GLOBAL_WAP')}">
              <img src="@/assets/payTestImg/ali_jsapi.svg" class="paydemo-type-img"><span
                class="color-change">支付宝WAP支付</span>
            </div>

            <div
              class="paydemo-type color-change"
              v-show="appPaywayList.indexOf('ALI_GLOBAL_WEB') >= 0"
              @click="changeCurrentWayCode('ALI_GLOBAL_WEB', 'codeImgUrl')"
              :class="{this:(currentWayCode === 'ALI_GLOBAL_WEB')}">
              <img src="@/assets/payTestImg/ali_jsapi.svg" class="paydemo-type-img"><span
                class="color-change">支付宝WEB支付</span>
            </div>

          </div>

          <div class="paydemo-type-name article-title" v-show="showTitle('WX_GLOBAL')">微信(国际)支付</div>

          <div class="paydemo-type-body">
            <!--            <div-->
            <!--              class="paydemo-type color-change"-->
            <!--              v-show="appPaywayList.indexOf('ALI_GLOBAL_APP') >= 0"-->
            <!--              @click="changeCurrentWayCode('ALI_GLOBAL_APP', 'codeImgUrl')"-->
            <!--              :class="{this:(currentWayCode === 'ALI_GLOBAL_APP')}">-->
            <!--              <img src="@/assets/payTestImg/ali_jsapi.svg" class="paydemo-type-img"><span-->
            <!--                class="color-change">支付宝APP支付</span>-->
            <!--            </div>-->

            <div
              class="paydemo-type color-change"
              v-show="appPaywayList.indexOf('WX_GLOBAL_NATIVE') >= 0"
              @click="changeCurrentWayCode('WX_GLOBAL_NATIVE', 'codeImgUrl')"
              :class="{this:(currentWayCode === 'WX_GLOBAL_NATIVE')}">
              <img src="@/assets/payTestImg/wx_native.svg" class="paydemo-type-img"><span
                class="color-change">扫码支付</span>
            </div>
            <div
              class="paydemo-type color-change"
              v-show="appPaywayList.indexOf('WX_GLOBAL_JSAPI') >= 0"
              @click="changeCurrentWayCode('WX_GLOBAL_JSAPI', 'codeImgUrl')"
              :class="{this:(currentWayCode === 'WX_GLOBAL_JSAPI')}">
              <img src="@/assets/payTestImg/wx_native.svg" class="paydemo-type-img"><span
                class="color-change">JSAPI支付</span>
            </div>

          </div>

          <div class="paydemo-type-name article-title" v-show="showQtTitle()">其它支付</div>
          <div class="paydemo-type-body">
            <div
              class="paydemo-type color-change"
              v-show="appPaywayList.indexOf('WX_JSAPI') >= 0 || appPaywayList.indexOf('ALI_JSAPI') >= 0"
              @click="changeCurrentWayCode('QR_CASHIER', 'codeImgUrl')"
              :class="{this:(currentWayCode === 'QR_CASHIER')}">
              <img src="@/assets/payTestImg/qr_cashier.svg" class="paydemo-type-img"><span
                class="color-change">聚合主扫</span>
            </div>

            <div
              class="paydemo-type color-change"
              @click="changeCurrentWayCode('WEB_CASHIER', 'codeImgUrl')"
              :class="{this:(currentWayCode === 'WEB_CASHIER')}">
              <img src="@/assets/payTestImg/qr_cashier.svg" class="paydemo-type-img"><span
                class="color-change">WEB收银台</span>
            </div>

            <div
              class="paydemo-type color-change"
              v-show="appPaywayList.indexOf('WX_BAR') >= 0 || appPaywayList.indexOf('ALI_BAR') >= 0"
              @click="changeCurrentWayCode('AUTO_BAR', 'codeImgUrl')"
              :class="{this:(currentWayCode === 'AUTO_BAR')}">
              <img src="@/assets/payTestImg/auto_bar.svg" class="paydemo-type-img"><span
                class="color-change">聚合被扫</span>
            </div>

            <div
              class="paydemo-type color-change"
              v-show="appPaywayList.indexOf('PP_PC') >= 0"
              @click="changeCurrentWayCode('PP_PC', 'payurl')"
              :class="{this:(currentWayCode === 'PP_PC')}">
              <img src="@/assets/payTestImg/pp_pc.svg" class="paydemo-type-img"><span
                class="color-change">PayPal支付</span>
            </div>
          </div>
        </div>

        <a-divider></a-divider>
        <!-- 订单信息 -->
        <div class="paydemo-type-content">
          <div class="paydemo-type-name article-title">支付信息</div>
          <form class="layui-form">
            <div class="paydemo-form-item">
              <label>订单编号：</label><span id="payMchOrderNo">{{ mchOrderNo }}</span>
              <span @click="randomOrderNo" class=" paydemo-btn" style="padding:0 3px">刷新订单号</span>
            </div>
            <div class="paydemo-form-item">
              <label>订单标题：</label>
              <a-input v-model="orderTitle" style="width: 200px"/>
            </div>

            <div class="paydemo-form-item">
              <label>货币：</label>
              <a-input v-model="currency" style="width: 200px"/>
            </div>

            <div class="paydemo-form-item">
              <label>openId：</label>
              <a-input v-model="openId" style="width: 200px"/>
            </div>

            <div class="paydemo-form-item">
              <label>osType：</label>
              <a-input v-model="osType" style="width: 200px"/>
            </div>

            <div class="paydemo-form-item">
              <label>分账方式：</label>
              <a-radio-group v-model="divisionMode" style="display:flex">
                <div style="display:flex">
                  <a-radio :value="0">订单不分账</a-radio>
                  <a-radio :value="1">支付完成自动分账</a-radio>
                  <a-radio :value="2">手动分账（冻结商户资金， 只能通过API发起分账后解冻）</a-radio>
                </div>
              </a-radio-group>
            </div>

            <a-divider></a-divider>

            <div class="paydemo-form-item">
              <span>支付金额(元)：</span>

              <a-radio-group name="radioGroup" :default-value="1" style="display:flex">
                <div @click="amountInput=false" style="display:flex">
                  <a-radio :value="1" @click="paytestAmount=1">￥1.00</a-radio>
                  <a-radio :value="2" @click="paytestAmount=2">￥2.00</a-radio>
                  <a-radio :value="3" @click="paytestAmount=3">￥3.00</a-radio>
                  <a-radio :value="4" @click="paytestAmount=4">￥4.00</a-radio>
                  <a-radio :value="5" @click="paytestAmount=5">￥5.00</a-radio>
                </div>
                <a-radio @click="amountInputShow">
                  <span style="margin-right:3px">自定义金额</span>
                  <a-input-number
                    ref="amountInputFocus"
                    :max="100000"
                    :min="0.01"
                    v-show="amountInput"
                    v-model="paytestAmount"
                    :precision="2">
                  </a-input-number>
                </a-radio>
              </a-radio-group>
            </div>

            <div style="margin-top:20px;text-align: left">
              <!-- <span style="color: #FD482C;font-size: 18px;padding-right: 10px;" id="amountShow">{{ paytestAmount }}</span> -->
              <a-button
                @click="immediatelyPay"
                style="padding:5px 20px;background-color: #1953ff;border-radius: 5px;color:#fff">立即支付
              </a-button>
            </div>
          </form>
        </div>
      </div>
    </a-card>
    <!-- 二维码弹窗 -->
    <pay-test-modal ref="payTestModal" @closeBarCode="$refs.payTestBarCode.visible = false"></pay-test-modal>

    <!-- 条码弹框 -->
    <pay-test-bar-code
      ref="payTestBarCode"
      @barCodeValue="barCodeChange"
      @CodeAgainChange="testCodeChange"></pay-test-bar-code>
  </div>
</template>

<script>
import { API_URL_MCH_APP, req, payTest, payTestOrder } from '@/api/manage' // 接口
import PayTestModal from './PayTestModal' // 二维码对话框组件
import PayTestBarCode from './PayTestBarCode' // 条码对话框组件
export default {
  props: {},
  components: { PayTestModal, PayTestBarCode },
  data () {
    return {
      mchAppList: [], // app列表
      appId: '', // 已选择的appId
      appPaywayList: [], // 商户app支持的支付方式
      currentWayCode: '', // 以何种方式进行支付，默认是微信二维码
      currentPayDataType: '', // 支付参数
      mchOrderNo: '', // 模拟商户订单号
      authCode: '', // 条码的值
      paytestAmount: '1', // 支付金额，默认为0.01
      amountInput: false, // 自定金额输入框是否展示
      noConfigText: false, // 尚无任何配置分割线提示文字
      divisionMode: 0, // 订单分账模式
      orderTitle: '接口调试', // 订单标题
      currency: 'SGD',
      openId: null,
      osType: null
    }
  },

  mounted () {
    // 获取传入的参数，如果参数存在，则为appId 重新赋值
    const appId = this.$route.params.appId
    if (appId) {
      this.appId = appId // appId赋值
      this.appPaywayListHandle(appId) // 调用appPaywayListHandle，展示支付方式
    }

    const that = this // 提前保留this
    // 请求接口，获取所有的appid，只有此处进行pageSize=-1传参
    req.list(API_URL_MCH_APP, { pageSize: -1 }).then(res => {
      that.mchAppList = res.records
      if (that.mchAppList.length > 0) {
        // 赋予默认值
        that.appId = that.mchAppList[0].appId
        // 根据appId的值，动态显示支付方式
        this.appPaywayListHandle(that.appId)
      }
    })

    // 在进入页面时刷新订单号
    this.randomOrderNo()
  },
  methods: {

    // 支付板块是否展示
    payTestShow () {
      // 如果未选择appid，或者支付方式列表为0，则不显示支付体验板块
      if (this.appId === '' || this.appPaywayList.length === 0) {
        return false
      } else {
        return true
      }
    },

    changeCurrentWayCode (wayCode, currentPayDataType) { // 切换支付方式
      this.currentWayCode = wayCode
      this.currentPayDataType = currentPayDataType
    },

    // 变更 appId的事件
    changeAppId (value) {
      this.appPaywayListHandle(value) // 根据appId的值，动态显示支付方式
    },

    // 刷新订单号
    randomOrderNo () {
      this.mchOrderNo = 'M' + new Date().getTime() + Math.floor(Math.random() * (9999 - 1000) + 1000)
    },

    // 获取条码的值
    barCodeChange (value) {
      this.authCode = value
      this.immediatelyPay()
    },

    // 根据不同的appId展示不同的支付方式(在下拉框切换时和在携带参数进入页面时调用)
    appPaywayListHandle (value) {
      if (!value) {
        this.appPaywayList = []
        return false
      }
      const that = this
      payTest(value).then(res => {
        that.appPaywayList = res
        if (res.length === 0) {
          that.noConfigText = true
        } else {
          that.noConfigText = false
        }
      })
    },
    // 立即支付按钮
    immediatelyPay () {
      // 判断支付金额是否为0
      if (!this.paytestAmount || this.paytestAmount === 0.00) {
        return this.$message.error('请输入支付金额')
      }

      // 判断是否选择支付方式
      if (this.currentWayCode === '') {
        return this.$message.error('请选择支付方式')
      }

      // 请输入订单标题
      if (!this.orderTitle || this.orderTitle.length > 20) {
        return this.$message.error('请输入正确的订单标题[20字以内]')
      }

      // 判断是否为条码支付
      if (!this.$refs.payTestBarCode.getVisible() && (this.currentWayCode === 'WX_BAR' || this.currentWayCode === 'ALI_BAR' || this.currentWayCode === 'AUTO_BAR')) {
        this.$refs.payTestBarCode.showModal()
        return
      }

      const that = this
      payTestOrder({
        // jsapi 默认使用聚合二维码支付
        wayCode: (this.currentWayCode === 'WX_JSAPI' || this.currentWayCode === 'ALI_JSAPI') ? 'QR_CASHIER' : this.currentWayCode, // 支付方式
        amount: this.paytestAmount, // 支付金额
        appId: this.appId, // appId
        mchOrderNo: this.mchOrderNo, // 订单编号
        payDataType: this.currentPayDataType, // 支付参数（二维码，条码）
        authCode: this.authCode,
        divisionMode: this.divisionMode,
        orderTitle: this.orderTitle,
        currency: this.currency,
        openId: this.openId,
        osType: this.osType
      }).then(res => {
        that.$refs.payTestModal.showModal(this.currentWayCode, res) // 打开弹窗
        that.randomOrderNo() // 刷新订单号
      }).catch(() => {
        that.$refs.payTestBarCode.processCatch()
        that.randomOrderNo() // 刷新订单号
      })
    },

    // 此处判断，微信，支付宝，聚合码，哪种支付方式一个都没配置，如果未配置，则不显示该板块，若等于-1 则表示不存在
    showTitle (parameterA) {
      if (this.appPaywayList.toString().indexOf(parameterA) === -1) {
        return false
      } else {
        return true
      }
    },
    // 聚合支付标题显示
    showQtTitle () {
      if (this.appPaywayList.toString().indexOf('WX') !== -1 || this.appPaywayList.toString().indexOf('ALI') !== -1 || this.appPaywayList.toString().indexOf('PP_PC') !== -1) {
        return true
      } else {
        return false
      }
    },

    // 自定义金额输入框是否展示
    amountInputShow () {
      this.$nextTick(() => { // 输入框默认展示焦点
        this.$refs.amountInputFocus.focus()
      })
      this.amountInput = true
      this.paytestAmount = ''
    },

    // 条码弹窗点击x或者蒙版关闭
    testCodeChange () {
      this.randomOrderNo() // 刷新订单号
    }

    // handleCloseBarCode () {
    //   this.$refs.payTestBarCode.visible = false
    // }
  }
}
</script>

<style scoped lang="css">
@import './payTest.css';
</style>
