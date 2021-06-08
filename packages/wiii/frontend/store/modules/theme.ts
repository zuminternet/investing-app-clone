import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store';

export interface ThemeState {
  curTheme: string;
}

export enum ThemeName {
  zum = '',
  dark = 'dark',
}

/**
 * Theme Module
 * - 테마 상태 localstorage에 저장, 나중에 접속 시에도 활용 가능하도록
 * - 앱실행과 동시에 적용하기 위해 dynamic 지정하지 않음
 */
@Module({ namespaced: true, name: 'theme', store, preserveState: localStorage.getItem('theme') !== null })
export default class Theme extends VuexModule implements ThemeState {
  private isDark = false;
  curTheme: string = ThemeName.zum;

  getCurTheme() {
    return this.curTheme;
  }

  get theme() {
    return this.curTheme;
  }

  @Mutation
  private TOGGLETHEME() {
    this.isDark = !this.isDark;
    this.curTheme = this.isDark ? ThemeName.dark : ThemeName.zum;
  }

  @Action
  public toggleTheme() {
    this.TOGGLETHEME();
  }
}
