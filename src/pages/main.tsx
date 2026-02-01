// App.jsx
import React from 'react';
import '../App.css'
import '../style/main.css'
import { Plus } from "lucide-react";

import AddWindow from '../components/AddWindow';

function Main() {


  return (
    <div className='main center'>
      <div className='add_windows_wrap revers_center'>
          <div className='add_windows center'>
            <Plus color='white'  className='add_windows_button' />
          </div>
          <p>클릭하여 시작하기</p>
      </div>
      <AddWindow />
    </div>
  );
}

export default Main;
