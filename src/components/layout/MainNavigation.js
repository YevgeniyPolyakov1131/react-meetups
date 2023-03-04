import { Link } from "react-router-dom";

import { useContext, useRef, useState, useEffect  } from 'react';

import FavoritesContext from '../../store/favorites-content';

import classes from './MainNavigation.module.scss';

function MainNavigation(){
    const favoritesCtx = useContext(FavoritesContext);

    const navMobile = useRef(null);
    const [buttonClicked, setButtonClicked] = useState(false);

    function buttonClickHandler(){
        setButtonClicked(!buttonClicked);
    }

    const [isMobile, setIsMobile] = useState(window.innerWidth < 1075);

    useEffect(() => {
        window.addEventListener("resize", () => {
            const mobile = window.innerWidth < 1075;
            if (mobile !== isMobile) setIsMobile(mobile);
        }, false);
    }, [isMobile]);

    return (
        <>
        <header className={classes.header}>

        <div className={classes.logo}>React Meetups</div>
        <nav ref={navMobile} className={`${buttonClicked ? classes.open : ''} ${isMobile ? classes.mobile : ''}`}>
            <ul>
                <li><Link to="/">All Meetups</Link> </li>
                <li><Link to="/new-meetup">Add new meetup</Link> </li>
                <li><Link to="/favorites">Favorites<span className={classes.badge}>{favoritesCtx.totalFavorites}</span></Link></li>
            </ul>            
        </nav>
        <div className={`${classes.btnMobile} ${ buttonClicked ? classes.open : ''}`} onClick={buttonClickHandler}><i></i></div>

        </header>
        
        </>

    );

}

export default MainNavigation;