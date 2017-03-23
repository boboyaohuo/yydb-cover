<template>
  <div class="content" style="padding-bottom:50px;">
    <div class="mine_message">
      <div class="mine_message_top">
        <div class="message_header"><img src="http://download.dl.quzhuan.me/image/sdk/h5/touxiang.png"/></div>
        <div>用户名:<span>{{userId}}</span></div>
        <div>余额:{{usable}}元</div>
        <!-- <div><span class="btn_charge" v-link="{ path: '/mine/charge'}" external>我要充值</span></div> -->
      </div>
      <!--<div class="mine_message_bot">-->
      <!--<p class="mes_account">余额:{{}}元</p>-->
      <!--<p class="mes_charge"><span class="btn_charge">我要充值</span></p>-->
      <!--</div>-->
    </div>
    <ul class="mine_list">
      <li v-link="{ path: '/mine/duobaoRecord'}" external>
        <span style="margin-left:0.4rem;"><img src="../../../static/img/record.png"/></span>
        <p style="width:78%;font-size:14px;margin-left:0.3rem;line-height:1.5rem;">夺宝记录</p>
        <p style="font-size:17px;line-height:1.5rem;color:#666666;"><span class="icon icon-right"></span></p>
      </li>
      <li v-link="{ path: '/mine/winrecord'}" external>
        <span style="margin-left:0.4rem;"><img src="../../../static/img/winrecord.png"/></span>
        <p style="width:78%;font-size:14px;margin-left:0.3rem;line-height:1.5rem;">中奖记录</p>
        <p style="font-size:17px;line-height:1.5rem;color:#666666;"><span class="icon icon-right"></span></p>
      </li>
      <li v-link="{ path: '/mine/bill'}" external>
        <span style="margin-left:0.4rem;"><img src="../../../static/img/detail.png"/></span>
        <p style="width:78%;font-size:14px;margin-left:0.3rem;line-height:1.5rem;">我的优惠券</p>
        <p style="font-size:17px;line-height:1.5rem;color:#666666;"><span class="icon icon-right"></span></p>
      </li>
      <li v-link="{ path: '/mine/address'}" external>
        <span style="margin-left:0.4rem;"><img src="../../../static/img/address.png"/></span>
        <p style="width:78%;font-size:14px;margin-left:0.3rem;line-height:1.5rem;">收货地址</p>
        <p style="font-size:17px;line-height:1.5rem;color:#666666;"><span class="icon icon-right"></span></p>
      </li>
      <li v-link="{ path: '/message'}" external>
        <span style="margin-left:0.4rem;"><img src="../../../static/img/message.png"/></span>
        <p style="width:78%;font-size:14px;margin-left:0.3rem;line-height:1.5rem;">帮助中心</p>
        <p style="font-size:17px;line-height:1.5rem;color:#666666;"><span class="icon icon-right"></span></p>
      </li>

    </ul>
    <div class="quitLogin" @click="quitLogin" style="width: 95%; margin:33px auto; height: 35px; line-height: 32px;font-size: 14px !important; text-align: center; color: #d43047; border: 1px solid #d43047; border-radius: 6px;">
    		退出登录
    	</div>
  </div>
  <router-view></router-view>
</template>
<style>
.mine_list li p{margin: 1em 0;}
.mine_list li{
  display:flex;
  height:3rem;
  border-bottom:1px solid #eeeeee;
}
.mine_list li p{
 color:#333333;
}
.mine_list li img{
width:2.1rem;
height:2.1rem;
display:flex;
align-items: center;
margin-left:0.1rem;
margin-top:0.45rem;
}
.mine_message{
 background-image: url('http://download.dl.quzhuan.me/image/sdk/h5/Art.jpg');
 color:#eeeeee;
 padding:1rem 0;
 font-size:14px;
}
.mine_message_bot{
 display:flex;
}

.mine_message_top div{
display:flex;
justify-content:center;
 padding:0.1rem 0;
}
.message_header{
margin:0 auto;
 width:4rem;
 height:4rem;
}
.message_header img{
 width:100%;
 height:100%;
 border-radius:50%;
}
.mine_message_bot p{
flex:1;
padding: 0 5%;
font-size:15px;
}
.mes_charge{
text-align:right;
}
.btn_charge{
    padding:2px  12px;
    border-radius: 5px;
    background-color: #D43047;
}

</style>
<script type="text/ecmascript-6">
  export default{
    data() {
      return {
        token: '',
        userId: '666',
        usable: '0'
      };
    },
    methods: {
      quitLogin() {
        window.localStorage.removeItem('token');
      //  window.localStorage.removeItem('appNumber');
        this.$route.router.go({
          path: 'home'
        });
      }
    },
    ready() {
      if (window.localStorage.getItem('token')) {
        this.token = window.localStorage.getItem('token');
        this.$http.get('http://123.59.49.17:8080/platform/api/v1/account/funds', {
          params: {
            token: this.token
          }
        }).then(
          function(res) { // 根据返回结果判断是否设置成功
            console.log(res);
            this.userId = res.body.data.funds.userId;
                  // nickName
            this.usable = res.body.data.funds.usable;
          });
        //  console.log(window.localStorage.getItem('token'));
      } else {
        this.$route.router.go({path: '/login'});
      }
    }
  };
</script>
