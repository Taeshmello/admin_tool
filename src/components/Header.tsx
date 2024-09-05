
import './Header.css';
import {useState} from 'react';





const Header = () => {
  const [islanguage, setLanguage] = useState("");


  const onChangeLanguage = (e: any) => {
    setLanguage(e.target.value)

    

    }
  

  

  return(
  
    <header className='header'>
      <h4>언어</h4>
      <select onChange={onChangeLanguage} className='language'>
        <option>select</option>
        <option value="kr">🇰🇷 Korean</option>
        <option value="en">🇺🇸 English</option>
        <option value="cn">🇨🇳 Chinese</option>
      </select>
    </header>
  );
}

export default Header;
