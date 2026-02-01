// App.jsx
import React, { useState } from 'react';

import '../style/add_window.css'
import '../App.css'
import { X, Link2, FileText, Image, Globe, SquareArrowOutUpRight, Upload } from 'lucide-react';

function AddWindow() {

  const [addWindowType, setAddWindowType] = useState<'link' | 'doc' | 'img'>('link')
  const [selectLinkType, setSelectLinkType] = useState<'web' | 'doc' | 'img'>('web')

  return (
    <div className='add_window'>
        <div className='add_window_title_container'>
            <div className='add_window_title center'>
              <Link2 strokeWidth={1.7} className='icon'/>
              <h3>링크 추가</h3>
            </div>
            <X strokeWidth={1.7} className='icon' />
        </div>

        <p className='add_window_subtitle'>작업에 관련된 링크를 추가하세요.</p>

        {/* 윈도우 추가시 링크 타입 설정후 추가하는 창 */}
        <ul className="add_window_type">
          <li
            className={`link_type center ${addWindowType === 'link' ? 'active' : ''}`}
            onClick={() => setAddWindowType('link')}
          >
            <Link2 strokeWidth={1.7} className="icon" />
            <span>링크</span>
          </li>

          <li
            className={`doc_type center ${addWindowType === 'doc' ? 'active' : ''}`}
            onClick={() => setAddWindowType('doc')}
          >
            <FileText strokeWidth={1.7} className="icon" />
            <span>문서</span>
          </li>

          <li
            className={`img_type center ${addWindowType === 'img' ? 'active' : ''}`}
            onClick={() => setAddWindowType('img')}
          >
            <Image strokeWidth={1.7} className="icon" />
            <span>이미지</span>
          </li>
        </ul>

      {/* 링크 유형 */}
      <ul className="active_link_type_container">
          <li className='select_link_type_container'>
            <p>링크 유형</p>
            <ul className='select_link_type'>
              <li className={`web_link_type revers_center ${selectLinkType === 'web' ? 'active' : ''}`}
              onClick={() => setSelectLinkType('web')}>
                <Globe strokeWidth={1.7} className='icon' />
                <span>웹사이트</span>
              </li>
              <li className={`doc_link_type revers_center ${selectLinkType === 'doc' ? 'active' : ''}`}
              onClick={() => setSelectLinkType('doc')}>
                <FileText strokeWidth={1.7} className="icon" />
                <span>문서</span>
              </li>
              <li className={`img_link_type revers_center ${selectLinkType === 'img' ? 'active' : ''}`}
              onClick={() => setSelectLinkType('img')}>
                <Image strokeWidth={1.7} className="icon" />
                <span>이미지</span>
              </li>
            </ul>
          </li>
          <li className='input_url_container'>
            <p>URL</p>
            <div className="input_url">
              <SquareArrowOutUpRight strokeWidth={1.7} className='icon' />
              <input type="text" placeholder='https://example.com' />
            </div>
          </li>
          <li className='input_url_title_container'>
            <p>제목(선택)</p>
            <div className='input_url_title'>
              <input type="text" placeholder='링크 제목을 입력하세요'/>
            </div>
          </li>
      </ul>

      {/* 문서유형 */}
      <ul className='active_doc_type_container'>
        <li className='upload_doc_file_container'>
          <p>파일 업로드</p>
          <div className='upload_doc_file revers_center'>
            <Upload strokeWidth={1.7} className='icon' />
            <p>클릭하여 문서를 업로드 하세요</p>
            <span>PDF, Word, Excel, PowerPoint, TXT, MD</span>
          </div>
        </li>
        <li className='upload_doc_title_container'>
          <p>제목(선택)</p>
          <div className='upload_doc_title'>
            <input type="text" placeholder='문서 제목을 입력하세요' />
          </div>
        </li>
      </ul>

      <div className="add_buton_container">
        <button className='cancel_button'>취소</button>
        <button className='add_button'>추가하기</button>
      </div>
    </div>
  );
}

export default AddWindow;
