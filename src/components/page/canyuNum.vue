<template>
  <div class="page page-current" style="overflow:scroll;padding:0;">
    <div class="header">
      <img src="http://download.dl.quzhuan.me/image/sdk/h5/back.png" alt="" @click="back" />
      <h2>参与号码</h2>
    </div>
    <div class="content" style="padding:44px 15px 0;">
      <p>
        参与号码为：
      </p>
      <span v-for="x in num" style="font-size:14px;">
        {{x.treasureNo}}
      </span>
    </div>
  </div>
</template>

<style>

</style>

<script>
import $ from 'zepto';
export default {
  data() {
    return {
      num: '',
      token: window.localStorage ? window.localStorage.getItem('token') : this.getCookie('token')
    };
  },
  methods: {
    getCookie: function(name) {
      // (^| )name=([^;]*)(;|$),match[0]为与整个正则表达式匹配的字符串，match[i]为正则表达式捕获数组相匹配的数组；
      var arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));
      if (arr != null) {
        return unescape(arr[2]);
      }
      return null;
    },
    back: function() {
      window.history.go(-1);
    }
  },
  ready() {
    var url = window.location.hash;
    this.urlNum = url.substring(url.lastIndexOf('/') + 1);
    this.$http.get('http://api.ubaytop.com/platform/api/v1/order/treasureNo/list', {
      params: {
        orderRecordId: this.urlNum,
        token: this.token,
        page: '1'
      }
    }).then(function(res) {
      this.num = res.body.data.treasureNos;
      this.$http.get('http://api.ubaytop.com/platform/api/v1/order/treasureNo/list', {
        params: {
          orderRecordId: this.urlNum,
          token: this.token,
          page: '2'
        }
      }).then(function(res) {
        for (var i in res.body.data.treasureNos) {
          this.num.push(res.body.data.treasureNos[i]);
        };
      });
      this.$http.get('http://api.ubaytop.com/platform/api/v1/order/treasureNo/list', {
        params: {
          orderRecordId: this.urlNum,
          token: this.token,
          page: '3'
        }
      }).then(function(res) {
        for (var i in res.body.data.treasureNos) {
          this.num.push(res.body.data.treasureNos[i]);
        };
      });
    });
    var that = this;
    var page = 1;
    $('.content').on('scroll', function() {
      if (this.scrollTop >= (this.scrollHeight - this.clientHeight - 500)) {
        page++;
        that.$http.get('http://api.ubaytop.com/platform/api/v1/order/treasureNo/list', {
          params: {
            orderRecordId: that.urlNum,
            token: that.token,
            page: page
          }
        }).then(function(res) {
          for (var i in res.body.data.treasureNos) {
            that.num.push(res.body.data.treasureNos[i]);
          };
        });
      }
    });
  }
};
</script>
