import './css/common.css'
import API from './api/fetch';
import RENDER from './components/render'
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

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
    if (picture.hits.length < 40 || totalPics < 1) {
        Notiflix.Notify.failure(`We're sorry, but you've reached the end of search results.`);
        loadMore.hidden = true;
    }
    if (picture.totalHits !== 0 && page === 1) {
        Notiflix.Notify.success(`Hooray! We found ${picture.totalHits} images.`);
    }
    const markup = RENDER(picture.hits);
    render.insertAdjacentHTML('beforeend', markup);

    let gallery = new SimpleLightbox('.photo-card a', { captionsData: 'alt', captionDelay: 250, });
    gallery.refresh();
    
    loadMore.disabled = false;    
}
    
function onFetchError() {
    Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
    render.innerHTML = clear;
    loadMore.hidden = true;
    
}

function onLoadMore() {
    loadMore.disabled = true;
    page += 1;
    API.getPictures(name, page)
            .then(renderPicture)
        .catch(onFetchError)
    loadMore.disabled = false;    
}

