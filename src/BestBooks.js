import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Jumbotron, Card } from 'react-bootstrap';
import './BestBooks.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import BookFormModal from './components/BookFormModal';
import { Button } from 'react-bootstrap';
import UpdateBookForm from './components/UpdateBookForm';

class MyFavoriteBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      bookData: [],
      showModal: false,
      userEmail: '',
      server: process.env.REACT_APP_SERVER_URL,
      showUpdateForm: false,
      index: 0,
      bookName: '',
      bookDesc: '',
      bookStatus: '',
      bookImage: ''

    }
  }
  componentDidMount = async () => {

    const { user } = this.props.auth0;

    await this.setState({
      userEmail: `${user.email}`
    })

    //http://localhost:3003/books?userEmail=sndjehad@gmail.com

    let url = `http://localhost:3003/books?userEmail=${this.state.userEmail}`;

    let responseData = await axios.get(url);

    await this.setState({
      bookData: responseData.data

    })

  }

  addBook = async (event) => {
    event.preventDefault();

    const bookFormData = {

      userEmail: this.state.userEmail,
      bookName: event.target.bookName.value,
      bookDesc: event.target.bookDesc.value,
      bookStatus: event.target.bookStatus.value,
      bookImage: event.target.bookImage.value,
    }

    // console.log()

    let result = await axios.post(`${this.state.server}/addbook`, bookFormData)

    this.setState({

      bookData: result.data
    })
  }

  deleteBook = async (index) => {


    let paramsObj = {
      userEmail: this.state.userEmail
    }

    let removedBook = await axios.delete(`${this.state.server}/deleteBook/${index}`, { params: paramsObj })

    this.setState({

      bookData: removedBook.data
    })

  }

  showModalHandler = () => {
    this.setState({
      showModal: true
    })

  }

  handleCloseModal = () => {
    this.setState({
      showModal: false
    })
  }


  showupdateBookForm = async (index) => {
    await this.setState({
      showUpdateForm: true,
      index: index,
      bookName: this.state.bookData[index].name,
      bookDesc: this.state.bookData[index].description,
      bookStatus: this.state.bookData[index].status,
      bookImage: this.state.bookData[index].img

    })
  }

  updateBook = async (event) => {
    event.preventDefault();

    let bookFormData = {

      userEmail: this.state.userEmail,
      bookName: event.target.bookName.value,
      bookDesc: event.target.bookDesc.value,
      bookStatus: event.target.bookStatus.value,
      bookImage: event.target.bookImage.value,
    }

    let result = await axios.put(`${this.state.server}/updateBook/${this.state.index}`, bookFormData)

    this.setState({
      bookData: result.data
    })
  }



  render() {
    return (
      <div>

        <Jumbotron>
          <h1>My Favorite Books</h1>
          <p>
            This is a collection of my favorite books
          </p>

          {this.state.bookData.length && this.state.bookData.map((item, idx) => {
            return (

              <Card key={idx}>
                <Card.Body> Name :{item.name}</Card.Body>
                <Card.Body> Description :{item.description}</Card.Body>
                <Card.Body> Status : {item.status}</Card.Body>
                <img src={item.img} style={{ width: '200px', marginLeft: '500px' }}></img>

                <Button onClick={() => this.deleteBook(idx)} style={{ width: '120px', marginLeft: '400px' }}>Delete Book</Button>

                <Button onClick={() => this.showupdateBookForm(idx)} style={{ width: '120px', marginLeft: '400px' }}>Update Book</Button>

              </Card>
            )
          })
          }
          {this.state.showUpdateForm &&
            <UpdateBookForm updateBook={this.updateBook} name={this.state.bookName} description={this.state.bookDesc} status={this.state.bookStatus} img={this.state.bookImage} />}

          <Button onClick={this.showModalHandler} variant="primary" type="submit" style={{ marginBottom: '800px' }} >Add Book</Button>

          <BookFormModal addBook={this.addBook} show={this.state.showModal} onHide={this.handleCloseModal} />


        </Jumbotron>
      </div>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
