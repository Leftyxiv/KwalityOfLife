// card template used straight from bootstrap docs
import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';


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
            <Button variant="primary">Details!</Button>
          </Card.Body>
        </Card>
    </div>
  )
}

export default PostCard;