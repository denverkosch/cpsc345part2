import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Image, Keyboard, TouchableWithoutFeedback, } from 'react-native';
import {encrypt, decrypt} from './encrypt';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Location from 'expo-location';

export function EncryptPage({navigation}) {
  const dispatch = useDispatch();

  const [message, setMessage] = useState('');
  const [ciphered, setCiphered] = useState('Encrypted or Decrypted Message Will Appear Here');
  const [locationAllowed, setLocationAllowed] = useState(false);

  useEffect(() => {
    const requestLocationAccess = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
              setStatusMessage('Permission to access location was denied');
              return;
          }
      console.log('permissions allowed');
      setLocationAllowed(true);
    }
    if (!locationAllowed) requestLocationAccess();
  }, []);

  const getEncryption = async () =>{
    let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest});
    let lat = parseFloat(location.coords.latitude.toFixed(5));
    let long = parseFloat(location.coords.longitude.toFixed(5));
    let key = calcKey(lat, long);
    console.log(key);
    return key;
  }

  const calcKey = (lat, long) => {
    let key = Math.round((Math.abs(long + lat)) * 10000);
    key = (key % 25) + 1;
    return key;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={{fontSize: 36, bottom:'5%'}}>Caesar Cipher Translator</Text>

        <Image style={{width: 200, height: 200}} source={require('./caesar.jpg')}/>

        
        <View style={{top:'3%'}}>
            <TextInput style={[styles.textInput]}
            placeholder='Enter message to encrypt/decrypt here'
            inputMode='text'
            value={message}
            onChangeText={text => setMessage(text)}
            multiline={true}
            numberOfLines={3}
            />

        </View>

        <View style={{top:'4%'}}>
          <Button title="Encrypt" 
          onPress={async () => {
            setCiphered("encrypting...");
            let cipher = await getEncryption()
            setCiphered(encrypt(message, cipher, dispatch));
            }}/>
          <Button title="History" 
          onPress={() => navigation.navigate("History")}/>
        </View>

        <Text style={{top:'4%', fontSize: 20, textAlign:'center'}}>{ciphered}</Text>

        <StatusBar style="auto"/>
      </View>
    </TouchableWithoutFeedback>
  );

}

// addMessage({type: '', message: '', cipher: 3, shifted: ''})

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      alignContent : 'center',
      flex: 1,
      
    },
  
    textInput: {
      paddingBottom: 5,
      padding: 8, 
      backgroundColor: '#f5f5f5',
      alignContent:'center',
      textAlign:'center',
      width: 270
    }
  
});