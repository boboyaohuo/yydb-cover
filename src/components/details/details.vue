<style>
#s1 {
  width: 100%;
  position: absolute;
  top: 45%;
  margin: 0;
}

#swiper1 {
  padding: 0;
}

p {
  margin: 0;
}

.bannerjxz {
  margin: 15px 15px 0 15px;
}

.bannerjxz>div:nth-child(1) {
  color: #333333;
  font-size: 17px;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.bannerjxz>div:nth-child(1) span {
  font-size: 12px;
  color: #008AFF;
  border: 1px solid #008AFF;
  border-radius: 4px;
}

.bannerjxz>p:nth-child(2) {
  color: #333333;
  font-size: 12px;
  margin: 10px 0 5px;
}

.jindu {
  background: #EEEEEE;
  width: 100%;
  height: 2px;
}

.jindu div {
  background: #D43047;
  width: 80%;
  height: 2px;
}

.bannerjxz>p:nth-child(4){
  color: #333333;
  font-size: 12px;
  margin: 5px 0 0 0;
}

.bannerjxz>p:nth-child(4) span{
  float: right;
}

.banneryjx>div:nth-child(1) {
  margin: 15px 0 0 15px;
  color: #333333;
  font-size: 17px;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.banneryjx>div:nth-child(1) span {
  font-size: 12px;
  color: #008AFF;
  border: 1px solid #008AFF;
  border-radius: 4px;
}

.yjx{
  background: #F7F7F7;
  margin-bottom: 10px;
}

.yjx>div{
  margin: 0 15px;
}

.yjx>div>p:nth-child(1){
  color: #333333;
  font-size: 12px;
  margin: 5px 0 5px;
}

.yjx>div>div:nth-child(2){
  color: #333333;
  font-size: 12px;
  margin: 5px 0 5px;
  overflow: hidden;
}

.bannerjxzh>div:nth-child(1) {
  margin: 15px 0 0 15px;
  color: #333333;
  font-size: 17px;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.bannerjxzh>div:nth-child(1) span {
  font-size: 12px;
  color: #008AFF;
  border: 1px solid #008AFF;
  border-radius: 4px;
}

.jxzh{
  background: #F7F7F7;
  margin-bottom: 10px;
}

.jxzh>div{
  margin: 0 15px;
}

.jxzh>div>p:nth-child(1){
  color: #333333;
  font-size: 12px;
  margin: 10px 0 0;
}

.jxzh>div>div:nth-child(2){
  color: #333333;
  font-size: 12px;
  overflow: hidden;
}

.canjia{
  color: #777777;
  font-size: 12px;
  background: #F7F7F7;
  height: 36px;
  line-height: 36px;
  text-indent: 15px;
}

.xiangqing{
  width: 100%;
}

.xiangqing div:nth-child(1){
  border-bottom: 1px solid #EEEEEE;
  font-size: 16px;
  height: 43px;
  line-height: 43px;
  margin-top: 5px;
  text-indent: 15px;
  overflow: hidden;
}

.xiangqing div:nth-child(1)>span{
  color: #777777;
  float: right;
  margin-right: 15px;
  font-size: 12px;
}

.xiangqing div:nth-child(1)>span span{
  width: 16px;
}

.xiangqing div:nth-child(2){
  border-bottom: 1px solid #EEEEEE;
  font-size: 16px;
  height: 43px;
  line-height: 43px;
  text-indent: 15px;
  overflow: hidden;
}

.xiangqing div:nth-child(2) span{
  color: #777777;
  width: 16px;
  float: right;
  margin-right: 30px;
}

.jilu>div:nth-child(1){
  text-indent: 15px;
  border-bottom: 1px solid #EEEEEE;
  font-size: 16px;
  height: 43px;
  line-height: 43px;
}

.jilu>div:nth-child(1) span{
  float: right;
  color: #777777;
  margin-right: 12px;
}

.jilulist{
  margin: 0 15px;
  display: flex;
}

.jilulist>img{
  width: 60px;
  height: 60px;
  margin: 10px 0;
  border-radius: 50%;
}

.jilulist>div{
  width: 80%;
  margin: 5px 0 5px 10px;
  font-size: 12px;
  color: #777777;
}

.jilulist>div>p{
  line-height:22px;
}

.jilulist>div>p:nth-child(1)>span:nth-child(1){
  color: #D43047;
}

.jilulist>div>p:nth-child(1)>span:nth-child(2){
  float: right;
}

.jilulist>div>p:nth-child(1)>span:nth-child(2) span{
  color: #008AFF;
}
.gouma{
  height: 49px;
  width: 100%;
  max-width: 650px;
  line-height: 49px;
  background: #D43047;
  color: #FFF;
  font-size: 17px;
  text-align: center;
  position: fixed;
  bottom: 0px;
  z-index: 9;
  transform: translate3d(0, 0, 0);
}

</style>
<template>
  <div class="page page-current">
    <div class="content" style="padding:0px;">
      <!-- banner轮播图 -->
      <div class="swiper-container" id="swiper1" style="width:100%;height:33%;">
        <span class="iconfont icon-zuo" style="font-size:28px;position:absolute;left:10px;z-index:99;color:#777777;"
              @click="back"></span>
        <img v-show="goods.region==10?true:false" src="../../../static/img/10p.png"
             style="width:40px;position:absolute;top:25px;left:35px;z-index:66;" alt="">
        <div class="infinite-scroll-preloader" id="s1">
          <div class="preloader" style="vertical-align:middle;"></div>
          加载中
        </div>
        <div class="swiper-wrapper">
          <div v-for="x in goods.imageList" class="swiper-slide" style="background: #ffffff;">
            <img :src="x" alt="" style="width: 100%;height:auto;">
          </div>
        </div>
        <div class="swiper-pagination" style="bottom:1%;"></div>
      </div>
      <!-- banner info -->
      <!-- 进行中 -->
      <div class="bannerjxz" v-show="goods.status==1?true:false">
        <div style="margin: 15px 0 0 0 ;">
          <span style="position:relative;bottom:1px;">进行中</span> {{goods.goodsName}}
        </div>
        <p>
          期号：{{goods.periods}}
        </p>
        <div class="jindu">
          <div :style="{width:goods.precent}" class="progress-use">
          </div>
        </div>
        <p style="margin-bottom:10px;">
          总需：{{goods.totalStock}}
          <span>剩余：{{goods.usableStock}}</span>
        </p>
      </div>
      <!-- 已揭晓 -->
      <div class="banneryjx" v-show="goods.status==3?true:false">
        <div style="width:90%;">
          <span style="position:relative;bottom:1px;">已揭晓</span> {{goods.goodsName}}
        </div>
        <div class="yjx" style="margin-top:8px;;padding:5px 0;">
          <div>
            <p style="margin:0;">
              期号：{{goods.periods}}
            </p>
            <div style="margin:0;line-height:24px;height:26px;">
              <span style="position:relative;top:-4px;">幸运号码：</span>
              <span style="color:#D43047;font-size:26px;">{{goods.treasureNo}}</span>
              <span
                style="float:right;border:1px solid #D43047;border-radius:4px;color:#D43047;line-height:18px;margin-top:3px;"
                v-link="{name: 'calculate', params: {number: urlNum}}">计算详情</span>
            </div>
            <div style="overflow:hidden;position:relative;">
              <span
                style="color:#FFF;background:#008AFF;font-size:12px;border-radius:4px;padding:0 3px;position:absolute;top:36px;">获奖者</span>
              <img v-lazy="goods.luckUserHeading" alt="头像"
                   style="width:40px;height:40px;float:left;margin-top:5px;border-radius:50%;"/>
              <div style="float:left;margin-left:15px;">
                <p style="font-size: 12px;color: #77777;line-height:22px;">
                  获奖者：
                  <span style="color:#D43047;">{{goods.luckUserName}}</span>
                </p>
                <p style="font-size: 12px;color: #77777;line-height:22px;">
                  本期参与：
                  <span style="color:#008AFF;">{{goods.luckUserCount}}</span>
                  人次
                </p>
                <p style="font-size: 12px;color: #77777;line-height:22px;">
                  揭晓时间：{{goods.time}}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 揭晓中 -->
      <div class="bannerjxzh" v-show="goods.status==2?true:false" style="margin-left:0;" style="background:#FFF;">
        <div style="width:90%;">
          <span style="position:relative;bottom:1px;">揭晓中</span> {{goods.goodsName}}
        </div>
        <div class="jxzh" style="background:#FFF;">
          <div>
            <p>
              期号：{{goods.periods}}
            </p>
            <div style="margin:0;line-height:24px;height:26px;">
              <span style="position:relative;top:-4px;">揭晓倒计时：</span>
              <span style="color:#D43047;font-size:24px;">{{time}}</span>
              <span
                style="float:right;border:1px solid #D43047;border-radius:4px;color:#D43047;line-height:18px;margin-top:3px;"
                v-link="{name: 'calculate', params: {number: urlNum}}">计算详情</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 参与 -->
      <div class="canjia">
        {{canjia}}
      </div>
      <!-- 详情 -->
      <div class="xiangqing">
        <div v-link="{name: 'imgDetails', params: {number:goods.goodsNum}}">
          图文详情
          <span>建议在WiFi下查看<span class="iconfont icon-gengduo"></span></span>
        </div>
        <div v-link="{name: 'jiexiaoDetails', params: {number:goods.goodsNum}}">
          往期揭晓
          <span class="iconfont icon-gengduo"></span>
        </div>
      </div>
      <!-- 参与记录 -->
      <div style="margin-bottom:49px;">
        <div class="jilu">
          <div>
            所有参与记录
            <span class="iconfont icon-xia"></span>
          </div>
          <div class="jilulist" v-for="x in jilu" style="border-bottom:1px solid #EEEEEE;">
            <img style="border:0;" :src="x.heading" alt=""
                 onerror="this.src='http://download.dl.quzhuan.me/image/sdk/h5/touxiang.png'"/>
            <div class="">
              <p>
                <span>{{x.userName}}</span>
                <span>参与<span>{{x.buyCount}}</span>人次</span>
              </p>
              <p>
                {{x.payIpAddress}}
              </p>
              <p>
                {{x.time}}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 立即购买 -->
    <div class="gouma" v-if="!currentGoumai?false:true">
      <div style="width:50%;background:#eee;color:#777;position:absolute;left:0;font-size:14px;">
        新一期正在抢购中...
      </div>
      <div style="position:absolute;right:0;width:50%;"
           @click="purchase(goods.goodsName,goods.region,goods.usableStock,goods.totalStock,goods.number,goods.goodsNum)">
        立即购买
      </div>
    </div>
    <div class="gouma" v-if="currentGoumai?false:true"
         @click="purchase(goods.goodsName,goods.region,goods.usableStock,goods.totalStock,goods.number,goods.goodsNum)">
      立即购买
    </div>
    <!-- 支付模态 -->
    <div class="payModal" v-show="modalIsShow" @click.self="purchaseOff">
      <div class="payTable">
        <div class="payHeader">
          <p>
            请选择参与人次
          </p>
          <span class="iconfont icon-guanbi" @click="purchaseOff"></span>
        </div>
        <div class="payBody">
          <div class="payBody1">
            <span class="iconfont icon-jian" @click="payMin"></span>
            <input type="number" name="name" v-model="currentPay" @keyup="payInt">
            <span class="iconfont icon-tianjia" @click="payAdd"></span>
          </div>
          <div class="payBody2">
            <div @click="pay5">5</div>
            <div @click="pay20">20</div>
            <div @click="pay100">100</div>
            <div @click="pay200">200</div>
          </div>
          <div class="payBody3">
            共<span>{{currentPay*currentRegion}}</span>夺宝币
            <span v-show="tenB">(10夺宝币/次)</span>
            <span>{{probability}}</span>
            <span>中奖概率为</span>
          </div>
          <div class="payfooter" @click="purchaseRight">
            立即购买
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'zepto';
import Swiper from 'Swiper';
export default {
  data() {
    return {
      goods: '',
      jilu: [],
      modalIsShow: false, // 是否显示模态
			tenB: false, // 是否为十元商品
			currentPay: 5, // 当前购买数量
			currentNumber: '', // 当前商品id
			currentRegion: '', // 当前价格区域
			currentUse: '', // 当前可购买人次
			currentAll: '', // 当前总人次
      currentName: '', // 当前商品名称
			probability: '', // 中奖概率
      currentGoumai: false, // 当前购买状态
      urlNum: '', // urlNum
      time: '1970-1-1', // time
      token: window.localStorage ? window.localStorage.getItem('token') : this.getCookie('token'),
      appNumber: this.$route.query.appNumber,
      canjia: '快来参加一元夺宝吧！'
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
				var expiresDays = time;  // 将date设置为n天以后的时间
				date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000); // 格式化为cookie识别的时间
				document.cookie = key + '=' + val + ';expires=' + date.toGMTString();  // 设置cookie
		},
delCookie: function(key) {
var date = new Date();
date.setTime(date.getTime() - 10000);
document.cookie = key + '=v; expires =' + date.toGMTString();
},
    // 弹出购买模态
		purchase: function(goodsName, region, usableStock, totalStock, number, goodsNum) {
      if (this.goods.status === 1) {
        this.currentRegion = region;
        this.currentUse = usableStock;
        this.currentAll = totalStock;
        this.currentNumber = number;
        this.currentGoods = goodsNum;
        this.currentName = goodsName;
        if (region === 1) {
          this.tenB = false;
        } else {
          this.tenB = true;
        };
        if (this.currentPay > this.currentUse) {
          this.currentPay = this.currentUse;
        };
        this.modalIsShow = true;
        this.probability = (this.currentPay / this.currentAll * 100).toFixed(2) + '%';
      } else {
        this.$http.post('http://api.ubaytop.com/platform/api/v1/goods/latest/detail', {}, {
          params: {
            goodsNum: goodsNum,
            appNumber: this.appNumber,
            from: 'goods_open_record',
            token: this.token
          }
        }).then(function(res) {
          if (res.body.data.buyCount > 0) {
            this.canjia = '您本期已经参与了' + res.body.data.buyCount + '人次';
          };
          this.goods = res.body.data.goods;
          this.currentGoumai = false;
          this.urlNum = this.goods.number;
          this.$http.get('http://api.ubaytop.com/platform/api/v1/order/release/record/list', {
            params: {
              goodsReleaseNum: this.urlNum,
              page: 1
            }
          }).then(function(res) {
            this.jilu = res.body.data.list;
            for (var i in this.jilu) {
              var time = new Date(this.jilu[i].createTime);
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
              this.jilu[i].time = y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
            }
          });
        });
      };
		},
		purchaseOff: function() {
			this.modalIsShow = false;
			this.currentPay = 5;
			$('.payBody2').children().css({
				'background-color': '#FFF',
				'color': '#D43047'
			});
		},
		purchaseRight: function() {
      if (this.currentPay === 0) {
			$.alert('金额不能为0');
			} else {
			this.$router.app.allPay = this.currentPay * this.currentRegion;
			this.$router.app.goodsNumber = this.currentNumber;
			this.$router.app.buyCount = this.currentPay;
     // window.localStorage.setItem('goodName', this.currentName);
      // window.localStorage.setItem('renci', this.currentPay);
      if (window.localStorage) {
        window.localStorage.setItem('goodName', this.currentName);
        window.localStorage.setItem('renci', this.currentPay);
      } else {
        this.setCookie('goodName', this.currentName, 24);
        this.setCookie('renci', this.currentPay, 24);
      }
			this.modalIsShow = false;
      this.currentPay = 5;
			this.$router.app.isIndex = true;
			$('.payBody2').children().css({
				'background-color': '#FFF',
				'color': '#D43047'
			});
			this.$route.router.go({path: '/orderPay'});
			};
		},
		// pay金额按钮
		pay5: function() {
			$('.payBody2').children('div:nth-child(1)').css({
				'background-color': '#D43047',
				'color': '#FFF'
			}).siblings().css({
				'background-color': '#FFF',
				'color': '#D43047'
			});
			if (this.currentUse > 5) {
				this.currentPay = 5;
			} else {
				this.currentPay = this.currentUse;
			};
			this.probability = (this.currentPay / this.currentAll * 100).toFixed(2) + '%';
		},
		pay20: function() {
			$('.payBody2').children('div:nth-child(2)').css({
				'background-color': '#D43047',
				'color': '#FFF'
			}).siblings().css({
				'background-color': '#FFF',
				'color': '#D43047'
			});
			if (this.currentUse > 20) {
				this.currentPay = 20;
			} else {
				this.currentPay = this.currentUse;
			};
			this.probability = (this.currentPay / this.currentAll * 100).toFixed(2) + '%';
		},
		pay100: function() {
			$('.payBody2').children('div:nth-child(3)').css({
				'background-color': '#D43047',
				'color': '#FFF'
			}).siblings().css({
				'background-color': '#FFF',
				'color': '#D43047'
			});
			if (this.currentUse > 100) {
				this.currentPay = 100;
			} else {
				this.currentPay = this.currentUse;
			};
			this.probability = (this.currentPay / this.currentAll * 100).toFixed(2) + '%';
		},
		pay200: function() {
			$('.payBody2').children('div:nth-child(4)').css({
				'background-color': '#D43047',
				'color': '#FFF'
			}).siblings().css({
				'background-color': '#FFF',
				'color': '#D43047'
			});
			if (this.currentUse > 200) {
				this.currentPay = 200;
			} else {
				this.currentPay = this.currentUse;
			};
			this.probability = (this.currentPay / this.currentAll * 100).toFixed(2) + '%';
		},
		payMin: function() {
			$('.payBody2').children().css({
				'background-color': '#FFF',
				'color': '#D43047'
			});
			if (this.currentPay > 0) {
				this.currentPay--;
			};
			this.probability = (this.currentPay / this.currentAll * 100).toFixed(2) + '%';
		},
		payInt: function() {
			$('.payBody2').children().css({
				'background-color': '#FFF',
				'color': '#D43047'
			});
			this.currentPay = parseInt(this.currentPay);
			if (this.currentPay > this.currentUse) {
				this.currentPay = this.currentUse;
			};
			this.probability = (this.currentPay / this.currentAll * 100).toFixed(2) + '%';
		},
		payAdd: function() {
			$('.payBody2').children().css({
				'background-color': '#FFF',
				'color': '#D43047'
			});
			if (this.currentPay < this.currentUse) {
				this.currentPay++;
			};
			this.probability = (this.currentPay / this.currentAll * 100).toFixed(2) + '%';
		}
  },
  ready() {
    if (this.$route.query.token) {
     // if (window.localStorage) {
        window.localStorage.setItem('token', this.$route.query.token);
     // } else {
     //   this.setCookie('token', this.$route.query.token, 24);
     // }
    }
    var url = window.location.hash;
    this.urlNum = url.substring(url.lastIndexOf('/') + 1);
    var from = url.substring(url.lastIndexOf('/', url.lastIndexOf('details')) + 9, url.lastIndexOf('/'));
    if (this.urlNum.substring(0, 1) === '0') {
      this.$http.post('http://api.ubaytop.com/platform/api/v1/goods/latest/detail', {}, {
        params: {
          goodsNum: this.urlNum,
          appNumber: this.appNumber,
          from: 'goods_open_record',
          token: this.token
        }
      }).then(function(res) {
        if (res.body.data.buyCount > 0) {
          this.canjia = '您本期已经参与了' + res.body.data.buyCount + '人次';
        };
        this.goods = res.body.data.goods;
        this.currentGoumai = false;
        this.urlNum = this.goods.number;
        this.$http.get('http://api.ubaytop.com/platform/api/v1/order/release/record/list', {
          params: {
            goodsReleaseNum: this.urlNum,
            page: 1
          }
        }).then(function(res) {
          this.jilu = res.body.data.list;
          for (var i in this.jilu) {
            var time = new Date(this.jilu[i].createTime);
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
            this.jilu[i].time = y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
          }
        });
      });
    } else {
      this.$http.post('http://api.ubaytop.com/platform/api/v1/goods/detail', {}, {
        params: {
          appNumber: this.appNumber,
          number: this.urlNum,
          from: from,
          token: this.token
        }
      }).then(function(res) {
        console.log(res);
        if (res.body.data.buyCount > 0) {
          this.canjia = '您本期已经参与了' + res.body.data.buyCount + '人次';
        };
        this.goods = res.body.data.goods;
        if (this.goods.luckUserHeading === null) {
          this.goods.luckUserHeading = 'http://download.dl.quzhuan.me/image/sdk/h5/touxiang.png';
        };
        var tim = new Date(res.body.data.goods.openTime);
        var y = tim.getFullYear();
        var m = tim.getMonth() + 1;
        if (m < 10) {
          m = '0' + m;
        };
        var d = tim.getDate();
        if (d < 10) {
          d = '0' + d;
        };
        var h = tim.getHours();
        if (h < 10) {
          h = '0' + h;
        };
        var mm = tim.getMinutes();
        if (mm < 10) {
          mm = '0' + mm;
        };
        var s = tim.getSeconds();
        if (s < 10) {
          s = '0' + s;
        };
        this.goods.time = y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
        if (this.goods.status !== 1) {
          this.currentGoumai = true;
        };
        var t = this.goods.countDown;
        var that = this;
        if (t > 0) {
          var time = t * 1000;
          var timer = setInterval(function() {
            var min = Math.floor(time / 1000 / 60 % 60);
            var sec = Math.floor(time / 1000 % 60);
            var msec = parseInt(time % 1000 / 10);
            if (min < 10) {
              min = '0' + min;
            };
            if (sec < 10) {
              sec = '0' + sec;
            };
            if (msec < 10) {
              msec = '0' + msec;
            };
            time = time - 10;
            that.time = min + ':' + sec + ':' + msec;
            if (min <= 0 && sec <= 0 && msec <= 0) {
              that.time = '正在揭晓';
              clearInterval(timer);
            }
          }, 10);
        } else {
          that.time = '正在揭晓';
        };
      });
    };
    this.$http.get('http://api.ubaytop.com/platform/api/v1/order/release/record/list', {
      params: {
        goodsReleaseNum: this.urlNum,
        page: 1
      }
    }).then(function(res) {
      this.jilu = res.body.data.list;
      for (var i in this.jilu) {
        if (this.jilu[i].heading === null) {
          this.jilu[i].heading = 'http://download.dl.quzhuan.me/image/sdk/h5/touxiang.png';
        };
        var time = new Date(this.jilu[i].createTime);
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
        this.jilu[i].time = y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
      }
    });
    var that = this;
    var page = 1;
    $('.content').on('scroll', function() {
      if (this.scrollTop >= (this.scrollHeight - this.clientHeight - 100)) {
        page++;
        that.$http.get('http://api.ubaytop.com/platform/api/v1/order/release/record/list', {
          params: {
            goodsReleaseNum: that.urlNum,
            page: page
          }
        }).then(function(res) {
          for (var i in res.body.data.list) {
            if (res.body.data.list[i].heading === null) {
              res.body.data.list[i].heading = 'http://download.dl.quzhuan.me/image/sdk/h5/touxiang.png';
            };
            var time = new Date(res.body.data.list[i].createTime);
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
            res.body.data.list[i].time = y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
            that.jilu.push(res.body.data.list[i]);
          }
        });
      }
    });
    Swiper('#swiper1', {
			autoplay: 2000, // 可选选项，自动滑动
			loop: false, // 循环轮播
			autoplayDisableOnInteraction: false, // 手触后继续轮播
			observer: true, // 修改swiper自己或子元素时，自动初始化swiper
			observeParents: true, // 修改swiper的父元素时，自动初始化swiper
      pagination: '.swiper-pagination', // 分页器
      effect: 'fade' // 切换效果
		});
  }
};

</script>
