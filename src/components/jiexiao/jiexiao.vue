<template>
<div class="content" style="padding-bottom:50px;">
  <div class="jiexiaoList" v-for="x in listing" v-link="{name:'details', params:{number:x.number,from:from}}" style="display:flex;align-items:center;">
    <img src="http://download.dl.quzhuan.me/image/sdk/h5/10p.png" style="width:7%;position:absolute;left:1%;top:5%;" alt="10" v-show="x.goodsRegion==10?true:false" />
    <img v-lazy="x.goodsIcon" alt="" />
    <div style="float:left;width:65%;margin:15px 0 10px 0;">
      <p class="jiexiaoName">
        {{x.goodsName}}
      </p>
      <div class="weijx">
        <p>
          期号：{{x.period}}
        </p>
        <p>
          揭晓倒计时：
        </p>
        <counter style="font-size: 17px;color: #D43047;" :endtime="x.openTime"></counter>
      </div>
    </div>
  </div>
  <div class="jiexiaoList" v-for="x in listed" v-link="{name:'details', params:{number:x.number,from:from}}" style="display:flex;align-items:center;">
    <img src="http://download.dl.quzhuan.me/image/sdk/h5/10p.png" style="width:7%;position:absolute;left:1%;top:5%;" alt="10" v-show="x.goodsRegion==10?true:false" />
    <img :src="x.goodsIcon" alt="" style="height:20%;" />
    <div style="float:left;width:65%;margin:15px 0 10px 0;">
      <p class="jiexiaoName">
        {{x.goodsName}}
      </p>
      <div class="yijx" style="position:relative;">
        <p>
          中奖者：<span style="color:#D43047">{{x.userName}}</span>
        </p>
        <p>
          本期参与：<span style="color:#038cff">{{x.userBuyCount}}</span>次
        </p>
        <p>
          期号：{{x.period}}
        </p>
        <p>
          揭晓时间：{{x.time}}
        </p>
        <img :src="x.userHeading" alt="头像" style="width:60px;height:60px;border-radius:50%;position:absolute;top:0;right:4%;" onerror="this.src='http://download.dl.quzhuan.me/image/sdk/h5/touxiang.png'"/>
      </div>
    </div>
  </div>
</div>
</template>
<style>
.jiexiaoList {
  width: 100%;
  overflow: hidden;
  position: relative;
  border-bottom: 1px solid #EEEEEE;
}

.jiexiaoList>img:nth-child(2) {
  width: 20%;
  margin: 2% 4% 2% 4%;
  float: left;
}

.jiexiaoName {
  font-size: 14px;
  color: #333333;
  line-height: 19px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.weijx p {
  font-size: 12px;
  color: #777777;
  line-height: 17px;
  margin: 5px 0;
}

.yijx p {
  font-size: 12px;
  color: #777777;
  line-height: 17px;
  margin: 5px 0;
}
</style>
<script language="JavaScript">
import $ from 'zepto';
import counter from './counter';
export default {
  data() {
    return {
      listing: '',
      listed: '',
      appNumber: this.$route.query.appNumber,
      from: 'goods_open_record'
    };
  },
  methods: {

  },
  ready() {
    this.$http.get('http://api.ubaytop.com/platform/api/v1/goods/openRecord/list', {
      params: {
        appNumber: this.appNumber,
        page: 1
      }
    }).then(function(res) {
      this.listed = res.body.data.openedList;
      for (var i in res.body.data.openedList) {
        if (res.body.data.openedList[i].userHeading === null) {
          res.body.data.openedList[i].userHeading = 'http://download.dl.quzhuan.me/image/sdk/h5/touxiang.png';
        };
        var time = new Date(res.body.data.openedList[i].lotteryTime);
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
        this.listed[i].time = y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
      };
      this.$set('listing', res.body.data.openingList);
    });
    var that = this;
    var page = 1;
    $('.content').on('scroll', function() {
      if (this.scrollTop >= (this.scrollHeight - this.clientHeight - 500)) {
        page++;
        that.$http.get('http://api.ubaytop.com/platform/api/v1/goods/openRecord/list', {
          params: {
            page: page,
            appNumber: that.appNumber
          }
        }).then(function(res) {
          for (var i in res.body.data.openedList) {
            if (res.body.data.openedList[i].userHeading === null) {
              res.body.data.openedList[i].userHeading = 'http://download.dl.quzhuan.me/image/sdk/h5/touxiang.png';
            };
            var time = new Date(res.body.data.openedList[i].lotteryTime);
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
            res.body.data.openedList[i].time = y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
            that.listed.push(res.body.data.openedList[i]);
          };
          for (var j in res.body.data.openingList) {
            if (res.body.data.openingList[i].userHeading === null) {
              res.body.data.openingList[i].userHeading = 'http://download.dl.quzhuan.me/image/sdk/h5/zw1.png';
            };
            that.listing.push(res.body.data.openingList[j]);
          };
        });
      }
    });
  },
  components: {
    counter: counter
  }
};
</script>
