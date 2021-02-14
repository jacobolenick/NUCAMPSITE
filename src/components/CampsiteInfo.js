import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Col, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from "react-redux-form";

const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
  state = { isModalOpen: false };

  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };

  handleSubmit(values) {
    this.toggleModal();
    this.props.postComment(
      this.props.campsiteId,
      values.rating,
      values.author,
      values.text
    );
  }



  render() {
    return (

      <div><Button outline onClick={this.toggleModal}><i className="fa fa-pencil fa-lg" /> Submit Comment </Button>
        {/* add modal here */}
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>submit Comment</ModalHeader>
          <ModalBody>
          <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Label htmlFor="rating" md={12}>
                Rating
              </Label>
              <Col md={12}>
                <Control.select
                  model=".rating"
                  id="rating"
                  name="rating"
                  placeholder="rating"
                  className="form-control"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Control.select>
              </Col>
              <Label htmlFor="author" md={12}>
                Author
              </Label>
              <Col>
                <Control.text
                  model=".author"
                  id="author"
                  name="author"
                  placeholder="Your Name"
                  className="form-control"
                  validators={{
                    minLength: minLength(2),
                    maxLength: maxLength(15),
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".author"
                  show="touched"
                  component="div"
                  messages={{
                    required: "Required",
                    minLength: "Must be at least 2 characters",
                    maxLength: "Must be 15 characters or less",
                  }}
                />
              </Col>
              <Col>
                <Label htmlFor="text">Comment</Label>
                <Control.textarea
                  model=".text"
                  id="text"
                  name="text"
                  placeholder=""
                  className="form-control"
                  rows={6}
                />
              </Col>
              <Col>
                <Button type="submit" value="submit" color="primary">
                  Submit Comment
                </Button>
              </Col>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    )

  };
}


function RenderCampsite({ campsite }) {
  return (
    <div className="col-md-5, m-1">
      <Card style={{ radius: "20px", shadow: "#000000" }}>
        <CardImg top src={campsite.image} alt={campsite.name} />
        <CardBody>
          <CardText>{campsite.description}</CardText>
        </CardBody>
      </Card>
    </div >
  )
}
function RenderComments({ comments }) {
  if (comments) {
    return (
      <div className="col-md-5 m-1" >
        <h4>Comments</h4>
        {comments.map(comment => {
          return (
            <div key={comment.id}>
              <p>{comment.text}<br />
                {Comment.author} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}
              </p>
            </div>
          );
        })}

        <CommentForm />

      </div>
    );
  }
  return <div />;
}



function CampsiteInfo(props) {
  if (props.campsite) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Breadcrumb>
              <BreadcrumbItem><Link to="/directory">RenderDirectoryItem</Link></BreadcrumbItem>
              <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
            </Breadcrumb>
            <h2>{props.campsite.name}</h2>
            <hr />
          </div>
        </div>

        <div className="row">
          <RenderCampsite campsite={props.campsite} />
          <RenderComments comments={props.comments} />
        </div>
      </div>
    );
  }
  return <div />;
}







export default CampsiteInfo;