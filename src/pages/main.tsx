// App.jsx
import React from 'react';
import '../App.css'
import '../style/main.css'
import { Plus } from "lucide-react";

function Main() {


  return (
    <div className='main center'>
      <div className='add_windows_wrap invers_center'>
          <div className='add_windows center'>
            <Plus color='white'  className='add_windows_button' />
          </div>
          <p>클릭하여 시작하기</p>
      </div>
    </div>
  );
}

export default Main;
