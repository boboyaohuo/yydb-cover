<template>
<div class="content" style="padding-bottom:50px;">
  <!--遮罩层1绑定-->
  <div id="mask1" v-show="isMaskOne" class='payModal'>
    <div style="background: #FFFFFF;border-radius: 8px; width: 80%; height: 275px; margin: 143px 10%;">
      <div style="text-align: center;background: #EEEEEE; border-radius: 8px 8px 0 0;
				 line-height: 49px; font-size: 16px;color: #333333;">绑定手机号,获取抢购资格
        <span style="float: right; margin-right: 16px;" @click='close1'>
					 <img src="http://download.dl.quzhuan.me/image/sdk/h5/quxiao.png" alt="" style="width: 16px; height: 16px;"/>
				 </span>
      </div>
      <div style="width:90%;margin-left:5%;margin-top:15px;text-indent:2%;line-height:36px;
			font-size:14px;color:#CCCCCC;border:1px solid #EEEEEE;">
        <input type="number" v-model="re_phone" placeholder="请输入您的手机号码" style="width:100%;">
      </div>
      <div style="width:90%;margin-left:5%;margin-top:15px;text-indent:2%;line-height:36px; height:36px;
			font-size:14px;color:#CCCCCC;border:1px solid #EEEEEE;">
        <input type="text" v-model="re_code1" placeholder="请输入图片验证码">
        <img id="imgObj" alt="" style="width:95px; height:34px; float: right;" @click="huanyizhang" :src="img" />
      </div>
      <div style="width:90%;margin-left:5%;margin-top:15px;text-indent:2%;line-height:36px;
			font-size:14px;color:#CCCCCC;border:1px solid #EEEEEE;">
        <input type="number" v-model="re_code" placeholder="请输入手机验证码">
        <span v-show='codeS' @click='sendCode' style="float: right;color: #D43047; text-align: center; border: 1px solid #D43047;
				 border-radius: 3px;text-indent: 0;line-height: 20px; padding:3px; margin: 4px 5px;">获取验证码</span>
        <span v-show='codeT' style="float: right;color: #D43047; text-align: center; border: 1px solid #D43047;
				 border-radius: 3px;text-indent: 0;line-height: 20px; padding:3px; margin-top:5px;">{{time}}后重新发送</span>
      </div>
      <div @click='toRegister' style="width:90%;margin-left:5%;margin-top:15px;line-height:36px;
			font-size:14px;color:#ffffff; background: #D43047; border-radius: 5px; text-align:center;">
        前往购买
      </div>
    </div>
  </div>
  <!--遮罩层2新人专享活动-->
  <div id="mask2" v-show="isMaskTwo" class='payModal'>
    <div style="width:80%; margin:100px 10%;position:relative">
      <img @click='xrQQ' src="http://download.dl.quzhuan.me/image/sdk/h5/tequan.png" alt="" style="width: 100%; height:100%;" />
      <span style="position:absolute; right:0;top:0;" @click='close2'>
				<img src="http://download.dl.quzhuan.me/image/sdk/h5/quxiao.png" alt="" style="width: 16px; height: 16px; "/>
			</span>
    </div>
  </div>
  <!-- banner轮播图 -->
  <div class="swiper-container" id="swiper1" style="width:100%;height:auto;min-height:33%;">
    <div class="infinite-scroll-preloader" id="s1">
      <div class="preloader" style="vertical-align:middle;">
      </div>
    </div>
    <div class="swiper-wrapper">
      <div v-for="slide in slides" class="swiper-slide" @click='bannerToW(slide.adUrl)'>
        <img :src="slide.bannerUrl" alt="" style="width: 100%;height:auto;">
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
  <!-- banner选项 -->
  <div class="row no-gutter">
    <div class="col-25" v-for="x in banner_titles">
      <a v-link="{ path: x.link }" external>
        <img :src="x.img" alt="" class="titles_img" />
        <p class="titles_title">{{x.title}}</p>
      </a>
    </div>
  </div>
  <!-- 滚动喇叭 -->
  <div class="swiper-container" id="swiper2">
    <img src="http://download.dl.quzhuan.me/image/sdk/h5/horn@2x.png" alt="" />
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="x in horn">
        <span class="span1">恭喜<span style="color:red;margin:0 5px;">{{x.name}}</span>获得<span>{{x.goods}}</span></span>
      </div>
    </div>
  </div>
  <!-- 人气价格排序 -->
  <div class="row no-gutter sort" :class="{'fixed':isFixed}">
    <div class="col-50" @click="tabPopularity"><span :class="{'redColor':isPopularity}" style="display: inline-block;width: 32%;">人气</span></div>
    <div class="col-50" @click="tabPrice">
      <span :class="{'redColor':isPrice}" style="display: inline-block;width: 32%;position:relative;">
				价格
				<span class="iconfont icon-shang" style="position:absolute;top:-5px;font-size:14px;"
              :style="isBig?{color:'#D43047'}:{color:'#777'}"></span>
      <span class="iconfont icon-xia" style="position:absolute;bottom:-5px;font-size:14px;" :style="!isBig?{color:'#D43047'}:{color:'#777'}"></span>
      </span>
    </div>
  </div>
  <!-- 商品列表 -->
  <div class="row no-gutter goods">
    <div class="col-50" v-for="x in goods">
      <div class='haha' v-link="{name:'details', params:{number:x.number,from:from}}" style="position:relative;">
        <img src="http://download.dl.quzhuan.me/image/sdk/h5/10p.png" alt="10" style="width:20%;position:absolute;top:10px;left:10px;" v-show="x.region==10?true:false" />
        <img v-lazy="x.goodsIcon" alt="" class="goodsImg" />
      </div>
      <div class="twoHang">
        <p>
          {{x.goodsName}}
        </p>
      </div>
      <div class="goods_bottom">
        <div>
          总需<span>{{x.totalStock}}</span>人次
        </div>
        <div>
          <div class="styleObject" :style="{width:x.precent}">

          </div>
        </div>
        <div>
          剩余<span>{{x.usableStock}}</span>人次
        </div>
        <span @click="purchase(x.goodsName,x.region,x.usableStock,x.totalStock,x.number)">立即购买</span>
      </div>
    </div>
  </div>
  <!-- 加载提示符 -->
  <div class="infinite-scroll-preloader" id="s2">
    <div class="preloader" style="vertical-align:middle"></div>
    <!-- 加载中 -->
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
<router-view></router-view>
</template>

