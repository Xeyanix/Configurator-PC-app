import React, { useState, useEffect } from 'react';
import styles from './App.module.scss';
import Filters from './components/Filters/Filters';
import ResponsiveAppBar from './components/ResponsiveAppBar/ResponsiveAppBar';
import ProductList from './components/ProductList/ProductList';
import Scroll from './components/Scroll/Scroll';
import Cart from './components/Cart/Cart';
import Motherboards from './common/consts/motherboard';
import LastViewed from './components/LastViewed/LastViewed';
import Contact from './components/Contact/Contact';
import { useLocation } from 'react-router-dom';


function App() {
  const [cart, setCart] = useState([]);
  const [selectedMotherboard, setSelectedMotherboard] = useState(Motherboards);
  const [MotherboardsToDisplay, setMotherboardsToDisplay] = useState(selectedMotherboard);
  const [listViewed, setListViewed] = useState([]); // Użyj osobnego stanu dla listy ostatnio oglądanych
  const [scrollPosition, setScrollPosition] = useState(0);
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const loggedInUser = searchParams.get('user');

  useEffect(() => {
    // Odczytaj dane logowania z Local Storage
    const storedUser = window.localStorage.getItem("user");
    if (storedUser) {
      const { userfirstName, userLastName } = JSON.parse(storedUser);
      // Zapisz dane logowania w stanie komponentu
      setLoggedInUserData({ userfirstName, userLastName });
      console.log(`Zalogowany jako: ${userfirstName} ${userLastName}`);
    }
  }, []);
  useEffect(() => {
    window.scrollTo({
      top: 0,
    })
  }, [scrollPosition]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    setSelectedMotherboard((prev) => [...prev, product]);
    setListViewed((prev) => [...prev, product]);
  };

  const removeItem = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    const productIndex = cart.findIndex((item) => item.id === productId);      // Find the index of the product in the cart
    // If the product is in the cart, remove one instance
    if (productIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart.splice(productIndex, 1);
      setCart(updatedCart);
    }
  };

  const removeAllItems = () => {
    setCart([]);
  };



  return (
    <div>

      <div className={styles.appWrapper}>
        <ResponsiveAppBar loggedInUser={loggedInUser} />
        <Filters
          Motherboards={Motherboards}
          sendfilteredProductsToAppComponent={setMotherboardsToDisplay}
        />
        <div className={styles.columnsWrapper}>
          <ProductList
            Motherboards={MotherboardsToDisplay}
            dodawanie={addToCart}
          />
          <Cart
            cart={cart}
            removeByRightClick={setCart}
            remove={removeItem}
            removeAll={removeAllItems}
          />
        </div>

        <div>
          <LastViewed
            cart={listViewed}
          />
          <Contact
            id="kontakt"
          />
          <Scroll />
        </div>
      </div >

    </div >
  );
}

export default App;