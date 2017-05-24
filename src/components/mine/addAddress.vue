<template>
<div class="page page-current" style="background:#FFF;">
  <div class="header">
    <img src="http://download.dl.quzhuan.me/image/sdk/h5/back.png" alt="" @click="back" />
    <h2>添加地址</h2>
  </div>
  <div style="margin: 44px auto;">
    <ul class="adressList">
      <li>
        <span>收货人</span>
        <p><input type="text" v-model="ADname" placeholder="请输入真实姓名" /></p>
      </li>
      <li>
        <span>手机号码</span>
        <p><input type="number" v-model="ADphone" placeholder="请输入手机号码" /></p>
      </li>
      <li>
        <span>QQ号码</span>
        <p><input type="number" v-model="ADqq" placeholder="请输入QQ号码" /></p>
      </li>
      <li>
        <span>地区</span>
        <p><input id="demo1" v-model="ADarea" type="text" placeholder="请选择地区" /></p>
      </li>
      <li style="height: 99px">
        <span>详细地址</span>
        <p><input type="text" v-model="ADdetail" placeholder="请输入详细地址" /></p>
      </li>
    </ul>
    <div style="height: 48px;width: 100%;background: #ffffff;border-bottom:1px solid #EEE;">
      <span style="float: left;
        width: 48%;
        height: 48px;
        line-height: 48px;
        font-size: 15px;
        text-align: left;
        color: #777777;
        padding-left: 20px;">设置默认地址</span>
      <label for="chk" style="float: right;height: 48px;font-size: 14px;line-height:52px;padding:0 25px;">
          <img v-if="chk?true:false" src="http://download.dl.quzhuan.me/image/sdk/h5/right@3x.png" style="width:15px;"
               alt="">
          <span v-if="!chk?true:false"
                style="width:15px;height:15px;border:1px solid #777;border-radius:50%;display:inline-block;"></span>
        </label>
      <input type="checkbox" v-model="chk" checked="checked" value='1' style="float: right;height: 28px; margin-right: 25px;font-size: 15px;margin-top: 10px;visibility:hidden;" id="chk" />
      <!-- <div class="list-block" style="margin:0 0 0 15px;width:95%;">
          <label class="label-checkbox item-content" style="padding:0 0;height:48px;line-height:48px;min-height:0;">
            <div class="item-title" style="font-size:15px;">
              设置默认地址
            </div>
            <div class="item-after">
              <input type="checkbox" name="my-radio" v-model="chk">
              <div class="item-media">
                <i class="icon icon-form-checkbox"></i>
              </div>
            </div>
          </label>
        </div> -->
    </div>
    <p style="padding: 8px 20px; color:#777777;font-size:13px; ">
      (实物收货地址用户实物奖品中奖后发货,最多可添加三个收货地址,QQ号码填写用于Q币等虚拟商品中奖后充值使用)</p>
    <div class="saveAdress" @click="saveAdress()">保存</div>
  </div>