<script>
import $ from 'zepto';
import Swiper from 'Swiper';
export default {
  data() {
    return {
      token: window.localStorage ? window.localStorage.getItem('token') : this.getCookie('token'),
      re_phone: '',
      re_code: '',
      re_code1: '',
      goodsNumm: '',
      isMaskOne: false,
      isMaskTwo: false,
      isPopularity: true, // 是否为人气排行
      isPrice: false, // 是否为价格排行
      isBig: true, // 是否为升序排行
      isFixed: false, // 是否fixed
      modalIsShow: false, // 是否显示模态
      tenB: false, // 是否为十元商品
      currentPay: 5, // 当前购买数量
      appNumber: this.$route.query.appNumber,
      currentNumber: '', // 当前商品id
      currentRegion: '', // 当前价格区域
      currentUse: '', // 当前可购买人次
      currentAll: '', // 当前总人次
      currentName: '', // 当前商品名称
      probability: '', // 中奖概率
      goods: [], // 商品data
      from: '', // 途径
      slides: [], // 轮播data
      banner_titles: [{
        img: 'http://download.dl.quzhuan.me/image/sdk/h5/ten.png',
        title: '十元专区',
        link: '/home/tenGoods'
      }, {
        img: 'http://download.dl.quzhuan.me/image/sdk/h5/open.png',
        title: '秒开商品',
        link: '/home/secondK'
      }, {
        img: 'http://download.dl.quzhuan.me/image/sdk/h5/announce.png',
        title: '即将揭晓',
        link: '/home/coming'
      }, {
        img: 'http://download.dl.quzhuan.me/image/sdk/h5/help.png',
        title: '帮助中心',
        link: '/message'
      }], // banner下的选项区
      horn: [], // 喇叭data
      codeT: false,
      codeS: true,
      time: '60',
      fileName: '',
      img: ''
    };
  },
  methods: {
    // 商品 list 的 sort 方法
    close1: function() {
      this.isMaskOne = false;
    },
    close2: function() {
      this.isMaskTwo = false;
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
      var expiresDays = time; // 将date设置为n天以后的时间
      date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000); // 格式化为cookie识别的时间
      document.cookie = key + '=' + val + ';expires=' + date.toGMTString(); // 设置cookie
    },
    delCookie: function(key) {
      var date = new Date();
      date.setTime(date.getTime() - 10000);
      document.cookie = key + '=v; expires =' + date.toGMTString();
    },
    xrQQ: function() {
      if (this.token) {
        // 有token的情况
        this.$http.get('http://api.ubaytop.com/platform/api/v1/index/pop/check ', {
          params: {
            token: this.token
          }
        }).then(
          function(res) {
            this.goodsNumm = res.body.data.goodsNum;
            console.log(res.body.data.goodsNum);
            this.$http.post('http://api.ubaytop.com/platform/api/v1/goods/latest/detail', {}, {
              params: {
                token: this.token,
                from: 'activity',
                goodsNum: this.goodsNumm,
                appNumber: this.appNumber
              }
            }).then(
              function(res) { // 根据返回结果判断是否设置成功
                console.log(res);
                if (res.body.code === 0) {
                  //	console.log(res.data.goods.number);
                  this.bannerToW(res.body.data.goods.number);
                }
              });
          }
        );
      } else {
        // 没有token的情况
        this.isMaskTwo = false;
        this.isMaskOne = true;
      }
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
            this.huanyizhang();
            $.toast(res.body.msg);
          }
        });
    },
    toRegister() {
      if (this.re_phone === '') {
        $.alert('请填写电话号码');
        return;
      };
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
      this.$http.post('http://api.ubaytop.com/platform/api/v1/user/simple/login/platform/wap', {}, {
        params: {
          // name: this.re_name,
          mobile: this.re_phone,
          //	password: md5(this.re_pass),
          code: this.re_code,
          appNumber: this.appNumber
        }
      }).then(
        function(res) { // 根据返回结果判断是否设置成功
          console.log(res);
          if (res.body.code === 0) {
            window.localStorage.setItem('token', res.body.data.token);
            this.token = window.localStorage.getItem('token');
            $.toast('恭喜您，绑定成功');
            // this.$route.router.go({
            // 	path: '/home'
            // });
            this.$http.get('http://api.ubaytop.com/platform/api/v1/index/pop/check ', {
              params: {
                token: this.token
              }
            }).then(
              function(res) {
                this.goodsNumm = res.body.data.goodsNum;
                console.log(res.body.data.goodsNum);
                this.$http.post('http://api.ubaytop.com/platform/api/v1/goods/latest/detail', {}, {
                  params: {
                    token: this.token,
                    from: 'activity',
                    goodsNum: this.goodsNumm,
                    appNumber: this.appNumber
                  }
                }).then(
                  function(res) { // 根据返回结果判断是否设置成功
                    console.log(res);
                    if (res.body.code === 0) {
                      //	console.log(res.data.goods.number);
                      this.bannerToW(res.body.data.goods.number);
                    }
                  });
              }
            );
          } else {
            $.alert(res.body.msg);
            // $.toast('注册失败，请稍后重试');
          }
        });
    },
    tabPopularity: function() {
      this.isPopularity = true;
      this.isPrice = false;
      this.isBig = true;
      this.$http.get('http://api.ubaytop.com/platform/api/v1/index/goods/list', {
        params: {
          appNumber: this.appNumber,
          field: 'hot',
          page: '1'
        }
      }).then(
        function(res) {
          this.$set('goods', res.body.data.list);
        }
      );
    },
    // 从banner跳转到详情页或者活动页面
    bannerToW: function(param) {
      if (param.length > 14) {
        // 跳转活动页面
        if (this.token) {
          window.location.href = param + '?token=' + this.token;
        } else {
          window.location.href = param;
        }
      } else {
        // 跳转详情页面
        this.$route.router.go({
          name: 'details',
          params: {
            from: 'banner',
            number: param
          }
        });
      }
    },
    tabPrice: function() {
      this.isPopularity = false;
      this.isPrice = true;
      if (this.isBig === false) {
        this.isBig = true;
        this.$http.get('http://api.ubaytop.com/platform/api/v1/index/goods/list', {
          params: {
            appNumber: this.appNumber,
            price: 'ASC',
            page: '1'
          }
        }).then(
          function(res) {
            this.$set('goods', res.body.data.list);
          }
        );
      } else {
        this.isBig = false;
        this.$http.get('http://api.ubaytop.com/platform/api/v1/index/goods/list', {
          params: {
            appNumber: this.appNumber,
            price: 'DESC',
            page: '1'
          }
        }).then(
          function(res) {
            this.$set('goods', res.body.data.list);
          }
        );
      }
    },
    // 弹出购买模态
    purchase: function(goodsName, region, usableStock, totalStock, number) {
      this.currentName = goodsName;
      this.currentRegion = region;
      this.currentUse = usableStock;
      this.currentAll = totalStock;
      this.currentNumber = number;
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
    },
    huanyizhang() {
      this.$http.get('http://api.ubaytop.com/platform/api/v1/message/validateCode').then(function(res) {
        this.img = 'data:image/png;base64,' + res.body.data.file;
        this.fileName = res.body.data.validateCode;
        console.log(this.fileName);
      });
    }
  },
  created() {
    // 获取数据
    this.$http.get('http://api.ubaytop.com/platform/api/v1/index/banner/list', {
      params: {
        appNumber: this.appNumber,
        type: '1',
        device: '4'
      }
    }).then(
      function(res) {
        console.log(res);
        this.$set('slides', res.body.data.list);
        $('#s1').remove();
      }
    );
    this.$http.get('http://api.ubaytop.com/platform/api/v1/index/roll/show').then(
      function(res) {
        this.$set('horn', res.body.data.list);
      }
    );
    this.$http.get('http://api.ubaytop.com/platform/api/v1/index/goods/list', {
      params: {
        appNumber: this.appNumber,
        field: 'hot',
        page: '1'
      }
    }).then(
      function(res) {
        this.$set('goods', res.body.data.list);
        this.from = res.body.data.from;
        $('#s2').remove();
      }
    );
  },
  ready() {
 if (this.$route.query.token) {
  // if (window.localStorage) {
     window.localStorage.setItem('token', this.$route.query.token);
  // } else {
  //   this.setCookie('token', this.$route.query.token, 24);
  // }
 }
    if (this.token) {
      // console.log(this.token);
      // 有token的情况
      this.$http.get('http://api.ubaytop.com/platform/api/v1/index/pop/check', {
        params: {
          token: this.token
        }
      }).then(
        function(res) {
          console.log(res);
          if (res.body.data.type === 1) {
            this.isMaskTwo = false;
          } else {
            this.isMaskTwo = true;
          }
        }
      );
    } else {
      console.log('ikoiji');
      // 没有token的情况
      //	if (window.sessionStorage.getItem('xrMark')) {
      //		this.isMaskTwo = false;
      //	} else {
      this.isMaskTwo = true;
      //		window.sessionStorage.setItem('xrMark', '1');
      //	}
    }
    this.$http.get('http://api.ubaytop.com/platform/api/v1/message/validateCode').then(function(res) {
      console.log(res);
      this.img = 'data:image/png;base64,' + res.body.data.file;
      this.fileName = res.body.data.validateCode;
      //	console.log(this.fileName);
    });
    var that = this;
    var page = 1;
    //		this.appNumber = this.$route.query.appNumber;
    //	$.alert(this.appNumber);
    $('.content').on('scroll', function() {
      if (this.scrollTop >= (this.scrollHeight - this.clientHeight - 600)) {
        page++;
        if (that.isPopularity === true && page <= 10) {
          that.$http.get('http://api.ubaytop.com/platform/api/v1/index/goods/list', {
            params: {
              appNumber: that.appNumber,
              field: 'hot',
              page: page
            }
          }).then(
            function(res) {
              for (var i in res.body.data.list) {
                that.goods.push(res.body.data.list[i]);
              }
            },
            function(error) {
              console.log(error);
            }
          );
        } else if (that.isPrice === true && that.isBig === true) {
          that.$http.get('http://api.ubaytop.com/platform/api/v1/index/goods/list', {
            params: {
              appNumber: that.appNumber,
              price: 'DESC',
              page: page
            }
          }).then(
            function(res) {
              for (var i in res.body.data.list) {
                that.goods.push(res.body.data.list[i]);
              }
            }
          );
        } else if (that.isPrice === true && that.isBig === false) {
          that.$http.get('http://api.ubaytop.com/platform/api/v1/index/goods/list', {
            params: {
              appNumber: that.appNumber,
              price: 'ASC',
              page: page
            }
          }).then(
            function(res) {
              for (var i in res.body.data.list) {
                that.goods.push(res.body.data.list[i]);
              }
            }
          );
        }
      }
    });
    Swiper('#swiper1', {
      autoplay: 3000, // 可选选项，自动滑动
      loop: false, // 循环轮播
      autoplayDisableOnInteraction: false, // 手触后继续轮播
      observer: true, // 修改swiper自己或子元素时，自动初始化swiper
      observeParents: true, // 修改swiper的父元素时，自动初始化swiper
      pagination: '.swiper-pagination',
      paginationClickable: true,
      effect: 'fade'
    });
    Swiper('#swiper2', {
      autoplay: 2000, // 可选选项，自动滑动
      direction: 'vertical', // 竖直轮播
      loop: true, // 轮播循环
      swipeHandler: '.swipe-handler', // 不可手触滑动
      observer: true, // 修改swiper自己或子元素时，自动初始化swiper
      observeParents: true // 修改swiper的父元素时，自动初始化swiper
    });
  }
};
</script>

