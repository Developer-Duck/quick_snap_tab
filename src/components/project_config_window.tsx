// App.jsx
import React, { useState } from 'react';

import '../style/project_config_Window.css'

import {ExternalLink } from 'lucide-react';
import { Workspace } from "../App";

import ChangeInfoWorkSpace from './changeinfo'

interface ProjectConfigWindowProps {
  alignRight: boolean;
  workspace: Workspace;
  onOpen: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onUpdate: (title: string, description?: string) => void;
  menuRef: React.RefObject<HTMLDivElement | null>;
}

function ProjectConfigWindow({ 
  alignRight, 
  workspace,
  onOpen,
  onDuplicate,
  onDelete,
  onUpdate,
  menuRef
}: ProjectConfigWindowProps) {

  const [showChangeInfo, setShowChangeInfo] = useState(false);

  return (
    <>
      <div ref={menuRef} className={`project_config_Window ${alignRight ? 'align_right' : ''}`}>
          <div className='project_config_window_open' onClick={(e) => {
            e.stopPropagation();
            onOpen();
          }}>
              <ExternalLink strokeWidth={1.7} className='icon' />
              <p>열기</p>
          </div>
          <div className='project_config_window_changeprojectname' onClick={(e) => {
            e.stopPropagation();
            setShowChangeInfo(true);
          }}>
               <p>이름 변경</p>
          </div>
          <div className='project_config_window_copy' onClick={(e) => {
            e.stopPropagation();
            onDuplicate();
          }}>
              <p>복제</p>
          </div>
          <div className='project_config_window_deleteproject' onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}>
              <p>삭제</p>
          </div>
      </div>

      {showChangeInfo && (
        <ChangeInfoWorkSpace 
          workspace={workspace}
          onClose={() => setShowChangeInfo(false)}
          onUpdate={(title, description) => {
            onUpdate(title, description);
            setShowChangeInfo(false);
          }}
        />
      )}
    </>
  );
}

export default ProjectConfigWindow;