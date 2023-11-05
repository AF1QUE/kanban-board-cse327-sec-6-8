 
 
import App from './App';
import { store } from './app/store';
import './index.css'

 
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';
 
 

createRoot(document.getElementById("root")).render(
  
     
   <Provider store={store}>
   <App />
 </Provider>,
      
     
 
);
