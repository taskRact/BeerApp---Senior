import { useEffect, useState } from 'react';

const Offline = () => {
  const [isOnline, setIsOnline] = useState(true);

  const setOnline = () => setIsOnline(true);
  const setOffline = () => setIsOnline(false);

  useEffect(() => {
    window.addEventListener('online', setOnline);
    window.addEventListener('offline', setOffline);
    if (navigator.onLine) {
        setOnline();
    } else {
        setOffline();
    }

    return () => {
      window.addEventListener('online', setOnline);
      window.addEventListener('offline', setOffline);
    };
  }, []);

  return isOnline ? null : (
    <article>
      <section>
        <header>
          <h1>You are offline</h1>
        </header>
        <main>
          <span>Saved items are availble only</span>
        </main>
      </section>
    </article>
  );
};

export default Offline;
