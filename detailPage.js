import { View, Text, Button } from "react-native";
import { useState, useEffect } from "react";
import { decrypt } from "./encrypt";
import * as Location from 'expo-location';

export function DetailsPage({navigation, route}) {
    const encrypted = route.params.message;
    const [decrypted, setDecrypted] = useState('Press Decrypt to Start Finding Decrypted Message!');
    const [statusMessage, setStatusMessage] = useState('Waiting...');
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
        };
        if (!locationAllowed) {requestLocationAccess();}
    },[]);


    const getEncryption = async () => {
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
        <View>
            <View style={{alignContent: 'center', display: 'flex', paddingTop: '30%'}}>
                <Text style={{fontSize: 40, textAlign: 'center'}}>{encrypted}</Text>
            </View>


            <View style={{alignContent: 'center', display: 'flex', padding: '30%'}}>
                {locationAllowed &&
                    <View>
                        <Button title="Decrypt" onPress={async () => {
                            setDecrypted("Decrypting...");
                            let cipher = await getEncryption();
                            setDecrypted(decrypt(encrypted, cipher));
                        }}/>
                    </View>
                }
                {!locationAllowed &&
                    <View>
                        <Text>{statusMessage}</Text>
                    </View>

                }
            </View>

            <View style={{alignContent: 'center', display: 'flex', paddingBottom: '30%'}}>
                <Text style={{fontSize: 20, textAlign: 'center'}}>{decrypted}</Text>
            </View>
        </View>
    )
}