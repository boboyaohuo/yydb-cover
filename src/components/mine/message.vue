<template>
<div class="page page-current">
  <div class="header">
    <img src="http://download.dl.quzhuan.me/image/sdk/h5/back.png" alt="" @click="back" />
    <h2>帮助中心</h2>
  </div>
  <div class="content" style="background:#eeeeee;padding-top:44px;">
    <div class="content-block-title">1.怎样查看我参与的奖品有没有获得？</div>
    <div class="card" style="box-shadow:none;">
      <div class="card-content">
        <div class="card-content-inner">
          每件奖品揭晓结果公布之后，登陆一元夺宝，进入“我的“，在”夺宝记录“中即可查询揭晓情况。
        </div>
      </div>
    </div>
    <div class="content-block-title">2.我获得了奖品还需要支付其他费用吗？</div>
    <div class="card" style="box-shadow:none;">
      <div class="card-content">
        <div class="card-content-inner">
          不需要支付其它价格费用。
        </div>
      </div>
    </div>
    <div class="content-block-title">3.当我获得奖品后我该做什么？</div>
    <div class="card" style="box-shadow:none;">
      <div class="card-content">
        <div class="card-content-inner">

          在您获得奖品后您会收到站内信、短信通知。在这之后您必须在“一元趣筹”上正确填写真实的收货地址，完善您你的个人信息。我们会在您获得奖品3个工作日内通过电话方式与您取得联系。

        </div>
      </div>
    </div>
    <div class="content-block-title">4.你们的奖品是正品吗？怎么保证？</div>
    <div class="card" style="box-shadow:none;">
      <div class="card-content">
        <div class="card-content-inner">
          一元趣筹承诺，所有奖品100%正品，可享受厂家所提供的全国联保服务，享受奖品的保修、换货和退货的义务（国家三包政策）。
        </div>
      </div>
    </div>
    <div class="content-block-title">5.我收到奖品可以换货或者退货吗? </div>
    <div class="card" style="box-shadow:none;">
      <div class="card-content">
        <div class="card-content-inner">
          非质量问题，不在三包范围内，不给予退换货。
        </div>
      </div>
    </div>
    <div class="content-block-title">6.参与夺宝需要注意什么？ </div>
    <div class="card" style="box-shadow:none;">
      <div class="card-content">
        <div class="card-content-inner">
          请务必正确填写真实有效的联系电话、收货地址以便在您获得奖品时能及时与您取得联系。
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<style>
.content-block-title {
  margin: 0.75rem 0.75rem 0.5rem;
}
</style>
<script type="text/ecmascript-6">
export default {
  methods: {
    back: function() {
      window.history.go(-1);
    }
  }
};
</script>
