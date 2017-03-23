<template>
<p class='orange'>{{time}}</p>
</template>
<script>
export default {
  data() {
    return {
      time: ''
    };
  },
  props: ['endtime'],
  methods: {
    formate(time) {
      var t = time;
      var min = Math.floor(t / 100 / 60 % 60);
      var sec = Math.floor(t / 100 % 60);
      var msec = parseInt(t % 100);
      if (min < 10) {
        min = '0' + min;
      };
      if (sec < 10) {
        sec = '0' + sec;
      };
      if (msec < 10) {
        msec = '0' + msec;
      };
      if (time <= 0) {
        return '正在揭晓';
      } else {
        return min + ':' + sec + ':' + msec;
      }
    }
  },
  computed: {
    'time': function() {
      return this.formate(this.endtime);
    }
  },
  ready() {
    this.endtime = this.endtime * 100;
    console.log(this.endtime);
    let self = this;
    setInterval(function() {
      self.endtime--;
  }, 10);
  }
};
</script>
<style>
.orange {
  font-size: 17px;
  color: #D43047;
}
</style>
