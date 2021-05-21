import { Facade } from 'zum-portal-core/backend/decorator/Alias';
import { BundleRenderer, createBundleRenderer } from 'vue-server-renderer';
import { Yml } from 'zum-portal-core/backend/decorator/Yml';

const path = require('path');
const fs = require('fs');

type SsrHtml = { [key: string]: SsrHtml | string };
const RESOURCES_PATH = path.join(process.env.INIT_CWD, 'resources');
const TEMPLATES_PATH = path.join(RESOURCES_PATH, 'templates');
const SSR_PATHS = ['/'];

@Facade()
export class HomeFacade {
  public _emptyHtml: string;
  public ssrHtml: SsrHtml = {}; // SSR HTML 데이터
  private readonly renderer: BundleRenderer;

  /**
   * @constructor
   * @param application 앱 관련 설정 `resources/application.yml`에서 불러옴
   */
  constructor(@Yml('application') private application) {
    const clientManifest = require(path.join(RESOURCES_PATH, '/vue-ssr-client-manifest.json'));

    // SSR 번들 렌더러 생성
    this._emptyHtml = `<div id="app"></div>`;
    const bundle = require(path.join(process.env.INIT_CWD, application.renderer));
    this.renderer = createBundleRenderer(bundle, { runInNewContext: false, clientManifest: clientManifest });
  }

  public async renderHtml(): Promise<void> {
    for (let path of SSR_PATHS) {
      this.ssrHtml[path] = this.ssrHtml[path] || {};

      try {
        this.ssrHtml[path] = process.env.NODE_ENV === 'production' ? await this.renderer.renderToString() : this._emptyHtml;
      } catch (e) {
        console.error(e);
      }
    }
  }
}
