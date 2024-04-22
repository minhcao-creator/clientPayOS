import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { useState } from 'react'

function BookCard({ id, title, image, introduction, price, addOrderBooks }) {
    const [choose, setChosse] = useState('Choose')


    return (
        <Card style={{ width: '14rem' }} className="m-4">
            <Card.Img variant="top" src={image} />
            <Card.ImgOverlay>
                <Card.Title className="text-white">{title}</Card.Title>
            </Card.ImgOverlay>
            <Card.Body className='d-flex justify-content-around'>
                <Card.Text>
                    {introduction}
                </Card.Text>
                <Card.Text>
                    {price}
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>
                    <Button
                        variant="outline-success"
                        className='w-100'
                        onClick={(event) => {
                            addOrderBooks(id, title, image, price)
                            setChosse("Choosed")
                            event.target.disabled = true
                        }}
                    >{choose}</Button>
                </ListGroup.Item>
            </ListGroup>
        </Card>
    );
}

export default BookCard;