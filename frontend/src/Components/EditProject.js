import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

//import snackbar from material-ui for popup notification
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class EditProject extends Component {

    constructor(props) {
        super(props);

        //snackbar open/close status initialised at false and msg is empty
        this.state = { snackbaropen: false, snackbarmsg: '' };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //snackbar close function
    snackbarClose = (event) => {
        this.setState({ snackbaropen: false });
    }

    handleSubmit(event) {
        event.preventDefault();

        //fetch put api to edit items
        fetch('/api/' + this.props.id, {
            method: "PUT",
            headers: {
                "Accept": 'application/json',
                "content-type": 'application/json'
            },
            body: JSON.stringify({
                id: event.target.id.value,
                title: event.target.title.value,
                description: event.target.description.value,
                URL: event.target.URL.value
            })
        })
            .then(res => res.json())
            .then((result) => {

                //snackbar status is open and msg response declared
                this.setState({ snackbaropen: true, snackbarmsg: 'Project Updated' });
            },
                (error) => {
                    this.setState({ snackbaropen: true, snackbarmsg: 'Failed' });
                }
            )
    }

    render() {
        return (
            <div className="container">

                {/* Snackbar is called and is open for 3 seconds unless user closes it before, message and option to close displayed */}
                <Snackbar
                    open={this.state.snackbaropen}
                    autoHideDuration={3000}
                    onClose={this.snackbarClose}
                    message={<span id="message-id">{this.state.snackbarmsg}</span>}
                    action={[
                        <IconButton
                            key="close"
                            arial-label="Close"
                            color="inherit"
                            onClick={this.snackbarClose}
                        >x
                </IconButton>
                    ]} />

                {/* Popup modal allows user to edit project details for the selected project and is updated once the 
                "Update" is selected */}
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit Project
                  </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>

                                    <Form.Group controlId="id">
                                        <Form.Label>Project ID</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="id"
                                            required
                                            disabled
                                            defaultValue={this.props.id}
                                            placeholder="ID" />
                                    </Form.Group>

                                    <Form.Group controlId="title">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="title"
                                            required
                                            defaultValue={this.props.projecttitle}
                                            placeholder="Title" />
                                    </Form.Group>

                                    <Form.Group controlId="description">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="description"
                                            required
                                            defaultValue={this.props.projectdescription}
                                            placeholder="Description" />
                                    </Form.Group>

                                    <Form.Group controlId="URL">
                                        <Form.Label>URL</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="URL"
                                            required
                                            defaultValue={this.props.projecturl}
                                            placeholder="URL" />
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Update Project
                                    </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                        
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>

        );
    }
}