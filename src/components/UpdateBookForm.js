import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';

class UpdateBookForm extends Component {
    render() {
        const { user, isAuthenticated } = this.props.auth0;

        return (
            <>
                {isAuthenticated &&
                    <>
                    
                                <Form onSubmit={this.props.updateBook}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Control type="text" name="bookName" defaultValue={this.props.name}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Control as="textarea" rows={3} name="bookDesc" defaultValue={this.props.description} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Control type="text" name="bookStatus" defaultValue={this.props.status}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Control type="link" name="bookImage" defaultValue={this.props.img}/>
                                    </Form.Group>
                                                            
                                                            
                                    <Button variant="primary" type="submit" >Update Book</Button>
                                                                  
                                </Form>
                      
                    </>

                }
            </>
        );
    }
}


export default withAuth0(UpdateBookForm);