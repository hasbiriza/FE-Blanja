import 'bootstrap/dist/css/bootstrap.min.css';
import "@/styles/globals.css";
import { CartProvider } from '@/context/CartContext'; // Assuming this is where your CartContext is defined

export default function App({ Component, pageProps }) {
  return (
    <CartProvider> 
      <Component {...pageProps} />
    </CartProvider>
  );
}