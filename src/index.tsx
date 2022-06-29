import ReactDOM from 'react-dom';
import App from './app';
import { HashRouter } from 'react-router-dom';
import { AppStateProvider } from 'redux/context';
import 'assets/global.scss';


function Index() {
  return (
    <AppStateProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </AppStateProvider>
  );
}


// render the app
ReactDOM.render(
  <Index />,
  document.getElementById( 'root' )
);
