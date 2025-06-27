import '@mantine/core/styles.css';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'flowbite';


// Add external scripts
const chatwayScript = document.createElement('script');
chatwayScript.id = 'chatway';
chatwayScript.async = true;
chatwayScript.src = 'https://cdn.chatway.app/widget.js?id=D5aa7Fe1PaOY';
document.head.appendChild(chatwayScript);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)