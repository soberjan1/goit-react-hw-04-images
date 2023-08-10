import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import {
  Header,
  Form,
  Button,
  ButtonSpan,
  FormInput,
} from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const [imgName, setImgName] = useState('');

  const handleNameChange = e => {
    setImgName(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (imgName.trim() === '') {
      return toast('Пустая строка, введите запрос');
    }
    onSubmit(imgName);
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <Button type="submit">
          <ButtonSpan>Search</ButtonSpan>
        </Button>

        <FormInput
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleNameChange}
          value={imgName}
        />
      </Form>
    </Header>
  );
};

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };

export default Searchbar;
