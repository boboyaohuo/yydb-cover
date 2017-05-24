<template>
<div class="page page-current">
  <div class="header">
    <img src="http://download.dl.quzhuan.me/image/sdk/h5/back.png" alt="" @click="back" />
    <h2>充值</h2>
  </div>
  <div class="content" style="padding-top:44px;">
    暂无充值功能，请使用支付宝支付。
  </div>
</div>
</template>
<style>

</style>
<script type="text/ecmascript-6">
export default {
  methods: {
    back() {
      window.history.go(-1);
    }
  }
};
</script>
