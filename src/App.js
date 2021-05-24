import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import NotFound from './components/NotFound';
// import ProductFeature from './feature/Product';

function App() {
  return (
    <>
      <div className="App">
        <Header />
      </div>

      {/* <Switch>
        <Route path="/products" component={ProductFeature} exact></Route>

        <Route component={NotFound}></Route>
      </Switch> */}
    </>
  );
}

export default App;
