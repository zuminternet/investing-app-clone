/**
 * swiperMixin
 *
 * 스와이퍼를 사용하는 컴포넌트들이 공통적으로 사용하는 기능을 추출한 믹스인
 *
 * @prop {Function} fetchData 컴포넌트가 생성될 때, 슬라이드될 때 실행될 콜백함수
 */
export default ({ fetchData }) => ({
  created() {
    this.fetchData();
  },

  methods: {
    fetchData,

    handleHeaderNavClick(id) {
      const { index } = this.navRoutes.find((route) => route.id === id);
      this.currentNavId = id;
      this.slideTo(index);
    },

    handleEndSlide({ activeIndex }) {
      const { id } = this.navRoutes.find((route) => route.index === activeIndex);
      this.currentNavId = id;
      this.fetchData();
    },

    slideTo(index) {
      this.$refs.swiper.slideTo(index);
    },
  },
});
