import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';

class CampsiteInfo extends Component {

  renderComments(comments) {
    if (comments) {
      return (
        <div className="col-md-5 m-1">
          <h4>Comments</h4>
          {comments.map(comment => {
            return (
              <div key={comment.id}>
                <p>{comment.text}</p>
                <p>{Comment.author} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))
                }</p>
              </div>
            )
          })}
        </div>
      )
    }
  }
  renderCampsite(campsite) {
    return (
      <div className="col-md-5, m-1">
        <Card>
          <CardImg top src={campsite.image} alt={campsite.name} />
          <CardImgOverlay>
            <CardTitle>{campsite.name}</CardTitle>
          </CardImgOverlay>

        </Card>
      </div>
    )
  }
  render() {
    if (this.props.campsite) {
      return (
        <div className="container">
          <div className="row">
            {this.renderCampsite(this.props.campsite)}
            {this.renderComments(this.props.campsite.comments)}
          </div>
        </div>
      );
    }
    return <div />;
  }
}



export default CampsiteInfo;