import firebase from '../../config/firebase';

var db = firebase.firestore();

export const getChatId = async (dispatch, id1, id2) => {
  dispatch({ type: 'chat_loading' });
  const chatChannel = await db
    .collection('users')
    .doc(id1)
    .collection('engagedChats')
    .doc(id2)
    .get();

  if (chatChannel.exists) {
    dispatch({ type: 'chat_id', payload: chatChannel.data().channelId });
  } else {
    db.collection('chatChannels')
      .add({
        userIds: [id1, id2],
      })
      .then(async function (docRef) {
        await db
          .collection('users')
          .doc(id1)
          .collection('engagedChats')
          .doc(id2)
          .set({
            channelId: docRef.id,
          });
        await db
          .collection('users')
          .doc(id2)
          .collection('engagedChats')
          .doc(id1)
          .set({
            channelId: docRef.id,
          });
        return docRef.id;
      })
      .then(id => dispatch({ type: 'chat_id', payload: id }))
      .catch(error => dispatch({ type: 'chat_error', payload: error }));
  }
};

export const getOtherProfile = (dispatch, id) => {
  dispatch({ type: 'chat_loading' });
  db.collection('users')
    .doc(id)
    .get()
    .then(function (doc) {
      if (doc.exists) {
        dispatch({ type: 'get_other_profile', payload: doc.data() });
      } else {
        dispatch({ type: 'chat_error', payload: 'No profile found' });
      }
    })
    .catch(function (error) {
      dispatch({
        type: 'chat_error',
        payload: `Error getting profile: ${error}`,
      });
    });
};

const getProfileById = async (dispatch, id) => {
  const profile = await db
    .collection('users')
    .doc(id)
    .get()
    .catch(function (error) {
      dispatch({
        type: 'chat_error',
        payload: `Error getting profile: ${error}`,
      });
    });
  if (profile) {
    const profileData = profile.data();
    return { ...profileData, id: profile.id };
  }
};

export const sendMessage = async (
  dispatch,
  senderId,
  recipientId,
  text,
  senderName,
  senderImgUrl,
  chatId,
) => {
  await db
    .collection('chatChannels')
    .doc(chatId)
    .collection('msg')
    .add({
      senderId,
      recipientId,
      senderName,
      senderImgUrl,
      text,
      date: Date.now(),
    })
    .catch(error => dispatch({ type: 'chat_error', payload: error }));

  await db
    .collection('users')
    .doc(senderId)
    .collection('engagedChats')
    .doc(recipientId)
    .set(
      {
        lastMsg: Date.now(),
      },
      { merge: true },
    );

  await db
    .collection('users')
    .doc(recipientId)
    .collection('engagedChats')
    .doc(senderId)
    .set(
      {
        lastMsg: Date.now(),
      },
      { merge: true },
    );
};

export const getMessagesListener = (dispatch, chatId, status) => {
  const unsubscribe = db
    .collection('chatChannels')
    .doc(chatId)
    .collection('msg')
    .orderBy('date')
    .onSnapshot(function (querySnapshot) {
      const data = [];
      querySnapshot.forEach(function (doc) {
        data.push(doc.data());
      });
      if (status !== 'unsubscribe') {
        dispatch({ type: 'chat_messages', payload: data });
      }
    });

  if (status === 'unsubscribe') {
    unsubscribe();
  }
};

export const getLatestMessagesListener = (dispatch, status, id) => {
  console.log('getLatestMessagesListener status: ', status, ' and Id: ', id);
  const unsubscribe = db
    .collection('users')
    .doc(id)
    .collection('engagedChats')
    .orderBy('lastMsg', 'desc')
    .onSnapshot(
      querySnapshot => {
        if (status === 'subscribe') {
          const latestChannels = [];
          querySnapshot.forEach(doc => {
            const latestMsg = doc.data();
            if (latestMsg.lastMsg) {
              latestChannels.push({
                channelId: latestMsg.channelId,
                userId: doc.id,
              });
            }
          });
          getLatestMessages(dispatch, latestChannels);
        }
      },
      error =>
        dispatch({
          type: 'chat_error',
          payload: `Error fetching latest messages: ${error}`,
        }),
    );

  if (status === 'unsubscribe') {
    unsubscribe();
  }
};

const getLatestMessages = async (dispatch, channels) => {
  try {
    dispatch({ type: 'chat_loading' });
    const latest = await channels.map(async ids => {
      const profile = await getProfileById(dispatch, ids.userId);
      const msg = await db
        .collection('chatChannels')
        .doc(ids.channelId)
        .collection('msg')
        .orderBy('date', 'desc')
        .limit(1)
        .get();

      const message = msg.docs.map(doc => {
        return { ...doc.data(), id: doc.id };
      });
      const obj = {
        text: message[0].text,
        id: message[0].id,
        recipientName: profile.firstName,
        recipientImgUrl: profile.imgUrl,
      };
      return obj;
    });
    await Promise.all(latest).then(yay =>
      dispatch({ type: 'latest_messages', payload: yay }),
    );
  } catch (error) {
    dispatch({
      type: 'chat_error',
      payload: `Error fetching latest messages: ${error}`,
    });
  }
};
