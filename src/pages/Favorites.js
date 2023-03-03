import { useContext  } from 'react';

import FavoritesContext from '../store/favorites-content';

import MeetupList from '../components/meetups/MeetupList';

function FavoritesPage(){
    const favoritesCtx = useContext(FavoritesContext);

    let content = true;

    if(favoritesCtx.totalFavorites === 0){
        content = false;
    }

    if(content){
        return (
            <section>
                <h1>My Favorites</h1>
                <MeetupList meetups={favoritesCtx.favorites}/>
            </section>
        );
    }else{

        return (
            <section>
                <h1>My Favorites</h1>                
                <h3>No favorites yet...</h3>
            </section>
        );
           

    }

}

export default FavoritesPage;