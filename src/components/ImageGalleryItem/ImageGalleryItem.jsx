import PropTypes from 'prop-types';
import { GalleryListItem, GalleryImg } from './ImageGalleryItem.style';

export const GalleryItem = ({
  id,
  webformatURL,
  largeImageURL,
  tags,
  onClick,
}) => {
  return (
    <GalleryListItem
      key={id}
      onClick={() => {
        onClick({ largeImageURL, tags });
      }}
    >
      <GalleryImg src={webformatURL} alt={tags} />
    </GalleryListItem>
  );
};

GalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};
