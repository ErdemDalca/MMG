import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { Dimensions, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set, onValue } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AnaSayfa from './Ekranlar/anaSayfa';
import Favoriler from './Ekranlar/favoriler';
import Profil from './Ekranlar/profil';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function App() {
  const Stack = createNativeStackNavigator();
  const [sifre, setsifre] = useState('');
  const [email, setemail] = useState('');
  const auth = getAuth();
  const database = getDatabase();

  // navigationRef tanımlanması
  const navigationRef = useRef(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        if (userToken) {
          const user = JSON.parse(userToken);
          navigationRef.current?.navigate('AnaEkran', { uid: user.uid });
        }
      } catch (error) {
        console.error('Error checking token', error);
      }
    };
    checkToken();
  }, []);

  const saveToken = async (user) => {
    const userData = JSON.stringify({ uid: user.uid, email: user.email });
    await AsyncStorage.setItem('userToken', userData);
  };

  const Register = (navigation) => {
    createUserWithEmailAndPassword(auth, email, sifre)
      .then((userCredential) => {
        const user = userCredential.user;
        const userData = {
          email: user.email,
          uid: user.uid,
        };
        const usersRef = ref(database, 'kullanıcılar/' + user.uid);
        set(usersRef, userData)
          .then(() => {
            saveToken(user);
            navigation.navigate('AnaEkran', { uid: user.uid });
          })
          .catch((error) => {
            alert(`Error: ${error.message}`);
          });
      })
      .catch((error) => {
        alert(`Error: ${error.message}`);
      });
  };

  const Login = (navigation) => {
    signInWithEmailAndPassword(auth, email, sifre)
      .then((userCredential) => {
        const user = userCredential.user;
        const usersRef = ref(database, 'kullanıcılar/' + user.uid);
        onValue(usersRef, (snapshot) => {
          const userData = snapshot.val();
          if (!userData) {
            const userData = {
              email: user.email,
              uid: user.uid,
            };
            set(usersRef, userData)
              .then(() => {
                saveToken(user);
                navigation.navigate('AnaEkran', { uid: user.uid });
              })
              .catch((error) => {
                alert(`Error: ${error.message}`);
              });
          } else {
            saveToken(user);
            navigation.navigate('AnaEkran', { uid: user.uid });
          }
        });
      })
      .catch((error) => {
        alert(`Error: ${error.message}`);
      });
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Giris">
        <Stack.Screen name='AnaEkran' component={AnaSayfa} />
        <Stack.Screen name='Favoriler' component={Favoriler} />
        <Stack.Screen name='Profil' component={Profil} />
        <Stack.Screen name='Giris' options={{ headerShown: false }}>
          {({ navigation }) => (
            <ImageBackground source={require('./img/gow.jpg')} style={styles.BackGround}>
              <View style={styles.container}>
                <View style={styles.text_Input_Container}>
                  <View style={styles.Icon_Container}>
                    <Icon name='person-circle-sharp' size={30} color={'#fff'} />
                  </View>
                  <TextInput style={styles.text_Input} placeholder='Email' value={email} onChangeText={setemail} />
                </View>
                <View style={styles.text_Input_Container}>
                  <View style={styles.Icon_Container}>
                    <Icon name='keypad-sharp' size={30} color={'#fff'} />
                  </View>
                  <TextInput style={styles.text_Input} placeholder='Şifre' value={sifre} onChangeText={setsifre} secureTextEntry />
                </View>
                <View style={styles.button_container}>
                  <TouchableOpacity style={[styles.button, styles.registerButton]} onPress={() => Register(navigation)}>
                    <Text style={styles.button_text}>Kayıt Ol</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={() => Login(navigation)}>
                    <Text style={[styles.button_text, styles.loginButtonText]}>Giriş Yap</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  BackGround: {
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  text_Input_Container: {
    width: 100,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  text_Input: {
    width: width / 100 * 60,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 6,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'left',
    elevation: 5,
    padding: 5,
  },
  Icon_Container: {
    width: 50,
    height: 50,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    elevation: 3,
    borderRadius: 5,
    backgroundColor: '#ff0000',
  },
  button_container: {
    flexDirection: 'row',
    elevation: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    width: 80,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  registerButton: {
    backgroundColor: '#ff0000',
  },
  loginButton: {
    backgroundColor: '#fff',
    borderColor: '#ff0000',
    borderWidth: 1,
  },
  button_text: {
    color: '#fff',
  },
  loginButtonText: {
    color: '#ff0000',
  },
});
