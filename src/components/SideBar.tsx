import './SideBar.css';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const SideBar = () => {
  const { t } = useTranslation();

  return (
    <div className='MainPage-container'>
      <aside className="sidebar">
        <header><h3>{t('admin_tool')}</h3></header>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <a href="#">
                <span>{t('user_management')}</span>
              </a>
              <ul>
                <li>
                  <a href="#">{t('derps')}</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">
                <span>{t('forum_management')}</span>
              </a>
              <ul>
                <li>
                  <a href="#">{t('watch')}</a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
}

export default memo(SideBar);
