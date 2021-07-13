import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';






class BookFormModal extends Component {
    render() {
        const { user, isAuthenticated } = this.props.auth0;

        return (
            <>
                {isAuthenticated &&
                    <>
                        <Modal show={this.props.showModal} onHide={this.props.handleCloseModal}>
                            <Modal.Header onHide={this.props.handleCloseModal} closeButton>
                                <Modal.Title>Add your favourite book</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>

                                <Form>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Control type="text" placeholder="Book name" name="bookName"/>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Control as="textarea" rows={3} placeholder="Book descrition" name="bookDesc" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Control type="text" placeholder="Book status" name="bookStatus" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Control type="link" placeholder="Book image" name="bookImage" />
                                    </Form.Group>

                                     
                                    <Button variant="primary" type="submit">Save Changes</Button>
                                    <Button variant="primary" type="submit"  onHide={this.props.handleCloseModal}>Close</Button>

                                </Form>
                            </Modal.Body>
                        </Modal>

                    </>

                }
            </>
        );
    }
}

export default withAuth0(BookFormModal);















