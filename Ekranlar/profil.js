import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Platform, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const requestPermissions = async () => {
  if (Platform.OS !== 'web') {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: mediaLibraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (cameraStatus !== 'granted' || mediaLibraryStatus !== 'granted') {
      Alert.alert('Kamera ve galeri erişim izni gerekli!');
      return false;
    }
    return true;
  }
  return true;
};

const Profilsayfasi = () => {
  const [imgUrl, setImgUrl] = useState("https://t4.ftcdn.net/jpg/05/50/33/47/360_F_550334715_0d2cdaljV4Xd3x7yVUhRxfmLLEUyMdXr.jpg");
  const [username, setUsername] = useState('Kullanıcı Adı');
  const [password, setPassword] = useState('');

  const handleCameraOpen = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });

    if (!result.cancelled) {
      console.log(result);
      setImgUrl(result.assets ? result.assets[0].uri : result.uri);
    } else {
      console.log('User cancelled image picker');
    }
  };

  const handleGalleryOpen = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });

    if (!result.cancelled) {
      console.log(result);
      setImgUrl(result.assets ? result.assets[0].uri : result.uri);
    } else {
      console.log('User cancelled image picker');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Kullanıcı Adı:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        editable={false}
      />
      <Text style={styles.label}>Şifre:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        editable={false}
      />
      <Image
        style={styles.defresim}
        resizeMode='contain'
        source={{ uri: imgUrl }}
      />
      <TouchableOpacity style={styles.kamerabutonu} onPress={handleCameraOpen}>
        <Text style={styles.kamerayazi}>Kamerayı Aç</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.kamerabutonu} onPress={handleGalleryOpen}>
        <Text style={styles.kamerayazi}>Galeriyi Aç</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profilsayfasi;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: '5%',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    width: '90%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
  },
  defresim: {
    width: '90%',
    height: 300,
    borderRadius: 6,
    marginVertical: 20,
  },
  kamerabutonu: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    borderRadius: 6,
    backgroundColor: 'green',
    paddingVertical: 10,
  },
  kamerayazi: {
    color: '#fff',
  },
});