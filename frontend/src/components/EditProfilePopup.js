import { useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';
import useFormValidation from '../hooks/useFormValidation';

function EditProfilePopup({ isPopupOpen, onClose, onUpdateUser, isSaving }) {
  const currentUser = useContext(CurrentUserContext);

  const { error, value, isValid, isInputValid, handleChange, resetValidation } =
    useFormValidation();

  const handleSubmit = evt => {
    evt.preventDefault();
    onUpdateUser(value);
  };

  useEffect(() => {
    if (!isPopupOpen) {
      resetValidation({ name: currentUser.name, about: currentUser.about });
    }
  }, [isPopupOpen, currentUser, resetValidation]);

  return (
    <PopupWithForm
      name="profile-popup"
      title="Редактировать профиль"
      isPopupOpen={isPopupOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
      buttonText={isSaving ? 'Сохранение...' : 'Сохранить'}
    >
      <input
        type="text"
        placeholder="ФИО"
        name="name"
        className={`popup__input popup__input_type_name ${
          isInputValid.name === undefined || isInputValid.name ? '' : 'popup__input-error_type_'
        }`}
        id="user-name"
        minLength={2}
        maxLength={40}
        value={value.name || ''}
        onChange={handleChange}
        required
      />

      <span className="popup__input-error user-name-error">{error.name}</span>

      <input
        type="text"
        placeholder="Должность"
        name="about"
        className={`popup__input popup__input_type_occupation ${
          isInputValid.about === undefined || isInputValid.about ? '' : 'popup__input-error_type_'
        }`}
        id="user-occupation"
        minLength={2}
        maxLength={200}
        value={value.about || ''}
        onChange={handleChange}
        required
      />
      <span className="popup__input-error user-occupation-error">{error.about}</span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
