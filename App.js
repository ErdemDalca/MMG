import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Dimensions, ImageBackground, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height




export default function App() {
  const [SIFRE, setSIFRE] = useState('123')
  const [EMAIL, setEMAIL] = useState('d@gmail.com')
  const [sifre, setsifre] = useState('')
  const [email, setemail] = useState('')

  function Login() {
    if(SIFRE == sifre && EMAIL == email){
      alert("Giriş Başarılı")
    }
    else{
      alert("Email veya Şifre Hatalı!!!")
    }
  }

  return (
    <ImageBackground source={require('./img/gow.jpg')} style = {styles.BackGround}>
      <View style={styles.container}>
        <View style = {styles.text_Input_Container}>
          <View style = {styles.Icon_Container}>
            <Icon name='person-circle-sharp' size={30} color={'#fff'}>

            </Icon>
          </View>
          <TextInput style = {styles.text_Input} placeholder='Email' value= {email} onChangeText={setemail}>

          </TextInput>
        </View>

        <View style = {styles.text_Input_Container}>
          <View style = {styles.Icon_Container}>
            <Icon name='keypad-sharp' size={30} color={'#fff'}>
                
            </Icon>
          </View>
          <TextInput style = {styles.text_Input} placeholder='Şifre' value= {sifre} onChangeText={setsifre}>

          </TextInput>
        </View>

        <View style = {styles.button_container}>
          <TouchableOpacity style = {styles.button} onPress={Login}>
            <Text style = {styles.button_text} >
              Giriş Yap
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  BackGround:{
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
    flex : 1,
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
    width: width/ 100 * 60,
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
    width: 80,
    height: 40,
    borderColor: '#ff0000',
    backgroundColor: '#ff0000',
  },
  button: {
    width: 80,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button_text: {
    color: '#fff',
  },
  
});
