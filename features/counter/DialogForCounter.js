import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import { theme } from "../../theme";
import { useDispatch } from "react-redux";
import { save, close } from "./dialogForCounterSlice";
import { useState } from "react";

export function DialogWindow({ visible, hideDialog }) {
  const dispatch = useDispatch();
  const [step, setStep] = useState(0);
  const [repeat, setRepeat] = useState(0);
  const [message, setMessage] = useState("");

  const _onPressOK = () => {
    if (message === "" || step === 0 || repeat === 0) {
      alert("Заполните все поля");
    } else {
      dispatch(save({ step, repeat, message }));
      hideDialog();
    }
  };

  const _onPressCancel = () => {
    dispatch(close());
    hideDialog();
  };
  return (
    <Portal theme={theme}>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Введите данные</Dialog.Title>
        <Dialog.Content>
          <TextInput
            label="Интервал"
            keyboardType="numeric"
            onChangeText={(text) => setStep(+text)}
            mode="outlined"
          />
          <TextInput
            label="Количество повторений"
            keyboardType="numeric"
            onChangeText={(text) => setRepeat(+text)}
            mode="outlined"
          />
          <TextInput
            label="Сообщение"
            mode="outlined"
            onChangeText={(text) => setMessage(text)}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={_onPressCancel}>Отмена</Button>
          <Button onPress={_onPressOK}>OK</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
