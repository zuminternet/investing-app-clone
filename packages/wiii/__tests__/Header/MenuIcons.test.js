import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';

import { events, views } from '@/types';

/**
 * @todo
 * 테스트 코드에서 routes 내 module-alias, vue declare 인식 안되는 문제?
 * - 아래에서 하드코딩으로 일단 해결
 */
// import routes from '@/router/routes';

import App from '@/App';
import Home from '@/views/Home';
import Header from '@/components/header';
import MenuBar from '@/components/header/MenuBar';
import MenuIcon from '@/components/header/MenuIcon';

/**
 * @description
 * - Router 테스트를 위한 localVue 생성
 */
const localVue = createLocalVue();
localVue.use(VueRouter);

const routes = [
  {
    path: '/**',
    name: views.Home,
    component: Home,
  },
];

describe('App 및 Home view 마운트', () => {
  const router = new VueRouter({ routes });
  const appWrapper = mount(App, {
    localVue,
    router,
  });

  it('Routing이 포함된 App이 마운팅된다', () => {
    expect(appWrapper.exists()).toBeTruthy();
  });

  const home = appWrapper.findComponent(Home);

  describe('MenuBar Component', () => {
    const header = home.findComponent(Header);
    const menuBar = header.findComponent(MenuBar);

    it('MenuBar 컴포넌트가 마운트된다', () => {
      expect(menuBar).toBeTruthy();
    });

    describe('MenuIcons Component', () => {
      const MenuIcons = menuBar.findAllComponents(MenuIcon);

      it('MenuIcon 컴포넌트가 마운트 된다', () => {
        expect(MenuIcons.exists()).toBeTruthy();
      });

      /**
       * @todo
       * iconNums를 상태값에 따라 동적으로 받는 방법?
       */
      const iconNums = 3;
      it(`MenuIcon 컴포넌트 수는 ${iconNums}개다`, () => {
        expect(MenuIcons.length).toBe(iconNums);
      });

      const idxMenu = MenuIcons.at(0);
      it('MenuIcons 중 첫번째 메뉴는 지수 메뉴이다 ', () => {
        expect(idxMenu.exists()).toBeTruthy();
      });

      const stockMenu = MenuIcons.at(1);
      it('MenuIcons 중 두번째 메뉴는 주식 메뉴이다 ', () => {
        expect(stockMenu.exists()).toBeTruthy();
      });

      const coinMenu = MenuIcons.at(2);
      it('MenuIcons 중 세번째 메뉴는 코인 메뉴이다 ', () => {
        expect(coinMenu.exists()).toBeTruthy();
      });

      describe('지수 메뉴', () => {
        it('지수 메뉴를 클릭하면 해당 라우터로 이동한다', async () => {
          await idxMenu.trigger(events.MouseEventEnum.click);
          expect(appWrapper.contains('지수')).toBe(true);
        });
      });

      describe('주식 메뉴', () => {
        it('주식 메뉴를 클릭하면 해당 라우터로 이동한다', async () => {
          await stockMenu.trigger(events.MouseEventEnum.click);
          expect(appWrapper.contains('주식')).toBe(true);
        });
      });

      describe('코인 메뉴', () => {
        it('코인 메뉴를 클릭하면 해당 라우터로 이동한다', async () => {
          await coinMenu.trigger(events.MouseEventEnum.click);
          expect(appWrapper.contains('코인')).toBe(true);
        });
      });
    });
  });
});
