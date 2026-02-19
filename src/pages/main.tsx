import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useParams } from "react-router-dom";
import { Plus, GamepadDirectional, X } from "lucide-react";
import AddWindow from '../components/AddWindow';
import WindowItemView from '../components/windowitemview';
import MainControl from '../components/maincontrol';
import { Workspace } from "../App";
import '../style/main.css'

type WindowItem = {
  id: string;
  type: 'link' | 'doc' | 'img';
  url?: string;
  file?: File;
  title?: string;
  fileUrl?: string;
  createdAt: number;
};

const SNAP_CORNERS = [
  { label: 'top-right',    getPos: (bw: number, bh: number) => ({ x: window.innerWidth - bw - 30,  y: 30 }) },
  { label: 'bottom-right', getPos: (bw: number, bh: number) => ({ x: window.innerWidth - bw - 30,  y: window.innerHeight - bh - 30 }) },
  { label: 'bottom-left',  getPos: (bw: number, bh: number) => ({ x: 30,                            y: window.innerHeight - bh - 30 }) },
  { label: 'top-left',     getPos: (bw: number, bh: number) => ({ x: 30,                            y: 30 }) },
];

const SNAP_THRESHOLD = 80;

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
  const [mainControlOpen, setMainControlOpen] = useState(false);

  const BTN_SIZE = 60;

  const [pos, setPos] = useState(() => ({
    x: window.innerWidth - BTN_SIZE - 30,
    y: window.innerHeight - BTN_SIZE - 30,
  }));

  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const hasMoved = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const btnRef = useRef<HTMLDivElement>(null);

  const snapToNearestCorner = useCallback((currentX: number, currentY: number) => {
    let nearest = null;
    let minDist = Infinity;

    for (const corner of SNAP_CORNERS) {
      const cp = corner.getPos(BTN_SIZE, BTN_SIZE);
      const dist = Math.hypot(currentX - cp.x, currentY - cp.y);
      if (dist < minDist) {
        minDist = dist;
        nearest = cp;
      }
    }

    if (nearest && minDist < SNAP_THRESHOLD) return nearest;
    return null;
  }, []);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isDraggingRef.current = true;
    setIsDragging(true);
    hasMoved.current = false;
    dragOffset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };
  }, [pos]);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      hasMoved.current = true;

      const newX = Math.max(0, Math.min(window.innerWidth - BTN_SIZE, e.clientX - dragOffset.current.x));
      const newY = Math.max(0, Math.min(window.innerHeight - BTN_SIZE, e.clientY - dragOffset.current.y));

      setPos({ x: newX, y: newY });
    };

    const onMouseUp = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      setIsDragging(false);

      if (hasMoved.current) {
        const finalX = Math.max(0, Math.min(window.innerWidth - BTN_SIZE, e.clientX - dragOffset.current.x));
        const finalY = Math.max(0, Math.min(window.innerHeight - BTN_SIZE, e.clientY - dragOffset.current.y));

        const snapped = snapToNearestCorner(finalX, finalY);
        setPos(snapped ?? { x: finalX, y: finalY });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [snapToNearestCorner]);

  useEffect(() => {
    const onResize = () => {
      setPos(prev => ({
        x: Math.max(0, Math.min(window.innerWidth - BTN_SIZE, prev.x)),
        y: Math.max(0, Math.min(window.innerHeight - BTN_SIZE, prev.y)),
      }));
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  if (!workspace) return <div>워크스페이스 없음</div>;

  const handleAddWindow = async (data: {
    type: 'link' | 'doc' | 'img';
    url?: string;
    file?: File;
    title?: string;
  }) => {
    const newWindow: WindowItem = {
      id: crypto.randomUUID(),
      type: data.type,
      url: data.url,
      title: data.title || (data.url ? '제목 없음' : data.file?.name || '제목 없음'),
      createdAt: Date.now()
    };

    if (data.file) {
      const base64 = await fileToBase64(data.file);
      newWindow.fileUrl = base64;
    }

    setWorkspaces(prev =>
      prev.map(ws =>
        ws.id === id
          ? { ...ws, windows: [...ws.windows, newWindow] }
          : ws
      )
    );

    setAddWindowOpen(false);
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // 버튼 중심 좌표 계산
  const btnCenter = {
    x: pos.x + BTN_SIZE / 2,
    y: pos.y + BTN_SIZE / 2,
  };

  return (
    <div className='main center'>
      {workspace.windows.length > 0 && (
        <div className='window_view'>
          {workspace.windows.map((window: WindowItem) => (
            <WindowItemView key={window.id} window={window} />
          ))}
        </div>
      )}

      {workspace.windows.length === 0 && (
        <div
          className='add_windows_wrap revers_center'
          onClick={() => setAddWindowOpen(true)}
        >
          <div className='add_windows center'>
            <Plus color='white' className='add_windows_button' />
          </div>
          <p>클릭하여 시작하기</p>
        </div>
      )}

      {addWindowOpen && (
        <AddWindow
          onClose={() => setAddWindowOpen(false)}
          onAdd={handleAddWindow}
        />
      )}

      {/* MainControl — 버튼 중심 좌표 전달 */}
      <MainControl
        isOpen={mainControlOpen}
        originX={btnCenter.x}
        originY={btnCenter.y}
        onClose={() => setMainControlOpen(false)}
      />

      <div
        ref={btnRef}
        className='main_control_button center'
        style={{
          position: 'fixed',
          left: pos.x,
          top: pos.y,
          right: 'unset',
          bottom: 'unset',
          cursor: isDragging ? 'grabbing' : 'grab',
          transition: isDragging
            ? 'background 0.3s ease'
            : 'background 0.3s ease, left 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
          // MainControl 열려있을 때 버튼 위에 표시
          zIndex: mainControlOpen ? 10001 : 9999,
        }}
        onMouseDown={onMouseDown}
        onClick={() => {
          if (hasMoved.current) return;
          setMainControlOpen(prev => !prev);
        }}
      >
        {/* 열림 상태에 따라 아이콘 전환 */}
        {mainControlOpen
          ? <X strokeWidth={1.7} className='icon' />
          : <GamepadDirectional strokeWidth={1.7} className='icon' />
        }
      </div>
    </div>
  );
}

export default Main;