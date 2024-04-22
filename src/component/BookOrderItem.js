import React from 'react'
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';


function BookOrderItem({ book, index }) {

    return (
        <div className="d-flex align-items-center justify-content-around" style={{ height: '5rem', width: '60rem' }} >
            <p>{index + 1}</p>
            <Image src="https://res.cloudinary.com/dazq0jikx/image/upload/v1713239287/film1_o7jbvr.jpg" rounded style={{ width: '3rem' }} />
            <p>{book.title}</p>
            <p>{book.price} VND</p>
            <Button
                variant="outline-danger"
                size="sm"
                onClick={() => { }}
            >X</Button>

        </div>
    )
}

export default BookOrderItem