import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './SideBar.css';

const SideBar: React.FC = () => {
  const { t } = useTranslation();
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const handleNavItemClick = (index: number) => {
    setActiveItem(activeItem === index ? null : index);
  };



  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <h3>Menu</h3> 
      </div>
      <nav className="sidebar-nav">
        <ul>
         

          <li className="nav-item">
            <span className="nav-text">
              <a href="userManage">{t('user_management')}</a>
            </span>
          </li>

          <li className="nav-item" onClick={() => handleNavItemClick(1)}>
            <span className="nav-text">{t('customer_service')}</span>
            {activeItem === 1 && (
              <ul className="sub-menu">
                <li>
                  <a href="Category">{t('category_management')}</a>
                </li>
                <li>
                  <a href="faqmanage">{t('faq_management')}</a> 
                </li>
              </ul>
            )}
          </li>

          <li className="nav-item" onClick={() => handleNavItemClick(2)}>
            <span className="nav-text">{t('main_screen_management')}</span> 
            {activeItem === 2 && (
              <ul className="sub-menu">
                <li>
                  <a href="ForumMenuManage">{t('board_menu_management')}</a>
                </li>
                <li>
                  <a href="ForumManage">{t('board_post_management')}</a>
                </li>
                <li>
                  <a href="Department">{t('department_management')}</a>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
