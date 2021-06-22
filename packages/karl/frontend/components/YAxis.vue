<template>
  <canvas ref="yaxis" :width="this.canvasWidth" :height="this.canvasHeight"></canvas>
</template>

<script>
export default {
  name: 'YAxis',

  data() {
    return {
      ctx: null,
    };
  },

  props: {
    valueData: {
      type: Array,
      required: true,
    },

    graphBoxHeight: {
      type: Number,
      required: true,
    },

    canvasHeight: {
      type: Number,
      required: true,
    },

    canvasWidth: {
      type: Number,
      default: 50,
    },

    floorValue: {
      type: Number,
      required: true,
    },

    graphBoxMargin: {
      type: Number,
      required: true,
    },

    currentValue: {
      type: Number,
      required: true,
    },

    currentHeight: {
      type: Number,
      required: true,
    },

    selectedHeight: {
      type: Number,
      required: true,
    },

    selectedValue: {
      validator: (prop) => typeof prop === 'number' || prop === null,
      required: true,
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
    writeYAxis() {
      this.ctx.fillStyle = this.textColor;

      for (let i = 0; i < this.valueData.length; i++) {
        if (i === this.valueData.length - 1) {
          this.ctx.fillText(
            `${this.floorValue.toFixed(3)}`,
            0,
            this.graphBoxMargin + (this.graphBoxHeight / this.valueData.length) * (i + 1) + 4,
          );
        }

        let value = this.valueData[i];
        this.ctx.fillText(
          `${(this.floorValue + value).toFixed(3)}`,
          0,
          this.graphBoxMargin + (this.graphBoxHeight / this.valueData.length) * i + 4,
        );
      }
    },

    writeCurrentValue() {
      const displayedValue = this.currentValue.toFixed(3);

      this.ctx.fillStyle = '#1e90ff';

      this.ctx.fillRect(0, this.currentHeight - 12, this.ctx.measureText(`${displayedValue}`).width, 14);

      this.ctx.fillStyle = 'white';
      this.ctx.fillText(`${displayedValue}`, 0, this.currentHeight);
      this.ctx.fillStyle = 'black';
    },

    writeSelectedValue() {
      if (this.selectedValue !== null) {
        const displayedValue = this.selectedValue.toFixed(3);

        this.ctx.fillStyle = '#31c27e';

        this.ctx.fillRect(0, this.selectedHeight - 12, this.ctx.measureText(`${displayedValue}`).width, 14);

        this.ctx.fillStyle = 'white';
        this.ctx.fillText(`${this.selectedValue.toFixed(3)}`, 0, this.selectedHeight);
        this.ctx.fillStyle = 'black';
      }
    },
  },

  mounted() {
    this.ctx = this.$refs.yaxis.getContext('2d');
  },

  watch: {
    valueData() {
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.writeYAxis();
      this.writeCurrentValue();
      this.writeSelectedValue();
    },
  },
};
</script>

<style></style>
