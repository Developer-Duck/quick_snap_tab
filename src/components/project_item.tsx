// App.jsx
import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import '../style/project_item.css'
import { Ellipsis } from 'lucide-react';
import '../App.css'

import { Workspace } from "../App";

import ProjectConfigWindow from './project_config_window';

function ProjectItem({ 
  workspace,
  isSelected,
  onSelect,
  onDuplicate,
  onDelete,
  onUpdate
}: { 
  workspace: Workspace;
  isSelected: boolean;
  onSelect: () => void;
  onDuplicate: (workspace: Workspace) => void;
  onDelete: (workspaceId: string) => void;
  onUpdate: (workspaceId: string, title: string, description?: string) => void;
}) {
  const [open, setOpen] = useState(false);

  const [alignRight, setAlignRight] = useState<boolean>(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 외부 클릭 감지
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;

      // 메뉴 너비(150px)보다 여유 공간이 적으면 오른쪽 정렬 모드 활성화
      if (windowWidth - rect.right < 160) {
        setAlignRight(true);
      } else {
        setAlignRight(false);
      }
    }
    setOpen(!open);
  };

  const navigate = useNavigate();

  // 열기 핸들러
  const handleOpen = () => {
    navigate(`/workspace/${workspace.id}`);
    setOpen(false);
  };

  // 복제 핸들러
  const handleDuplicate = () => {
    onDuplicate(workspace);
    setOpen(false);
  };

  // 삭제 핸들러
  const handleDelete = () => {
    onDelete(workspace.id);
    setOpen(false);
  };

  // 수정 핸들러
  const handleUpdate = (title: string, description?: string) => {
    onUpdate(workspace.id, title, description);
    setOpen(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 전파 방지
    
    // 더블클릭 감지를 위한 타이머 설정
    if (clickTimerRef.current) {
      // 더블클릭: 워크스페이스로 이동
      clearTimeout(clickTimerRef.current);
      clickTimerRef.current = null;
      navigate(`/workspace/${workspace.id}`);
    } else {
      // 싱글클릭: 선택 표시만
      clickTimerRef.current = setTimeout(() => {
        onSelect();
        clickTimerRef.current = null;
      }, 250); // 250ms 안에 두 번째 클릭이 없으면 싱글클릭으로 처리
    }
  };

  return (
    <div 
      className={`project_item_container revers-center ${open ? "active" : ""} ${isSelected ? "selected" : ""}`} 
      onClick={handleClick}
    >
      <div className='project_img'>
        <div
          ref={buttonRef}
          className='project_edit_button center'
          onClick={handleToggle}
        >
          <Ellipsis strokeWidth={1.7} className='icon' />
          {open && (
            <ProjectConfigWindow 
              alignRight={alignRight}
              workspace={workspace}
              onOpen={handleOpen}
              onDuplicate={handleDuplicate}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
              menuRef={menuRef}
            />
          )}
        </div>
      </div>
      <div className='project_name'>
      <h4>{workspace.title}</h4>
      <p className='project_sub_name'>{workspace.description}</p>
        <span className='edit_date'>1시간 전 수정됨</span>
      </div>
    </div>
  );
}

export default ProjectItem;