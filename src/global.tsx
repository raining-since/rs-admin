import { Button, message, notification } from 'antd';

import React from 'react';
import defaultSettings from '../config/default.settings';

const { pwa } = defaultSettings;
const isHttps = document.location.protocol === 'https:';

if (pwa) {
  window.addEventListener('sw.offline', () => {
    message.warning('');
  });

  window.addEventListener('sw.updated', (event: Event) => {
    const e = event as CustomEvent;
    const reloadSW = async () => {
      const worker = e.detail && e.detail.waiting;
      if (!worker) {
        return true;
      }
      await new Promise((resolve, reject) => {
        const channel = new MessageChannel();
        channel.port1.onmessage = (msgEvent) => {
          if (msgEvent.data.error) {
            reject(msgEvent.data.error);
          } else {
            resolve(msgEvent.data);
          }
        };
        worker.postMessage({ type: 'skip-waiting' }, [channel.port2]);
      });
      window.location.reload(true);
      return true;
    };
    const key = `open${Date.now()}`;
    const btn = (
      <Button
        type="primary"
        onClick={() => {
          notification.close(key);
          reloadSW();
        }}
      >
        {'app.pwa.serviceworker.updated.ok'}
      </Button>
    );
    notification.open({
      message: 'app.pwa.serviceworker.updated',
      description: 'app.pwa.serviceworker.updated.hint',
      btn,
      key,
      onClose: async () => null,
    });
  });
} else if ('serviceWorker' in navigator && isHttps) {
  const { serviceWorker } = navigator;
  if (serviceWorker.getRegistrations) {
    serviceWorker.getRegistrations().then((sws) => {
      sws.forEach((sw) => {
        sw.unregister();
      });
    });
  }
  serviceWorker.getRegistration().then((sw) => {
    if (sw) sw.unregister();
  });

  if (window.caches && window.caches.keys) {
    caches.keys().then((keys) => {
      keys.forEach((key) => {
        caches.delete(key);
      });
    });
  }
}
