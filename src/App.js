import { React, useEffect, useState } from 'react'
import Header from './components/Header';
import Main from './components/Main';
import Basket from './components/Basket';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState();
  const [config, setConfig] = useState();
  useEffect(() => {
    axios.get('https://vitl-static-api.s3-eu-west-1.amazonaws.com/fe-test.json').then((res) => {
      setProducts(res.data.products)
      setConfig(res.data.config)
    }).catch((error) => {
      console.log(error)
    })
  }, [])
  const [cartItems, setCartItems] = useState([]);
  const onAdd = (product) => {

    const productItem = product.nutrients.map(item => item.id);

    const xyz = () => {
      if (cartItems.map(item => item.nutrients.map(item => item.id)).length > 0) {
        const newArray = productItem.map(item => cartItems.map(item => item.nutrients.map(item => item.id)).flat(1).find(item1 => item1 === item))
        const vitaminName = newArray.find(item => item !== undefined)
        if (vitaminName === 'vitamin-d') {
          return '';
        } else {
          return vitaminName;
        }
      } else {
        return '';
      }
    }

    const check = productItem.includes(xyz());

    const vitaminD = cartItems.map(item => item.nutrients.map(item1 => { if (item1.id === 'vitamin-d') { return item.qty } }));
    let val = vitaminD.map(e => e.find(i => i !== undefined))

    if (check) {
      alert("limit exceeded")
      return
    }
    else if (((val[0] >= 3) || (val[1] >= 3) || (val[2] >= 3)) && product.name === "Vitamin D") {
      alert("limit exceeded")
      val.splice(0, val.length)
      return
    }
    const exist = cartItems.find((x, i) => (x.name === product.name));
    if (exist) {
      setCartItems(
        cartItems.map((x, i) =>
          x.name === product.name ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };
  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.name === product.name);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.name !== product.name));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.name === product.name ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };
  return (
    <div className="App">
      <Header countCartItems={cartItems.length}></Header>
      <div className="row">
        <Main products={products} onAdd={onAdd}></Main>
        <Basket
          cartItems={cartItems}
          onRemove={onRemove}
        ></Basket>
      </div>
    </div>
  );
}

export default App;
