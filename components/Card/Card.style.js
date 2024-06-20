import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: "white",
    margin: 10,
    borderRadius: 10,
  },
  image: {
    height: Dimensions.get('window').height / 4, 
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  yazi: {
    marginTop: 3,
  },
  KalpButton:{
    position: 'relative',
    bottom: -10,
    left: -7,
    marginBottom: 10,
    marginLeft: 10,
  },
  dokunus: {
    padding: 6,
  },
  devamkeyazi: {
    fontWeight: 'bold',
    fontSize: 15,
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginBottom: -30,
    marginRight: 10,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  actionButton: {
    marginRight: 15,
  },
  bosluk: {
    padding: 15,
  },
});
