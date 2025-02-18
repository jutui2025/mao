<template>
  <view>
    <view v-show="ifshow" @tap="close" @touchmove.stop.prevent="stopMove" class="popup-layer">
    </view>
    <view ref="popRef" class="popup-content" @tap.stop="stopEvent" :style="_location">
      <slot></slot>
    </view>
  </view>
</template>

<script>
export default {
  name: 'popup-layer',
  model: {
    prop: "showPop",
    event: "change"
  },
  props: {
    showPop: {
      type: Boolean,
      default: false,
    },
    direction: {
      type: String,
      default: 'top', // 方向：top，bottom，left，right
    },
    autoClose: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      ifshow: false, // 是否展示
      translateValue: -100, // 位移距离
      timer: null,
      iftoggle: false,
    };
  },
  computed: {
    _translate() {
      return `transform: translate${this.direction[0].toUpperCase()}(${this.direction === 'top' || this.direction === 'left' ? -this.translateValue : this.translateValue}%)`;
    },
    _location() {
      const axis = this.direction === 'top' || this.direction === 'bottom' ? 'width' : 'height';
      return `${this.direction}: 0; ${axis}: 100%;` + this._translate;
    }
  },
  watch: {
    showPop(value) {
      value ? this.show() : this.close();
    }
  },
  methods: {
    stopMove(event) {
      console.log("阻止滑动");
      return;
    },
    show() {
      this.ifshow = true;
      setTimeout(() => {
        this.translateValue = 0;
      }, 100);
      setTimeout(() => {
        this.iftoggle = true;
      }, 300);
    },
    close() {
      if (this.timer !== null || !this.iftoggle) {
        return;
      }
      this.translateValue = -100;
      this.timer = setTimeout(() => {
        this.ifshow = false;
        this.timer = null;
        this.iftoggle = false;
        this.$emit('closeCallBack');
        this.$emit('change', false);
      }, 300);
    },
    stopEvent(event) {},
  }
}
</script>

<style lang="scss">
.popup-layer {
  position: fixed;
  z-index: 999999;
  background: rgba(0, 0, 0, .3);
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
}

.popup-content {
  position: fixed;
  z-index: 1000000;
  background: #FFFFFF;
  transition: all .3s ease;
  overflow: hidden;
  height: 300px; // 根据需要调整
}
</style>
