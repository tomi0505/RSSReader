import renderArticlesDOM from "./renderArticlesDOM";

const filterArticles = function(rssData) {
  const searchArticleInputEl = document.querySelector('.search-article-input-b');
  
  searchArticleInputEl.addEventListener('keyup', function() {
    const searchingArticleTitleValue = searchArticleInputEl.value;
    
    const rssDataFilterResults = rssData.filter(article => {
      return article.title.toLowerCase().indexOf(searchingArticleTitleValue.toLowerCase()) !== -1;
    });
  
    renderArticlesDOM(rssDataFilterResults);
    
  });
};

export default filterArticles;