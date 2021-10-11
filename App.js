// App.js

import React from 'react';
import {View, Image, Button, Platform} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
const SERVER_URL = 'http://192.168.1.8:3000';

const createFormData = (photo, body = {}) => {
  const data = new FormData();

  data.append('photo', {
    name: photo.fileName,
    type: photo.type,
    uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
  });

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });

  return data;
};

const App = () => {
  const [photo, setPhoto] = React.useState(null);

  const handleChoosePhoto = () => {
    launchImageLibrary({noData: true}, response => {
      // console.log(response);
      if (response) {
        setPhoto(response);
      }
    });
  };

  const handleUploadPhoto = () => {
    let body = new FormData();
    let sourcePhoto = {
      name: photo.assets[0].fileName,
      type: photo.assets[0].type,
      uri: photo.assets[0].uri,
    };
    console.log('Source photo', sourcePhoto);
    body.append(
      'photo',
      {
        name: photo.assets[0].fileName,
        type: photo.assets[0].type,
        uri: photo.assets[0].uri,
      },
      photo.assets[0].uri,
    );
    fetch(`${SERVER_URL}/api/upload`, {
      method: 'POST',
      body: body,
    })
      .then(response => response.json())
      .then(response => {
        console.log('response', response);
      })
      .catch(error => {
        console.log('error', error);
      });
    // var xhr = new XMLHttpRequest();
    // xhr.open('POST', `${SERVER_URL}/api/upload`);
    // xhr.send(body);
    // fetch(`${SERVER_URL}/api/upload`, {
    //   method: 'POST',
    //   body: createFormData(photo, {userId: '123'}),
    // })
    //   .then(response => response.json())
    //   .then(response => {
    //     console.log('response', response);
    //   })
    //   .catch(error => {
    //     console.log('error', error);
    //   });
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {photo && (
        <>
          <Image source={{uri: photo.uri}} style={{width: 300, height: 300}} />
          <Button title="Upload Photo" onPress={handleUploadPhoto} />
        </>
      )}
      <Button title="Choose Photo" onPress={handleChoosePhoto} />
    </View>
  );
};

export default App;
