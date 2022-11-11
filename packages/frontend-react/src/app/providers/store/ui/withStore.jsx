import { persistor, store } from "@store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export function withStore(Component,displayName){
    function Store(props){
        return (
            <Provider store={store}>
                <PersistGate persistor={persistor} loading='loading'>
                    <Component {...props}/>
                </PersistGate>
            </Provider>
        )
    }
    Store.displayName = displayName+'WithStore'
    return Store
}