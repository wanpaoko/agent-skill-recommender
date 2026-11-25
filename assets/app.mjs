import { filterRepositories, repositories, sortRepositories } from './catalog.mjs';

const grid = document.querySelector('#repository-grid');
const searchInput = document.querySelector('#repository-search');
const sortSelect = document.querySelector('#repository-sort');
const resultCount = document.querySelector('#result-count');
const emptyState = document.querySelector('#empty-state');
const categoryButtons = [...document.querySelectorAll('.category-chip')];
const numberFormatter = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 });
const totalCount = String(repositories.length);
for (const total of document.querySelectorAll('[data-total-count]')) total.textContent = totalCount;
let category = 'all';

function createRepositoryCard(repository) {
  const article = document.createElement('article');
  article.className = 'repository-card';

  const top = document.createElement('div');
  top.className = 'card-topline';
  const categoryLabel = document.createElement('span');
  categoryLabel.className = 'card-category';
  categoryLabel.textContent = repository.category;
  top.append(categoryLabel);
  const titleRow = document.createElement('div');
  titleRow.className = 'card-title-row';
  const title = document.createElement('h3');
  title.className = 'card-title';
  const link = document.createElement('a');
  link.className = 'card-title-link';
  link.href = repository.repositoryUrl;
  link.target = '_blank';
  link.rel = 'noreferrer';
  link.textContent = repository.name;
  link.setAttribute('aria-label', `在 GitHub 查看 ${repository.name} 所屬專案`);
  title.append(link);
  const linkMark = document.createElement('span');
  linkMark.className = 'card-link-mark';
  linkMark.setAttribute('aria-hidden', 'true');
  linkMark.textContent = '↗';
  titleRow.append(title, linkMark);

  const owner = document.createElement('p');
  owner.className = 'card-owner';
  owner.textContent = `${repository.owner}/${repository.repository}`;

  const description = document.createElement('p');
  description.className = 'card-description';
  description.textContent = repository.description;
  const pickReason = document.createElement('p');
  pickReason.className = 'card-pick-reason';
  pickReason.textContent = repository.pickReason;

  const bottom = document.createElement('div');
  bottom.className = 'card-bottom';
  const tags = document.createElement('div');
  tags.className = 'card-tags';
  for (const text of repository.tags) {
    const tag = document.createElement('span');
    tag.className = 'card-tag';
    tag.textContent = text;
    tags.append(tag);
  }
  const stars = document.createElement('span');
  stars.className = 'card-stars';
  const starCount = document.createElement('strong');
  starCount.textContent = `${numberFormatter.format(repository.stars)} ★`;
  stars.append(starCount, document.createTextNode(`GitHub stars · ${repository.starsCheckedAt}`));
  bottom.append(tags, stars);

  article.append(top, titleRow, owner, description, pickReason, bottom);
  return article;
}

function render() {
  const matchingRepositories = sortRepositories(filterRepositories(repositories, {
    query: searchInput.value,
    category,
  }), sortSelect.value);
  const fragment = document.createDocumentFragment();

  for (const repository of matchingRepositories) fragment.append(createRepositoryCard(repository));
  grid.replaceChildren(fragment);
  resultCount.textContent = String(matchingRepositories.length);
  emptyState.hidden = matchingRepositories.length !== 0;
  grid.hidden = matchingRepositories.length === 0;
}


for (const button of categoryButtons) {
  button.addEventListener('click', () => {
    category = button.dataset.category;
    for (const option of categoryButtons) {
      const isActive = option === button;
      option.classList.toggle('is-active', isActive);
      option.setAttribute('aria-pressed', String(isActive));
    }
    render();
  });
}

searchInput.addEventListener('input', render);
sortSelect.addEventListener('change', render);
document.querySelector('#clear-filters').addEventListener('click', () => {
  category = 'all';
  searchInput.value = '';
  for (const button of categoryButtons) {
    const isActive = button.dataset.category === 'all';
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  }
  render();
  searchInput.focus();
});
document.addEventListener('keydown', (event) => {
  if (event.key === '/' && !event.metaKey && !event.ctrlKey && !event.altKey
      && !['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
    event.preventDefault();
    searchInput.focus();
  }
});

render();
