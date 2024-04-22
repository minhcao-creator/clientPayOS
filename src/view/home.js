import React from 'react';
import { useState, useEffect } from 'react'
import BookCard from "../component/BookCard";
import NavbarMenu from "../component/Navbar";
import axios from 'axios'
import "./view.css"
import { useNavigate } from "react-router-dom";
import setAuthToken from '../utils/setAuthToken';


function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState()

  const loadUser = async () => {
    if (localStorage["payOSUserToken"]) {
      setAuthToken(localStorage["payOSUserToken"])
    }
    try {
      const response = await axios.get("https://payos.onrender.com/auth")
      if (response.data.success) {
        setUser(response.data.user)
      }
    } catch (error) {
      localStorage.removeItem("payOSUserToken")
      setAuthToken(null)
      setUser(null)
    }
  }



  const [books, setBooks] = useState([])

  const getBooksAPI = async () => {
    const response = await axios.get('https://payos.onrender.com/books')
    // console.log(response.data)
    setBooks(response.data.books)
  }

  const [orderBooks, setOrderBooks] = useState([])

  const addOrderBooks = (id, title, image, price) => {
    setOrderBooks([
      ...orderBooks,
      {
        id,
        title,
        image,
        price
      }
    ])
    // console.log(orderBooks)
  }

  const handleOrder = () => {
    console.log(orderBooks)
    navigate('/order', {
      state: {
        orderBooks: orderBooks
      }
    })
  }


  useEffect(() => {
    loadUser()
    getBooksAPI()
  }, [])

  // console.log(books)

  return (
    <div className='d-flex flex-column justify-content-center'>
      <NavbarMenu handleOrder={handleOrder} user={user} setUser = {setUser}/>
      <div className='d-flex flex-wrap m-5 smomth'>
        {books?.map((book) => {
          return <BookCard id={book._id} title={book.title} image={book.image} introduction={book.introduction} price={book.price} addOrderBooks={addOrderBooks} />
        })}
      </div>

    </div >

  );
}

export default Home;
