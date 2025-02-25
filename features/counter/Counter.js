import { useState, useEffect } from "react";
import { View } from "react-native";
import { PaperProvider, Button, Text } from "react-native-paper";
import { styles } from "../../styles";
import { DialogWindow } from "./DialogForCounter";
import { theme } from "../../theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset } from "./counterSlice";
import { close } from "./dialogForCounterSlice";

export function Counter() {
  const count = useSelector((state) => state.counter.value);
  const message = useSelector((state) => state.dialogForCounter.message);
  const values = useSelector((state) => state.dialogForCounter.values);
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  //const [isInit, setIsInit] = useState(false);

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
            onPress={() => (count === 0 ? "disabled" : dispatch(decrement()))}
          ></Button>
          <Button
            icon="plus"
            mode="contained"
            style={styles.button}
            labelStyle={styles.icon}
            onPress={() => dispatch(increment())}
          ></Button>
        </View>
        <Button
          mode="contained"
          style={styles.resetButton}
          labelStyle={styles.textInButton}
          onPress={() => {
            dispatch(reset());
            dispatch(close());
          }}
        >
          Сброс
        </Button>
        <Button
          labelStyle={styles.textInButton}
          mode="contained"
          onPress={() => {
            showDialog();
            dispatch(reset());
          }}
        >
          Задать новый интервал
        </Button>
        <DialogWindow visible={visible} hideDialog={hideDialog} />
      </View>
    </PaperProvider>
  );
}
