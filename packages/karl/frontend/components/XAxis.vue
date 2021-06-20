<template>
  <canvas ref="xaxis" :width="this.canvasWidth" :height="this.canvasHeight" class="xaxis"></canvas>
</template>

<script>
export default {
  name: 'XAxis',

  data() {
    return {
      ctx: null,
    };
  },

  props: {
    timeData: {
      type: Array,
      required: true,
    },

    unitWidth: {
      type: Number,
      required: true,
    },

    startIndex: {
      type: Number,
      default: 0,
    },

    graphBoxMargin: {
      type: Number,
      required: true,
    },

    canvasWidth: {
      type: Number,
      required: true,
    },

    canvasHeight: {
      type: Number,
      default: 20,
    },

    isDarkTheme: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    textColor() {
      return this.isDarkTheme ? 'white' : 'black';
    },
  },

  methods: {
    writeXAxis() {
      this.ctx.fillStyle = this.textColor;

      for (let i = 0; i < this.timeData.length; i++) {
        let [time, index] = this.timeData[i];
        time = new Date(time);
        let displayedTime = `${time.getMonth() + 1}-${time.getDate()}`;

        this.ctx.fillText(
          displayedTime,
          this.graphBoxMargin + this.unitWidth * (index - this.startIndex) - this.ctx.measureText(displayedTime).width / 2,
          10,
        );
      }
    },
  },

  mounted() {
    this.ctx = this.$refs.xaxis.getContext('2d');
  },

  watch: {
    timeData() {
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.writeXAxis();
    },
  },
};
</script>

<style>
.x-axis {
}
</style>
