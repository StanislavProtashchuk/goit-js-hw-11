import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '25738191-2a68a887d2690264ace752ae1';

async function getPictures (name, page) {
    const response = await axios.get(`${BASE_URL}?key=${KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`);
    try {
        const data = await response.data;
        return data;
    }
    catch (error) {
    }
}    

export default { getPictures };