</div>
</template>
<script>
import $ from 'zepto';
export default {
  data() {
    return {
      token: window.localStorage ? window.localStorage.getItem('token') : this.getCookie('token'),
      chk: '0',
      ADname: '',
      ADphone: '',
      ADqq: '',
      ADarea: '',
      ADdetail: '',
      province: '',
      city: '',
      county: ''
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
    back() {
      if (window.localStorage) {
        window.localStorage.removeItem('adid');
        window.localStorage.removeItem('adname');
        window.localStorage.removeItem('admobile');
        window.localStorage.removeItem('adqq');
        window.localStorage.removeItem('adarea');
        window.localStorage.removeItem('adstreet');
        window.history.go(-1);
      } else {
        this.delCookie('adid');
        this.delCookie('adname');
        this.delCookie('admobile');
        this.delCookie('adqq');
        this.delCookie('adarea');
        this.delCookie('adstreet');
        window.history.go(-1);
      }
    },
    saveAdress() { // 保存地址操作
      console.log(this.ADarea);
      if (this.ADphone == null) {
        $.alert('请填写电话号码');
        return;
      }
      if (this.ADname == null) {
        $.alert('请填写收货人姓名');
        return;
      }
      var myreg = /^0?1[3|4|5|8][0-9]\d{8}$/;
      if (!myreg.test(this.ADphone)) {
        $.alert('请输入11位手机号码');
        return;
      }
      // 省市区校验
      if (this.ADarea == null) {
        $.alert('请选择地区');
        return;
      }
      if (this.ADdetail == null) {
        $.alert('请填写详细地址');
        return;
      }
      this.province = this.ADarea.split(' ')[0];
      this.city = this.ADarea.split(' ')[1];
      this.county = this.ADarea.split(' ')[2];
      console.log(this.city);
      $.showIndicator();
      // 判断是不是编辑地址的情况
      if (window.localStorage.getItem('adname') || this.getCookie('adname')) {
        this.$http.post('http://api.ubaytop.com/platform/api/v1/user/address/update', {}, {
          params: {
            token: this.token,
            id: this.ADid,
            name: this.ADname,
            mobile: this.ADphone,
            qq: this.ADqq,
            country: '中国',
            province: this.province,
            city: this.city,
            county: this.county ? this.county : this.city,
            street: this.ADdetail,
            status: this.chk ? 1 : 2
          }
        }).then(
          function(res) { // 根据返回结果判断是否设置成功
            console.log(res);
            if (res.body.code === 0) {
              $.hideIndicator();
              $.alert('保存成功');
              // this.refresh();
              this.$route.router.go({
                path: 'address'
              });
            } else {
              $.hideIndicator();
            }
          });
      } else {
        this.$http.post('http://api.ubaytop.com/platform/api/v1/user/save/address', {}, {
          params: {
            token: this.token,
            name: this.ADname,
            mobile: this.ADphone,
            qq: this.ADqq,
            country: '中国',
            province: this.province,
            city: this.city,
            county: this.county ? this.county : this.city,
            street: this.ADdetail,
            status: this.chk ? 1 : 2
          }
        }).then(
          function(res) { // 根据返回结果判断是否设置成功
            console.log(res);
            if (res.body.code === 0) {
              $.hideIndicator();
              $.alert('保存成功');
              // this.refresh();
              this.$route.router.go({
                path: 'address'
              });
            } else {
              $.hideIndicator();
            }
          });
      }
    }
  },
  ready() {
    $('#demo1').cityPicker({
      toolbarTemplate: '<header class="bar bar-nav"><button class="button button-link pull-right close-picker">确定</button><h1 class="title">选择收货地址</h1></header>'
    });
    if (window.localStorage) {
      if (window.localStorage.getItem('adname')) {
        this.ADid = window.localStorage.getItem('adid');
        this.ADname = window.localStorage.getItem('adname');
        this.ADphone = window.localStorage.getItem('admobile');
        this.ADqq = window.localStorage.getItem('adqq');
        this.ADarea = window.localStorage.getItem('adarea');
        this.ADdetail = window.localStorage.getItem('adstreet');
      }
    } else {
      if (this.getCookie('adname')) {
        this.ADid = this.getCookie('adid');
        this.ADname = this.getCookie('adname');
        this.ADphone = this.getCookie('admobile');
        this.ADqq = this.getCookie('adqq');
        this.ADarea = this.getCookie('adarea');
        this.ADdetail = this.getCookie('adstreet');
      }
    }
  }
};
</script>
<style>
.adressList {}

.adressList li {
  background: #ffffff;
  width: 100%;
  height: 48px;
  border-bottom: 1px solid #eeeeee;
}

.adressList span {
  float: left;
  width: 33%;
  height: 48px;
  line-height: 48px;
  font-size: 15px;
  text-align: left;
  color: #777777;
  padding-left: 20px;
}

.adressList p {
  float: left;
  width: 61%;
  height: 48px;
}

.adressList li input {
  float: left;
  width: 100%;
  height: 28px;
  font-size: 15px;
  margin-top: 8px;
  color: #333333;
}

.saveAdress {
  width: 85%;
  height: 38px;
  line-height: 38px;
  text-align: center;
  color: #FFFFFF;
  background: #D43047;
  border-radius: 5px;
  margin: 0 auto;
}
</style>
