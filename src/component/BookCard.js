import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import { useState } from 'react'

function BookCard({ id, title, image, introduction, price, addOrderBooks }) {
    // const hanldePayment = async () => {
    //     const response = await axios.post("http://localhost:4004/payment", {
    //         orderCode: Number(String(Date.now()).slice(-6)),
    //         amount: price,
    //         description: 'Thanh toan don hang',
    //         returnUrl: 'http://172.18.240.1:3000/success',
    //         cancelUrl: 'http://172.18.240.1:3000/cancel',
    //         book: id
    //     })
    //     console.log(response.data)
    //     window.location.assign(response.data.checkout.checkoutUrl)
    // }
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