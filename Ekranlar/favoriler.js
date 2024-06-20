import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ref, onValue, off } from 'firebase/database';
import { db } from "../firebase"; 
import Card from '../components/Card';

export default function Favoriler({ route }) {
  const uid = route.params.uid;
  const [favoriHaberler, setFavoriHaberler] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const favorilerRef = ref(db, 'kullanıcılar/' + uid + '/favoriler');
    
    const onFavorilerChange = (snapshot) => {
      const favoriHaberlerList = [];
      const favorilerData = snapshot.val();
      if (favorilerData) {
        const favoriKeys = Object.keys(favorilerData);
        const haberPromises = favoriKeys.map(haberID => 
          new Promise((resolve) => {
            onValue(ref(db, 'haberler/' + haberID), (haberSnapshot) => {
              const haberData = haberSnapshot.val();
              if (haberData) {
                resolve({ ...haberData, u_id: haberID });
              } else {
                resolve(null);
              }
            }, { onlyOnce: true });
          })
        );

        Promise.all(haberPromises).then(results => {
          const filteredResults = results.filter(item => item !== null);
          setFavoriHaberler(filteredResults);
        });
      } else {
        setFavoriHaberler([]);
      }
    };

    onValue(favorilerRef, onFavorilerChange);

    return () => {
      off(favorilerRef, onFavorilerChange);
    };
  }, [uid]);

  function navigateToAnaSayfa() {
    navigation.pop();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.Titlerow}>
        <Text style={styles.rehberTitle}>Favoriler</Text>
        <TouchableOpacity style={styles.cikis} onPress={navigateToAnaSayfa}>
          <Text style={styles.cikisText}>Geri Dön</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={favoriHaberler}
        renderItem={({ item }) => <Card haber={item} uid={uid} isFavorited={true} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eceff1',
  },
  rehberTitle: {
    fontWeight: 'bold',
    fontSize: 45,
    padding: 10,
    color: 'red',
  },
  cikis: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingStart: 5,
    alignSelf: 'flex-end',
    borderWidth: 2,
    borderRadius: 100,
    borderColor: 'red',
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 15,
  },
  cikisText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'red',
    alignSelf: 'flex-end',
    padding: 5,
  },
  Titlerow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 10,
  },
});
