import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '25738191-2a68a887d2690264ace752ae1'

async function getPictures (name) {
     const response = await axios.get(`${BASE_URL}?key=${KEY}&q=${name}&image_type=photo`);
    const data = await response.data;

        return data;
}

export default { getPictures };