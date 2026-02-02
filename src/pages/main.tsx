// App.jsx
import React, { useState } from 'react';
import '../App.css'
import '../style/main.css'
import { Plus } from "lucide-react";

import AddWindow from '../components/AddWindow';

function Main() {

  const [addWindowOpen, setAddWindowOpen] = useState(false)

  return (
    <div className='main center'>
      <div className='add_windows_wrap revers_center' onClick={() => setAddWindowOpen(true)}>
          <div className='add_windows center'>
            <Plus color='white'  className='add_windows_button' />
          </div>
          <p>클릭하여 시작하기</p>
            {addWindowOpen &&(
              <AddWindow onClose={() => setAddWindowOpen(false)} />
            )}
      </div>
    </div>
  );
}

export default Main;
