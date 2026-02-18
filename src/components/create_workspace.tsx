import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import "../style/create_workspace.css";

type Props = {
  onClose: () => void;
  onCreate: (workspace: any) => void;
};

const CreateWorkSpace: React.FC<Props> = ({ onClose, onCreate }) => {

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
      <div className="create_workspace_menu center">
        <div
          className="modal_box"
          onClick={(e) => e.stopPropagation()}
        >
          <X strokeWidth={1.7}className="icon close_icon"onClick={onClose}/>

          <h2>새 작업환경 만들기</h2>
          <p>작업환경의 제목과 설명을 입력해주세요.</p>

          <div className="create_project_name">
            <p>
              작업환경 제목<span> *</span>
            </p>
            <input
              type="text"
              placeholder="예: 공부작업 공간"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="create_project_introduce">
            <p>
              설명<span> (선택)</span>
            </p>
            <textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)} />
          </div>

          <div className="create_project_button">
            <button onClick={onClose}>취소</button>
            <button
              onClick={() => {
                if (!title.trim()) return;

                onCreate({
                  id: crypto.randomUUID(),
                  title,
                  description,
                  windows: [],
                  createdAt: Date.now(),
                });

                onClose();
              }}
            >
              생성하기
            </button>
          </div>
        </div>
      </div>
  );
};

export default CreateWorkSpace;
