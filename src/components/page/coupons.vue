<style>
.ppp {
  flex: 1;
  line-height: 35px;
  text-align: center;
  font-size: 14px;
  color: #777777;
  border-bottom: 1px #f7f7f7 solid;
}

.redactive {
  color: #d43047;
  border-bottom: 1px #d43047 solid;
}

.youhuiquan1 {
  width: 100%;
  overflow: scroll;
  padding: 0 15px;
  font-size: 16px;
  margin-top: 40px;
}

.quan {
  background: url('http://download.dl.quzhuan.me/image/sdk/h5/yhqbg_4.png') no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 0;
  padding-bottom: 29.13%;
  margin-top: 15px;
}

.quan1 {
  background: url('http://download.dl.quzhuan.me/image/sdk/h5/yhqbg_1.png') no-repeat;
  background-size: 100% 100%;
}

.quan2 {
  background: url('http://download.dl.quzhuan.me/image/sdk/h5/yhqbg_2.png') no-repeat;
  background-size: 100% 100%;
}

.quan3 {
  background: url('http://download.dl.quzhuan.me/image/sdk/h5/yhqbg_3.png') no-repeat;
  background-size: 100% 100%;
}

.qulef1 {
  float: left;
  margin-left: 6%;
  color: #f7f7f7;
}

.qulef1 p {
  line-height: 2;
  width: 170px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.quler p {
  /*line-height: 2;*/
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.qulef2 {
  color: #848484;
}

@media only screen and (min-width:319px) and (max-width:374px) {
  .qulef1 p {
    line-height: 1.5;
  }
}

@media only screen and (min-width:415px) {
  .qulef1 p {
    line-height: 3;
  }
  .quler {
    padding: 7%;
  }
}
</style>
<template>
<div class="page page-current content" style="overflow:scroll;padding:0;">
  <div class="header">
    <img src="http://download.dl.quzhuan.me/image/sdk/h5/back.png" alt="" @click="back" />
    <h2>请选择选择优惠券</h2>
  </div>
  <div class='youhuiquan1'>
    <div class="quan" v-for="x in qunList" @click='choosed(x.id, x.amount)'>
      <div class="qulef1">
        <p style="font-size:18px;">{{x.source}}</p>
        <p>{{x.remark? x.remark : '全场通用'}}</p>
        <p>{{x.startTime1+'-'+x.endTime}}</p>
      </div>
      <div class="quler" style="float:right;">
        <p>
          <span style="color:#d43047;font-size:20px;">￥<span>  <span style="color:#d43047;font-size:40px;">{{x.amount}}</span>
        </p>
        <p style="text-align:center;">
          {{x.remark? x.remark : '全场通用'}}
        </p>
      </div>

      </li>
    </div>
  </div>
</template>
<script>
// import $ from 'zepto';
export default {
  data() {
    return {
      qunList: [],
      token: window.localStorage ? window.localStorage.getItem('token') : this.getCookie('token')
    };
  },
  methods: {
    back() {
      window.history.go(-1);
    },
    getCookie: function(name) {
      // (^| )name=([^;]*)(;|$),match[0]为与整个正则表达式匹配的字符串，match[i]为正则表达式捕获数组相匹配的数组；
      var arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));
      if (arr != null) {
        return unescape(arr[2]);
      }
      return null;
    },
    setCookie: function(key, val, time) { // 设置cookie方法
      var date = new Date(); // 获取当前时间
      var expiresDays = time; // 将date设置为n天以后的时间
      date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000); // 格式化为cookie识别的时间
      document.cookie = key + '=' + val + ';expires=' + date.toGMTString(); // 设置cookie
    },
    delCookie: function(key) {
      var date = new Date();
      date.setTime(date.getTime() - 10000);
      document.cookie = key + '=v; expires =' + date.toGMTString();
    },
    choosed(id, amount) {
      if (window.localStorage) {
        //  $.alert(id);
        window.localStorage.setItem('coupons', id + ',' + amount);
        window.history.go(-1);
      } else {
        this.setCookie('coupons', id + ',' + amount, 24);
        window.history.go(-1);
      }
    },
    formTime(ttt) {
      var time = new Date(ttt);
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      if (m < 10) {
        m = '0' + m;
      };
      var d = time.getDate();
      if (d < 10) {
        d = '0' + d;
      };
      var h = time.getHours();
      if (h < 10) {
        h = '0' + h;
      };
      var mm = time.getMinutes();
      if (mm < 10) {
        mm = '0' + mm;
      };
      var s = time.getSeconds();
      if (s < 10) {
        s = '0' + s;
      };
      return y + '.' + m + '.' + d;
    }
  },
  ready() {
    this.$http.get('http://api.ubaytop.com/platform/api/v1/pay/get/coupons', {
      params: {
        // name: this.re_name,
        buyCount: this.$route.params.count,
        token: this.token,
        goodsReleaseNum: this.$route.params.RelNum
      }
    }).then(
      function(res) { // 根据返回结果判断是否设置成功
        console.log(res);
        this.qunList = res.body.data.coupons;
        for (var i in this.qunList) {
          this.qunList[i].startTime1 = this.formTime(this.qunList[i].startTime);
          this.qunList[i].endTime = this.formTime(this.qunList[i].endTime);
        }
      });
  }
};
</script>
