import { FlatList, Text, View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { clearLog, deleteMessages, setMessageMarked } from "./slices";
import { Button, Switch } from "react-native";
import { useState } from "react";


export function HistoryPage ({navigation}) {
    const [deleteAllIsVisible, toggleDeleteAllIsVisible] = useState(false);
    const [deleteCheckedIsVisible, toggleDeleteCheckedIsVisible] = useState(false);
    const [deleteAllButton, toggleDeleteAllButton] = useState(true)
    const [deleteCheckedButton, toggleDeleteCheckedButton] = useState(true)

    const dispatch = useDispatch();
    const cipherHistory = useSelector((state) => state.cipherHistory.messages);

    const message = (item) => {
        const {shifted, marked} = item.item;

        function toggleMarked() {
            dispatch(setMessageMarked(item.index))
        }

        return (
            <View style={{flexDirection: 'row', alignContent: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 20}} onPress={() => {navigation.navigate('Details', {message: shifted})}}>Shifted Message: {String(shifted)}</Text>
                <Switch 
                value= {marked}
                onValueChange={toggleMarked}/>
            </View>
        )
    }

    const confirmDeleteAll = () => {
        if (cipherHistory.length !== 0) {dispatch(clearLog())}
        toggleDeleteAllIsVisible(false)
        toggleDeleteAllButton(true)
        toggleDeleteCheckedButton(true)

    }

    const confirmDeleteChecked = () => {
        if (cipherHistory.length !== 0) {dispatch(deleteMessages())}
        toggleDeleteCheckedIsVisible(false)
        toggleDeleteAllButton(true)
        toggleDeleteCheckedButton(true)

    }

    return (
        <View>
            <FlatList
                data= {cipherHistory}
                renderItem={ (item) => message(item, dispatch)}
                keyExtractor={ (item, index) => index }
            />

            {
                deleteAllIsVisible &&
                <View style={{justifyContent:"center"}}>
                    <Text>Are you sure you want to delete all previous messages?</Text>
                    <Button title= 'Confirm' onPress={() => confirmDeleteAll()}/>
                    <Button title= 'Cancel' onPress={() => {
                        toggleDeleteAllIsVisible(false)
                        toggleDeleteAllButton(true)
                        toggleDeleteCheckedButton(true)
                        toggleDeleteCheckedIsVisible(false)
                    }}/>
                </View>
            }

            {
                deleteAllButton &&
                <View>
                    <Button title= 'Clear History' onPress={() => {
                        toggleDeleteAllIsVisible(true)
                        toggleDeleteAllButton(false)
                        toggleDeleteCheckedButton(false)
                        toggleDeleteCheckedIsVisible(false)
                        }}/>
                </View>
            }

            {
                deleteCheckedButton &&
                <View>
                    <Button title= 'Delete Marked Messages' onPress={() => {
                        toggleDeleteAllIsVisible(false)
                        toggleDeleteAllButton(false)
                        toggleDeleteCheckedButton(false)
                        toggleDeleteCheckedIsVisible(true)
                        }}/>
                </View>
            }

            { deleteCheckedIsVisible &&
                <View>
                    <Text>Are you sure you want to delete all marked messages?</Text>
                    <Button title= 'Confirm' onPress={() => {
                        confirmDeleteChecked()

                    }}/>
                    <Button title= 'Cancel' onPress={() => {
                        toggleDeleteAllIsVisible(false)
                        toggleDeleteAllButton(true)
                        toggleDeleteCheckedButton(true)
                        toggleDeleteCheckedIsVisible(false)    
                    }}/>
                </View>
            }
        </View>
    )
}


const histyle = StyleSheet.create({
    text: {
        paddingBottom: 5,
        padding: 8, 
        backgroundColor: '#f5f5f5',
        alignContent:'center',
        textAlign:'center',
    },
});