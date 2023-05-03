import { Component } from 'react';
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

export class App extends Component {
  state = {
    request: null,
    pictures: null,
    page: 1,
    isLoading: false,
    error: null,
  };

  
  fetchImg = async () => {
     try {
       this.setState({ isLoading: true, error: null });
       const search = await API.fetchImg(this.state.request, this.state.page);

       //const hits = [...this.state.pictures.hits, ...search.data.hits];
       if (this.state.page === 1) {
         this.setState(state => ({
           pictures: search.data,

         }));
       } else {
         search.data.hits = [...this.state.pictures.hits, ...search.data.hits];
         this.setState(state => ({
           pictures: search.data,
         }));
       }
       if (search.data.total === 0) { this.setState({ error: ERROR_MSG }); }
       
     } catch (error) {
       this.setState({ error: 'Error, try reloading the page' });
     } finally {
       this.setState({ isLoading: false });
     }
  };

  onLoadMore = () => {
    this.setState(state => ({
      page: state.page + 1,
    }));
    
  };

  onSearch = (value) => {
    this.setState(state => ({
      request: value.title.trim(),
      page: 1,
    }));
    if (value.title.trim() === '') this.setState({ error: ERROR_MSG });
    
  };


  componentDidUpdate(prevProps, prevState) {
   
    if (
      this.state.request !== '' &&
      (prevState.request !== this.state.request ||
        prevState.page !== this.state.page)
    ) {
      this.fetchImg();
    }
     window.scrollTo(0, document.body.scrollHeight);
}

  render() {
    return (
      <Layout>
        <SearchbarWrap>
          <Searchbar onSubmit={this.onSearch} />
        </SearchbarWrap>
        
        {!this.state.isLoading && this.state.error && (
          <ErrorMessage>{this.state.error}</ErrorMessage>
        )}
        { !this.state.error && this.state.pictures && (
          <ImageGallery pictures={this.state.pictures} />
        )}
        {this.state.isLoading && <Loader />}
        {!this.state.isLoading &&
          !this.state.error &&
          this.state.pictures &&
          this.state.pictures.total > 12 && (
            <ButtonLoadMore
              onClick={() => this.onLoadMore(this.state.page)}
              page={this.state.page}
            >
              Load more
            </ButtonLoadMore>
          )}

        <GlobalStyle />
      </Layout>
    );
  }
}