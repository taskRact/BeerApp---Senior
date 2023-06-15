import WifiOffIcon from '@mui/icons-material/WifiOff';
import { useEffect, useState } from 'react';

import { HeaderWithIcon } from '../../components/HeaderWithIcon';

const Offline = () => {
  const [isOnline, setIsOnline] = useState<Boolean>(navigator.onLine);

  const setOnline = () => setIsOnline(true);
  const setOffline = () => setIsOnline(false);

  useEffect(() => {
    window.addEventListener('online', setOnline);
    window.addEventListener('offline', setOffline);

    return () => {
      window.addEventListener('online', setOnline);
      window.addEventListener('offline', setOffline);
    };
  }, []);

  return isOnline ? null : (
    <article>
      <section>
        <header>
          <HeaderWithIcon icon={<WifiOffIcon/>} label="You are offline" />
        </header>
        <main>
          <span>App needs internet to start working</span>
        </main>
      </section>
    </article>
  );
};

export default Offline;
