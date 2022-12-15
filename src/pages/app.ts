import { HomePage } from './home/HomePage';
import { Basket } from './basket/Basket';
import { Page } from '../core/templates/page';
import { Store } from './store/Store';
import { PageIds } from '../types/PageIds';
import { Header } from '../core/components/header';
import ErrorPage, { ErrorTypes } from './error/Error';

export class App {
  private static container: HTMLElement = document.body;
  private initialPage: HomePage;
  private header: Header;
  // private errorPage: ErrorPage;

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
    } else {
      page = new ErrorPage(idPage, ErrorTypes.Error_404);
    }

    if (page) {
      const pageHtml = page.render();
      App.container.append(this.header.render(), pageHtml);
    }
  }

  private enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      this.renderNewPage(hash);
    });
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
