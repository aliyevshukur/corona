import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Picker,
  Slider,
  ScrollView,
  Button,
  Switch,
} from "react-native";
import { setWorldAlignment, setAutoFocusEnabled } from "expo/build/AR";

export const CoronaChecker = ({ showResult }) => {
  const [age, setAge] = useState("55"); //User age
  const [gender, setGender] = useState("male"); //User gender
  const [proportions, setProportions] = useState({
    height: "180",
    weight: "80",
  }); // User height and weight
  const [temp, setTemp] = useState(36); // User temperature
  const [symptoms, setSymptoms] = useState({
    cought: false,
    fever: false,
    shortness: false,
    diarrhea: false,
    losingSmellAndTaste: false,
  }); // User symptoms
  const [diseases, setDiseases] = useState({
    lungDisease: false,
    heartDisease: false,
    diabete: false,
    kindeyDisease: false,
    liverDisease: false,
  }); //User disease
  const [isValid, setIsValid] = useState(true); // True if all form inputs is true

  const submitForm = () => {
    const isInputsValid = validateInputs();
    let points = 0;

    if (isInputsValid) {
      switch (true) {
        case age >= 20 && age <= 29:
          points = points + 10;
          break;
        case age >= 30 && age <= 39:
          points = points + 20;
          break;
        case age >= 40 && age <= 49:
          points = points + 40;
          break;
        case age >= 50 && age <= 59:
          points = points + 55;
          break;
        case age >= 60 && age <= 69:
          points = points + 75;
          break;
        case age >= 70 && age <= 79:
          points = points + 90;
          break;
        case age >= 80:
          points = points + 100;
          break;
        default:
          break;
      }

      if (gender === "male") {
        points = points + 15;
      }

      // Calculate Proportions points
      const BMI = Math.round(
        proportions.weight / ((proportions.height * proportions.height) / 10000)
      );

      switch (true) {
        case BMI >= 25 && BMI <= 29:
          points = points + 30;
          break;
        case BMI >= 30 && BMI <= 39:
          points = points + 40;
          break;
        case BMI >= 40:
          points = points + 60;
          break;
        default:
          break;
      }

      // Calculate Symptoms Points
      if (symptoms.cought) points = points + 35;
      if (symptoms.fever) points = points + 35;
      if (symptoms.shortness) points = points + 40;
      if (symptoms.soreThroat) points = points + 15;
      if (symptoms.diarrhea) points = points + 10;
      if (symptoms.losingSmellAndTaste) points = points + 10;

      // Calculate Body Temperature Points
      switch (temp) {
        case 37:
          points = points + 20;
          break;
        case 38:
          points = points + 40;
          break;
        case 39:
          points = points + 60;
          break;
        case 40:
          points = points + 80;
          break;
      }

      // Calculate Diseases Points
      if (diseases.lungDisease) points = points + 60;
      if (diseases.heartDisease) points = points + 60;
      if (diseases.diabete) points = points + 50;
      if (diseases.kindeyDisease) points = points + 40;
      if (diseases.liverDisease) points = points + 40;

      showResult(points);
    } else {
      setIsValid(false);
    }
  };

  const validateInputs = () => {
    if (+age && +proportions.weight && +proportions.height) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.appHeaderWrapper}>
        <Text style={styles.appHeader}>Corona Checker v9000</Text>
      </View>
      {/* Message on invalid inputs */}
      {!isValid && (
        <View style={styles.message}>
          <Text style={{ color: "#fff", textAlign: "center" }}>
            Please, enter valid inputs
          </Text>
        </View>
      )}
      {/* Age */}
      <View style={styles.row}>
        <Text style={styles.header}>
          Age: <Text style={styles.description}>(between 0-120)</Text>
        </Text>
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={(value) => setAge(value)}
          keyboardType="numeric"
        />
      </View>

      {/* Gender */}
      <View style={styles.row}>
        <Text style={styles.header}>Gender:</Text>

        <View style={styles.pickerStyle}>
        <Picker
          style={{ height: 30, width: 120 }}
          selectedValue={gender}
          onValueChange={(value) => setGender(value)}
        >
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
        </Picker>
        </View>
      </View>

      {/* Proportions */}
      <View style={styles.row}>
        <Text style={styles.header}>
          Height: <Text style={styles.description}>(in cm)</Text>
        </Text>
        <TextInput
          style={styles.input}
          value={proportions.height}
          onChangeText={(value) => {
            setProportions({ ...proportions, height: value });
          }}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.header}>
          Weight: <Text style={styles.description}>(in kg)</Text>
        </Text>
        <TextInput
          style={styles.input}
          value={proportions.weight}
          onChangeText={(value) => {
            setProportions({ ...proportions, weight: value });
          }}
          keyboardType="numeric"
        />
      </View>

      {/* Sypmtoms */}
      <View style={{ ...styles.row, ...styles.checkBoxesWrapper }}>
        <Text style={{ ...styles.header, ...styles.checkBoxHeader }}>
          Sypmtoms
        </Text>
        <View style={styles.checkBoxes}>
          <View style={styles.checkBox}>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              ios_backgroundColor="#3e3e3e"
              title="Cought"
              value={symptoms.cought}
              onValueChange={() =>
                setSymptoms({ ...symptoms, cought: !symptoms.cought })
              }
            />
            <Text>Cought</Text>
          </View>
          <View style={styles.checkBox}>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              ios_backgroundColor="#3e3e3e"
              title="Fever"
              value={symptoms.fever}
              onValueChange={() =>
                setSymptoms({ ...symptoms, fever: !symptoms.fever })
              }
            />
            <Text>Fever</Text>
          </View>
          <View style={styles.checkBox}>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              ios_backgroundColor="#3e3e3e"
              title="Shortness of breath"
              value={symptoms.shortness}
              onValueChange={() =>
                setSymptoms({
                  ...symptoms,
                  shortness: !symptoms.shortness,
                })
              }
            />
            <Text>Shortness of breath</Text>
          </View>
          <View style={styles.checkBox}>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              ios_backgroundColor="#3e3e3e"
              title="Sore throat"
              value={symptoms.soreThroat}
              onValueChange={() =>
                setSymptoms({
                  ...symptoms,
                  soreThroat: !symptoms.soreThroat,
                })
              }
            />
            <Text>Sore throat</Text>
          </View>
          <View style={styles.checkBox}>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              ios_backgroundColor="#3e3e3e"
              title="Diarrhea"
              value={symptoms.diarrhea}
              onValueChange={() =>
                setSymptoms({ ...symptoms, diarrhea: !symptoms.diarrhea })
              }
            />
            <Text>Diarrhea</Text>
          </View>
          <View style={styles.checkBox}>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              ios_backgroundColor="#3e3e3e"
              title="Losing smell and taste"
              value={symptoms.losingSmellAndTaste}
              onValueChange={() =>
                setSymptoms({
                  ...symptoms,
                  losingSmellAndTaste: !symptoms.losingSmellAndTaste,
                })
              }
            />
            <Text>Losing smell and taste</Text>
          </View>
        </View>
      </View>

      {/* Body temperature */}
      <View style={styles.row}>
        <Text style={styles.header}>Body temperature:</Text>
        <Slider
          style={{ width: 110 }}
          onValueChange={(value) => setTemp(value)}
          minimumValue={36}
          maximumValue={40}
          step={1}
        />
        <Text>{temp}C</Text>
      </View>

      {/* Critical Disease */}
      <View style={{ ...styles.row, ...styles.checkBoxesWrapper }}>
        <Text style={{ ...styles.header, ...styles.checkBoxHeader }}>
          Critical Diseases
        </Text>
        <View style={styles.checkBoxes}>
          <View style={styles.checkBox}>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              ios_backgroundColor="#3e3e3e"
              title="Chronic lung disease"
              value={diseases.lungDisease}
              onValueChange={() =>
                setDiseases({ ...diseases, lungDisease: !diseases.lungDisease })
              }
            />
            <Text>Chronic lung disease</Text>
          </View>
          <View style={styles.checkBox}>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              ios_backgroundColor="#3e3e3e"
              title="Heart disease and disorders"
              value={diseases.heartDisease}
              onValueChange={() =>
                setDiseases({
                  ...diseases,
                  heartDisease: !diseases.heartDisease,
                })
              }
            />
            <Text>Heart disease and disorders</Text>
          </View>
          <View style={styles.checkBox}>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              ios_backgroundColor="#3e3e3e"
              title="Diabete"
              value={diseases.diabete}
              onValueChange={() =>
                setDiseases({ ...diseases, diabete: !diseases.diabete })
              }
            />
            <Text>Diabete</Text>
          </View>
          <View style={styles.checkBox}>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              ios_backgroundColor="#3e3e3e"
              title="Chronic kidney disease"
              value={diseases.kindeyDisease}
              onValueChange={() =>
                setDiseases({
                  ...diseases,
                  kindeyDisease: !diseases.kindeyDisease,
                })
              }
            />
            <Text>Chronic kidney disease</Text>
          </View>

          <View style={styles.checkBox}>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              ios_backgroundColor="#3e3e3e"
              title="Liver disease"
              value={diseases.liverDisease}
              onValueChange={() =>
                setDiseases({
                  ...diseases,
                  liverDisease: !diseases.liverDisease,
                })
              }
            />
            <Text>Liver disease</Text>
          </View>
        </View>
      </View>

      {/* Submit Button */}
      <View style={{ marginBottom: 30 }}>
        <Button
          onPress={() => {
            submitForm();
          }}
          title="Check"
          color="black"
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 50,
  },
  appHeader: {
    fontSize: 26,
    textAlign: "center",
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginBottom: 15,
    padding: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0e0",
    borderRadius: 10,
    borderStyle: "solid",
    paddingHorizontal: 10,
  },
  description: {
    color: "grey",
  },
  stackedInputs: {
    justifyContent: "space-around",
  },
  checkBoxesWrapper: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  checkBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  header: {
    fontSize: 18,
  },
  message: {
    backgroundColor: "#ed5f53",
    textAlign: "center",
    paddingVertical: 10,
  },
  pickerStyle: {
    borderColor: 'black',
    borderBottomWidth:1,
    borderRadius: 10,
    alignSelf: 'center'
  }
});
