
import RootStack from './src/stack/RootStack';
import { Provider as ProviderRedux } from 'react-redux';
import StoreRedux, { persistor } from './src/redux/Store';
import { PersistGate } from 'redux-persist/integration/react'
import { PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';
import { handleLinking } from './src/utils/HandleLinking';
import { navigationRef } from './src/utils/RootNavigationRef';
import { HOST } from './src/constant/Host';

function App(): React.JSX.Element {

  useEffect(() => {
    messaging().onMessage(async (remoteMessage) => {
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        sound: 'default',
        importance: AndroidImportance.HIGH,
        badge: true,
      });
      await notifee.displayNotification({
        title: remoteMessage.notification?.title,
        body: remoteMessage.notification?.body,
        android: {
          channelId,
          smallIcon: 'ic_launcher_round',
          importance: AndroidImportance.HIGH,
          autoCancel: true,
        },
        data: {
          id: remoteMessage.data?.id || '',
          type: remoteMessage.data?.type || '',
          username: remoteMessage.data?.username || '',
          message: remoteMessage.data?.message || '',
          time: remoteMessage.data?.time || '',
          room: remoteMessage.data?.room || '',
          role: remoteMessage.data?.role || '',
          isRead: remoteMessage.data?.isRead || '',
        },
      });
      console.log('onMessage', remoteMessage);
    });
    messaging()
      .getInitialNotification()
      .then((remoteMessage: any) => {
        if (remoteMessage) {
          const type = remoteMessage.data.type;
          const username = remoteMessage.data.username;
          let url = '';
          if (type === 'orderSuccess' || type === 'orderFailed') {
            url =` ${HOST.DOMAIN}/StackMisc/Notification`
          } else if (type === 'voucher') {
            url = `${HOST.DOMAIN}/StackMisc/order/voucher`
          } else if (type === 'messageAdmin') {
            url = `${HOST.DOMAIN}/StackAdminManagerOther/ChatAdmin/${username}`
          } else if (type === 'messageUser') {
            url = `${HOST.DOMAIN}/StackIndividual/ChatWithAdmin`;
          } else {
            url = `${HOST.DOMAIN}/StackMisc/getdetail/${remoteMessage.data.id}`
          }
          handleLinking(url);
          console.log('getInitialNotification', remoteMessage);
        }
      });
    notifee.onForegroundEvent(async ({ type, detail }: any) => {
      if (type === EventType.ACTION_PRESS || type === EventType.PRESS) {
        const id = detail.notification.data.id;
        const type = detail.notification.data.type;
        const username = detail.notification.data.username;
        const role = detail.notification.data.role;
        if (type === 'orderSuccess' || type === 'orderFailed') {
          navigationRef.current?.navigate('StackMisc', { screen: 'Notification' } as any);
        } else if (type === 'voucher') {
          navigationRef.current?.navigate('StackMisc', { screen: 'VoucherCoupon' } as any);
        } else if (type === 'messageAdmin') {
          navigationRef.current?.navigate('StackAdminManagerOther', { screen: 'ChatAdmin', params: { username: username } } as any);
        } else if (type === 'messageUser') {
          navigationRef.current?.navigate('StackIndividual', { screen: 'ChatWithAdmin' } as any);
        } else {
          navigationRef.current?.navigate('StackMisc', { screen: 'DetailArticle', params: { _id: id } } as any);
        }
      }
      console.log('onForegroundEvent', type, detail);
    });
    notifee.onBackgroundEvent(async ({ type, detail }: any) => {
      if (type === EventType.ACTION_PRESS || type === EventType.PRESS) {
        const id = detail.notification.data.id;
        const type = detail.notification.data.type;
        const username = detail.notification.username;
        let url = '';
        if (type === 'orderSuccess' || type === 'orderFailed') {
          url = `${HOST.DOMAIN}/StackMisc/Notification`;
        } else if (type === 'voucher') {
          url = `${HOST.DOMAIN}/StackMisc/order/voucher`;
        } else if (type === 'messageAdmin') {
          url = `${HOST.DOMAIN}/StackAdminManagerOther/ChatAdmin/${username}`;
        } else if (type === 'messageUser') {
          url = `${HOST.DOMAIN}/StackIndividual/ChatWithAdmin`;
        } else {
          url = `${HOST.DOMAIN}/StackMisc/getdetail/${detail.notification.id}`;
        }
        handleLinking(url);
      }
      console.log('onBackgroundEvent', type, detail);
    });

    return () => {
      notifee.cancelAllNotifications();
    }
  }, [])


  return (
    <ProviderRedux store={StoreRedux}>
      <PersistGate persistor={persistor} loading={null}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <PaperProvider>
            <RootStack />
            <Toast position="top" />
          </PaperProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </ProviderRedux>
  );
}

export default App;
