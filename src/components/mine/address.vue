<template>
<div class="page page-current" style="overflow:scroll;background:#FFF;">
  <div class="header">
    <img src="../../../static/img/back.png" alt="" @click="back" />
    <h2>收货地址</h2>
    <span style="position:absolute;right:15px;top:3px;width:24px;" @click="addd"><img src="../../../static/img/tianjia.png" style="width:20px;height:auto;" alt=""></span>
  </div>
  <div v-show="haveNoAdress" style="width: 218px; height: 172px; margin: 70px auto;">
    <div><img src="../../../static/img/noAdress.png" style="width: 100%; height: 100%;"></div>
    <div @click="addAdress" style="width: 130px; height: 30px;line-height: 30px; font-size: 14px; text-align: center;color: white; background: #D43047; border-radius: 5px;margin: 20px auto;">
      添加地址
    </div>
  </div>
  <div v-show="haveAdress" style="margin: 44px auto;">
    <ul>
      <li v-for="x in adressList" id={{x.id}} style="background: white; margin-top: 10px; width: 100%;border-bottom:1px solid #EEE;">
        <div style="height: 40px; line-height: 40px;padding: 0 12px; font-size:14px; border-bottom: solid 1px #eeeeee">
          <span style=" color: black; float: left ">收货地址{{x.num}}</span>
          <span style=" color: #008AFF; margin-left: 15px; float: left" v-show="x.status==1?true:false">默认地址
          <img src="http://download.dl.quzhuan.me/image/sdk/h5/right@3x.png" style="width:11px;" alt=""></span>
          <span style=" color: #777777; margin-left: 15px; float: left" v-show="x.status==1?false:true" @click="setDefault($index,x.id)">设为默认地址</span>
          <span style="float: right; color: #333333; margin-left: 15px;" @click="deleteAdress($index,x.id)">删除</span>
          <span style="float: right; color: #333333;" @click="editAdress(x.name,x.mobile,x.qq,x.province,x.city,x.county,x.street,x.id)">编辑</span>
        </div>
        <div>
          <ul class="ulList">
            <li><span>姓名</span>
              <p>{{x.name}}</p>
            </li>
            <li><span>电话</span>
              <p>{{x.mobile}}</p>
            </li>
            <li><span>QQ号</span>
              <p style="text-indent:-7px;">{{x.qq}}</p>
            </li>
            <li><span>地址</span>
              <p>{{x.province}}</p>
              <p>{{x.city}}</p>
              <p>{{x.county}}</p>
            </li>
            <li style="text-overflow:ellipsis;white-space:nowrap;overflow:hidden;margin-left:8px;width:95%;">
              <p>{{x.street}}</p>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</div>
</template>
<script>
import $ from 'zepto';
export default {
  data() {
    return {
      token: window.localStorage.getItem('token'),
      haveNoAdress: true,
      haveAdress: false,
      defaultAdress: false,
      setdefaultAdress: false,
      adressList: []
    };
  },
  methods: {
    back() {
      window.localStorage.removeItem('adid');
      window.localStorage.removeItem('adname');
      window.localStorage.removeItem('admobile');
      window.localStorage.removeItem('adqq');
      window.localStorage.removeItem('adarea');
      window.localStorage.removeItem('adstreet');
      // 移除后存
      this.$router.go({path: '/mine'});
    },
    addd() {
      // 跳转addaddress页面
      this.$route.router.go({
        path: 'addAdress'
      });
    },
    addAdress() {
      this.$route.router.go({
        path: 'addAdress'
      });
    },
    setDefault(index, id) {
      $.showIndicator();
      this.$http.post('http://123.59.49.17:8080/platform/api/v1/user/default/address/update', {}, {
        params: {
          token: this.token,
          addressId: id
        }
      }).then(
        function(res) { // 根据返回结果判断是否设置成功
          console.log(res);
          if (res.body.code === 0) {
            $.hideIndicator();
            $.alert('设置成功');
            this.refresh();
          } else {
            $.hideIndicator();
          }
        });
    },
    deleteAdress(index, id) {
      var that = this;
      var buttons1 = [{
        text: '您确定要删除这个地址吗？',
        label: true
      }, {
        text: '删除',
        bold: true,
        color: 'danger',
        onClick: function() { // 删除地址操作
          that.$http.post('http://123.59.49.17:8080/platform/api/v1/user/address/delete', {}, {
            params: {
              token: that.token,
              addressId: id
            }
          }).then(
            function(res) {
              console.log(res);
              if (res.body.code === 0) {
                console.log(res);
                $.alert('删除地址成功');
                that.refresh();
              } else { // 没有地址
                $.alert('操作失败，请重试');
              }
            });
        }
      }];
      var buttons2 = [{
        text: '取消',
        bg: 'danger'
      }];
      var groups = [buttons1, buttons2];
      $.actions(groups);
    },
    editAdress(name, mobile, qq, province, city, county, street, id) {
      window.localStorage.removeItem('adid');
      window.localStorage.removeItem('adname');
      window.localStorage.removeItem('admobile');
      window.localStorage.removeItem('adqq');
      window.localStorage.removeItem('adarea');
      window.localStorage.removeItem('adstreet');
      // 移除后存
      window.localStorage.setItem('adname', name);
      window.localStorage.setItem('adid', id);
      window.localStorage.setItem('admobile', mobile);
      window.localStorage.setItem('adqq', qq);
      window.localStorage.setItem('adarea', province + ' ' + city + ' ' + county);
      window.localStorage.setItem('adstreet', street);
      // 跳转addaddress页面
      this.$route.router.go({
        path: 'addAdress'
      });
    },
    refresh() {
      this.$http.post('http://123.59.49.17:8080/platform/api/v1/user/address/list', {}, {
        params: {
          token: this.token
        }
      }).then(
        function(res) {
          if (res.body.data.list.length === 0) { // 没有地址的情况
            this.haveNoAdress = true;
            this.haveAdress = false;
          } else { // 有地址
            //  $.alert('as');
            console.log(res);
            this.adressList = res.body.data.list; // 把List赋值给adressList
            this.haveNoAdress = false; // 没有地址标识隐藏
            this.haveAdress = true; // 有地址标识显示
          }
        });
    }
  },
  ready() {
    this.$http.post('http://123.59.49.17:8080/platform/api/v1/user/address/list', {}, {
      params: {
        token: this.token
      }
    }).then(
      function(res) {
        if (res.body.data.list.length === 0) { // 没有地址的情况
          this.haveNoAdress = true;
          this.haveAdress = false;
        } else { // 有地址
          //  $.alert('as');
          console.log(res);
          this.adressList = res.body.data.list; // 把List赋值给adressList
          this.haveNoAdress = false; // 没有地址标识隐藏
          this.haveAdress = true; // 有地址标识显示
        }
      });
  }
};
</script>

<style>
.ulList {
  font-size: 14px;
  padding: 8px 0;
}

.ulList li {
  width: 100%;
  height: 30px;
  line-height: 30px;
}

.ulList li span {
  padding: 0 12px;
  color: #777777;
  float: left;
}

.ulList li p {
  float: left;
  padding: 0 5px;
  color: #333333;
}
</style>