<style>
#s1 {
  width: 100%;
  position: absolute;
  top: 25%;
  margin: 0;
}

#swiper1 {
  padding: 0;
}

.content {
  width: 100%;
}

.titles_img {
  width: 50%;
  height: 50%;
  margin: 10px auto 0px;
}

.titles_title {
  color: #333;
  font-size: 12px;
  margin: 0px;
}

.col-25 {
  text-align: center;
}

#swiper2 {
  height: 36px;
  width: 100%;
  margin-top: 15px;
  background: #EEE;
  line-height: 36px;
  position: relative;
}

#swiper2 img {
  width: 20px;
  position: absolute;
  top: 7px;
  left: 15px;
}

#swiper2 .span1 {
  position: absolute;
  top: 0px;
  left: 13%;
  width: 75%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 12px;
  color: #333333;
}

.redColor {
  border-bottom: 1px solid #D43047;
  color: #D43047!important;
}

.sort {
  box-shadow: 0 1px 0 0 #EEEEEE;
  width: 100%;
  background: #FFF;
  max-width: 650px;
}

.fixed {
  position: fixed;
  top: 0;
  z-index: 19;
}

.sort div {
  font-size: 14px;
  text-align: center;
  color: #777;
  line-height: 36px;
}

.goods {
  box-sizing: border-box;
}

