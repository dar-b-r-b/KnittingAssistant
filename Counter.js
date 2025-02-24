import { useState, useEffect } from "react";
import { View } from "react-native";
import { PaperProvider, Button, Text } from "react-native-paper";
import { styles } from "./styles";
import { DialogWindow } from "./DialogForCounter";
import { theme } from "./theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Counter() {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const [repeat, setRepeat] = useState(0);
  const [message, setMessage] = useState("");

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const [values, setValues] = useState([]);

  const [isInit, setIsInit] = useState(false);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("counter-data");
      if (jsonValue === null) {
        const initialDataForCounter = {
          count: 0,
          step: 0,
          repeat: 0,
          message: "",
          values: [],
        };
        await AsyncStorage.setItem(
          "counter-data",
          JSON.stringify(initialDataForCounter)
        );
        setCount(initialDataForCounter.count);
        setStep(initialDataForCounter.step);
        setRepeat(initialDataForCounter.repeat);
        setMessage(initialDataForCounter.message);
        setValues(initialDataForCounter.values);
      } else {
        const data = JSON.parse(jsonValue);
        setCount(data.count);
        setStep(data.step);
        setRepeat(data.repeat);
        setMessage(data.message);
        setValues(data.values);
      }

      setIsInit(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const storeData = async () => {
    const dataObj = { count, step, repeat, message, values };

    try {
      const jsonValue = JSON.stringify(dataObj);
      await AsyncStorage.setItem("counter-data", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (isInit) {
      storeData();
    }
  }, [count, step, repeat, message, values]);

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <Text variant="displaySmall" style={styles.textMessage}>
          {values.includes(count) ? message : null}
        </Text>

        <Text style={styles.textCount}>{count}</Text>

        <View style={styles.containerButton}>
          <Button
            icon="minus"
            mode="contained"
            style={styles.button}
            labelStyle={styles.icon}
            onPress={() => (count === 0 ? "disabled" : setCount(count - 1))}
          ></Button>
          <Button
            icon="plus"
            mode="contained"
            style={styles.button}
            labelStyle={styles.icon}
            onPress={() => setCount(count + 1)}
          ></Button>
        </View>
        <Button
          mode="contained"
          style={styles.resetButton}
          labelStyle={styles.textInButton}
          onPress={() => setCount(0)}
        >
          Сброс
        </Button>
        <Button
          labelStyle={styles.textInButton}
          mode="contained"
          onPress={() => {
            showDialog();
            setCount(0);
          }}
        >
          Задать новый интервал
        </Button>
        <DialogWindow
          visible={visible}
          step={step}
          setStep={setStep}
          message={message}
          setMessage={setMessage}
          repeat={repeat}
          setRepeat={setRepeat}
          hideDialog={hideDialog}
          setValues={setValues}
        />
      </View>
    </PaperProvider>
  );
}
