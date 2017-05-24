<template>
<div class="content">
  <div class="goods_sort">
    <div class="sort_menu">
      <ul>
        <li v-for="item in goodsMenu" id={{item.id}} @click="selectMenu($index,item.id)" class="menu_item" :class="{'current_item':currentIndex===$index}">
          <span class="menu_text">{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="goods_wrapper">
      <ul style="padding-left:5px;overflow: hidden;">
        <li v-for="x in goods" class="goods_item" style="display:flex; padding:2% 0 0 0 ;border-bottom:1px solid #EEEEEE;" >
          <div style=" width:10% ;flex: 0 0 28%;position:relative;margin-left:4%;margin-right:4%;" v-link="{name:'details', params:{number:x.number,from:from}}">
            <img src="http://download.dl.quzhuan.me/image/sdk/h5/10p.png" alt="" style="width:25px;position:absolute;" v-show="x.region==10?true:false">
            <img :src="x.goodsIcon" alt="" style="width:100%;height: auto" />
          </div>
          <div style=" flex:0 0 70%">
            <div class="twoHang" style="height:20px;" v-link="{name:'details', params:{number:x.number,from:from}}">
              <p style="overflow: hidden;text-overflow: ellipsis;-webkit-line-clamp: 1;word-break: break-all;margin-left:0;">
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
				<div class="payfooter" v-link="{path :'/orderPay'}" @click="purchaseRight">
					立即购买
				</div>
			</div>
		</div>
	</div>
</div>
</template>
<script>
import $ from 'zepto';
export default {
  data() {
    return {
      goodsMenu: [],
      goods: [],
      currentIndex: 0,
      from: '',
      isPopularity: true, // 是否为人气排行
			isPrice: false, // 是否为价格排行
			isBig: true, // 是否为升序排行
			isFixed: false, // 是否fixed
			modalIsShow: false, // 是否显示模态
			tenB: false, // 是否为十元商品
			currentPay: 5, // 当前购买数量
			currentNumber: '', // 当前商品id
			currentRegion: '', // 当前价格区域
			currentUse: '', // 当前可购买人次
			currentAll: '', // 当前总人次
      currentName: '', // 当前商品名称
			probability: '', // 中奖概率
      appNumber: this.$route.query.appNumber,
      currentId: '0' // 当前ID
    };
  },
  methods: {
    selectMenu(index, sortId) {
      console.log(sortId);
      this.currentIndex = index;
      this.currentId = sortId;
      // 获取数据
      this.$http.get('http://api.ubaytop.com/platform/api/v1/goods/release/list', {
        params: {
          appNumber: this.appNumber,
          type: '1',
          categoryId: sortId
        }
      }).then(
        function(res) {
          this.$set('goods', res.body.data.list);
        }
      );
    },
    // 弹出购买模态
		purchase: function(goodsName, region, usableStock, totalStock, number) {
			this.currentRegion = region;
			this.currentUse = usableStock;
			this.currentAll = totalStock;
			this.currentNumber = number;
      this.currentName = goodsName;
			this.$router.app.isIndex = false;
			console.log(this.currentNumber);
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
  created() {
    this.$http.get('http://api.ubaytop.com/platform/api/v1/goods/category/list').then(
      function(res) {
        this.$set('goodsMenu', res.body.data.list);
      }
    );
    // 获取数据
    this.$http.get('http://api.ubaytop.com/platform/api/v1/goods/release/list', {
      params: {
        appNumber: this.appNumber,
        type: '1',
        categoryId: 0
      }
    }).then(
      function(res) {
        this.$set('goods', res.body.data.list);
        this.from = res.body.data.from;
      }
    );
  },
  ready() {
    var that = this;
    var page = 1;
    $('.goods_wrapper').on('scroll', function() {
      if (this.scrollTop >= (this.scrollHeight - this.clientHeight - 300)) {
        console.log(that.currentId);
        page++;
        that.$http.get('http://api.ubaytop.com/platform/api/v1/goods/release/list', {
          params: {
          appNumber: that.appNumber,
            type: '1',
            page: page,
            categoryId: that.currentId
          }
        }).then(
          function(res) {
            for (var i in res.body.data.list) {
              that.goods.push(res.body.data.list[i]);
            };
          }
        );
      };
    });
  }
};
</script>
<style>
.goods_sort {
  width: 100%;
  display: flex;
  position: absolute;
  top: 0;
  bottom: 2.5rem;
}

.sort_menu {
  flex: 0 0 5rem;
  width: 5rem;
  background: #f7f7f7;
  overflow-y: auto;
}

.goods_wrapper {
  flex: 1;
  overflow-y: auto;
}

.menu_item {
  display: table;
  height: 2.55rem;
  width: 5rem;
  border-bottom: 1px solid #eeeeee;
}

.menu_text {
  font-size: 14px;
  display: table-cell;
  text-align: center;
  width: 5rem;
  vertical-align: middle;
}

.current_item {
  background: rgb(255, 255, 255);
  color: #D43047;
}
</style>
