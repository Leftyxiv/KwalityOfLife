// card template used straight from bootstrap docs
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const PostCard = ({ post }) => {
  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={post.product_image} />
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
              <Card.Text>
                {post.product_website}
              </Card.Text>
            <Link to={`/post/${post.id}`} ><Button variant="dark">Details!</Button></Link>
          </Card.Body>
        </Card>
    </div>
  )
}

export default PostCard;
