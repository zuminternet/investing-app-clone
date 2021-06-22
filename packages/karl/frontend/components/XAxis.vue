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

    selectedDate: {
      validator: (prop) => typeof prop === 'string' || prop === null,
      required: true,
    },

    selectedIndex: {
      validator: (prop) => typeof prop === 'number' || prop === null,
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

        const fullYear = `${time.getFullYear()}`;
        const monthAndDate = `${time.getMonth() + 1}-${time.getDate()}`;

        this.ctx.fillText(
          fullYear,
          this.graphBoxMargin + this.unitWidth * (index - this.startIndex) - this.ctx.measureText(fullYear).width / 2,
          10,
        );

        this.ctx.fillText(
          monthAndDate,
          this.graphBoxMargin + this.unitWidth * (index - this.startIndex) - this.ctx.measureText(monthAndDate).width / 2,
          20,
        );
      }

      this.writeSelectedDate();
    },

    writeSelectedDate() {
      if (this.selectedDate !== null) {
        const date = new Date(this.selectedDate);

        const fullYear = `${date.getFullYear()}`;
        const monthAndDate = `${date.getMonth() + 1}-${date.getDate()}`;

        this.ctx.fillStyle = '#31c27e';

        this.ctx.fillRect(
          this.graphBoxMargin +
            this.unitWidth * (this.selectedIndex - this.startIndex) -
            this.ctx.measureText(`${fullYear}`).width / 2,
          0,
          this.ctx.measureText(`${monthAndDate}`).width,
          20,
        );

        this.ctx.fillStyle = 'white';

        this.ctx.fillText(
          fullYear,
          this.graphBoxMargin +
            this.unitWidth * (this.selectedIndex - this.startIndex) -
            this.ctx.measureText(fullYear).width / 2,
          10,
        );

        this.ctx.fillText(
          monthAndDate,
          this.graphBoxMargin +
            this.unitWidth * (this.selectedIndex - this.startIndex) -
            this.ctx.measureText(monthAndDate).width / 2,
          20,
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

<style></style>
