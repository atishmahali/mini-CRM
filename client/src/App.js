import React, { useEffect } from 'react';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import store from './store/store';
import { getCommunicationLog } from "./store/actions/communication_logActions";
import { getFilter } from "./store/actions/filterActions";
import { getCustomers } from "./store/actions/customerActions";
import AppNavbar from './components/AppNavbar';
import "./styles.css";

// Audience
import AdminAudience from "./components/Audience/AdminAudience";
import Audience from "./components/Audience/Audience";
import UpdateAudience from "./components/Audience/UpdateAudience";
import ViewAudience from "./components/Audience/ViewAudience";

// Filter
import Filter from "./components/Filter/Filter";
import AdminFilter from "./components/Filter/AdminFilter";
import UpdateFilter from "./components/Filter/UpdateFilter";
import ViewFilter from "./components/Filter/ViewFilter";

// Customer
import Customer from "./components/Customer/Customer";
import UpdateCustomer from "./components/Customer/UpdateCustomer";
import ViewCustomer from "./components/Customer/ViewCustomer";
import AdminCustomer from "./components/Customer/AdminCustomer";

store.dispatch(getFilter());
store.dispatch(getCustomers());
store.dispatch(getCommunicationLog());

const HomeComponent = () => {
  const { filters } = useSelector((state) => state.fil);
  const avatar = "https://via.placeholder.com/150"; 

  return (
    <div className="container">
      <AppNavbar />
      <div className="home__wrapper">
        <div className="home__left">
          <img src={avatar} alt="Avatar" />
          <h1>App Actions</h1>
          <ul>
            <li>Create & Manage Filter</li>
            <li>Create & Manage Audience</li>
            <li>Create & Manage Customer</li>
          </ul>
        </div>

        <div className="home__actions">
          {Filter.length > 0 ? (
            <>
              <div className="home__action">
                <Link to="/create-filter">
                  <button>Create a filter</button>
                </Link>
              </div>
              <div className="home__action">
                <Link to="/create-communication_log">
                  <button>Create an Audience</button>
                </Link>
              </div>
              <div className="home__action">
                <Link to="/create-customer">
                  <button>Add a customer</button>
                </Link>
              </div>
              <div className="home__manager">
                <Link to="/Customer">Manage Customer</Link>
                <Link to="/Audiences">Manage Audience</Link>
                <Link to="/Filter">Manage Filter</Link>
              </div>
            </>
          ) : (
            <div>
              <h3>No Filter Available</h3>
              <Link to="/create-filter">
                <h4>Create a Filter</h4>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/create-filter" element={<AdminFilter />} />
          <Route path="/create-communication_log" element={<AdminAudience />} />
          <Route path="/customers" element={<Customer />} />
          <Route path="/communication_log" element={<Audience />} />
          <Route path="/communication_log/update/:slug" element={<UpdateAudience />} />
          <Route path="/about-communication_log/:slug" element={<ViewAudience />} />
          <Route path="/about-filter/:slug" element={<ViewFilter />} />
          <Route path="/customer/update/:slug" element={<UpdateCustomer />} />
          <Route path="/customer/:slug" element={<ViewCustomer />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/filter/update/:slug" element={<UpdateFilter />} />
          <Route path="/" element={<HomeComponent />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
