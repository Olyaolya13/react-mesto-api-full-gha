function InfoTooltip({ onClose, isPopupOpen, text, image }) {
  return (
    <div className={`popup ${isPopupOpen ? 'popup_opened' : ''}`} onClick={onClose}>
      <div className="popup__container popup__info">
        <img src={image} alt="" className="popup__info-image" />
        <h2 className="popup__info-text">{text}</h2>
        <button
          type="button"
          aria-label="Закрыть"
          className="popup__close-icon"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default InfoTooltip;
