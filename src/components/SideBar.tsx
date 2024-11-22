import React from 'react';
import { useTranslation } from 'react-i18next';
import {useAtom } from 'jotai';
import './SideBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCircleQuestion, faLaptop, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { activeItemAtom } from '../atoms/store';


const SideBar: React.FC = () => {
  const { t } = useTranslation();
  const [activeItem, setActiveItem] = useAtom(activeItemAtom);

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
              <Link to="/userManage">
                <FontAwesomeIcon icon={faUser} /> {t('user_management')}
              </Link>
            </span>
          </li>

          <li className="nav-item" onClick={() => handleNavItemClick(1)}>
            <span className="nav-text">
              <FontAwesomeIcon icon={faCircleQuestion} /> {t('customer_service')}
            </span>
            {activeItem === 1 && (
              <ul className="sub-menu">
                <li>
                  <FontAwesomeIcon icon={faArrowRightToBracket} className='arrowIcon' />
                  <Link to="/Category" className="categoryLink">{t('category_management')}</Link>
                </li>
                <li>
                  <FontAwesomeIcon icon={faArrowRightToBracket} className='arrowIcon' />
                  <Link to="/faqmanage">{t('faq_management')}</Link>
                </li>
              </ul>
            )}
          </li>

          <li className="nav-item" onClick={() => handleNavItemClick(2)}>
            <span className="nav-text">
              <FontAwesomeIcon icon={faLaptop} /> {t('main_screen_management')}
            </span>
            {activeItem === 2 && (
              <ul className="sub-menu">
                <li>
                  <FontAwesomeIcon icon={faArrowRightToBracket} className='arrowIcon' />
                  <Link to="/ForumMenuManage">{t('board_menu_management')}</Link>
                </li>
                <li>
                  <FontAwesomeIcon icon={faArrowRightToBracket} className='arrowIcon' />
                  <Link to="/ForumManage">{t('board_post_management')}</Link>
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
