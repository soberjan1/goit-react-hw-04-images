import { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import {
  Header,
  Form,
  Button,
  ButtonSpan,
  FormInput,
} from './Searchbar.styled';

export default class Searchbar extends Component {
  static propTypes = { onSubmit: PropTypes.func.isRequired };

  state = {
    imgName: '',
  };

  handleNameChange = event => {
    this.setState({ imgName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.imgName.trim() === '') {
      return toast('Пустая строка, введите запрос');
    }

    this.props.onSubmit(this.state.imgName);
    this.setState({ imgName: '' });
  };

  render() {
    return (
      <Header>
        <Form onSubmit={this.handleSubmit}>
          <Button type="submit">
            <ButtonSpan>Search</ButtonSpan>
          </Button>

          <FormInput
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleNameChange}
            value={this.state.imgName}
          />
        </Form>
      </Header>
    );
  }
}
