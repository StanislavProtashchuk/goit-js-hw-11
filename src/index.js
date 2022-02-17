import './css/common.css'
import API from './api/fetch';
import RENDER from './components/render'

const render = document.querySelector('.gallery');
const inputValue = document.querySelector('.search-form');

inputValue.addEventListener('submit', search);

function search(e) {
    e.preventDefault();
    const name = e.currentTarget.elements.searchQuery.value.trim();
    console.log(name);
    API.getPictures(name)
        .then(renderPicture)
}

function renderPicture(picture) {
    const markup = RENDER(picture.hits);
    console.log(picture);
    render.insertAdjacentHTML('beforeend', markup);
    }