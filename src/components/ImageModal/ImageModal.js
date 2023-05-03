import Modal from 'react-modal';
import { SlClose } from 'react-icons/sl';
import PropTypes from 'prop-types';
import { CloseBtn, CloseBtnWrap } from './ImageModal.styled';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export const ImageModal = ({ isOpen, image, onClose, tags }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Image modal"
    >
      <div>
        <CloseBtnWrap>
          <CloseBtn aria-label="Close" onClick={onClose}>
            <SlClose size="24" fill="gray" />
          </CloseBtn>
        </CloseBtnWrap>
        <img src={image} alt={tags} width="800" />
      </div>
    </Modal>
  );
};

ImageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  image: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  tags: PropTypes.string.isRequired,
};