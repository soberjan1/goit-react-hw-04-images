import { useState, useEffect } from 'react';
import { AppStyled } from './App.styled';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import Gallery from './ImageGallery/ImageGallery';
import { ButtonLoadMore } from './Button/Button';
import { Loader } from './Loader/Loader';
import Modal from './Modal/Modal';
import { fetchImg } from 'services/pixabay-api';

export const App = () => {
  const [imgName, setImgName] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalValue, setModalValue] = useState({});
  const [loadmore, setLoadmore] = useState(false);

  useEffect(() => {
    fetchImgData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, imgName]);

  async function fetchImgData() {
    if (!imgName) {
      return;
    }
    if (page === 1) {
      onLoadMore(false);
      setImages([]);
    }

    setLoading(true);

    try {
      const { hits, total } = await fetchImg(imgName, page);
      if (!total) {
        setLoading(false);
        return alert('На жаль, за вашим запитом нічого не знайдено');
      }

      setImages([...images, ...hits]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  const onLoadMore = async () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = data => {
    setShowModal(!showModal);
    if (data) {
      setModalValue(data);
    } else {
      setModalValue({});
    }
  };

  const handleSearch = async imgName => {
    setImgName(imgName);
    setImages([]);
    setPage('1');
    setLoadmore('true');
  };

  return (
    <AppStyled>
      {showModal && (
        <Modal onClick={toggleModal} data={modalValue} onClose={toggleModal} />
      )}
      {loading && <Loader />}
      <Searchbar onSubmit={handleSearch} />
      <Gallery
        images={images}
        loading={loading}
        onClick={toggleModal}
        loadMore={onLoadMore}
      />
      {loadmore && <ButtonLoadMore onClick={onLoadMore} />}

      <ToastContainer />
    </AppStyled>
  );
};

//////////////////////

// export default class sApp extends Component {
//   state = {
//     imgName: 'initialImage',
//     images: [],
//     page: 1,
//     loading: false,
//     showModal: false,
//     modalValue: {},
//     totalImages: 0,
//     loadMore: false,
//   };

//   onLoadMore = async () => {
//     this.setState(({ page }) => ({
//       page: page + 1,
//     }));
//   };

//   handleFormSubmit = imgName => {
//     this.setState({ imgName });
//   };

// async componentDidUpdate(prevProps, prevState) {
//   if (
//     prevState.imgName !== this.state.imgName ||
//     prevState.page !== this.state.page
//   ) {
//     this.setState({ loading: true });

//     const { hits, total } = await fetchImg(
//       this.state.imgName,
//       this.state.page
//     );

//     if (!total) {
//       return alert('На жаль, за вашим запитом нічого не знайдено');
//     }

//     this.setState(({ images }) => ({
//       images: [...images, ...hits],
//       loading: false,
//     }));
//   }
// }

//   toggleModal = modalValue => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//       modalValue,
//     }));
//   };

// handleSearch = async imgName => {
//   this.setState({ imgName, images: [], page: 1, loadMore: true });
// };

//   render() {
//     const { images, loading, showModal, modalValue, loadMore } = this.state;

//     return (
// <AppStyled>
//   {showModal && (
//     <Modal
//       onClick={this.toggleModal}
//       data={modalValue}
//       onClose={this.toggleModal}
//     />
//   )}
//   {loading && <Loader />}
//   <Searchbar onSubmit={this.handleSearch} />
//   <Gallery
//     images={images}
//     loading={loading}
//     onClick={this.toggleModal}
//     loadMore={this.onLoadMore}
//   />
//   {loadMore && <ButtonLoadMore onClick={this.onLoadMore} />}

//   <ToastContainer />
// </AppStyled>
//     );
//   }
// }
