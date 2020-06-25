import 'bootstrap';
import './scss/style.scss';
import rssConnect from "./js/rssConnect";

document.addEventListener("DOMContentLoaded", function() {
  rssConnect('https://www.gamespot.com/feeds/mashup/');
});