import ReactDOM from 'react-dom/client';
import init from './main.jsx';
import './index.css';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(await init());
};

app();
