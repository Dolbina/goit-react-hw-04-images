import { useEffect, useState } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { Searchbar } from './Searchbar/Searchbar';
import { Layout } from './Layout/Layout';
import * as API from 'services/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { SearchbarWrap } from './Searchbar/Searchbar.styled';
import { ButtonLoadMore } from './ButtonLoadMore/ButtonLoadMore.styled';
import { ErrorMessage } from './ErrorMessage/ErrorMessage.styled';
import { Loader } from './Loader/Loader';

const ERROR_MSG =
  'Sorry, there are no images matching your search query. Please try again.';

  export const App = () => {
    const [request, setRequest] = useState('');
    const [pictures, setPictures] = useState(null);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


  useEffect(() => {
    async function fetchImg() {
      try {
        setIsLoading(true);
               setError(null);
        const search = await API.fetchImg(request, page);
        if (page === 1) {
          setPictures(search.data);
        } else {
          setPictures(prevPictures => ({
            ...prevPictures,
            hits: [...prevPictures.hits, ...search.data.hits],
          }));
        }

        if (search.data.total === 0) {
          setError(ERROR_MSG);
        }
      } catch (error) {
        setError('Error, try reloading the page');
      } finally {
        setIsLoading(false);
      }
    }
   if (request !== '') fetchImg();
  }, [request, page]);

    
    const onLoadMore = () => {
      setPage(prevPage => prevPage + 1);
    };
   
  const onSearch = (value) => {
    setRequest(value.title.trim());
    setPage(1);
    if (value.title.trim() === '')
      setError(ERROR_MSG);
    };

  useEffect(()=> {
  console.log(page);
  console.log(request);
}, [page, request]);


  return (
    <Layout>
      <SearchbarWrap>
        <Searchbar onSubmit={onSearch} />
      </SearchbarWrap>
      {!isLoading && error && <ErrorMessage>{error}</ErrorMessage>}
      {!error && pictures && <ImageGallery pictures={pictures} />}
      {isLoading && <Loader />}
      {!isLoading &&
        !error &&
        pictures &&
        pictures.total / 12 > page && (
          <ButtonLoadMore onClick={() => onLoadMore(page)} page={page}>
            Load more
          </ButtonLoadMore>
        )}
      <GlobalStyle />
    </Layout>
  );
  };