// import logo from './logo.svg';
import './App.css';
import {
  Switch,
  Route,
} from "react-router-dom";
import Homepage from './pages/homepage/homepage.component';
import Productpage from './pages/product/product.component';
import Header from './components/header/header.component';


function App() {
  
  return (
     <div className="App">
      <Header/>
      <Switch>
        <Route exact path='/' component={Homepage}/>
        <Route exact path='/product/:id'  component={Productpage}/>
      </Switch>
    </div>
  );
}
// const mapStateToProps = createStructuredSelector({
//   products: selectProducts,
// })
// const mapDispatchToProps = dispatch=>({
//   fetchProducts: () => (dispatch(fetchProductsStart()))
// })
export default App
