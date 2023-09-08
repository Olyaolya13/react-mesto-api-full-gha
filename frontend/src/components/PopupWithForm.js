function PopupWithForm({
  name,
  title,
  children,
  isPopupOpen,
  onClose,
  onSubmit,
  buttonText,
  isValid
}) {
  const handleFormSubmit = evt => {
    evt.preventDefault();
    onSubmit(evt);
  };
  const handleWindowCloseClick = evt => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`popup popup_type_${name} ${isPopupOpen ? 'popup_opened' : ''}`}
      onClick={handleWindowCloseClick}
    >
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form name={name} className="popup__form" noValidate="" onSubmit={handleFormSubmit}>
          {children}
          <button
            type="submit"
            aria-label="Сохранить"
            className={`popup__button ${!isValid ? 'popup__button_disabled' : ''}`}
            disabled={!isValid}
          >
            {buttonText}
          </button>
        </form>
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

export default PopupWithForm;
