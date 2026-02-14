// App.jsx
import React from 'react';
import '../style/project_item.css'
import {Ellipsis } from 'lucide-react';
import '../App.css'


function ProjectItem() {

  return (
    <div className='project_item_container revers-center'>
        <div className='project_img'>
            <div className='project_edit_button center'>
                <Ellipsis strokeWidth={1.7} className='icon'/>
            </div>
        </div>
        <div className='project_name'>
          <h4>사용자가 설정한 제목</h4>
          <p className='project_sub_name'>공부 계획들누가저기이것저것</p>
          <span className='edit_date'>1시간 전 수정됨</span>
        </div>

    </div>
  );
}

export default ProjectItem;
