import { Dialog, Notify } from 'quasar';
import quasarIconSet from 'quasar/icon-set/svg-mdi-v7';

Notify.setDefaults({
  position: 'bottom-left',
  timeout: 3000,
});

export const QuasarOptions = {
  plugins: {
    Dialog,
    Notify,
  },
  iconSet: quasarIconSet,
}