import { useEffect } from 'react';
import Cookies from 'js-cookie';
import useLocalStorage from './useLocalStorage';

const useColorMode = () => {
  const [colorMode, setColorMode] = useLocalStorage('color-theme', 'light');
  const cookie = Cookies.get('token');


  useEffect(() => {
    const className = 'dark';
    const bodyClass = window.document.body.classList;

    if(!cookie)return

    colorMode === 'dark'
      ? bodyClass.add(className)
      : bodyClass.remove(className);
  }, [colorMode]);

  return [colorMode, setColorMode];
};

export default useColorMode;
