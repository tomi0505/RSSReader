import renderArticlesDOM from "./renderArticlesDOM";
import filterArticles from "./filterArticles";

const connectErrorHandler = function(RSS_URL) {
  const tryConnectBtnEl = document.querySelector('.try-connect-btn-b');
  
  tryConnectBtnEl.addEventListener('click', () => {
    rssConnect(RSS_URL);
  });
};

const getRSSData = function(data) {
  const rssData = [];
  
  const articles = data.querySelectorAll('item');
  
  for(let article of articles) {
    const articleTitleEl = article.querySelector('title');
    const articleDescriptionEl = article.querySelector('description');
    const articleMediaEl = article.getElementsByTagName('media:content')[0];
    const articleImgURL = articleMediaEl.getAttribute('url');
    const articlePublicationDateEl = article.querySelector('pubDate');
    const articleAllContentURLEl = article.querySelector('link');
  
    rssData.push({
      title: articleTitleEl.innerHTML,
      description: articleDescriptionEl.innerHTML,
      imgURL: articleImgURL,
      publicationDate: new Date(articlePublicationDateEl.innerHTML),
      allContentURL: articleAllContentURLEl.innerHTML
    });
  }
  
  return rssData;
};

const rssConnect = function(RSS_URL) {
  const connectErrorAlertEl = document.querySelector('.connect-error-alert-container-b');
  
  fetch(RSS_URL)
    .then(response => {
      if(response.ok) {
        connectErrorAlertEl.classList.add('d-none');
        return response.text();
      } else {
        return Promise.reject(response);
      }
    })
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
      const rssData = getRSSData(data);
      renderArticlesDOM(rssData);
      filterArticles(rssData);
    })
    .catch(error => {
      const errorStatusEl = document.querySelector('.connect-error-alert-container-b__error-status');
      connectErrorAlertEl.classList.remove('d-none');
      errorStatusEl.textContent = error.status;
  
      connectErrorHandler(RSS_URL);
    })
};

export default rssConnect;