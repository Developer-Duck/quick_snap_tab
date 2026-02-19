import React, { useEffect, useRef, useState } from 'react';
import '../style/maincontrol.css';

interface MainControlProps {
  isOpen: boolean;
  originX: number;
  originY: number;
  onClose: () => void;
}

function MainControl({ isOpen, originX, originY, onClose }: MainControlProps) {
  const [visible, setVisible] = useState(false);
  const [animating, setAnimating] = useState<'in' | 'out' | null>(null);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      // 다음 프레임에 in 애니메이션 시작 (mount 후)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimating('in'));
      });
    } else {
      if (visible) {
        setAnimating('out');
        // 애니메이션 끝난 뒤 DOM에서 제거
        const timer = setTimeout(() => {
          setVisible(false);
          setAnimating(null);
        }, 500); // CSS 애니메이션 시간과 맞춤
        return () => clearTimeout(timer);
      }
    }
  }, [isOpen]);

  if (!visible) return null;

  return (
    <div
      className={`MainControl_container ${animating === 'in' ? 'mc-open' : 'mc-close'}`}
      style={{
        // CSS clip-path 원점을 버튼 중심으로 설정
        '--origin-x': `${originX}px`,
        '--origin-y': `${originY}px`,
      } as React.CSSProperties}
    >
      {/* 여기에 컨트롤 UI 넣으면 됨 */}
      <div className='mc-content'>
        <p>MainControl 영역</p>
      </div>
    </div>
  );
}

export default MainControl;