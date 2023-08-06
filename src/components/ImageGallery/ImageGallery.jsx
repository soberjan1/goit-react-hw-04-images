import PropTypes from 'prop-types';
import { Component } from 'react';
import { GalleryList } from './ImageGallery.styled';
import { GalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export default class Gallery extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  render() {
    const { images, onClick } = this.props;

    if (!images || images.length === 0) {
      return <p>Start searching for images</p>;
    }

    return (
      <GalleryList>
        {images.map(({ id, webformatURL, largeImageURL, tags }) => (
          <GalleryItem
            key={id}
            id={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            tags={tags}
            onClick={onClick}
          />
        ))}
      </GalleryList>
    );
  }
}
