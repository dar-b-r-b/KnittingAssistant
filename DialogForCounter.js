import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import { theme } from "./theme";

export function DialogWindow({
  step,
  setStep,
  visible,
  hideDialog,
  message,
  setMessage,
  repeat,
  setRepeat,
  setValues,
}) {
  const _onPressOK = () => {
    if (message === "" || step === 0 || repeat === 0) {
      alert("Заполните все поля");
    } else {
      console.log(step, message, repeat);
      setValues(Array.from({ length: repeat }, (_, i) => (i + 1) * step - 1));
      hideDialog();
      setStep(0);
      setRepeat(0);
    }
  };

  const _onPressCancel = () => {
    hideDialog();
    setStep(0);
    setRepeat(0);
    setMessage("");
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
            onChangeText={(text) => setMessage(text)}
            mode="outlined"
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
