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

export const CoronaChecker = ({ showResult }) => {
  /*
     Application checks for two things:
      1. Risk of user got coronavirus
      2. If user needs medical care in case of corona virus
  */
  /*
    Based on weight and height inputs Body Mass Index will be calculated and will affect results
    based on how much user is overweighted. 
 */

  //Age
  const [age, setAge] = useState("30"); //User age
  //Gender
  const [gender, setGender] = useState("male"); //User gender
  // User height and weight
  const [proportions, setProportions] = useState({
    height: "160",
    weight: "50",
  });
  //Diseases
  const [diseases, setDiseases] = useState({
    lungDisease: false,
    heartDisease: false,
    diabetes: false,
    kidneyDisease: false,
    liverDisease: false,
  });

  // User's symptoms

  // User temperature
  const [temp, setTemp] = useState(36);

  // Disease symptoms
  const [symptoms, setSymptoms] = useState({
    caught: false,
    fever: false,
    shortness: false,
    diarrhea: false,
    losingSmellAndTaste: false,
  });

  const [isValid, setIsValid] = useState(true); // True if all form inputs is true

  const submitForm = () => {
    const isInputsValid = validateInputs();
    let statusPoints = 0;
    let symptomsPoints = 0;
    if (isInputsValid) {
      switch (true) {
        case age >= 20 && age <= 29:
          statusPoints = statusPoints + 10;
          break;
        case age >= 30 && age <= 39:
          statusPoints = statusPoints + 20;
          break;
        case age >= 40 && age <= 49:
          statusPoints = statusPoints + 40;
          break;
        case age >= 50 && age <= 59:
          statusPoints = statusPoints + 55;
          break;
        case age >= 60 && age <= 69:
          statusPoints = statusPoints + 75;
          break;
        case age >= 70 && age <= 79:
          statusPoints = statusPoints + 90;
          break;
        case age >= 80:
          statusPoints = statusPoints + 100;
          break;
        default:
          break;
      }

      if (gender === "male") {
        statusPoints = statusPoints + 10;
      }

      // Calculate Proportions points
      const BMI = Math.round(
        proportions.weight / ((proportions.height * proportions.height) / 10000)
      );

      switch (true) {
        case BMI >= 25 && BMI <= 29:
          statusPoints = statusPoints + 30;
          break;
        case BMI >= 30 && BMI <= 39:
          statusPoints = statusPoints + 40;
          break;
        case BMI >= 40:
          statusPoints = statusPoints + 60;
          break;
        default:
          break;
      }

      // Calculate Symptoms Points
      if (symptoms.caught) symptomsPoints = symptomsPoints + 35;
      if (symptoms.fever) symptomsPoints = symptomsPoints + 35;
      if (symptoms.shortness) symptomsPoints = symptomsPoints + 40;
      if (symptoms.soreThroat) symptomsPoints = symptomsPoints + 15;
      if (symptoms.diarrhea) symptomsPoints = symptomsPoints + 10;
      if (symptoms.losingSmellAndTaste) symptomsPoints = symptomsPoints + 10;

      // Calculate Body Temperature Points
      switch (temp) {
        case 37:
          symptomsPoints = symptomsPoints + 20;
          break;
        case 38:
          symptomsPoints = symptomsPoints + 40;
          break;
        case 39:
          symptomsPoints = symptomsPoints + 60;
          break;
        case 40:
          symptomsPoints = symptomsPoints + 80;
          break;
      }

      // Calculate Diseases Points
      if (diseases.lungDisease) statusPoints = statusPoints + 60;
      if (diseases.heartDisease) statusPoints = statusPoints + 60;
      if (diseases.diabetes) statusPoints = statusPoints + 50;
      if (diseases.kidneyDisease) statusPoints = statusPoints + 40;
      if (diseases.liverDisease) statusPoints = statusPoints + 40;

      showResult(statusPoints, symptomsPoints);
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
        <Text style={styles.appHeader}>Corona Checker </Text>
      </View>
      {/* Message on invalid inputs */}
      {!isValid && (
        <View style={styles.message}>
          <Text style={{ color: "#fff", textAlign: "center" }}>
            Please, enter valid inputs
          </Text>
        </View>
      )}
      <View style={styles.sectionWrapper}>
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
                  setDiseases({
                    ...diseases,
                    lungDisease: !diseases.lungDisease,
                  })
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
                value={diseases.diabetes}
                onValueChange={() =>
                  setDiseases({ ...diseases, diabetes: !diseases.diabetes })
                }
              />
              <Text>Diabetes</Text>
            </View>
            <View style={styles.checkBox}>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                ios_backgroundColor="#3e3e3e"
                title="Chronic kidney disease"
                value={diseases.kidneyDisease}
                onValueChange={() =>
                  setDiseases({
                    ...diseases,
                    kidneyDisease: !diseases.kidneyDisease,
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
      </View>

      <View style={styles.sectionWrapper}>
        {/* Symptoms */}
        <View style={{ ...styles.row, ...styles.checkBoxesWrapper }}>
          <Text style={{ ...styles.header, ...styles.checkBoxHeader }}>
            Symptoms
          </Text>
          <View style={styles.checkBoxes}>
            <View style={styles.checkBox}>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                ios_backgroundColor="#3e3e3e"
                title="Caught"
                value={symptoms.caught}
                onValueChange={() =>
                  setSymptoms({ ...symptoms, caught: !symptoms.caught })
                }
              />
              <Text>Caught</Text>
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
    borderColor: "black",
    borderBottomWidth: 1,
    borderRadius: 10,
    alignSelf: "center",
  },
  sectionWrapper: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
