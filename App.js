import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { CoronaChecker } from "./screens";
import { ResultScreen } from "./screens";

export default function App() {
  const [statusPoints, setStatusPoints] = useState(0);
  const [symptomsPoints, setSymptomsPoints] = useState(0);
  const [currentScreen, setCurrentScreen] = useState("corona-checker");

  //Result screen hooks
  const [statusMessage, setStatusMessage] = useState("");
  const [symptomsMessage, setSymptomsMessage] = useState("");
  const [resultImage, setResultImage] = useState("no-virus");

  useEffect(() => {
    // Find status message
    console.log(statusPoints, symptomsPoints);

    switch (true) {
      case statusPoints < 90:
        setStatusMessage("medical care is not required");
        break;
      case statusPoints >= 70 && statusPoints < 150:
        setStatusMessage(
          "medical care is not necessary, but please contact to your doctor"
        );
        break;
      case statusPoints >= 150:
        setStatusMessage(
          "medical care is required, Patient must stay at hospital"
        );
        break;
      default:
        break;
    }

    // Find disease message
    switch (true) {
      case symptomsPoints < 40:
        setSymptomsMessage("Looks like you are free from any virus");
        setResultImage("no-virus");
        break;
      case symptomsPoints >= 40 && symptomsPoints < 60:
        setSymptomsMessage("There is low chance you have corona virus");
        setResultImage("doctor");
        break;
      case symptomsPoints >= 60 && symptomsPoints < 100:
        setSymptomsMessage("There is risk you have corona virus");
        setResultImage("fever");
        break;
      case symptomsPoints >= 100 && symptomsPoints < 140:
        setSymptomsMessage("There is high chance you have corona virus");
        setResultImage("medical-mask");
        break;
      case symptomsPoints > 140:
        setSymptomsMessage("Looks like you got corona virus");
        setResultImage("bacteria");
        break;
      default:
        break;
    }
  }, [statusPoints]);

  const goBack = () => {
    setStatusPoints(0);
    setCurrentScreen("corona-checker");
  };

  const showResult = (statusPoints, symptomsPoints) => {
    setStatusPoints(statusPoints);
    setSymptomsPoints(symptomsPoints);
    setCurrentScreen("result-screen");
  };

  return (
    <View style={styles.container}>
      {currentScreen === "corona-checker" ? (
        <CoronaChecker showResult={showResult} />
      ) : (
        <ResultScreen
          statusMessage={statusMessage}
          symptomsMessage={symptomsMessage}
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
