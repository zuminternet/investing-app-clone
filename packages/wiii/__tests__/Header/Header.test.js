import { mount } from '@vue/test-utils';

import { viewsTitle } from '@/type/views';

import Home from '@/views/Home.vue';
import Header from '@/components/organisms/HomeHeader';
import HomeTitle from '@/components/molecules/HomeTitle';
import HeaderMenus from '@/components/molecules/HeaderMenus';

describe('Header 테스트', () => {
  const home = mount(Home);
  it('Home view가 마운트 된다', () => {
    expect(home.exists()).toBeTruthy();
  });

  describe('HomeHeader Component', () => {
    const header = home.findComponent(Header);

    it('HomeHeader 컴포넌트가 마운트 되었다', () => {
      expect(header.exists()).toBe(true);
    });

    it('HomeTitle 컴포넌트를 갖고 있다', () => {
      expect(header.findComponent(HomeTitle)).toBeTruthy();
    });

    it('HeaderMenus 컴포넌트를 갖고 있다', () => {
      expect(header.findComponent(HeaderMenus)).toBeTruthy();
    });

    describe('HomeTitle Component', () => {
      const title = header.findComponent(HomeTitle);

      it('HomeTitle 컴포넌트가 마운트 되었다', () => {
        expect(title.exists()).toBeTruthy();
      });

      /**
       * @deprecated
       * - `text()`메서드는 wrapper에서만 가능
       * - `findAll` 메서드로 반환결과는 wrapper array임
       */
      it(`Title의 innerText는 '${viewsTitle.Home}'이다`, () => {
        expect(title.text()).toBe(viewsTitle.Home);
      });
    });
  });
});
