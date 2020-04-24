import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Button,
  ActivityIndicator,
} from "react-native";
import { images } from "../../global";

export const ResultScreen = ({ message, resultImage, goBack }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, [loaded]);

  return (
    <View style={styles.container}>
      {loaded ? (
        <View style={styles.result}>
          <View style={styles.imageWrapper}>
            <Image
              source={images.resultImages[resultImage]}
              style={{ width: 200, height: 200 }}
            />
          </View>
          <View style={styles.messageWrapper}>
            <Text style={styles.message}>{message}</Text>
          </View>
          <Button
            style={styles.goBack}
            onPress={() => goBack(0)}
            title="Go Back"
          />
        </View>
      ) : (
        <ActivityIndicator size="large" color="teal" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  result: {
    justifyContent: "center",
    alignItems: "center",
  },
  imageWrapper: {
    margin: 20,
  },
  messageWrapper: {
    margin: 50,
  },
  message: {
    textAlign: "center",
    fontSize: 18,
  },
  goBack: {
    margin: 50,
  },
});
