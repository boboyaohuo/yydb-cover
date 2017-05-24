<template>
<div class="page page-current">
  <header class="bar bar-nav">
    <a class="icon icon-left pull-left" style="color:#D43047;" v-link="{path:'/home'}"></a>
    <h1 class="title">登录</h1>
  </header>
  <div class="content">
    <div style="font-size:16px;line-height:50px;">
      <div style="float:left;width:50%;text-align:center;" @click="yanzhengma" :class="{'a':yi}">
        验证码登录
      </div>
      <div style="float:left;width:50%;text-align:center;" @click="zhanghao" :class="{'a':!yi}">
        账号登录
      </div>
    </div>
    <div style="width:100%;">
      <img src="http://download.dl.quzhuan.me/image/sdk/h5/touxiang.png" alt="" style="margin:10% 40% 30% 40%;width:20%;">
    </div>
    <div style="position:relative;" v-if="!yi">
      <div v-show='codeS' @click='sendCode' style="color:#008AFF;font-size:14px;position:absolute;right:5%;top:100px;">
        发送验证码
      </div>
      <div v-show='codeT' style="color:#008AFF;font-size:14px;position:absolute;right:5%;top:100px;">
        {{time}}后重新发送
      </div>
      <img src="http://download.dl.quzhuan.me/image/sdk/h5/lr_phone.png" style="position:absolute;width:28px;top:4px;left:10%;" alt="">
      <img src="http://download.dl.quzhuan.me/image/sdk/h5/lr_mima.png" style="position:absolute;width:28px;top:50px;left:10%;" alt="">
      <img src="http://download.dl.quzhuan.me/image/sdk/h5/lr_mima.png" style="position:absolute;width:28px;top:96px;left:10%;" alt="">

      <div style="width:90%;margin-left:5%;text-indent:20%;line-height:36px;font-size:14px;color:#CCCCCC;border-bottom:1px solid #EEEEEE;">
        <input type="text" v-model="l_name" placeholder="请输入手机号">
      </div>

      <div style="width:90%;margin-left:5%;margin-top:10px;text-indent:20%;line-height:36px;font-size:14px;color:#CCCCCC;border-bottom:1px solid #EEEEEE;">
        <input type="text" v-model="l_code" placeholder="请输入验证码">
        <img id="imgObj" alt="" style="position:absolute; top:50px;width:100px;right:20%;" :src="img" />
        <span style="position:absolute;right:5%;color:#008AFF" @click="huanyizhang">换一张</span>
      </div>

      <div style="width:90%;margin-left:5%;margin-top:10px;text-indent:20%;line-height:36px;font-size:14px;color:#CCCCCC;border-bottom:1px solid #EEEEEE;">
        <input type="password" v-model="l_pass" placeholder="请输入手机验证码">
      </div>

      <div @click='tol' style="width:90%;background:#008AFF;border-radius:4px;text-align:center;height:39px;line-height:39px;color:#FFF;margin-left:5%;margin-top:10%;">
        登录
      </div>
    </div>


    <div style="position:relative;" v-if="yi">
      <img src="http://download.dl.quzhuan.me/image/sdk/h5/lr_phone.png" style="position:absolute;width:28px;top:4px;left:10%;" alt="">
      <img src="http://download.dl.quzhuan.me/image/sdk/h5/lr_mima.png" style="position:absolute;width:28px;top:50px;left:10%;" alt="">
      <div style="width:90%;margin-left:5%;text-indent:20%;line-height:36px;font-size:14px;color:#CCCCCC;border-bottom:1px solid #EEEEEE;">
        <input type="text" v-model="lg_name" placeholder="请输入手机号或用户名">
      </div>
      <div style="width:90%;margin-left:5%;margin-top:10px;text-indent:20%;line-height:36px;font-size:14px;color:#CCCCCC;border-bottom:1px solid #EEEEEE;">
        <input type="password" v-model="lg_pass" placeholder="请输入密码">
      </div>
      <div @click='tologin' style="width:90%;background:#008AFF;border-radius:4px;text-align:center;height:39px;line-height:39px;color:#FFF;margin-left:5%;margin-top:10%;">
        登录
      </div>
      <p style="margin-top:5%;font-size:12px;">
        <span @click='toFo' style="float:left;margin-left:5%;color:#999999;">忘记密码？</span>
        <span @click='toRe' style="float:right;color:#008Aff;margin-right:5%;">立即注册</span>
      </p>
    </div>
  </div>
