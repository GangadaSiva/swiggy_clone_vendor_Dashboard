import React ,{useEffect, useState} from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import AddFirm from '../components/forms/AddFirm'
import AddProduct from '../components/forms/AddProduct'
import Welcome from '../components/Welcome'
import AllProducts from '../components/AllProducts'



const LandingPage = ()=>{
    const [showLogin, setShowLogin] = useState(false)
    const [showRegister, setShowRegister] = useState(false)
    const [showFirm, setShowFirm] = useState(false)
    const [showProduct, setShowProduct] = useState(false)
    const [showWelcome, setShowWelcome] = useState(false)
    const [showAllProducts, setShowAllProducts] = useState(false)
    const [showLogout , setShowLogout] = useState(false)
    const [showAddFirm, setShowAddFirm] = useState(true)

    useEffect(()=>{
        const loginToken = localStorage.getItem('loginToken');
        if(loginToken){
            setShowLogout(true)
        }
    },[])

    useEffect(()=>{
        const firmname = localStorage.getItem('vendorFirmName');
        if(firmname){
            setShowAddFirm(false)
        }
    },[])

    const logoutHandler = ()=>{
        if(confirm("Are sure to Logout")){
            localStorage.removeItem('loginToken');
            localStorage.removeItem('firmId');
            localStorage.removeItem('vendorFirmName');
            setShowLogout(false);
            setShowAddFirm(true);
        }

    }

    const showLoginHandler = ()=>{
        setShowLogin(true)
        setShowRegister(false)
        setShowFirm(false)
        setShowProduct(false)
        setShowWelcome(false)
        setShowAllProducts(false)
    }
    const showRegisterHandler =()=>{
        setShowRegister(true)
        setShowLogin(false)
        setShowFirm(false)
        setShowProduct(false)
        setShowWelcome(false)
        setShowAllProducts(false)
    }
    const showFirmHandler =()=>{
        if(showLogout){
            setShowRegister(false)
            setShowLogin(false)
            setShowFirm(true)
            setShowProduct(false)
            setShowWelcome(false)
            setShowAllProducts(false)
        }else{
            alert("Please login")
            setShowLogin(true)
        }
    }
    const showProductHandler =()=>{
        if(showLogout){
            setShowRegister(false)
            setShowLogin(false)
            setShowProduct(true)
            setShowFirm(false)
            setShowWelcome(false)
            setShowAllProducts(false)
        }else{
            alert("Please login")
            setShowLogin(true)
        }

    }
    const showWelcomeHandler =()=>{
        setShowRegister(false)
        setShowLogin(false)
        setShowProduct(false)
        setShowFirm(false)
        setShowWelcome(true)
        setShowAllProducts(false)
    }

    const ShowAllProductsHandler = ()=>{
        if(showLogout){
            setShowRegister(false)
            setShowLogin(false)
            setShowProduct(false)
            setShowFirm(false)
            setShowWelcome(false)
            setShowAllProducts(true)
        }else{
            alert("Please login")
            setShowLogin(true)
        }

    }



    return(
        <>
            <section className='landingPage'>
                <NavBar showLoginHandler = {showLoginHandler} showRegisterHandler = {showRegisterHandler}
                 showLogout = {showLogout} logoutHandler = {logoutHandler} 
                />
                <div className="colletions">
                <SideBar showFirmHandler ={showFirmHandler} showProductHandler = {showProductHandler} 
                ShowAllProductsHandler = {ShowAllProductsHandler} showAddFirm={showAddFirm}
                showLogout = {showLogout}
                />

                {showLogin && <Login showWelcomeHandler = {showWelcomeHandler}/>}
                {showRegister && <Register showLoginHandler = {showLoginHandler}/>}
                {showFirm && showLogout&& <AddFirm/>}
                {showProduct && showLogout&& <AddProduct/>}
                {showWelcome && <Welcome/>}
                {showAllProducts && showLogout&& <AllProducts/>}

                {/*<Login/>*/}
                {/*<Register/>*/}
                {/*<AddFirm/>*/}
                {/*<AddProduct/>*/}
                {/*<Welcome/>*/}
                {/*<AllProducts/>*/}
                </div>
            </section>
        </>
    )
}

export default LandingPage