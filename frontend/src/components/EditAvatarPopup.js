import PopupWithForm from './PopupWithForm';
import { useEffect, useRef } from 'react';
import useFormValidation from '../hooks/useFormValidation';

function EditAvatarPopup({ isPopupOpen, onClose, onUpdateAvatar, isSaving }) {
  const avatarRef = useRef();

  const { error, isValid, isInputValid, handleChange, resetValidation } = useFormValidation();

  const handleSubmit = evt => {
    evt.preventDefault();
    onUpdateAvatar({ avatar: avatarRef.current.value });
  };

  useEffect(() => {
    if (!isPopupOpen) {
      avatarRef.current.value = '';
      resetValidation();
    }
  }, [isPopupOpen, resetValidation]);

  return (
    <PopupWithForm
      name="avatar-popup"
      title="Обновить аватар"
      buttonText={isSaving ? 'Сохранение...' : 'Сохранить'}
      isPopupOpen={isPopupOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        type="url"
        placeholder="Ссылка на аватар"
        name="avatar"
        className={`popup__input popup__input_type_avatar ${
          isInputValid.avatar === undefined || isInputValid.avatar ? '' : 'popup__input-error_type_'
        }`}
        id="user-avatar"
        ref={avatarRef}
        onChange={evt => handleChange(evt)}
        required
      />

      <span className="popup__input-error user-avatar-error">{error.avatar}</span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
