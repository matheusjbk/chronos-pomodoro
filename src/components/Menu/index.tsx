import {
  HistoryIcon,
  HouseIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { RouterLink } from '../RouterLink';

import styles from './style.module.css';

type AvailableThemes = 'dark' | 'light';

export function Menu() {
  const [theme, setTheme] = useState<AvailableThemes>(() => {
    const storagedTheme = localStorage.getItem('theme') as AvailableThemes;

    return storagedTheme ?? 'dark';
  });

  function handleThemeChange(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    event.preventDefault();

    setTheme(prevTheme => {
      const nextTheme = prevTheme === 'dark' ? 'light' : 'dark';
      return nextTheme;
    });
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const nextIconTheme = {
    dark: <SunIcon />,
    light: <MoonIcon />,
  };

  return (
    <nav className={styles.menu}>
      <RouterLink
        href='/'
        className={styles.menuLink}
        aria-label='Página inicial'
        title='Página inicial'
      >
        <HouseIcon />
      </RouterLink>

      <RouterLink
        href='/history/'
        className={styles.menuLink}
        aria-label='Histórico'
        title='Histórico'
      >
        <HistoryIcon />
      </RouterLink>

      <RouterLink
        href='/settings/'
        className={styles.menuLink}
        aria-label='Configurações'
        title='Configurações'
      >
        <SettingsIcon />
      </RouterLink>

      <RouterLink
        href='#'
        className={styles.menuLink}
        aria-label='Mudar tema'
        title='Mudar tema'
        onClick={handleThemeChange}
      >
        {nextIconTheme[theme]}
      </RouterLink>
    </nav>
  );
}
