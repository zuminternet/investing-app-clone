import { mount, shallowMount } from '@vue/test-utils';

import Home from '@/views/Home.vue';
import Header from '@/components/header';
import Title from '@/components/header/Title';
import MenuBar from '@/components/header/MenuBar';

describe('Home view 마운트', () => {
  const home = mount(Home);
  it('Home view가 마운트 된다', () => {
    expect(home.exists()).toBeTruthy();
  });

  describe('Header Component', () => {
    const header = home.findComponent(Header);

    it('Header 컴포넌트가 마운트 되었다', () => {
      expect(header.exists()).toBe(true);
    });

    it('Title 컴포넌트를 갖고 있다', () => {
      expect(header.findComponent(Title)).toBeTruthy();
    });

    it('MenuBar 컴포넌트를 갖고 있다', () => {
      expect(header.findComponent(MenuBar)).toBeTruthy();
    });

    describe('Title Component', () => {
      const title = header.findComponent(Title);

      it('Title 컴포넌트가 마운트 되었다', () => {
        expect(title.exists()).toBeTruthy();
      });

      /**
       * @description
       * `find/findAll` 메서드는 deprecete 예정이므로 주의!
       */
      const h1 = title.findAll('h1');
      it('Title 태그는 `h1`을 갖고 있다', () => {
        expect(h1.exists()).toBeTruthy();
      });

      /**
       * @deprecated
       * - `text()`메서드는 wrapper에서만 가능
       * - `findAll` 메서드로 반환결과는 wrapper array임
       */
      it('Title 태그 h1의 innerText는 `ZUM 인베스팅`이다', () => {
        expect(h1.at(0).text()).toBe('ZUM 인베스팅');
      });
    });
  });
});
