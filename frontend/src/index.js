import ReactDOM from 'react-dom/client';
import './index.css';
import init from './main.jsx';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(await init());
};

app();
