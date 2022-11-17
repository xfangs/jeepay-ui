<template>

  <a-modal
    title="商户二维码"
    :visible="visible"
    width="10%"
    @ok="visible = false"
    @cancel="visible = false"
  >
    <QrcodeVue v-if="value" :value="value"></QrcodeVue>
  </a-modal>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
import request from '@/http/request'

export default {
  name: 'StaticQRCode',
  components: {
    QrcodeVue
  },
  data () {
    return {
      visible: false,
      value: null
    }
  },
  methods: {
   async show (mchNo) {
      this.visible = true

     const data = await request.request({ url: '/api/sysConfigs/applicationConfig', method: 'GET' }, true, true, false)

     const conf = data.filter(item => item.configKey === 'payFrontEndSiteUrl')[0]
      this.value = conf.configVal + '/' + mchNo
    }
  }

}
</script>

<style scoped>

</style>
