import React, { Component } from 'react';
//import react-bootstrap
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
//import Add and Edit project components
import { AddProject } from './AddProject';
import { EditProject } from './EditProject';

export class Project extends Component {

    constructor(props) {
        super(props);
        //initialise states - webProjects array and addModalShow and editModalShow set to false
        this.state = {
            webProjects: [],
            addModalShow: false,
            editModalShow: false
        }
    }

    //displays list using refreshList function when application is run
    componentDidMount() {
        this.refreshList();
    }

    //fetches data from webProjects.json file to be displayed
    refreshList() {
        fetch('/api')
            .then(response => response.json())
            .then(json => {
                this.setState({ webProjects: json.webProjects });
            })
    }

    //Refreshes list once new project is added, no need to reload page
    componentDidUpdate() {
        this.refreshList();
    }

    //delete function deletes the item from the list
    deleteProject(id) {
        if (window.confirm('Are you sure you want to delete Project?')) {
            fetch('/api/' + id, {
                method: 'DELETE',
                header: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
        }
    }

    render() {
        //declare necessary variables
        const { webProjects, id, projecttitle, projectdescription, projecturl } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });

        return (
            <div className="container">
                {/* Table to display all items from the webProjects array */}
                <Table className="mt-4 m-3" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Project ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>URL</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {webProjects.map(webProject =>
                            <tr key={webProject.id}>
                                <td>{webProject.id}</td>
                                <td>{webProject.title}</td>
                                <td>{webProject.description}</td>
                                <td>{webProject.URL}</td>
                                <td>
                                    <ButtonToolbar>

                                        {/* Edit Button */}
                                        <Button
                                            className="mr-2" variant="info"
                                            onClick={() => this.setState({
                                                editModalShow: true, id: webProject.id,
                                                projecttitle: webProject.title, projectdescription: webProject.description,
                                                projecturl: webProject.URL
                                            })}>
                                            Edit
                                    </Button>

                                    {/* Delete Button */}
                                    <Button className="mr-2" variant="danger"
                                            onClick={() => this.deleteProject(webProject.id)}>
                                            Delete
                                    </Button>

                                    {/* EditProject component called */}
                                    <EditProject
                                            show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            id={id}
                                            projecttitle={projecttitle}
                                            projectdescription={projectdescription}
                                            projecturl={projecturl}
                                    />

                                    </ButtonToolbar>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>

                {/* Add Project Button */}
                <ButtonToolbar>
                    <Button variant="primary" onClick={() => this.setState({ addModalShow: true })}>
                        Add Project
                </Button>
                    {/* AddProject component called */}
                    <AddProject
                        show={this.state.addModalShow}
                        onHide={addModalClose}
                    />
                </ButtonToolbar>
            </div>
        )
    }
}