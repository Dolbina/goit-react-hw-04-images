import { Component } from "react";
import { ImgWrap, Img } from "./ImageGalleryItem.styled";
import { ImageModal } from "components/ImageModal/ImageModal";
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component{
  static propTypes = {
    picture: PropTypes.shape({
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
      }).isRequired,
  };

  state = {
    selectedImg: null,
  };

  setSelectedImg = () => {
    this.setState({ selectedImg: this.props.picture.largeImageURL });
  };

  closeModal = () => {
    this.setState({ selectedImg: null });
  };
  
  render() {
    const { selectedImg } = this.state;
    const { webformatURL, tags} = this.props.picture;
    return (
      <ImgWrap>
        <Img src={webformatURL} alt={tags} onClick={this.setSelectedImg} />
        <ImageModal
          isOpen={selectedImg !== null}
          onClose={this.closeModal}
          image={selectedImg}
          tags={tags}
        />
      </ImgWrap>
    );
  }
}



