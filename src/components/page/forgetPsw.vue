<template>
  <div class="page page-current">
    <header class="bar bar-nav">
      <a class="icon icon-left pull-left" style="color:#D43047;" @click="back"></a>
      <h1 class="title">修改密码</h1>
    </header>
    <div class="content">
      <div style="position:relative; margin-top:15px;">
        <div v-show='codeS' @click='sendCode' style="color:#008AFF;font-size:14px;position:absolute;right:5%;top:100px;">
          发送验证码
        </div>
        <div v-show='codeT' style="color:#008AFF;font-size:14px;position:absolute;right:5%;top:100px;">
          发送成功
        </div>
        <img src="../../../static/img/lr_phone.png" style="position:absolute;width:28px;top:4px;left:10%;" alt="">
        <img src="../../../static/img/lr_yzm.png" style="position:absolute;width:28px;top:50px;left:10%;" alt="">
        <img src="../../../static/img/lr_yzm.png" style="position:absolute;width:28px;top:96px;left:10%;" alt="">
        <img src="../../../static/img/lr_mima.png" style="position:absolute;width:28px;top:142px;left:10%;" alt="">
        <div style="width:90%;margin-left:5%;text-indent:15%;line-height:36px;font-size:14px;color:#CCCCCC;border-bottom:1px solid #EEEEEE;">
          <input type="text" v-model="fo_phone" placeholder="请输入手机号">
        </div>
        <div style="width:90%;margin-left:5%;margin-top:10px;text-indent:15%;line-height:36px;font-size:14px;color:#CCCCCC;border-bottom:1px solid #EEEEEE;">
          <input type="text" v-model="re_code1" placeholder="请输入验证码">
          <img id="imgObj" alt="" style="position:absolute; top:50px;width:100px;right:20%;" :src="img"/>
          <span style="position:absolute;right:5%;color:#008AFF" @click="huanyizhang">换一张</span>
        </div>
        <div style="width:90%;margin-left:5%;margin-top:10px;text-indent:15%;line-height:36px;font-size:14px;color:#CCCCCC;border-bottom:1px solid #EEEEEE;">
          <input type="number" v-model="fo_code" placeholder="手机验证码">
        </div>
        <div style="width:90%;margin-left:5%;margin-top:10px;text-indent:15%;line-height:36px;font-size:14px;color:#CCCCCC;border-bottom:1px solid #EEEEEE;">
          <input type="password" v-model="fo_pass" placeholder="设置新的密码">
        </div>
        <div @click='toSubmit' style="width:90%;background:#008AFF;border-radius:6px;text-align:center;height:39px;line-height:39px;color:#FFF;margin-left:5%;margin-top:10%;">
          提交
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
      fo_phone: '',
      fo_code: '',
      fo_pass: '',
      appNumber: window.localStorage.getItem('appNumber'),
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
      if (this.fo_phone === '') {
        $.alert('请填写电话号码');
        return;
      };
      var myreg = /^0?1[3|4|7|5|8][0-9]\d{8}$/;
      if (!myreg.test(this.fo_phone)) {
        $.alert('请输入11位手机号码');
        return;
      };
      this.codeT = true;
      this.codeS = false;
      //  console.log('res');
      this.$http.post('http://123.59.49.17:8080/platform/api/v1/message/send/verifyCode', {}, {
        params: {
          mobile: this.fo_phone,
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
    toSubmit() {
      if (this.fo_phone === '') {
        $.alert('请填写电话号码');
        return;
      };
      if (this.fo_code === '') {
        $.alert('请输入验证码');
        return;
      };
      if (this.fo_pass === '') {
        $.alert('请输入您的密码！');
        return;
      };
      var myreg = /^0?1[3|4|7|5|8][0-9]\d{8}$/;
      if (!myreg.test(this.fo_phone)) {
        $.alert('请输入正确的手机号码');
        return;
      };
      //  console.log('res');
      this.$http.post('http://123.59.49.17:8080/platform/api/v1/user/reset/password', {}, {
        params: {
          mobile: this.fo_phone,
          password: md5(this.fo_pass),
          code: this.fo_code,
          appNumber: this.appNumber
        }
      }).then(
        function(res) { // 根据返回结果判断是否设置成功
          console.log(res);
          if (res.body.code === 0) {
            $.toast('修改成功');
            this.$route.router.go({path: '/login'});
          } else {
          $.alert(res.body.msg);
           // $.toast('注册失败，请稍后重试');
          }
        });
    },
    huanyizhang() {
        this.$http.get('http://123.59.49.17:8080/platform/api/v1/message/validateCode').then(function(res) {
            this.img = 'data:image/png;base64,' + res.body.data.file;
            this.fileName = res.body.data.validateCode;
            console.log(this.fileName);
        });
    }
  },
  ready() {
      this.$http.get('http://123.59.49.17:8080/platform/api/v1/message/validateCode').then(function(res) {
          console.log(res);
          this.img = 'data:image/png;base64,' + res.body.data.file;
          this.fileName = res.body.data.validateCode;
          console.log(this.fileName);
      });
  }
};
</script>
