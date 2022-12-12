import { useEffect } from 'react';
import { useAppContext } from '@context/app.context';
import { SocketConnector } from './socket';
import { APP_DISPATCH_ACTIONS } from '@constants';

export const useSocket = (): void => {
  const { dispatch } = useAppContext();

  const initSocket = () => {
    const socketConnector = new SocketConnector();
    const socketInstance = socketConnector.instance;

    socketInstance.on('connect', () => {
      console.log('Connected');
      dispatch({
        type: APP_DISPATCH_ACTIONS.SET_SOCKET,
        payload: socketInstance,
      });
    });
  };

  useEffect(() => {
    initSocket();
  }, []);
};
