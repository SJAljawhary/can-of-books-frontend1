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
      showModal : false
    }
  }
  componentDidMount = async () => {

    const { user } = this.props.auth0;
    //http://localhost:3003/books?userEmail=sndjehad@gmail.com

    let url = `http://localhost:3003/books?userEmail=${user.email}`

    let responseData = await axios.get(url);

    await this.setState({
      bookData: responseData.data
    })

  }

  addBook = async (event) =>{
    event.preventDefault();

    let bookName = event.target.bookName.value;
    let bookDesc = event.target.bookDesc.value;
    let bookStatus = event.target.bookStatus.value;
    let bookImage = event.target.bookImage.value;
    
  }

  handleModalShow = () => {
    this.setState({
      showModal : true
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
              </Card>
            )
          })
        }
        <Button onClick={this.handleModalShow} variant="primary" type="submit" >Add Book</Button>
        {/* <BookFormModal showModal={this.state.showModal} /> */}

      </div>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
