<template>
<div class="page page-current">
  <header class="bar bar-nav">
    <a class="icon icon-left pull-left" style="color:#D43047;" @click="back"></a>
    <h1 class="title">注册</h1>
  </header>
  <div class="content">
    <div style="width:100%;">
      <img src="http://download.dl.quzhuan.me/image/sdk/h5/touxiang.png" alt="" style="margin:15% 40% 20% 40%;width:20%;">
    </div>
    <div style="position:relative;">
      <div v-show='codeS' @click='sendCode' style="color:#008AFF;font-size:14px;position:absolute;right:5%;top:146px;">
        发送验证码
      </div>
      <div v-show='codeT' style="color:#008AFF;font-size:14px;position:absolute;right:5%;top:146px;">
        {{time}}后重新发送
      </div>
      <img src="http://download.dl.quzhuan.me/image/sdk/h5/lr_phone.png" style="position:absolute;width:28px;top:4px;left:10%;" alt="">
      <img src="http://download.dl.quzhuan.me/image/sdk/h5/lr_yzm.png" style="position:absolute;width:28px;top:96px;left:10%;" alt="">
      <img src="http://download.dl.quzhuan.me/image/sdk/h5/lr_yzm.png" style="position:absolute;width:28px;top:142px;left:10%;" alt="">
      <img src="http://download.dl.quzhuan.me/image/sdk/h5/lr_mima.png" style="position:absolute;width:28px;top:50px;left:10%;" alt="">
      <!-- <img src="http://download.dl.quzhuan.me/image/sdk/h5/lr_mima.png" style="position:absolute;width:28px;top:96px;left:10%;" alt=""> -->
      <!-- <img src="http://download.dl.quzhuan.me/image/sdk/h5/lr_name.png" style="position:absolute;width:28px;top:4px;left:10%;" alt=""> -->

      <div style="width:90%;margin-left:5%;margin-top:10px;text-indent:15%;line-height:36px;font-size:14px;color:#CCCCCC;border-bottom:1px solid #EEEEEE;">
        <input type="text" v-model="re_phone" placeholder="请输入手机号">
      </div>
      <div style="width:90%;margin-left:5%;margin-top:10px;text-indent:15%;line-height:36px;font-size:14px;color:#CCCCCC;border-bottom:1px solid #EEEEEE;">
        <input type="password" v-model="re_pass" placeholder="设置密码">
      </div>
      <!-- <div style="width:90%;margin-left:5%;margin-top:10px;text-indent:15%;line-height:36px;font-size:14px;color:#CCCCCC;border-bottom:1px solid #EEEEEE;">
        <input type="password" v-model="re_pass1" placeholder="重复密码">
      </div> -->

      <div style="width:90%;margin-left:5%;margin-top:10px;text-indent:15%;line-height:36px;font-size:14px;color:#CCCCCC;border-bottom:1px solid #EEEEEE;">
        <input type="text" v-model="re_code1" placeholder="请输入验证码">
        <img id="imgObj" alt="" style="position:absolute; top:96px;width:100px;right:20%;" :src="img"/>
        <span style="position:absolute;right:5%;color:#008AFF" @click="huanyizhang">换一张</span>
      </div>
      <div style="width:90%;margin-left:5%;margin-top:10px;text-indent:15%;line-height:36px;font-size:14px;color:#CCCCCC;border-bottom:1px solid #EEEEEE;">
        <input type="number" v-model="re_code" placeholder="请输入手机验证码">
      </div>
      <div @click='toRegister' style="width:90%;background:#008AFF;border-radius:6px;text-align:center;height:39px;line-height:39px;color:#FFF;margin-left:5%;margin-top:10%;">
        注册
      </div>
    </div>
  </div>
</div>
</div>
</template>
<style>

</style>
<script>
import $ from 'zepto';
import md5 from 'md5';
export default {
  data() {
    return {
      re_phone: '',
      re_code: '',
      re_code1: '',
      re_pass: '',
    //  re_name: '',
      appNumber: this.$route.query.appNumber,
      codeT: false,
      codeS: true,
      time: '60',
      fileName: '',
      img: ''
    };
  },
  methods: {
    back() {
      window.history.go(-1);
    },
    sendCode() {
      if (this.re_phone === '') {
        $.alert('请填写手机号码');
        return;
      };
      var myreg = /^0?1[3|4|7|5|8][0-9]\d{8}$/;
      if (!myreg.test(this.re_phone)) {
        $.alert('请输入11位手机号码');
        return;
      };
      //  console.log('res');
      this.$http.post('http://api.ubaytop.com/platform/api/v1/message/send/verifyCode', {}, {
        params: {
          mobile: this.re_phone,
          fileName: this.fileName,
          code: this.re_code1
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
    toRegister() {
      // if (this.re_name === '') {
      //   $.alert('请输入用户名');
      //   return;
      // };
      // var myreg1 = /^[a-zA-Z][a-zA-Z0-9]{3,15}$/;
      // if (!myreg1.test(this.re_name)) {
      //   $.alert('用户名只能包含英文字母和数字！');
      //   return;
      // };
      if (this.re_phone === '') {
        $.alert('请填写电话号码');
        return;
      };
      if (this.re_pass === '') {
        $.alert('请输入您的密码！');
        return;
      };
      // if (this.re_pass !== this.re_pass1) {
      //   $.alert('密码不一致，请重新输入');
      //   return;
      // };
      var myreg = /^0?1[3|4|7|5|8][0-9]\d{8}$/;
      if (!myreg.test(this.re_phone)) {
        $.alert('请输入11位手机号码');
        return;
      };
      if (this.re_code === '') {
        $.alert('请输入验证码');
        return;
      };
      //  console.log('res');
      this.$http.post('http://api.ubaytop.com/platform/api/v1/user/register/platform/wap', {}, {
        params: {
          // name: this.re_name,
          mobile: this.re_phone,
          password: md5(this.re_pass),
          code: this.re_code,
          appNumber: this.appNumber
        }
      }).then(
        function(res) { // 根据返回结果判断是否设置成功
          console.log(res);
          if (res.body.code === 0) {
            window.localStorage.setItem('token', res.body.data.token);
            $.toast('恭喜您，注册成功');
            this.$route.router.go({
              path: '/home'
            });
          } else {
          $.alert(res.body.msg);
           // $.toast('注册失败，请稍后重试');
          }
        });
    },
    huanyizhang() {
        this.$http.get('http://api.ubaytop.com/platform/api/v1/message/validateCode').then(function(res) {
            this.img = 'data:image/png;base64,' + res.body.data.file;
            this.fileName = res.body.data.validateCode;
            console.log(this.fileName);
        });
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
