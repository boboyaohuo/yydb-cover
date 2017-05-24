<template>
<div class="page page-current">
  <div class="header">
    <img src="http://download.dl.quzhuan.me/image/sdk/h5/back.png" alt="" @click="back" />
    <h2>计算详情</h2>
  </div>
  <div class="content" style="overflow-y:auto;">
    <div style="overflow:hidden;border-bottom:1px solid #EEEEEE;padding:54px 15px 10px;">
      <p style="height: 35px;font-size: 20px;white-space:nowrap;color: #D43047;font-weight: bold;">幸运号码</p>
      <div v-if="jiexiao?false:true" style="color:#8F8F8F;">
        <p style="width: 100%;height: 20px;font-size: 14px;white-space:nowrap;">
          = 数值A/商品所需人次（取余）+ 10000001
        </p>
        <p style="width: 100%;height: 20px;font-size: 14px;white-space:nowrap;">
          = ?/{{data.totalStock}}（取余）+ 10000001
        </p>
        <p style=" width: 100%;height: 20px;font-size: 14px;white-space:nowrap;">
          = ?
        </p>
      </div>
      <div v-if="jiexiao?true:false" style="color:#8F8F8F;">
        <p style="width: 100%;height: 20px;font-size: 14px;white-space:nowrap;">
          = {{data.sum}}/{{data.totalStock}}（取余）+ 10000001
        </p>
        <p style="width: 100%;height: 20px;font-size: 14px;white-space:nowrap;">
          = {{data.mode}} + 10000001
        </p>
        <p style=" width: 100%;height: 20px;font-size: 14px;white-space:nowrap;">
          = {{data.treasureNo}}
        </p>
      </div>
      <span style="color: #D43047;height: 25px;font-size: 18px;white-space:nowrap;border-bottom: 1px solid #D43047;font-weight: bold;float:right;" @click="dakai">
        计算公式
      </span>
    </div>
    <div style="overflow:hidden;border-bottom:1px solid #EEEEEE;padding: 10px 15px;">
      <p style="color: #D43047; width: 100%;font-size: 20px;white-space:nowrap;font-weight: bold;">
        数值A
      </p>
      <p style="width: 100%;font-size: 14px;color:#8F8F8F;">
        =商品最后的一个号码分配完毕时间点前本站全部商品的最后100个参与时间之和（包含该商品的最后一个人次的参与时间）
      </p>
      <p style="width: 100%;font-size: 14px;margin-top:15px;color:#8F8F8F;" v-show="jiexiao">
        截止该商品最后参与时间【{{data.openTime}}】网站所有商品的最后100条参与时间记录：
      </p>
    </div>
    <div style="overflow:hidden;border-bottom:1px solid #EEEEEE;padding: 10px 15px;" v-show="jiexiao">
      <div style="position:relative;height:24px;font-size:16px;">
        <span style="position:absolute;left:20%;">夺宝时间</span>
        <span style="position:absolute;left:75%;">用户账号</span>
      </div>
      <div style="position:relative;font-size:12px;" v-for="x in list">
        <span>{{x.payDate}} {{x.hour}}</span><span style="color:#D43047;">({{x.payTime}})</span>
        <p style="display:inline-block;width:25%;text-align:center;position:absolute;left:72%;">{{x.userName}}</p>
      </div>
    </div>
  </div>
  <div class="payModal" v-show="gongshi" @click.self="guanbi">
    <div style="margin:40% 10%;width:80%;background:#FFF;border-radius:6px;border:2px solid #D43047;overflow:hidden;">
      <div style="text-align:center;background:#D43047;color:#FFF;height:35px;line-height:35px;position:relative;">
        计算公式
        <span class="iconfont icon-guanbi" style="position:absolute;right:10px;z-index:111;font-size:22px;" @click="guanbi"></span>
      </div>
      <p style="width:90%;font-size:13px;margin:5px auto;">
        1.取该商品最后购买时间前网站所有商品100条购买记录（限时揭晓商品取截止时间前网站所有商品100条购买时间记录）。
      </p>
      <p style="width:90%;font-size:13px;margin:5px auto;">
        2.时间按时、分、秒、毫秒一次排列组成一组数值。
      </p>
      <p style="width:90%;font-size:13px;margin:5px auto;">
        3.将这100组数值之和除以商品总需参与人次，然后取余数，余数加上10000001即为幸运号码。
      </p>
      <p style="width:90%;font-size:13px;margin:5px auto;">
        4.本活动与本手机设备生产商无关!
      </p>
      <div style="text-align:center;height:32px;width:80%;margin:10px auto;background:#D43047;border-radius:4px;line-height:32px;color:#FFF;" @click="guanbi">
        确定
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      list: '',
      gongshi: false,
      jiexiao: false,
      data: ''
    };
  },
  methods: {
    back() {
      window.history.go(-1);
    },
    dakai() {
      this.gongshi = true;
    },
    guanbi() {
      this.gongshi = false;
    }
  },
  ready() {
    var url = window.location.hash;
    this.urlNum = url.substring(url.lastIndexOf('/') + 1);
    this.$http.get('http://api.ubaytop.com/platform/api/v1/goods/open/detail', {
      params: {
        number: this.urlNum
      }
    }).then(function(res) {
      console.log(res);
      if (res.body.data.status === 3) {
        this.jiexiao = true;
      };
      this.list = res.body.data.list;
      for (var i in this.list) {
        this.list[i].hour = this.list[i].payHour.substring(0, 8);
      };
      this.data = res.body.data;
      var time = new Date(this.data.openTime);
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
      this.data.openTime = y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
    });
  }
};
</script>

<style>

</style>
