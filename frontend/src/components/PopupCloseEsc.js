import { useEffect } from 'react';

function PopupCloseEsc({ children, onClose, isPopupOpen }) {
  useEffect(() => {
    if (isPopupOpen) {
      const handleEscKey = event => {
        if (event.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscKey);

      return () => {
        document.removeEventListener('keydown', handleEscKey);
      };
    }
  }, [isPopupOpen]); //почему то не сохранился в гитхабе

  return <div>{children}</div>;
}

export default PopupCloseEsc;
