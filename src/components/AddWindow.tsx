// App.jsx
import React, { useState, useRef, useEffect } from 'react';
import FileDisplay from '../components/FileDisplay'
import '../style/add_window.css'
import '../App.css'
import { X, Link2, FileText, Image, Globe, SquareArrowOutUpRight, Upload } from 'lucide-react';

type AddWindowProps = {
  onClose: () => void;
  onAdd: (data: {
    type: 'link' | 'doc' | 'img';
    url?: string;
    file?: File;
    title?: string;
  }) => void;
};

function AddWindow({ onClose, onAdd }: AddWindowProps) {


  const [addWindowType, setAddWindowType] = useState<'link' | 'doc' | 'img'>('link')
  const [selectLinkType, setSelectLinkType] = useState<'web' | 'doc' | 'img'>('web')

  // 파일   업로드 상태 관리 
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<File | null>(null);

  const [linkUrl, setLinkUrl] = useState('');
  const [linkTitle, setLinkTitle] = useState('');
  const [docTitle, setDocTitle] = useState('');
  const [imgTitle, setImgTitle] = useState('');

  
useEffect(() => {
  // 타입이 바뀌면 이전 타입 데이터 초기화
  setSelectedImage(null);
  setSelectedDoc(null);
  setLinkUrl('');
  setLinkTitle('');
  setDocTitle('');
  setImgTitle('');
}, [addWindowType]);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);


  // 이미지
  const handleImageClick = () => imageInputRef.current?.click();
  const handleImageDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();
  const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedImage(e.dataTransfer.files[0]);
    }
  };

  // 문서
  const handleDocClick = () => docInputRef.current?.click();
  const handleDocDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();
  const handleDocDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedDoc(e.dataTransfer.files[0]);
    }
  };
  return (
    <div className='add_window'>
        <div className='add_window_title_container'>
            <div className='add_window_title center'>
              <Link2 strokeWidth={1.7} className='icon'/>
              <h3>링크 추가</h3>
            </div>
            <X strokeWidth={1.7} className='icon' onClick={(e) => {e.stopPropagation(); onClose();}} />
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
      <ul className={`active_link_type_container ${addWindowType === 'link' ? 'show' : ''}`}>
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
              <input type="text" placeholder='https://example.com' value={linkUrl} onChange={e => setLinkUrl(e.target.value)} />
            </div>
          </li>
          <li className='input_url_title_container'>
            <p>제목(선택)</p>
            <div className='input_url_title'>
              <input type="text" placeholder='링크 제목을 입력하세요' value={linkTitle} onChange={e => setLinkTitle(e.target.value)}/>
            </div>
          </li>
      </ul>

      {/* 문서유형 */}
      <ul className={`active_doc_type_container ${addWindowType === 'doc' ? 'show' : ''}`}>
        <li className='upload_doc_file_container'>
          <p>파일 업로드</p>
          <div className='upload_doc_file revers_center'
            onClick={handleDocClick}
            onDragOver={handleDocDragOver}
            onDrop={handleDocDrop}>
            {selectedDoc ? <FileDisplay file={selectedDoc} onRemove={() => setSelectedDoc(null)} /> : (
              <>
                <FileText strokeWidth={1.7} className='icon' />
                <p>클릭 또는 드래그하여 문서를 업로드 하세요</p>
                <span>PDF, Word, Excel, PowerPoint, TXT, MD</span>
              </>
            )}
          </div>
        </li>
        <li className='upload_doc_title_container'>
          <p>제목(선택)</p>
          <div className='upload_doc_title'>
            <input type="text" placeholder='문서 제목을 입력하세요' value={docTitle} onChange={e => setDocTitle(e.target.value)} />
          </div>
        </li>
      </ul>

      {/* 이미지 유형 */}
      <ul className={`active_img_type_container ${addWindowType === 'img' ? 'show' : ''}`}>
        <li className='upload_img_file_container'>
          <p>이미지 업로드</p>
          <div className='upload_img_file revers_center'
            onClick={handleImageClick}
            onDragOver={handleImageDragOver}
            onDrop={handleImageDrop}>
            {selectedImage ? <FileDisplay file={selectedImage} onRemove={() => setSelectedImage(null)} /> : (
              <>
                <Upload strokeWidth={1.7} className='icon' />
                <p>클릭 또는 드래그하여 이미지를 업로드 하세요</p>
                <span>PNG, JPG, GIF, SVG, WebP</span>
              </>
            )}
          </div>
        </li>
        <li className='upload_img_title_container'>
          <p>제목(선택)</p>
          <div className='upload_img_title'>
            <input type="text" placeholder='이미지 제목을 입력하세요' value={imgTitle} onChange={e => setImgTitle(e.target.value)}/>
          </div>
        </li>
      </ul>

      <div className="add_buton_container">
        <button className='cancel_button' onClick={(e) => {e.stopPropagation(); onClose();}}>취소</button>
        <button
          className='add_button'
          onClick={() => {
            if (addWindowType === 'link' && linkUrl) {
              onAdd({
                type: 'link',
                url: linkUrl,
                title: linkTitle
              });
            }

            if (addWindowType === 'doc' && selectedDoc) {
              onAdd({
                type: 'doc',
                file: selectedDoc,
                title: docTitle
              });
            }

            if (addWindowType === 'img' && selectedImage) {
              onAdd({
                type: 'img',
                file: selectedImage,
                title: imgTitle
              });
            }

            onClose();
          }}
        >
          추가하기
        </button>
      </div>


      {/* 이미지 input */}
      <input
        type="file"
        accept="image/png, image/jpg, image/jpeg, image/gif, image/svg+xml, image/webp"
        style={{ display: 'none' }}
        ref={imageInputRef}
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) setSelectedImage(e.target.files[0]);
        }}
      />

      {/* 문서 input */}
      <input
        type="file"
        accept=".pdf,.doc,.docx,.txt,.md,.xls,.xlsx,.ppt,.pptx"
        style={{ display: 'none' }}
        ref={docInputRef}
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) setSelectedDoc(e.target.files[0]);
        }}
      />

    </div>
  );
}

export default AddWindow;
