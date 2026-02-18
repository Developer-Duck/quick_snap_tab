import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { Plus } from "lucide-react";
import AddWindow from '../components/AddWindow';
import { Workspace } from "../App";
import '../style/main.css'




function Main({
  workspaces,
  setWorkspaces
}: {
  workspaces: Workspace[];
  setWorkspaces: React.Dispatch<React.SetStateAction<Workspace[]>>;
}) {

  const { id } = useParams();

  const workspace = workspaces.find(ws => ws.id === id);

  const [addWindowOpen, setAddWindowOpen] = useState(false);

  if (!workspace) return <div>워크스페이스 없음</div>;

  return (
    <div className='main center'>

      <div
        className='add_windows_wrap revers_center'
        onClick={() => setAddWindowOpen(true)}
      >
        <div className='add_windows center'>
          <Plus color='white' className='add_windows_button' />
        </div>
        <p>클릭하여 시작하기</p>
        {addWindowOpen && (
          <AddWindow
            onClose={() => setAddWindowOpen(false)}
            onAdd={(data) => {
              // 나중에 추가 기능 구현
              console.log('추가된 데이터:', data);
              setAddWindowOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Main;