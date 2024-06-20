import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ref, onValue } from 'firebase/database';
import { db } from "../firebase"; 
import Card from '../components/Card';
import RegisterScreen from './profil';

export default function AnaSayfa({ route }) {
  const uid = route.params.uid;
  const [haberler, setHaberler] = useState([]);
  const [favoriler, setFavoriler] = useState({});
  const [verilerCekildi, setVerilerCekildi] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const fetchData = () => {
    const haberRef = ref(db); 
    const favorilerRef = ref(db, 'kullanıcılar/' + uid + '/favoriler');

    onValue(haberRef, (snapshot) => {
      const data = snapshot.val();
      if (data && data.haberler) {
        const haberArray = Object.values(data.haberler); 
        setHaberler(haberArray);
        setVerilerCekildi(true); 
      } else {
        setHaberler([]);
        setVerilerCekildi(true); 
      }
    });

    onValue(favorilerRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setFavoriler(data);
      } else {
        setFavoriler({});
      }
    });
  };

  useEffect(() => {
    setTimeout(() => {
      fetchData();
      console.log('Bekleme sona erdi!');
    }, 1000);
    
  }, [uid]);

  const onRefresh = () => {
    setRefreshing(true);
    navigation.replace('AnaEkran', { uid: uid });
    setRefreshing(false);
  };

  function navigateToFavoriler() {
    navigation.navigate('Favoriler', { uid: uid }); 
  }

  function navigateToYeniSayfa() {
    navigation.pop();
  }

  function navigateToRegister() {
    navigation.navigate('Profil', { uid: uid });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.Titlerow}>
        <Text style={styles.rehberTitle}>MMG</Text>
        <TouchableOpacity onPress={navigateToFavoriler}>
          <View style={styles.favorilerButonu}>
            <Text style={styles.favorilerButonuMetin}>Favoriler</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cikis}>
          <Text style={styles.cikisText} onPress={navigateToRegister}>Profil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cikis}>
          <Text style={styles.cikisText} onPress={navigateToYeniSayfa}>Çıkış Yap</Text>
        </TouchableOpacity>
      </View>
      {verilerCekildi ? (
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={haberler}
          renderItem={({ item }) => (
            <Card haber={item} uid={uid} isFavorited={favoriler[item.u_id] || false} />
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        />
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="blue" />
          <Text style={styles.loadingText}>Veriler yükleniyor...</Text>
        </View>
      )}
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
    paddingLeft: 0,
    paddingRight: 0,
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
  favorilerButonu: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingStart: 5,
    alignSelf: 'flex-end',
    borderWidth: 2,
    borderRadius: 100,
    borderColor: 'orange',
    marginLeft: 5,
    marginTop: 25,
    marginBottom: 10,
  },
  favorilerButonuMetin: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'orange',
    alignSelf: 'flex-end',
    padding: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
});