</div>
</div>
</template>
<style>
.a {
  color: #008aff;
  background: #f7f7f8;
}
</style>
<script>
import $ from 'zepto';
import md5 from 'md5';
export default {
  data() {
    return {
      lg_name: '',
      lg_pass: '',
      l_name: '',
      l_code: '',
      l_pass: '',
      appNumber: this.$route.query.appNumber,
      codeT: false,
      codeS: true,
      time: '60',
      fileName: '',
      img: '',
      yi: false
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
    toRe() {
      this.$route.router.go({
        path: 'register'
      });
    },
    toFo() {
      this.$route.router.go({
        path: 'forgetPsw'
      });
    },
    tologin() {
      console.log('res');
      this.$http.post('http://api.ubaytop.com/platform/api/v1/user/login/platform/wap', {}, {
        params: {
          name: this.lg_name,
          password: md5(this.lg_pass),
          appNumber: this.appNumber
        }
      }).then(
        function(res) { // 根据返回结果判断是否设置成功
          if (this.lg_name === '') {
            $.alert('请输入电话号码');
            return;
          };
          if (this.lg_pass === '') {
            $.alert('请输入密码');
            return;
          };
          // var myreg = /^0?1[3|4|7|5|8][0-9]\d{8}$/;
          // if (!myreg.test(this.lg_name)) {
          //   $.alert('请输入11位手机号码');
          //   return;
          // };
          console.log(res);
          if (res.body.code === 0) {
            $.toast('恭喜您！登录成功');
            if (window.localStorage) {
              window.localStorage.setItem('token', res.body.data.token);
              // 存入local里面的token；然后可以跳转到 个人中心页面了哈哈哈
              this.$route.router.go({
                path: 'home'
              });
            } else {
              this.setCookie('token', res.body.data.token, 24);
              // 存入local里面的token；然后可以跳转到 个人中心页面了哈哈哈
              this.$route.router.go({
                path: 'home'
              });
            }
          } else {
            $.toast(res.body.msg);
          }
        });
    },
    sendCode() {
      if (this.l_name === '') {
        $.alert('请填写手机号码');
        return;
      };
      var myreg = /^0?1[3|4|7|5|8][0-9]\d{8}$/;
      if (!myreg.test(this.l_name)) {
        $.alert('请输入11位手机号码');
        return;
      };
      this.$http.post('http://api.ubaytop.com/platform/api/v1/message/send/verifyCode', {}, {
        params: {
          mobile: this.l_name,
          fileName: this.fileName,
          code: this.l_code
        }
      }).then(
        function(res) { // 根据返回结果判断是否设置成功
          console.log(res);
          if (res.body.code === 0) {
            $.toast('验证码发送成功');
            this.codeT = true;
            this.codeS = false;
            var that = this;
            var time = window.setInterval(function() {
              that.time--;
              if (that.time <= 0) {
                that.codeT = false;
                that.codeS = true;
                that.time = 60;
                window.clearInterval(time);
              };
            }, 1000);
          } else {
            $.toast(res.body.msg);
          }
        });
    },
    tol() {
      this.$http.post('http://api.ubaytop.com/platform/api/v1/user/simple/login/platform/wap', {}, {
        params: {
          mobile: this.l_name,
          code: this.l_pass,
          appNumber: this.appNumber
        }
      }).then(
        function(res) { // 根据返回结果判断是否设置成功
          if (this.l_name === '') {
            $.alert('请输入电话号码');
            return;
          };
          if (this.l_pass === '') {
            $.alert('请输入密码');
            return;
          };
          // var myreg = /^0?1[3|4|7|5|8][0-9]\d{8}$/;
          // if (!myreg.test(this.lg_name)) {
          //   $.alert('请输入11位手机号码');
          //   return;
          // };
          console.log(res);
          if (res.body.code === 0) {
            $.toast('恭喜您！登录成功');
            if (window.localStorage) {
              window.localStorage.setItem('token', res.body.data.token);
              // 存入local里面的token；然后可以跳转到 个人中心页面了哈哈哈
              this.$route.router.go({
                path: 'home'
              });
            } else {
              this.setCookie('token', res.body.data.token, 24);
              // 存入local里面的token；然后可以跳转到 个人中心页面了哈哈哈
              this.$route.router.go({
                path: 'home'
              });
            }
          } else {
            $.toast(res.body.msg);
          }
        });
    },
    huanyizhang() {
      this.$http.get('http://api.ubaytop.com/platform/api/v1/message/validateCode').then(function(res) {
        this.img = 'data:image/png;base64,' + res.body.data.file;
        this.fileName = res.body.data.validateCode;
        console.log(this.fileName);
      });
    },
    yanzhengma() {
      this.yi = false;
    },
    zhanghao() {
      this.yi = true;
    }
  },
  ready() {
    this.$http.get('http://api.ubaytop.com/platform/api/v1/message/validateCode').then(function(res) {
      console.log(res);
      this.img = 'data:image/png;base64,' + res.body.data.file;
      this.fileName = res.body.data.validateCode;
      console.log(this.fileName);
    });
  }
};
</script>
