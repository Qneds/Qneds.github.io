import { React, Component, useContext } from 'react';
import { Route, Switch } from 'react-router-dom';



import Login from './login/Login';
import Register from './registration/Register';
import MainPage from './mainPage/mainPage';
import Settings from './mainPage/settings/Settings';
import YourOffers from './mainPage/yourOffers/YourOffers';
import AddOffer from './mainPage/yourOffers/AddOffer';
import EditOffer from './mainPage/yourOffers/EditOffer';
import Search from './mainPage/search/Search';
import Borrowed from './mainPage/borrowed/Borrowed';
import User from  '../contexts/User';
import History from './mainPage/history/HIstory';



const Main = () => {

    const {user, setUser} = useContext(User);

    let str = ""
    if(user !== null)
        str = "Witaj, " + user.displayName;

    return (
        //React.Fragment
        <>
            <Switch>
                <Route path="/" exact>
                    <div className="myFloat">
                        <Login/>
                    </div>
                </Route>
                <Route path="/register" exact>
                    <div className="myFloat">
                        <Register/>
                    </div>
                </Route>
                <Route path="/main-page" exact>
                    <div className="myFloat">
                        <MainPage/>
                        <div className="welcome-page">
                            <h1>
                                {str}
                            </h1>
                        </div>
                    </div>
                </Route>
                <Route path="/main-page/settings" exact>
                    <div className="myFloat">
                        <MainPage/>
                        <Settings/>
                    </div>
                </Route>
                <Route path="/main-page/offers" exact>
                    <div className="myFloat">
                        <MainPage/>
                        <Search/>
                    </div>
                </Route>
                <Route path="/main-page/borrowed" exact>
                    <div className="myFloat">
                        <MainPage/>
                        <Borrowed/>
                    </div>
                </Route>
                <Route path="/main-page/your-offers" exact>
                    <div className="myFloat">
                        <MainPage/>
                        <YourOffers/>
                    </div>
                </Route>
                <Route path="/main-page/your-offers/add" exact>
                    <div className="myFloat">
                        <MainPage/>
                        <AddOffer/>
                    </div>
                </Route>
                <Route path="/main-page/your-offers/edit" exact render={(props) => 
                    <div className="myFloat">
                        <MainPage/>
                        <EditOffer {...props}/>
                    </div>
                }/>

                <Route path="/main-page/history" exact>
                    <div className="myFloat">
                        <MainPage/>
                        <History/>
                    </div>
                </Route>
                <Route>
                    <section><h1>Error 404 - not found</h1></section>
                </Route>
            </Switch>
        </>
    );
    
}

export default Main;
