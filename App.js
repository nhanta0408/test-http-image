// import React from 'react';
// import {View, Image, Button, Platform} from 'react-native';
// import {launchImageLibrary} from 'react-native-image-picker';

// const SERVER_URL = 'https://e3b9-115-76-156-37.ngrok.io';
// //const SERVER_URL = 'http://192.168.1.8:3000';

// const createFormData = (photo, body = {}) => {
//   const data = new FormData();

//   data.append('photo', {
//     name: photo.fileName,
//     type: photo.type,
//     uri: photo.uri,
//   });

//   Object.keys(body).forEach(key => {
//     data.append(key, body[key]);
//   });
//   console.log(data);
//   return data;
// };

// const App = () => {
//   const [photo, setPhoto] = React.useState(null);

//   const handleChoosePhoto = () => {
//     launchImageLibrary({noData: true}, response => {
//       // console.log(response);
//       if (response) {
//         setPhoto(response);
//       }
//     });
//   };

//   const handleUploadPhoto = () => {
//     let body = new FormData();
//     body.append('photo', {
//       uri: photo.assets[0].uri,
//       name: photo.assets[0].name,
//       type: photo.assets[0].type,
//     });
//     body.append('userId', '456');
//     console.log(body);
//     fetch(`http://192.168.1.8:3000/api/upload`, {
//       headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
//       method: 'POST',
//       //body: createFormData(photo.assets[0], {userId: '123'}),
//       body: body[0],
//     })
//       .then(response => response.json())
//       .then(response => {
//         console.log('response', response);
//       })
//       .catch(error => {
//         console.log('error nè nha', error);
//       });
//   };

//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       {photo && (
//         <>
//           <Image source={{uri: photo.uri}} style={{width: 300, height: 300}} />
//           <Button title="Upload Photo" onPress={handleUploadPhoto} />
//         </>
//       )}
//       <Button title="Choose Photo" onPress={handleChoosePhoto} />
//     </View>
//   );
// };

// export default App;

// App.js

import React from 'react';
import {View, Image, Button, Platform} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';

const SERVER_URL = 'http://localhost:3000';

const createFormData = (photo, body = {}) => {
  const data = new FormData();

  data.append('photo', {
    name: photo.assets[0].fileName,
    type: photo.assets[0].type,
    uri:
      Platform.OS === 'ios'
        ? photo.assets[0].uri.replace('file://', '')
        : photo.assets[0].uri,
  });

  data.append('userId', body.userId);
  console.log(data);
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
    // body.append('file', {
    //   uri: photo.assets[0].uri,
    //   name: photo.assets[0].name,
    //   type: photo.assets[0].type,
    // });
    body.append('photo', photo.assets[0]);
    //body.append('Content-Type', 'image/jpeg');
    //body.append('userId', '456');
    fetch(`http://192.168.1.8:3000/api/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: body,
    })
      .then(response => response.json())
      .then(response => {
        console.log('response', response);
      })
      .catch(error => {
        console.log('error', error);
      });
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
