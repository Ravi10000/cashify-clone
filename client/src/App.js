// import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import CardItem from './components/card/card.component'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import { selectProducts } from './redux/shop/shop.selectors'
import { fetchProductsStart } from './redux/shop/shop.actions'
import CardList from './components/card-list/card-list.component';

function App({products, fetchProducts}) {
  useEffect(()=>{
    fetchProducts()
  }, [fetchProducts])
  return (
    <div className="App">
      {/* {products.length &&
        products.map(product => <p>{`${product.brand} ${product.model} ` }</p>)
      } */}
    {/* <img src={products[0].imageUrl} alt="" /> */}
      <CardItem/>
      <CardList/>
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  products: selectProducts,
})
const mapDispatchToProps = dispatch=>({
  fetchProducts: () => (dispatch(fetchProductsStart()))
})
export default connect(mapStateToProps, mapDispatchToProps)(App)
