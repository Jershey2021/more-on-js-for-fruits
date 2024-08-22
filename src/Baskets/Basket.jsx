import React, { useState } from "react";
import "./Basket.css";
import Close from "../assets/close.png";
import Add from "../assets/add.png";
import RightArrow from "../assets/right-arrow.png";
import leftArrow from "../assets/left-arrow.png";

const Basket = () => {
  // Basket A
  const [basketA, setBasketA] = useState([
    { name: "Apple", qty: 5 },
    { name: "Mango", qty: 3 },
    { name: "Grapes", qty: 5 },
    { name: "Banana", qty: 4 },
  ]);

  // Basket B
  const [basketB, setBasketB] = useState([
    { name: "Orange", qty: 5 },
    { name: "Strawberry", qty: 3 },
  ]);

  // Selecting item
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedBasket, setSelectedBasket] = useState(null);

  // Moving Items
  const updateBasket = (basket, item, action) => {
    const updatedBasket = basket
      .map((basketItem) =>
        basketItem.name === item.name
          ? {
              ...basketItem,
              qty: basketItem.qty + (action === "add" ? item.qty : -item.qty),
            }
          : basketItem
      )
      .filter((item) => item.qty > 0);

    if (
      action === "add" &&
      !updatedBasket.find((basketItem) => basketItem.name === item.name)
    ) {
      updatedBasket.push(item);
    }

    return updatedBasket;
  };

  const handleSelectedItem = (item, basket) => {
    setSelectedItem(item);
    setSelectedBasket(basket);
  };

  const moveItem = (direction) => {
    if (!selectedItem || !selectedBasket) return;

    if (selectedBasket === "A") {
      setBasketA((prevBasketA) =>
        updateBasket(prevBasketA, { ...selectedItem, qty: -1 }, "remove")
      );

      setBasketB((prevBasketB) =>
        updateBasket(prevBasketB, { ...selectedItem, qty: 1 }, "add")
      );
    } else if (selectedBasket === "B") {
      setBasketB((prevBasketB) =>
        updateBasket(prevBasketB, { ...selectedItem, qty: -1 }, "remove")
      );

      setBasketA((prevBasketA) =>
        updateBasket(prevBasketA, { ...selectedItem, qty: 1 }, "add")
      );
    }

    setSelectedItem(null);
    setSelectedBasket(null);
  };

  const handleCloseClick = (itemName, basket) => {
    if (basket === "A") {
      setBasketA((prevBasketA) =>
        updateBasket(prevBasketA, { name: itemName, qty: 1 }, "remove")
      );
    } else if (basket === "B") {
      setBasketB((prevBasketB) =>
        updateBasket(prevBasketB, { name: itemName, qty: 1 }, "remove")
      );
    }
  };

  // Add Fruit
  const addFruit = (name, qty, basketSetter, basket) => {
    const newItem = { name, qty: parseInt(qty) };
    basketSetter((prevBasket) => updateBasket(prevBasket, newItem, "add"));
  };

  const [newFruitNameA, setNewFruitNameA] = useState("");
  const [newFruitQtyA, setNewFruitQtyA] = useState("");

  // Add New Fruit A
  const addFruitA = () => {
    const maxQty = 100;
    if (
      newFruitNameA.trim() !== "" &&
      newFruitQtyA.trim() !== "" &&
      !isNaN(newFruitQtyA) &&
      parseInt(newFruitQtyA) <= maxQty
    ) {
      addFruit(newFruitNameA, newFruitQtyA, setBasketA, "A");
      setNewFruitNameA("");
      setNewFruitQtyA("");
    } else {
      alert(`Please Enter Fruit Name and a Quantity between 0 and ${maxQty}.`);
    }
  };

  // Add Fruit B
  const [newFruitNameB, setNewFruitNameB] = useState("");
  const [newFruitQtyB, setNewFruitQtyB] = useState("");

  const addFruitB = () => {
    const maxQty = 100;
    if (
      newFruitNameB.trim() !== "" &&
      newFruitQtyB.trim() !== "" &&
      !isNaN(newFruitQtyB) &&
      parseInt(newFruitQtyB) <= maxQty
    ) {
      addFruit(newFruitNameB, newFruitQtyB, setBasketB, "B");
      setNewFruitNameB("");
      setNewFruitQtyB("");
    } else {
      alert(`Please Enter Fruit Name and a Quantity between 0 and ${maxQty}.`);
    }
  };

  const getUniqueFruitCount = (basket) => {
    const uniqueNames = new Set(basket.map((item) => item.name));
    return uniqueNames.size;
  };

  return (
    <>
      {/* Baskets */}
      <div className="basket">
        {/* Basket A */}
        <div className="basket-a">
          <h1 className="basket-a-text">Basket A</h1>
          <div className="fruit-counter-a">
            <label className="number-of-fruits">
              {getUniqueFruitCount(basketA)}
            </label>
          </div>

          <div className="fruit-a">
            <ul className="fruits-list">
              {basketA.map((fruit, index) => (
                <li
                  key={index}
                  className={`fruits-box ${
                    selectedItem &&
                    selectedItem.name === fruit.name &&
                    selectedBasket === "A"
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => handleSelectedItem(fruit, "A")}
                >
                  <div className="fruits">
                    <label className="fruits-name">{fruit.name}</label>
                  </div>
                  <div className="quantity">
                    <label>Qty:</label>
                    <label className="fruits-quantity">{fruit.qty}</label>
                    <button
                      className="close-button"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevents triggering the item selection
                        handleCloseClick(fruit.name, "A");
                      }}
                    >
                      <img className="close" src={Close} alt="Close" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="add-new-fruit">
              <div className="add-fruit">
                <input
                  type="text"
                  value={newFruitNameA}
                  onChange={(e) => setNewFruitNameA(e.target.value)}
                  placeholder="Name"
                />
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={newFruitQtyA}
                  onChange={(e) => setNewFruitQtyA(e.target.value)}
                  className="qty"
                  placeholder="Qty"
                />
                <button onClick={addFruitA} className="add">
                  <img src={Add} alt="Add" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right and Left Arrow */}
        <div className="add-minus">
          <div className="right">
            <button className="add-one" onClick={() => moveItem("right")}>
              <img src={RightArrow} alt="Move Right" />
            </button>
          </div>
          <div className="left">
            <button className="minus-one" onClick={() => moveItem("left")}>
              <img src={leftArrow} alt="Move Left" />
            </button>
          </div>
        </div>

        {/* Basket B */}
        <div className="basket-b">
          <h1 className="basket-b-text">Basket B</h1>
          <div className="fruit-counter-b">
            <label className="number-of-fruits">
              {getUniqueFruitCount(basketB)}
            </label>
          </div>

          <div className="fruit-b">
            <ul className="fruits-list">
              {basketB.map((fruit, index) => (
                <li
                  key={index}
                  className={`fruits-box ${
                    selectedItem &&
                    selectedItem.name === fruit.name &&
                    selectedBasket === "B"
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => handleSelectedItem(fruit, "B")}
                >
                  <div className="fruits">
                    <label className="fruits-name">{fruit.name}</label>
                  </div>
                  <div className="quantity">
                    <label>Qty:</label>
                    <label className="fruits-quantity">{fruit.qty}</label>
                    <button
                      className="close-button"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevents triggering the item selection
                        handleCloseClick(fruit.name, "B");
                      }}
                    >
                      <img className="close" src={Close} alt="Close" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="add-new-fruit">
              <div className="add-fruit">
                <input
                  type="text"
                  value={newFruitNameB}
                  onChange={(e) => setNewFruitNameB(e.target.value)}
                  className="name"
                  placeholder="Name"
                />
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={newFruitQtyB}
                  onChange={(e) => setNewFruitQtyB(e.target.value)}
                  className="qty"
                  placeholder="Qty"
                />
                <button onClick={addFruitB} className="add">
                  <img src={Add} alt="Add" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Basket;
