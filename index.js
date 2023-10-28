/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { AuthProvider } from './src/context/AuthContext';
import { CartProvider } from './src/context/CartContext';


const Main = () => {
    return (
        <AuthProvider>
            <CartProvider>
                <App />
            </CartProvider>
        </AuthProvider>
    )
}

AppRegistry.registerComponent(appName, () => Main);
