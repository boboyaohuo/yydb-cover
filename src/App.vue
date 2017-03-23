<template>
<div>
  <router-view></router-view>
  <div class="tab">
    <nav class="bar bar-tab" v-if="isIndex">
      <a v-link="{path:'/home',activeClass: 'active'}" class="tab-item external active" href="#">
        <span class="icon">
          <img src="http://download.dl.quzhuan.me/image/sdk/h5/home_icon12.png" alt="" style="width:26px;">
          <img src="http://download.dl.quzhuan.me/image/sdk/h5/home_icon11.png" alt="" style="width:26px;">
        </span>
        <span class="tab-label">夺宝</span>
      </a>
      <a v-link="{path:'/sort',activeClass: 'active'}" class="tab-item external" href="#">
        <span class="icon">
          <img src="http://download.dl.quzhuan.me/image/sdk/h5/home_icon14.png" alt="" style="width:26px;">
          <img src="http://download.dl.quzhuan.me/image/sdk/h5/home_icon13.png" alt="" style="width:26px;">
        </span>
        <span class="tab-label">分类</span>
      </a>
      <a v-link="{path:'/jiexiao',activeClass: 'active'}" class="tab-item external" href="#">
        <span class="icon">
          <img src="http://download.dl.quzhuan.me/image/sdk/h5/home_icon19.png" alt="" style="width:26px;">
          <img src="http://download.dl.quzhuan.me/image/sdk/h5/home_icon18.png" alt="" style="width:26px;">
        </span>
        <span class="tab-label">揭晓</span>
      </a>
      <a v-link="{path:'/mine',activeClass: 'active'}" class="tab-item external" href="#">
        <span class="icon">
          <img src="http://download.dl.quzhuan.me/image/sdk/h5/home_icon15.png" alt="" style="width:26px;">
          <img src="http://download.dl.quzhuan.me/image/sdk/h5/home_icon16.png" alt="" style="width:26px;">
        </span>
        <span class="tab-label">我的</span>
      </a>
    </nav>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      swiper_imgs: {},
      authenticating: false,
      isIndex: true,
      allPay: '',
      goodsNumber: ''
    };
  }
};

// const postUri = 'http://106.75.31.91:8080/platform/api'; // 接口前缀
// export default {
//   data() {
//     return {
//       swiper_imgs: {}
//     };
//   },
//   created() {
//     this.$http.get(postUri + '/v1/index/banner/list', {
//       params: {
//         appNumber: '00000001',
//         type: '1',
//         device: '1'
//       }
//     }).then((response) => {
//       // response = response.body;
//       console.log(response);
//       // success callback
//     }, (response) => {
//       // error callback
//     });
//   },
//   components: {}
// };
</script>
<style rel="stylesheet" type="text/css">

</style>
