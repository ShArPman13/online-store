import { Page } from '../../core/templates/page';

export enum ErrorTypes {
  Error_404 = '404',
}

export class ErrorPage extends Page {
  private errorType: string;

  static textObject: { [props: string]: string } = {
    '404': 'PAGE NOT FOUND',
  };

  constructor(id: string, errorType: string) {
    super(id);
    this.errorType = errorType;
  }

  render() {
    const title = this.createHeaderTitle(ErrorPage.textObject[this.errorType]);
    this.container.append(title);
    return this.container;
  }
}

export default ErrorPage;
