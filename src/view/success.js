import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken';


function Success() {
  // <Button variant="outline-success" href="https://filebin.net/a4a0fp4ux3nc3b62/book.pdf">Click to download {titles} book</Button>
  const [files, setFiles] = useState()
  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);

  const id = urlParams.get('id')

  const handleResponsePayment = async () => {
    const res = await axios.post("https://payos.onrender.com/payment/result", {
      orderId: id
    })
    setFiles(res.data.datafiles)
    console.log(res.data)
  }


  useEffect(() => {
    setAuthToken(localStorage["payOSUserToken"])
    handleResponsePayment()
  }, [])
  return (
    <div className='d-flex flex-column align-items-center m-4'>
      <div className='d-flex flex-column align-items-center gap-4 p-5 bg-success-subtle w-50 rounded'>
        <p>Thanh toán thành công.</p>
        <p>Nhấn vào để tải sách về và bạn đọc nhé !!!</p>

        {files?.map((file) => <Button variant="outline-success" href={file.url}>Click to downloads {file.title} book</Button>)}
        <Button variant="outline-dark">Trở về trang chủ</Button>
      </div>
    </div>

  )
}

export default Success