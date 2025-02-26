import { useState, useEffect } from "react";
import { View } from "react-native";
import { PaperProvider, Button, Text } from "react-native-paper";
import { styles } from "../../styles";
import { DialogWindow } from "./DialogForCounter";
import { theme } from "../../theme";

import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  reset,
  close,
  loadCounterData,
} from "./counterSlice";

export function Counter() {
  const count = useSelector((state) => state.counter.count);
  const message = useSelector((state) => state.counter.message);
  const values = useSelector((state) => state.counter.values);
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(loadCounterData()).unwrap();
      } catch (error) {
        console.error("Failed to load counter data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

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
