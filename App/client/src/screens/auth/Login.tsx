import { View, Text, StyleSheet, TextInput, ActivityIndicator, Button, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../../FirebaseConfig';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const signIn = async () => {
        setLoading(true);
        try {
           const res = await signInWithEmailAndPassword(auth, email, password);
           console.log(res);
        } catch (e) {
            console.log(e);
           alert('Invalid creds');
        } finally {
            setLoading(false);
        }
    };

    const signUp = async () => {
        setLoading(true);
        try {
           const res = await createUserWithEmailAndPassword(auth, email, password);
           console.log(res);
        } catch (e) {
            console.log(e);
            alert('Sign up failed')
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior='padding'>
                <TextInput style={styles.input} placeholder='Email' autoCapitalize='none' onChangeText={(text) => setEmail(text)}/>
                <TextInput style={styles.input} secureTextEntry={true} placeholder='Password' autoCapitalize='none' onChangeText={(text) => setPassword(text)}/>

                { loading ? <ActivityIndicator size="large" color='#000ff'/>
                :   <>
                        <Button title="Login" onPress={() => signIn()}/>
                        <Button title="Create Account" onPress={() => signUp()}/>
                    </>
                }
            </KeyboardAvoidingView>
        </View>
    );
}

export default Login

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'center',
        paddingBottom: 100
    },
    input: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff'
    }
});
