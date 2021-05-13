import { mount } from '@vue/test-utils';
import Vue from 'vue';
import Home from '@/frontend/views/Home.vue';

describe('HelloJest', () => {
  describe('Home Component', () => {
    const wrapper = mount(Home);

    test('generate `hello jest` text before create', () => {
      const vm = new Vue(Home).$mount();
      expect(vm.message).toBe('hello jest');
    });

    it('has `hello jest` text after mounted', () => {
      expect(wrapper.text()).toContain('hello jest');
    });
  });
});
