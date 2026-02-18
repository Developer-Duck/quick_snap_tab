import React, { useState } from "react";
import { X } from "lucide-react";
import "../style/create_workspace.css";
import { Workspace } from "../App";

interface ChangeInfoWorkSpaceProps {
  workspace: Workspace;
  onClose: () => void;
  onUpdate: (title: string, description?: string) => void;
}

const ChangeInfoWorkSpace = ({ workspace, onClose, onUpdate }: ChangeInfoWorkSpaceProps) => {
  const [title, setTitle] = useState(workspace.title);
  const [description, setDescription] = useState(workspace.description || '');
  const [titleError, setTitleError] = useState(false);

  const handleUpdate = () => {
    if (!title.trim()) {
      setTitleError(true);
      return;
    }
    onUpdate(title, description);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (e.target.value.trim()) {
      setTitleError(false);
    }
  };

  return (
    <div className="create_workspace_menu center" onClick={onClose}>
      <div className="modal_box" onClick={(e) => e.stopPropagation()}>
        <X strokeWidth={1.7} className="icon close_icon" onClick={onClose} />

        <h2>작업환경 정보 수정</h2>
        <p>작업환경의 제목과 설명을 입력해주세요.</p>

        <div className="create_project_name">
          <p>
            작업환경 제목<span> *</span>
          </p>
          <input 
            type="text" 
            placeholder="예: 공부작업 공간" 
            value={title}
            onChange={handleTitleChange}
            className={titleError ? 'error' : ''}
          />
        </div>

        <div className="create_project_introduce">
          <p>
            설명<span> (선택)</span>
          </p>
          <textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="create_project_button">
          <button onClick={onClose}>취소</button>
          <button onClick={handleUpdate}>수정하기</button>
        </div>
      </div>
    </div>
  );
};

export default ChangeInfoWorkSpace;