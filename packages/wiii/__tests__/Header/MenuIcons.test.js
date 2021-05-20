import { mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';

import { viewEnums } from '@/type';
const { viewsTitle, views, paths, selectors } = viewEnums;

/**
 * @todo
 * 테스트 코드에서 routes 내 module-alias, vue declare 인식 안되는 문제?
 * - 아래에서 하드코딩으로 일단 해결
 */
// import routes from '@/router/routes';

import App from '@/App';
import Home from '@/views/Home';
import Markets from '@/views/Markets';
import News from '@/views/News';
import User from '@/views/User';
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
    path: paths.MarketsRouter,
    name: views.Markets,
    component: Markets,
  },
  {
    path: paths.User,
    name: views.User,
    component: User,
  },
  {
    path: paths.News,
    name: views.News,
    component: News,
  },
  {
    path: paths.Home,
    name: views.Home,
    component: Home,
  },
];

const router = new VueRouter({ routes });

describe('App 및 Home view 마운트', () => {
  const appWrapper = mount(App, {
    localVue,
    router,
  });
  const home = appWrapper.findComponent(Home);

  it('Routing이 포함된 App이 마운팅된다', () => {
    expect(appWrapper.exists()).toBeTruthy();
  });

  describe('MenuBar Component 마운트', () => {
    const header = home.findComponent(Header);
    const menuBar = header.findComponent(MenuBar);

    it('MenuBar 컴포넌트가 마운트된다', () => {
      expect(menuBar).toBeTruthy();
    });

    describe('MenuIcons Component', () => {
      const menuIcons = menuBar.findAllComponents(MenuIcon);

      it('menuIcons 컴포넌트가 마운트 된다', () => {
        expect(appWrapper.findAllComponents(MenuIcon)).toBeTruthy();
        expect(home.html().includes('ul')).toBeTruthy();
      });

      /**
       * @todo
       * iconNums를 상태값에 따라 동적으로 받는 방법?
       */
      const iconNums = 3;
      it(`MenuIcon 컴포넌트 수는 ${iconNums}개다`, () => {
        expect(menuIcons.length).toBe(iconNums);
      });

      const homeMenu = menuIcons.at(0);
      it('menuIcons 중 첫번째 메뉴는 홈 메뉴이다 ', () => {
        expect(homeMenu.contains(selectors.anchorHref));
        expect(homeMenu.text().includes('홈')).toBe(true);
      });

      const marketMenu = menuIcons.at(1);
      it('menuIcons 중 두번째 메뉴는 마켓 메뉴이다 ', () => {
        expect(marketMenu.contains(selectors.anchorHref));
        expect(marketMenu.text().includes('마켓')).toBe(true);
      });

      const newsMenu = menuIcons.at(2);
      it('menuIcons 중 세번째 메뉴는 뉴스 메뉴이다 ', () => {
        expect(newsMenu.contains(selectors.anchorHref));
        expect(newsMenu.text().includes('뉴스')).toBe(true);
      });
    });
  });
});

describe('메뉴 아이콘 클릭 및 라우팅 테스트', () => {
  const appWrapper = mount(App, {
    localVue,
    router,
  });
  const home = appWrapper.findComponent(Home);
  const menuIcons = home.findAllComponents(MenuIcon);

  describe('홈 메뉴 클릭', () => {
    const homeMenu = menuIcons.at(0);
    const homeMenuPath = paths.Home;
    const homeMenuText = '홈';

    it('홈 메뉴 아이콘의 href(to) props는 `/`이다', () => {
      expect(homeMenu.props('href')).toBe(homeMenuPath);
    });
    it('홈 메뉴 아이콘의 텍스트는 `/`이다', () => {
      expect(homeMenu.text()).toBe(homeMenuText);
    });

    describe('홈 Route 이동', () => {
      it('홈 route로 이동하면 홈 view가 나타난다', async () => {
        router.push(homeMenuPath);
        await appWrapper.vm.$nextTick();
        expect(appWrapper.vm.$route.path).toBe(homeMenuPath);
        expect(appWrapper.find(Home).exists()).toBe(true);
      });

      it(`홈 view의 타이틀은 '${viewsTitle.Home}'이다`, () => {
        expect(appWrapper.text()).toContain(viewsTitle.Home);
      });
    });
  });

  describe('마켓 메뉴 Icon', () => {
    const marketMenu = menuIcons.at(1);
    const marketMenuPath = paths.IndexMarket;
    const marketMenuText = '마켓';
    it(`마켓 메뉴 아이콘의 href(to) props는 '${marketMenuPath}'이다`, () => {
      expect(marketMenu.props('href')).toBe(marketMenuPath);
    });
    it(`마켓 메뉴 아이콘의 텍스트는 '${marketMenuText}'이다`, () => {
      expect(marketMenu.text()).toBe(marketMenuText);
    });

    describe('마켓 Route 이동', () => {
      it('마켓 route로 이동하면 마켓 view가 나타난다', async () => {
        router.push(marketMenuPath);
        await appWrapper.vm.$nextTick();
        expect(appWrapper.vm.$route.path).toBe(marketMenuPath);
        expect(appWrapper.find(Markets).exists()).toBe(true);
      });

      it(`마켓 view의 타이틀은 '${viewsTitle.Markets}'이다`, () => {
        expect(appWrapper.text()).toContain(viewsTitle.Markets);
      });
    });
  });

  describe('뉴스 메뉴', () => {
    const newsMenu = menuIcons.at(2);
    const newsMemuPath = paths.News;
    const newsMenuText = '뉴스';

    it(`뉴스 메뉴 아이콘의 href(to) props는 '${newsMemuPath}'이다`, () => {
      expect(newsMenu.props('href')).toBe(newsMemuPath);
    });
    it(`뉴스 메뉴 아이콘의 텍스트는 '${newsMenuText}'이다`, () => {
      expect(newsMenu.text()).toBe(newsMenuText);
    });

    describe('뉴스 Route 이동', () => {
      it('뉴스 route로 이동하면 뉴스 view가 나타난다', async () => {
        router.push(newsMemuPath);
        await appWrapper.vm.$nextTick();
        expect(appWrapper.vm.$route.path).toBe(newsMemuPath);
        expect(appWrapper.find(News).exists()).toBe(true);
      });

      it(`뉴스 view의 타이틀은 '${viewsTitle.News}'이다`, () => {
        expect(appWrapper.text()).toContain(viewsTitle.News);
      });
    });
  });
});
