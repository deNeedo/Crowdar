import { supabase } from './SupabaseConfig.js';
import 'react-native-url-polyfill/auto';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button title='click-me' onPress={do_something} />
      <Text>{do_something.data}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

function do_something() {
  const fetchData = async () => {
    let { data, error } = await supabase
      .from('users')
      .select('*');

    if (error) console.log('Error', error);
    else console.log('Data:', data);
  };
  fetchData();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
