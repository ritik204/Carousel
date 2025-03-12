import { StyleSheet } from "react-native";

export const ctaStyles = StyleSheet.create({
    button: {
      padding: 15,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'flex-end',
      position: 'absolute',
      bottom: 40,
      alignSelf: 'center', 
  },
    lightButton: {
      backgroundColor: 'white',
    },
    darkButton: {
      backgroundColor: 'black',
    },
    text: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    lightText: {
      color: 'black',
    },
    darkText: {
      color: 'white',
    },
  });