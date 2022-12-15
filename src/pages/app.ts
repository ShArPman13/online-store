import { HomePage } from './home/HomePage';
import { Basket } from './basket/Basket';
import { Page } from '../core/templates/page';
import { Store } from './store/Store';
import { PageIds } from '../types/PageIds';
import { Header } from '../core/components/header';

export class App {
  private static container: HTMLElement = document.body;
  private initialPage: HomePage;
  private header: Header;

  renderNewPage(idPageSource: string) {
    const idPage = idPageSource.toLowerCase();
    document.body.innerHTML = '';
    let page: Page | null = null;

    if (idPage === PageIds.HomePage) {
      page = new HomePage(idPage);
    } else if (idPage === PageIds.BasketPage) {
      page = new Basket(idPage);
    } else if (idPage === PageIds.StorePage) {
      page = new Store(idPage);
    }

    if (page) {
      const pageHtml = page.render();
      const containerMain: HTMLElement = document.createElement('main');
      containerMain.id = 'root';
      containerMain.append(pageHtml);
      App.container.append(this.header.render(), containerMain);
    }
  }

  private enableRouteChange() {
    const loadPage = () => {
      const hash = window.location.hash.slice(1);
      this.renderNewPage(hash);
    };
    window.addEventListener('hashchange', loadPage);
    window.addEventListener('load', loadPage);
  }

  constructor() {
    this.initialPage = new HomePage('Home-Page');
    this.header = new Header('header', 'header');
  }

  run() {
    this.renderNewPage('Home-Page');
    this.enableRouteChange();
  }
}
