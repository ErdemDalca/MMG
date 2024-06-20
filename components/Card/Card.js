import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { getDatabase, ref, set, remove, onValue, runTransaction } from 'firebase/database';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import styles from './Card.style';

const Card = ({ haber, uid, isFavorited }) => {
  const [isLiked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [favorited, setFavorited] = useState(isFavorited);

  useEffect(() => {
    setFavorited(isFavorited);

    const db = getDatabase();
    const likeCountRef = ref(db, `haberler/${haber.u_id}/likeCount`);
    const userLikeRef = ref(db, `kullanıcılar/${uid}/likes/${haber.u_id}`);

    onValue(likeCountRef, (snapshot) => {
      const count = snapshot.val();
      setLikeCount(count || 0);
    });

    onValue(userLikeRef, (snapshot) => {
      const userLiked = snapshot.val();
      setLiked(userLiked === true);
    });
  }, [haber.u_id, uid]);

  const handleLike = () => {
    const db = getDatabase();
    const likeCountRef = ref(db, `haberler/${haber.u_id}/likeCount`);
    const userLikeRef = ref(db, `kullanıcılar/${uid}/likes/${haber.u_id}`);

    runTransaction(likeCountRef, (currentCount) => {
      if (isLiked) {
        set(userLikeRef, null);
        return (currentCount || 0) - 1;
      } else {
        set(userLikeRef, true);
        return (currentCount || 0) + 1;
      }
    }).then((result) => {
      if (result.committed) {
        const updatedCount = result.snapshot.val();
        setLikeCount(updatedCount);
        setLiked(!isLiked);
      }
    }).catch((error) => {
      Alert.alert('Hata', error.message);
    });
  };

  const handleFavorite = () => {
    const db = getDatabase();
    const favoritesRef = ref(db, `kullanıcılar/${uid}/favoriler/${haber.u_id}`);

    if (favorited) {
      remove(favoritesRef)
        .then(() => {
          setFavorited(false);
        })
        .catch((error) => {
          Alert.alert('Hata', error.message);
        });
    } else {
      set(favoritesRef, true)
        .then(() => {
          setFavorited(true);
        })
        .catch((error) => {
          Alert.alert('Hata', error.message);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: haber.imageUrl }} />
      <View style={styles.dokunus}>
        <Text style={styles.title}>{haber.title}</Text>
        <Text style={styles.yazi}>{haber.yazi}</Text>

        <View style={styles.actionRow}>
          <TouchableOpacity style = {styles.KalpButton} onPress={handleFavorite}>
            <FontAwesome name={favorited ? 'heart' : 'heart-o'} size={30} color={favorited ? 'red' : 'black'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLike} style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute',
            bottom: -10, left: -7, marginBottom: 11, marginLeft: 50 }}>
            <AntDesign name={isLiked ? 'like1' : 'like2'} size={30} color={isLiked ? 'blue' : 'black'} />
            <Text style={{ marginLeft: 5 }}>{likeCount}</Text>
          </TouchableOpacity>
        </View>

        {/* <View style={styles.bosluk}></View> */}
      </View>
    </View>
  );
};

export default Card;
