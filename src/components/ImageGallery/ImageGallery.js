import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { ImageGallaryWrap } from './ImageGallery.styled';

export const ImageGallery = ({ pictures }) => {
  return (
    <ImageGallaryWrap>
      {pictures.hits.map(picture => (
        <li key={picture.id}>
          <ImageGalleryItem picture={picture} />
        </li>
      ))}
    </ImageGallaryWrap>
  );
};


ImageGallery.propTypes = {
  pictures: PropTypes.shape({
    hits: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

