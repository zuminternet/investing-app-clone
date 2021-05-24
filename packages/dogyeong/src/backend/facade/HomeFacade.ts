import { Facade } from 'zum-portal-core/backend/decorator/Alias';
import { BundleRenderer, createBundleRenderer } from 'vue-server-renderer';
import { Yml } from 'zum-portal-core/backend/decorator/Yml';

const path = require('path');

type SsrHtml = { [key: string]: SsrHtml | string };

const INIT_CWD = path.join(process.env.INIT_CWD, process.env.BASE_PATH || '');
const RESOURCES_PATH = path.join(INIT_CWD, 'resources');
const TEMPLATES_PATH = path.join(RESOURCES_PATH, 'templates');
const SSR_PATHS = ['/'];

@Facade()
export class HomeFacade {
  private readonly renderer: BundleRenderer;
  public _emptyHtml: string;
  public ssrHtml: SsrHtml = {}; // SSR HTML 데이터

  constructor(@Yml('application') private application) {
    const clientManifest = require(path.join(RESOURCES_PATH, '/vue-ssr-client-manifest.json'));

    // SSR 번들 렌더러 생성
    this._emptyHtml = `<div id="app"></div>`;
    const bundle = require(path.join(INIT_CWD, application.renderer));
    this.renderer = createBundleRenderer(bundle, { runInNewContext: false, clientManifest: clientManifest });
  }

  public async renderHtml(): Promise<void> {
    for (const path of SSR_PATHS) {
      this.ssrHtml[path] = this.ssrHtml[path] || {};

      try {
        this.ssrHtml[path] = process.env.NODE_ENV === 'production' ? await this.renderer.renderToString() : this._emptyHtml;
      } catch (e) {
        console.error(e);
      }
    }
  }
}
