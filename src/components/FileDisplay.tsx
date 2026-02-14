import { Image, Upload, X } from 'lucide-react';
import { app } from 'electron';
import '../style/icon.css'

const getFileExtension = (filename: string) => {
  return filename.split('.').pop()?.toLowerCase() || '';
};

const FileDisplay = ({ file, onRemove }: { file: File, onRemove: () => void }) => {
  const ext = getFileExtension(file.name);
  const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '');

  return (
    <div className="file_display revers_center">
      <div className='show_upload_file'>
        <span className="filename" title={file.name}>
          {nameWithoutExt}
        </span>
        <span className="extension">.{ext}</span>
        <X strokeWidth={1.7} className='icon' onClick={(e) => {e.stopPropagation(); onRemove();}}/>
      </div>
    </div>
  );
};


export default FileDisplay;