<template>
<div class="page page-current" style="background:#FFF;">
  <div class="header">
    <img src="http://download.dl.quzhuan.me/image/sdk/h5/back.png" alt="" v-link="{path: '/home'}" />
    <h2>即将揭晓</h2>
  </div>
  <div class="content" style="margin-top:44px;">
    <div class="none" v-show="show">
      <img src="http://download.dl.quzhuan.me/image/sdk/h5/bgNolist.png" alt="" />
      <p style="margin-top:20px;">
        没有商品哦！
      </p>
    </div>
    <div class="goods_wrapper">
      <ul>
        <li v-for="x in goods" class="goods_item" style="display:flex; padding:5px 0;border-bottom:1px solid #EEE;">
          <div style=" width:10% ;flex: 0 0 28%;"  v-link="{name:'details', params:{number:x.number,from:from}}">
            <img src="http://download.dl.quzhuan.me/image/sdk/h5/10p.png" alt="10" style="width:20px;position:absolute;top:10px;left:10px;" v-show="x.region==10?true:false"/>
            <img :src="x.goodsIcon" alt="" style="width:80%;height: auto;margin-left:10%;" />
          </div>
          <div style="flex:0 0 80%">
            <div class="twoHang" v-link="{name:'details', params:{number:x.number,from:from}}">
              <p style="margin-left:0;">
                {{x.goodsName}}
              </p>
            </div>
            <div class="goods_bottom" style="margin-left:0;">
              <div v-link="{name:'details', params:{number:x.number,from:from}}">
                总需<span>{{x.totalStock}}</span>人次
              </div>
              <div v-link="{name:'details', params:{number:x.number,from:from}}">
                <div class="styleObject" :style="{width:x.precent}">
                </div>
              </div>
              <div v-link="{name:'details', params:{number:x.number,from:from}}">
                剩余<span>{{x.usableStock}}</span>人次
              </div>
              <span @click="purchase(x.goodsName,x.region,x.usableStock,x.totalStock,x.number)">立即购买</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
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
<style>

</style>
<script>
import $ from 'zepto';
export default {
  data() {
    return {
      goods: '',
      from: '',
      show: false,
      modalIsShow: false, // 是否显示模态
			tenB: false, // 是否为十元商品
			currentPay: 5, // 当前购买数量
			currentNumber: '', // 当前商品id
			currentRegion: '', // 当前价格区域
      appNumber: this.$route.query.appNumber,
			currentUse: '', // 当前可购买人次
			currentAll: '', // 当前总人次
      currentName: '', // 当前商品名称
			probability: '' // 中奖概率
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
    // 弹出购买模态
		purchase: function(goodsName, region, usableStock, totalStock, number) {
			this.currentRegion = region;
			this.currentUse = usableStock;
			this.currentAll = totalStock;
			this.currentNumber = number;
      this.currentName = goodsName;
			this.$router.app.isIndex = false;
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
		},
		purchaseOff: function() {
			this.modalIsShow = false;
			this.currentPay = 5;
			this.$router.app.isIndex = true;
			$('.payBody2').children().css({
				'background-color': '#FFF',
				'color': '#D43047'
			});
		},
		purchaseRight: function() {
			if (this.currentPay > 0) {
				this.$router.app.allPay = this.currentPay * this.currentRegion;
				this.$router.app.goodsNumber = this.currentNumber;
				this.$router.app.buyCount = this.currentPay;
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
				this.$route.router.go({
					path: '/orderPay'
				});
			} else {
				$.alert('金额不能为0');
			}
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
    this.$http.get('http://api.ubaytop.com/platform/api/v1/goods/release/list', {
      params: {
        appNumber: this.appNumber,
        type: '4',
        page: '1'
      }
    }).then(function(res) {
      console.log(res);
      if (res.body.data.list.length === 0) {
        this.show = true;
      } else {
        this.show = false;
      };
      this.goods = res.body.data.list;
      this.from = res.body.data.from;
    });
    var that = this;
    var page = 1;
    $('.content').on('scroll', function() {
      if (this.scrollTop >= (this.scrollHeight - this.clientHeight - 500)) {
        page++;
        that.$http.get('http://api.ubaytop.com/platform/api/v1/goods/release/list', {
          params: {
            appNumber: that.appNumber,
            type: '2',
            page: page
          }
        }).then(function(res) {
          for (var i in res.body.data.list) {
            that.goods.push(res.body.data.list[i]);
          }
        });
      }
    });
  }
};
</script>
