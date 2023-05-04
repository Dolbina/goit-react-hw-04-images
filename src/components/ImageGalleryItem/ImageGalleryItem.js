import { useState } from 'react';
import { ImgWrap, Img } from './ImageGalleryItem.styled';
import { ImageModal } from 'components/ImageModal/ImageModal';
import PropTypes from 'prop-types';


export const ImageGalleryItem = ({
  picture: { webformatURL, tags, largeImageURL },
}) => {
  const [selectedImg, setSelectedImg] = useState(null);

  const selectedImgModal = () => {
    setSelectedImg(largeImageURL);
  };

  const closeModal = () => {
    setSelectedImg(null);
  };

  return (
    <ImgWrap>
      <Img src={webformatURL} alt={tags} onClick={selectedImgModal} />
      <ImageModal
        isOpen={selectedImg !== null}
        onClose={closeModal}
        image={selectedImg}
        tags={tags}
      />
    </ImgWrap>
  );
};

ImageGalleryItem.propTypes = {
  picture: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};
