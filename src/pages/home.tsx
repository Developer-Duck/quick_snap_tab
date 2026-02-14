import React, { useState, useRef, useEffect } from 'react';
import '../style/home.css'
import '../App.css'


import { Settings, Plus, Bell, Search, LayoutGrid, List, X } from 'lucide-react';
import UserImg from '../assets/images/duck_img.jpg'
import BannerImage from '../assets/images/banner.jpg'

import ProjectItem from '../components/project_item'

function Home() {

    const [Searchactive, setSearchActive] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    return (
        <div className='home'>
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
                    <div className={`search center ${Searchactive ? "active" : ""}`} onClick={() => setSearchActive(!Searchactive)}>
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

                        <div className='create_workspace center'>
                            <Plus strokeWidth={1.7} className='icon' />
                            <span>새 작업 환경</span>
                        </div>
                    </div>
                </div>
                <div className='workspace'>
                    <ProjectItem />
                    <ProjectItem />
                    <ProjectItem />
                    <ProjectItem />
                    <ProjectItem />
                    <ProjectItem />
                    <ProjectItem />
                    <ProjectItem />
                    <ProjectItem />
                    <ProjectItem />
                    <ProjectItem />
                </div>
            </div>
        </div>
    );
}

export default Home;
