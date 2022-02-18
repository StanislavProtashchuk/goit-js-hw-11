import './css/common.css'
import API from './api/fetch';
import RENDER from './components/render'
import Notiflix from 'notiflix';

const render = document.querySelector('.gallery');
const inputValue = document.querySelector('.search-form');
const clear = '';
const loadMore = document.querySelector('.load-more');
let name = '';
let page = 1;

inputValue.addEventListener('submit', search);
loadMore.hidden = true;
loadMore.addEventListener('click', onLoadMore);

function search(e) {
    e.preventDefault();
    loadMore.hidden = false;
    loadMore.disabled = true;
   
        name = e.currentTarget.elements.searchQuery.value.trim();
        clearRender();
        if (name.length === 0) {
            return;
        }
        API.getPictures(name, page)
            .then(renderPicture)
            .catch(onFetchError)
    inputValue.reset();
    }

function clearRender() {
    render.innerHTML = clear;
    page = 1;
}

function renderPicture(picture) {
    const totalPics = picture.totalHits / (page * picture.hits.length);
    console.log(totalPics);
    if (picture.hits.length === 0) {
        onFetchError();
    }
    if (totalPics < 1) {
        Notiflix.Notify.failure(`We're sorry, but you've reached the end of search results.`);
        loadMore.hidden = true;
    }
    const markup = RENDER(picture.hits);
    render.insertAdjacentHTML('beforeend', markup);
    Notiflix.Notify.success(`Hooray! We found ${picture.totalHits} images.`);
    loadMore.disabled = false;    
}
    
function onFetchError() {
    Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
    render.innerHTML = clear;
}

function onLoadMore() {
    loadMore.disabled = true;
    page += 1;
    API.getPictures(name, page)
            .then(renderPicture)
        .catch(onFetchError)
    loadMore.disabled = false;
    
}