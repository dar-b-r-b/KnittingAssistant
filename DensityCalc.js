import { useState } from "react";
import { styles } from "./styles";
import { View, Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import { PaperProvider, TextInput, Text, Button } from "react-native-paper";
import { theme } from "./theme";

export function DensityCalc() {
  const [yarns, setYarns] = useState([
    { id: 1, name: `Нить 1`, length: null, weight: null },
    { id: 2, name: `Нить 2`, length: null, weight: null },
    { id: 3, name: `Нить 3`, length: null, weight: null },
  ]);

  const [result, setResult] = useState(0);
  const _calcDensity = ([
    { weight: weight1, length: length1 },
    { weight: weight2, length: length2 },
    { weight: weight3, length: length3 },
  ]) => {
    let coef1 = 100 / weight1;
    let coef2 = 100 / weight2;

    if (weight3 === null && length3 === null) {
      return Math.ceil(
        (length1 * coef1 * length2 * coef2) /
          (length1 * coef1 + length2 * coef2)
      );
    }
    let coef3 = 100 / weight3;
    return Math.ceil(
      (length1 * coef1 * length2 * coef2 * length3 * coef3) /
        (length1 * coef1 * length2 * coef2 +
          length2 * coef2 * length3 * coef3 +
          length1 * coef1 * length3 * coef3)
    );
  };

  const _clearFields = () => {
    setYarns(
      yarns.map((y) => ({
        ...y,
        length: null,
        weight: null,
      }))
    );
    setResult(0);
  };

  return (
    <PaperProvider theme={theme}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {yarns.map((y) => {
          return (
            <View key={y.id}>
              <Text style={styles.label}>{y.name}</Text>
              <View style={styles.containerForInputs}>
                <TextInput
                  style={styles.input}
                  label="м"
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    y.length = +text;
                    setYarns([...yarns]);
                  }}
                  mode="outlined"
                />

                <TextInput
                  style={styles.input}
                  label="гр"
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    y.weight = +text;
                    setYarns([...yarns]);
                  }}
                  mode="outlined"
                />
              </View>
            </View>
          );
        })}
        <Text variant="headlineMedium" style={styles.resultText}>
          {result ? `Итоговая плотность нити ${result} м в 100 гр` : null}
        </Text>
        <View style={styles.containerForButton}>
          <Button
            style={styles.buttonCalc}
            labelStyle={styles.textInButton}
            mode="contained"
            onPress={() => {
              setResult(_calcDensity(yarns));
              Keyboard.dismiss();
            }}
          >
            Расчитать
          </Button>
          <Button
            style={styles.buttonCalc}
            labelStyle={styles.textInButton}
            mode="contained"
            onPress={_clearFields}
          >
            Очистить поля
          </Button>
        </View>
      </KeyboardAvoidingView>
    </PaperProvider>
  );
}
