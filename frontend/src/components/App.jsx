import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import InfoTooltip from "./InfoTooltip.jsx"; 

import api from "../utils/api.js";
import * as auth from "../utils/auth.js";

import CurrentUserContext from "../contexts/CurrentUserContext.js";
import Popup from "./Main/components/Popup/Popup.jsx";

function App() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [popup, setPopup] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  
  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      auth.checkToken(token)
        .then((data) => {
          setLoggedIn(true);
          setUserEmail(data.data.email);
          navigate("/");
        })
        .catch(console.error);
    }
  }, [navigate]);

  function handleLogin(email, password) {
    auth.login(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setLoggedIn(true);
          navigate("/");
        }
      })
      .catch(console.error);
  }

  
  function handleRegister(email, password) {
  auth.register(email, password)
    .then(() => {
      setIsSuccess(true);
      setIsInfoTooltipOpen(true);
    })
    .catch(() => {
      setIsSuccess(false);
      setIsInfoTooltipOpen(true);
    });
}

  function handleLogout() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setUserEmail("");
    navigate("/signin");
  }

  useEffect(() => {
    if (loggedIn) {
      api.getUserInfo()
        .then(setCurrentUser)
        .catch(console.error);

      api.getCardList()
        .then(setCards)
        .catch(console.error);
    }
  }, [loggedIn]);

  function handleOpenPopup(popupData) {
    setPopup(popupData);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeImagePopup() {
    setSelectedCard(null);
  }

  // 🔥 cerrar TODO
  function closeAllPopups() {
    setPopup(null);
    setSelectedCard(null);

    if (isSuccess) {
    navigate("/signin"); // solo si fue éxito
  }
    setIsInfoTooltipOpen(false);
  }

  async function handleCardLike(card) {
    const isLiked =
      card.likes?.some((i) => i._id === currentUser._id) || false;

    try {
      const newCard = await api.changeLikeCardStatus(
        card._id,
        !isLiked
      );

      setCards((state) =>
        state.map((c) =>
          c._id === card._id ? newCard : c
        )
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function handleAddPlaceSubmit(data) {
    try {
      const newCard = await api.addNewCard(data);
      setCards((state) => [newCard, ...state]);
      handleClosePopup();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleUpdateUser(data) {
    try {
      const updatedUser = await api.setUserInfo(data);
      setCurrentUser(updatedUser);
      handleClosePopup();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleUpdateAvatar(data) {
    try {
      const updatedUser = await api.setUserAvatar(data);
      setCurrentUser(updatedUser);
      handleClosePopup();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      <div className="page__content">
        <Header 
          email={userEmail} 
          loggedIn={loggedIn} 
          onLogout={handleLogout} 
        />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Main
                  cards={cards}
                  popup={popup}
                  onOpenPopup={handleOpenPopup}
                  onClosePopup={handleClosePopup}
                  onCardLike={handleCardLike}
                  onAddPlaceSubmit={handleAddPlaceSubmit}
                  onCardClick={handleCardClick}
                  onUpdateUser={handleUpdateUser}
                  onUpdateAvatar={handleUpdateAvatar}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/signin"
            element={
              loggedIn
                ? <Navigate to="/" />
                : <Login onLogin={handleLogin} />
            }
          />

          <Route
            path="/signup"
            element={
              loggedIn
                ? <Navigate to="/" />
                : <Register onRegister={handleRegister} />
            }
          />
        </Routes>

        <Footer />

        {selectedCard && (
          <Popup onClose={closeImagePopup} title="">
            <img
              src={selectedCard.link}
              alt={selectedCard.name}
              className="popup__image"
            />
            <p className="popup__caption">
              {selectedCard.name}
            </p>
          </Popup>
        )}

        {}
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          isSuccess={isSuccess}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