.goods>div:nth-child(odd) {
  border-right: 1px solid #EEE;
}

.goods>div:nth-child(even) {
  border-right: 1px solid #FFF;
}

.goods>div {
  border-bottom: 1px solid #EEE;
}

@media screen and (max-width: 600px) {
  .goods .haha {
    height: 7.5rem;
  }
}

.goodsImg {
  width: 70%;
  margin: 5.5% 15% 5.5% 15%;
}

.twoHang {
  height: 20px;
}

.twoHang p {
  display: -webkit-box;
  width: 84%;
  margin: 0 9.5%;
  font-size: 14px;
  color: #333333;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  word-break: break-all;
  -webkit-box-orient: vertical;
}

.goods_bottom {
  width: 84%;
  margin: 4.3% 9.5%;
  font-size: 12px;
  color: #777;
  line-height: 17px;
  position: relative;
}

.goods_bottom div:nth-child(2) {
  width: 50%;
  height: 2px;
  background: #D8D8D8;
  border-radius: 7px;
  margin-top: 5px;
  margin-bottom: 5px;
}

.goods_bottom span:nth-child(4) {
  border: 1px solid #D43047;
  border-radius: 4px;
  padding: 4px;
  color: #D43047;
  position: absolute;
  right: 0;
  top: 30%;
}

