import React, { useState, useRef, useEffect } from 'react';
import '../style/home.css'
import '../App.css'


import { Settings, Plus, Bell, Search, LayoutGrid, List, X } from 'lucide-react';
import UserImg from '../assets/images/duck_img.jpg'
import BannerImage from '../assets/images/banner.jpg'

import ProjectItem from '../components/project_item'
import CreateWorkSpace from '../components/create_workspace';

import { Workspace } from "../App";

function Home({
  workspaces,
  setWorkspaces
}: {
  workspaces: Workspace[];
  setWorkspaces: React.Dispatch<React.SetStateAction<Workspace[]>>;
}) {

    const [Searchactive, setSearchActive] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [CreateWorkspaceOpen, setCreateWorkspaceOpen] = useState(false);
    const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string | null>(null);

    // 검색 필터링
    const filteredWorkspaces = workspaces.filter(ws => {
        if (!searchValue.trim()) return true; // 검색어 없으면 전체 표시
        
        const searchLower = searchValue.toLowerCase();
        const titleMatch = ws.title.toLowerCase().includes(searchLower);
        const descriptionMatch = ws.description?.toLowerCase().includes(searchLower);
        
        return titleMatch || descriptionMatch;
    });

    // 다른 곳 클릭 시 선택 해제
    const handleBackgroundClick = () => {
        setSelectedWorkspaceId(null);
        setSearchActive(false); // 검색창도 닫기
    };

    return (
        <div className='home' onClick={handleBackgroundClick}>
            <div className='home_header_contianer'>
                <div className='user_info center'>
                    <div className='user_icon'>
                        <img src={UserImg} alt="" />
                    </div>
                    <div className='user_name_container'>
                        <p className='user_name'>사용자 이름</p>
                        <span>내 작업 공간</span>
                    </div>
                </div>
                <div className='header_menu'>
                    <div className={`search center ${Searchactive ? "active" : ""}`} onClick={(e) => {
                        e.stopPropagation();
                        setSearchActive(!Searchactive);
                    }}>
                        <Search strokeWidth={1.7} className='icon' />
                        <div className='search_input' onClick={(e) => e.stopPropagation()}>
                            <Search strokeWidth={1.7} className='input_search_icon' />
                            <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                            <X strokeWidth={1.7} className='input_close_icon' onClick={(e) => { e.stopPropagation(); setSearchActive(false); setSearchValue(""); }} />
                        </div>
                    </div>
                    <div className='alarm center'>
                        <Bell strokeWidth={1.7} className='icon' />
                    </div>
                    <div className='setting center'>
                        <Settings strokeWidth={1.7} className='icon' />
                    </div>
                </div>

            </div>
            <div className='home_banner_container'>
                <img src={BannerImage} alt="" />
            </div>
            <div className='home_workspace_container'>
                <div className='home_workspace_header'>
                    <p>작업환경</p>
                    <div className='create_workspace_wrap'>
                        <div className='change_view_worksace center'>
                            <div className='activate_grid center'>
                                <LayoutGrid strokeWidth={1.7} className='icon' />
                            </div>
                            <div className='activate_list center'>
                                <List strokeWidth={1.7} className='icon' />
                            </div>
                        </div>

                        <div className='create_workspace center' onClick={() => setCreateWorkspaceOpen(true)}>
                            <Plus strokeWidth={1.7} className='icon' />
                            <span>새 작업 환경</span>
                                {CreateWorkspaceOpen && (
                                <CreateWorkSpace
                                    onClose={() => setCreateWorkspaceOpen(false)}
                                    onCreate={(newWorkspace) => {
                                    setWorkspaces(prev => [...prev, newWorkspace]);
                                    }}
                                />
                                )}
                        </div>
                    </div>
                </div>
                    <div className='workspace'>
                    {filteredWorkspaces.length > 0 ? (
                        filteredWorkspaces.map(ws => (
                            <ProjectItem 
                                key={ws.id} 
                                workspace={ws}
                                isSelected={selectedWorkspaceId === ws.id}
                                onSelect={() => setSelectedWorkspaceId(ws.id)}
                                onDuplicate={(workspace) => {
                                    const duplicated = {
                                        ...workspace,
                                        id: Date.now().toString(),
                                        title: `${workspace.title} (복사본)`,
                                        createdAt: Date.now()
                                    };
                                    setWorkspaces(prev => [...prev, duplicated]);
                                }}
                                onDelete={(workspaceId) => {
                                    setWorkspaces(prev => prev.filter(w => w.id !== workspaceId));
                                }}
                                onUpdate={(workspaceId, title, description) => {
                                    setWorkspaces(prev =>
                                        prev.map(w =>
                                            w.id === workspaceId
                                                ? { ...w, title, description }
                                                : w
                                        )
                                    );
                                }}
                            />
                        ))
                    ) : (
                        <div className='no_results'>
                            <p>검색 결과가 없습니다.</p>
                        </div>
                    )}
                    </div>
            </div>
        </div>
    );
}

export default Home;