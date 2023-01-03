import { ComponentHeaderFooter } from '../templates/componentHeaderFooter';

export class Footer extends ComponentHeaderFooter {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  render() {
    this.container.innerHTML = '';

    const footerWrapper = document.createElement('div');
    footerWrapper.className = 'footer-wrapper';

    const linkGitSharp = document.createElement('a');
    linkGitSharp.href = 'https://github.com/ShArPman13';

    const imgGitSharp = document.createElement('img');
    imgGitSharp.src = '../assets/svg/git_white.svg';
    imgGitSharp.alt = 'Git_ShArP';
    imgGitSharp.className = 'footer__img git';

    const nameSharp = document.createElement('span');
    nameSharp.innerText = 'ShArP';

    linkGitSharp.append(imgGitSharp, nameSharp);

    const linkGitGutsstas = document.createElement('a');
    linkGitGutsstas.href = 'https://github.com/gutsstas';

    const imgGitGutsstas = document.createElement('img');
    imgGitGutsstas.src = '../assets/svg/git_white.svg';
    imgGitGutsstas.alt = 'Git_Gutsstas';
    imgGitGutsstas.className = 'footer__img git';

    const nameGutsstas = document.createElement('span');
    nameGutsstas.innerText = 'GutsStas';

    linkGitGutsstas.append(imgGitGutsstas, nameGutsstas);

    const gitContaner = document.createElement('div');
    gitContaner.className = 'footer__git-container';
    gitContaner.append(linkGitSharp, linkGitGutsstas);

    const year = document.createElement('span');
    year.className = 'footer__year';
    year.innerText = '2023';

    const linkRS = document.createElement('a');
    linkRS.href = 'https://rs.school';

    const imgRS = document.createElement('img');
    imgRS.src = '../assets/svg/rss_white.svg';
    imgRS.alt = 'RSS';
    imgRS.className = 'footer__img rss';

    linkRS.append(imgRS);

    footerWrapper.append(gitContaner, year, linkRS);

    this.container.append(footerWrapper);

    return this.container;
  }
}
