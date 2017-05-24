<template>
  <div class="page page-current content" style="overflow:scroll;padding:0;">
    <div class="header">
      <img src="http://download.dl.quzhuan.me/image/sdk/h5/back.png" alt="" @click="back" />
      <h2>图文详情</h2>
    </div>
    <div style="height:44px;">
    </div>
    <img v-for="x in img" :src="x" alt="" style="width:100%;"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      img: ''
    };
  },
  methods: {
    back: function() {
      window.history.go(-1);
    }
  },
  ready() {
    var url = window.location.hash;
    this.urlNum = url.substring(url.lastIndexOf('/') + 1);
    this.$http.get('http://api.ubaytop.com/platform/api/v1/goods/image/list', {
      params: {
        goodsNum: this.urlNum
      }
    }).then(function(res) {
      this.img = res.body.data.list;
      // console.log(res.body.data.list);
    });
  }
};
</script>

<style>

</style>
