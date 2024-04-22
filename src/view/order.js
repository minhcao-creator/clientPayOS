import NavbarMenu from "../component/Navbar";
import BookOrderItem from '../component/BookOrderItem';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react'
import setAuthToken from '../utils/setAuthToken';
import { useNavigate } from "react-router-dom";

function Order() {
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



  const { state } = useLocation();
  const { orderBooks } = state
  const [prices, setPrices] = useState(0)

  const hanldePayment = async () => {
    if (user) {
      const response = await axios.post("https://payos.onrender.com/payment", {
        orderCode: Number(String(Date.now()).slice(-6)),
        amount: prices / 10,
        description: 'Thanh toan don hang',
        returnUrl: 'https://clientpayos.onrender.com/success',
        cancelUrl: 'https://clientpayos.onrender.com/cancel',
        orderBooks: orderBooks
      })
      console.log(response.data)
      window.location.assign(response.data.checkout.checkoutUrl)
    }
    else {
      navigate('/login')
    }
  }

  useEffect(() => {
    loadUser()
    const result = orderBooks?.reduce((total, currentValue) => total = total + currentValue.price, 0)
    setPrices(result)
  }, [])

  return (
    <div className='d-flex flex-column justify-content-center'>
      <NavbarMenu user={user} setUser={setUser} />

      <div className="m-5 d-flex flex-column align-items-center">
        {
          orderBooks.map((book, index) => <BookOrderItem book={book} index={index} />)
        }
      </div>

      <div className="bg-danger-subtle d-flex justify-content-around align-items-center p-5 position-absolute bottom-0 w-100">
        <p>TOTAL PRICE: {prices} VND</p>
        <Button
          variant="outline-danger"
          onClick={hanldePayment}
        >THANH TOÁN</Button>
      </div>
    </div >
  )
}

export default Order