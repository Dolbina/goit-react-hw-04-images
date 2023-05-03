import axios from "axios";


export const fetchImg = async (request, page) => {
  const API_URL = 'https://pixabay.com/api/';
  const options = {
    params: {
      key: '34361382-9628d27261ff8745ccc230a20',
      q: request,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: page,
      per_page: 12,
    },
  };

  const response = await axios.get(API_URL, options);

  return response;
};