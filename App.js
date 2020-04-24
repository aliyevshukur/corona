import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { CoronaChecker } from "./screens";
import { ResultScreen } from "./screens";

export default function App() {
  const [point, setPoint] = useState(0);
  const [currentScreen, setCurrentScreen] = useState("corona-checker");

  //Result screen hooks
  const [message, setMessage] = useState("");
  const [resultImage, setResultImage] = useState("no-virus");

  useEffect(() => {
    switch (true) {
      case point < 50:
        setMessage("Looks like you are free from any virus");
        setResultImage("no-virus");
        break;
      case point >= 50 && point < 100:
        setMessage("There is low chance you have corona virus");
        setResultImage("doctor");
        break;
      case point >= 100 && point < 200:
        setMessage("There is risk you have corona virus");
        setResultImage("fever");
        break;
      case point >= 200 && point < 300:
        setMessage("There is high chance you have corona virus");
        setResultImage("medical-mask");
        break;
      case point > 300:
        setMessage("Looks like you got corona virus");
        setResultImage("bacteria");
        break;
      default:
        break;
    }
  }, [point]);

  const goBack = () => {
    setPoint(0);
    setCurrentScreen("corona-checker");
  };

  const showResult = (pointFromCoronaChecker) => {
    setPoint(pointFromCoronaChecker);
    setCurrentScreen("result-screen");
  };

  return (
    <View style={styles.container}>
      {currentScreen === "corona-checker" ? (
        <CoronaChecker showResult={showResult} />
      ) : (
        <ResultScreen
          message={message}
          resultImage={resultImage}
          goBack={goBack}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
});