.styleObject {
  background: red;
  height: 2px;
  zIndex: 9;
}

.payModal {
  max-width: 650px;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0px;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
}

.payTable {
  width: 100%;
  height: 230px;
  background: #fff;
  position: absolute;
  bottom: 0px;
}

.payHeader p {
  margin: 0;
  font-size: 15px;
  line-height: 40px;
  text-align: center;
}

.payHeader span {
  font-size: 20px;
  color: #D43047;
  display: block;
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  position: absolute;
  top: 0px;
  right: 0px;
}

.payBody {
  width: 92%;
  height: 36px;
  margin: 0 auto;
}

.payBody1 {
  position: relative;
  height: 36px;
  overflow: hidden;
  color: #D43047;
}

.payBody1 span:nth-child(1) {
  text-align: center;
  display: inline-block;
  width: 17.5%;
  line-height: 34px;
  border: 1px solid #D43047;
  position: absolute;
  left: 0;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

.payBody1 input {
  appearance: none;
  text-align: center;
  display: inline-block;
  width: 65%;
  line-height: 34px;
  border-top: 1px solid #D43047;
  border-bottom: 1px solid #D43047;
  border-radius: 0;
  position: absolute;
  left: 17.5%;
}

.payBody1 span:nth-child(3) {
  text-align: center;
  display: inline-block;
  width: 17.4%;
  line-height: 34px;
  border: 1px solid #D43047;
  position: absolute;
  left: 82.5%;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

.payBody2 {
  margin-top: 10px;
  height: 36px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  color: #D43047;
}

.payBody2 div {
  width: 20%;
  border: 1px solid #D43047;
  border-radius: 4px;
  text-align: center;
  line-height: 34px;
}

.payBody3 {
  margin-top: 20px;
  line-height: 34px;
  height: 36px;
  overflow: hidden;
  font-size: 13px;
}

.payBody3 span:nth-child(1) {
  color: #D43047;
}

.payBody3 span:nth-child(2) {
  color: #36a3ff;
}

.payBody3 span:nth-child(3) {
  color: #D43047;
  float: right;
}

.payBody3 span:nth-child(4) {
  float: right;
}

.payfooter {
  height: 36px;
  border-radius: 4px;
  background-color: #D43047;
  color: #FFF;
  text-align: center;
  line-height: 34px;
}

@media only screen and (min-width:320px) and (max-width:374px) {
  #mask1 input {
    width: 111px !important;
  }
}
</style>
