import { Component } from 'react';
import { AppStyled } from './App.styled';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import Gallery from './ImageGallery/ImageGallery';
import { ButtonLoadMore } from './Button/Button';
import { Loader } from './Loader/Loader';
import Modal from './Modal/Modal';
import { fetchImg } from 'services/pixabay-api';

export default class App extends Component {
  state = {
    imgName: 'initialImage',
    images: [],
    page: 1,
    loading: false,
    showModal: false,
    modalValue: {},
    totalImages: 0,
    loadMore: false,
  };

  onLoadMore = async () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  handleFormSubmit = imgName => {
    this.setState({ imgName });
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.imgName !== this.state.imgName ||
      prevState.page !== this.state.page
    ) {
      this.setState({ loading: true });

      const { hits, total } = await fetchImg(
        this.state.imgName,
        this.state.page
      );

      if (!total) {
        return alert('На жаль, за вашим запитом нічого не знайдено');
      }

      this.setState(({ images }) => ({
        images: [...images, ...hits],
        loading: false,
      }));
    }
  }

  toggleModal = modalValue => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      modalValue,
    }));
  };

  handleSearch = async imgName => {
    this.setState({ imgName, images: [], page: 1, loadMore: true });
  };

  render() {
    const { images, loading, showModal, modalValue, loadMore } = this.state;

    return (
      <AppStyled>
        {showModal && (
          <Modal
            onClick={this.toggleModal}
            data={modalValue}
            onClose={this.toggleModal}
          />
        )}
        {loading && <Loader />}
        <Searchbar onSubmit={this.handleSearch} />
        <Gallery
          images={images}
          loading={loading}
          onClick={this.toggleModal}
          loadMore={this.onLoadMore}
        />
        {loadMore && <ButtonLoadMore onClick={this.onLoadMore} />}

        <ToastContainer />
      </AppStyled>
    );
  }
}
