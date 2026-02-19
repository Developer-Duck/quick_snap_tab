import React from 'react';

type WindowItemProps = {
  window: {
    id: string;
    type: 'link' | 'doc' | 'img';
    url?: string;
    file?: File;
    fileUrl?: string;
    title?: string;
  };
};

function WindowItemView({ window }: WindowItemProps) {
  // 링크 타입 (웹사이트, 문서 링크, 이미지 링크)
  if (window.type === 'link' && window.url) {
    return <webview src={window.url} />;
  }

  // 이미지 타입 (로컬 파일)
  if (window.type === 'img' && window.fileUrl) {
    return (
      <img 
        src={window.fileUrl} 
        alt={window.title || '이미지'} 
        style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
      />
    );
  }

  // 문서 타입 (로컬 파일)
  if (window.type === 'doc' && window.fileUrl) {
    return (
      <iframe 
        src={window.fileUrl} 
        style={{ width: '100%', height: '100%', border: 'none' }}
        title={window.title || '문서'}
      />
    );
  }

  return <div>지원하지 않는 형식입니다.</div>;
}

export default WindowItemView;