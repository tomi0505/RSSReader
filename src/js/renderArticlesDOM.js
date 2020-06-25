const createArticleItemDOM = function(articleItemData) {
  
  // STRING FOR REMOVED
  articleItemData.description = articleItemData.description.replace(`<a href="${articleItemData.allContentURL}/">Continue Reading at GameSpot</a>]]>`, '');
  
  articleItemData.description = articleItemData.description.replace(`]]>`, '');
  // STRING FOR REMOVED END
  
  const articleItemDOMPattern =
    `
    <div class="card overflow-hidden">
      <img src="${articleItemData.imgURL}" class="card-img-top" alt="${articleItemData.title}">
      <div class="card-body overflow-hidden">
        <h5 class="card-title">${articleItemData.title}</h5>
        <p class="card-text">${articleItemData.description}</p>
      </div>
      <a href="${articleItemData.allContentURL}" target="_blank" class="btn btn-success ml-auto mb-4 mr-4 article-container-b__read-more-link">Czytaj dalej</a>
      <div class="card-footer">
        <small class="text-muted">${articleItemData.publicationDate.toLocaleString()}</small>
      </div>
    </div>
  `
  
  const articleItemNew = document.createElement('div');
  articleItemNew.classList.add('col', 'mb-4', 'article-container-b');
  
  articleItemNew.innerHTML = articleItemDOMPattern;
  
  return articleItemNew;
};

const renderArticlesDOM = function(rssData) {
  const articlesContainerEl = document.querySelector('.articles-container-h');
  articlesContainerEl.innerHTML = '';
  
  rssData.forEach(articleItemData => {
    const articleItemDOMPattern = createArticleItemDOM(articleItemData);
    articlesContainerEl.appendChild(articleItemDOMPattern);
  });
};

export default renderArticlesDOM;