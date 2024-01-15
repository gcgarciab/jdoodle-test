import { Notify } from 'quasar';
import { NOTIFY_OPTIONS } from '@/common/constants';

/**
 * Function that receive a message and show
 * a quasar notify with positive color and the message.
 * @param type => Notify type
 * @param message => Notify message
 * @param timeout => Notify duration
 */
export function showNotify(type: 'positive' | 'negative', message: string): void {
  Notify.create({
    ...NOTIFY_OPTIONS[type],
    message,
  });
}

export default showNotify;