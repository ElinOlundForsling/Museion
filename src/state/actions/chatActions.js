import firebase from '../../config/firebase';

var db = firebase.firestore();

export const getChatId = async (dispatch, id1, id2) => {
  dispatch({ type: 'chat_loading' });
  console.log(id1, id2);
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

export const getMessagesListener = (dispatch, chatId, status) => {
  const unsubscribe = db
    .collection('chatChannels')
    .doc(chatId)
    .collection('msg')
    .orderBy('date', 'desc')
    .onSnapshot(function (querySnapshot) {
      var data = [];
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

export const sendMessage = (
  dispatch,
  senderId,
  recipientId,
  text,
  senderName,
  senderImgUrl,
  chatId,
) => {
  db.collection('chatChannels')
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
};
