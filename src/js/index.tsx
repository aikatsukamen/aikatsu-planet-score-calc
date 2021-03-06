import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme';
import * as serviceWorker from './serviceWorker';
import { SWUpdateDialog } from './SWUpdateDialog';

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root'),
);

if ((module as any).hot) {
  (module as any).hot.accept();
}

serviceWorker.register({
  onUpdate: (registration) => {
    if (registration.waiting) {
      ReactDOM.render(<SWUpdateDialog registration={registration} />, document.querySelector('.SW-update-dialog'));
    }
  },
});
