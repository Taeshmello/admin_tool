import './Header.css';
import { memo } from 'react';


const Header = () => {
  

  return (
    <header className='header'>
      <h4>언어</h4>
      <select className='language'>
        <option>select</option>
        <option value="kr">🇰🇷 Korean</option>
        <option value="en">🇺🇸 English</option>
        <option value="cn">🇨🇳 Chinese</option>
      </select>
    </header>
  );
}

export default memo(Header);
