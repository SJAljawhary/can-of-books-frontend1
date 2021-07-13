import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Jumbotron, Card } from 'react-bootstrap';
import './BestBooks.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import BookFormModal from './components/BookFormModal';
import { Button } from 'react-bootstrap';

class MyFavoriteBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      bookData: [],
      showModal: false,
      userEmail: '',
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

      let userEmail = this.state.userEmail;
      let bookName = event.target.bookName.value;
      let bookDesc = event.target.bookDesc.value;
      let bookStatus = event.target.bookStatus.value;
      let bookImage = event.target.bookImage.value;

      const bookFormData = {

        userEmail : this.state.userEmail,
        bookName : event.target.bookName.value,
        bookDesc : event.target.bookDesc.value,
        bookStatus : event.target.bookStatus.value,
        bookImage : event.target.bookImage.value,
      }

      let booksData = await axios.post(`${this.state.server}/books` , bookFormData)

      this.setState({

        bookData : booksData.data
      })
  }

  deleteBook = async (id) => {

   

    let booksData = await axios.delete(`http://localhost:3003/books/${id}?email=${this.state.userEmail}`)

    this.setState({

      bookData : booksData.data
    })

  }

  showModalHandler = async () => {
    await this.setState({
      showModal: true
    })
  }

  handleCloseModal = async () => {
    await this.setState({
      showModal: false
    })
  }

  render() {
    return (
      <div>
        {this.state.bookData == null ?
          <Jumbotron>
            <h1>My Favorite Books</h1>
            <p>
              This is a collection of my favorite books
            </p>
          </Jumbotron>
          :

          this.state.bookData.map(item => {
            return (
              <Card>
                <Card.Body> Name :{item.name}</Card.Body>
                <Card.Body> Description :{item.description}</Card.Body>
                <Card.Body> Status : {item.status}</Card.Body>
                <Button  onClick={() => this.deleteBook(item._id)} >Delete Book</Button>

              </Card>
            )
          })
        }
        <Button  onClick={this.showModalHandler} variant="primary" type="submit" >Add Book</Button>
        
        <BookFormModal addBook={this.addBook} show={this.state.showModal} handleCloseModal={this.handleCloseModal} />

      </div>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
