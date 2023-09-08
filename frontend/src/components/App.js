import { useState, useEffect, useCallback } from 'react';
import api from '../utils/api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRoute from './ProtectedRoute';
import Popup from './PopupCloseEsc';
import success from '../images/logo/Union.svg';
import unsuccess from '../images/logo/Unsuccess.svg';

import { Navigate, Routes, Route, useNavigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';

function App() {
  const navigate = useNavigate();

  //popup
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState([]);
  const [isZoomPopupOpen, setIsZoomPopupOpen] = useState(false);
  const [isInfoTooltipSuccess, setIsInfoTooltipSuccess] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  //context
  const [currentUser, setCurrentUser] = useState({});
  //cards
  const [cards, setCards] = useState([]);
  // check isLoggedIn
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //user email
  const [email, setEmail] = useState('');
  //button text
  const [isEditProfilePopupSave, setIsEditProfilePopupSave] = useState(false);
  const [isAddPlacePopupSave, setIsAddPlacePopupSave] = useState(false);
  const [isEditAvatarPopupSave, setIsEditAvatarPopupSave] = useState(false);

  function handleToken(token) {
    
    auth
      .checkToken(token)
      .then(res => {
        setEmail(res.email);
        setIsLoggedIn(true);
        navigate('/', { replace: true });
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      handleToken(token);
    }
  }, []);

  function handleOnRegister({ password, email }) {
    return auth
      .register(password, email)
      .then(res => {
        if (!res || res.error) {
          handleInfoTooltip(false);
        } else {
          handleInfoTooltip(true);
          navigate('/sign-in', { replace: true });
        }
        return res;
      })
      .catch(err => {
        console.error(err);
        handleInfoTooltip(false);
      });
  }

  //login
  function handleOnLogin({ password, email }) {
    return auth
      .login(password, email)
      .then(res => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          setIsLoggedIn(true);
          setEmail(email);
          navigate('/', { replace: true });
        }
      })
      .catch(err => {
        console.log(err);
        handleInfoTooltip(false);
      });
  }

  //logout
  function handleLogOut() {
    setIsLoggedIn(false);
    setEmail('');
    localStorage.removeItem('token');
    navigate('/sign-in', { replace: true });
  }

  // Open Edit Profile Popup
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  // Open Edit Avatar Popup
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  // Open Add Place Popup
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  // Open Zoom Popup with selected card
  function handleCardClick(card) {
    setSelectedCard(card);
    setIsZoomPopupOpen(true);
  }

  // Open Info Popup
  function handleInfoTooltip(isSuccess) {
    setIsInfoTooltipOpen(true);
    setIsInfoTooltipSuccess(isSuccess);
  }

  // Close all popups
  const closeAllPopups = useCallback(() => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsZoomPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setIsInfoTooltipSuccess(false);
  }, []);

  // Update user information
  function handleUpdateUser(userInfo) {
    const token = localStorage.getItem('token');
    setIsEditProfilePopupSave(true);
    api
      .editProfile(userInfo,token)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setIsEditProfilePopupSave(false));
  }

  // Update user avatar
  function handleUpdateAvatar(avatar) {
    const token = localStorage.getItem('token');
    setIsEditAvatarPopupSave(true);
    api
      .editAvatar(avatar,token)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setIsEditAvatarPopupSave(false));
  }
  //add card
  function handleAddPlace(newCard) {
    const token = localStorage.getItem('token');
    setIsAddPlacePopupSave(true);
    api
      .addNewCard(newCard,token)
      .then(card => {
        setCards(state => [card, ...state]);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setIsAddPlacePopupSave(false));
  }

  // Handle like on a card
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const token = localStorage.getItem('token');
    {
      if (!isLiked) {
        api
          .addNewLike(card._id,token)
          .then(newCard => {
            setCards(state => state.map(c => (c._id === card._id ? newCard : c)));
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        api
          .removeLike(card._id,token)
          .then(newCard => {
            setCards(state => state.map(c => (c._id === card._id ? newCard : c)));
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }

  function handleConfirmDelete(card) {
    const token = localStorage.getItem('token');
    api
      .removeCard(card._id,token)
      .then(() => {
        setCards(state => state.filter(c => c._id !== card._id));
      })
      .catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (isLoggedIn) {
      const token = localStorage.getItem('token');
      Promise.all([api.getUserInfo(token), api.getInitialCards(token)])
        .then(([userInfo, initialCards]) => {
          setCurrentUser(userInfo);
          setCards(initialCards);
        })
        .catch(err => {
          console.log('Ошибка при получении информации:', err);
        });
    }
  }, [isLoggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header name="main" email={email} isLoggedIn={isLoggedIn} onLogout={handleLogOut} />

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute
              element={Main}
              isLoggedIn={isLoggedIn}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleConfirmDelete}
            />
          }
        />
        <Route path="/sign-up" element={<Register onRegister={handleOnRegister} />} />
        <Route path="/sign-in" element={<Login onLogin={handleOnLogin} />} />

        <Route
          path="*"
          element={isLoggedIn ? <Navigate to="/" replace /> : <Navigate to="/sign-in" replace />}
        />
      </Routes>
      {isLoggedIn && <Footer />}

      <Popup
        onClose={closeAllPopups}
        isPopupOpen={
          isEditProfilePopupOpen ||
          isEditAvatarPopupOpen ||
          isAddPlacePopupOpen ||
          isZoomPopupOpen ||
          isInfoTooltipOpen
        }
      >
        <EditProfilePopup
          isPopupOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isSaving={isEditProfilePopupSave}
        />

        <EditAvatarPopup
          isPopupOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isSaving={isEditAvatarPopupSave}
        />

        <AddPlacePopup
          isPopupOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
          isSaving={isAddPlacePopupSave}
        />

        <ImagePopup card={selectedCard} isPopupOpen={isZoomPopupOpen} onClose={closeAllPopups} />

        <InfoTooltip
          onClose={closeAllPopups}
          isPopupOpen={isInfoTooltipOpen}
          text={
            isInfoTooltipSuccess
              ? 'Вы успешно зарегистрировались!'
              : 'Что-то пошло не так! Попробуйте ещё раз.'
          }
          image={isInfoTooltipSuccess ? success : unsuccess}
        />
      </Popup>
    </CurrentUserContext.Provider>
  );
}

export default App;
