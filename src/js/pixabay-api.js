import axios from "axios";

const apiKey = '46932892-ab4a09809774f514baea4f6c0';

export async function fetchImages(query, page = 1, perPage = 15) {
  try {
    const { data } = await axios.get('https://pixabay.com/api/', {
      params: {
        key: apiKey,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: perPage,
      },
    });
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}
