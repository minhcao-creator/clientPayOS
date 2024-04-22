import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import axios from 'axios'


function Cancel() {
  

  return (
    <div className='d-flex align-items-center justify-content-center mt-5'>
      <div className='d-flex flex-column align-items-center gap-4 p-5 bg-body-secondary w-50 rounded'>
        <p>Thanh toán không thành công!!!</p>
        <Button variant="outline-danger">Trở về đơn hàng</Button>
        <Button variant="outline-dark">Trở về trang chủ</Button>
      </div>

    </div>
  )
}

export default Cancel