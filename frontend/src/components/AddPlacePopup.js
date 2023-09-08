import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import useFormValidation from '../hooks/useFormValidation';

function AddPlacePopup({ isPopupOpen, onClose, onAddPlace, isSaving }) {
  const { value, error, isValid, isInputValid, handleChange, resetValidation } =
    useFormValidation();

  const handleSubmit = evt => {
    evt.preventDefault();
    onAddPlace(value);
  };

  useEffect(() => {
    if (!isPopupOpen) {
      resetValidation();
    }
  }, [isPopupOpen, resetValidation]);

  return (
    <PopupWithForm
      name="card-popup"
      title="Новое место"
      buttonText={isSaving ? 'Cохранение...' : 'Создать'}
      isPopupOpen={isPopupOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        type="text"
        placeholder="Название"
        name="name"
        className={`popup__input popup__input_type_card ${
          isInputValid.name === undefined || isInputValid.name ? '' : 'popup__input-error_type_'
        }`}
        id="card-name"
        minLength={2}
        maxLength={30}
        value={value.name || ''}
        onChange={handleChange}
        required
      />

      <span className="popup__input-error card-name-error">{error.name}</span>

      <input
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
        className={`popup__input popup__input_type_link ${
          isInputValid.link === undefined || isInputValid.link ? '' : 'popup__input-error_type_'
        }`}
        id="card-link"
        value={value.link || ''}
        onChange={handleChange}
        required
      />

      <span className="popup__input-error card-link-error">{error.link}</span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
