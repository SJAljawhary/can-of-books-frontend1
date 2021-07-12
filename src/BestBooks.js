import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Jumbotron , Card} from 'react-bootstrap';
import './BestBooks.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';

class MyFavoriteBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      bookData: []
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

      }</div>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
