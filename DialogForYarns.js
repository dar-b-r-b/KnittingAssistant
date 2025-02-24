import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import { theme } from "./theme";
import { useState } from "react";
import { v4 as uuid } from "uuid";

export function DialogWindow({ visible, hideDialog, yarns, setYarns }) {
  const [name, setName] = useState("");
  const [compound, setCompound] = useState("");
  const [density, setDensity] = useState(0);
  const [color, setColor] = useState("");
  const [weight, setWeight] = useState(0);

  const _onPressOK = () => {
    if (
      name === "" ||
      compound === "" ||
      density === 0 ||
      color === "" ||
      weight === 0
    ) {
      alert("Заполните все поля");
    } else {
      setYarns([
        ...yarns,
        {
          id: uuid(),
          name: name,
          compound: compound,
          density: density,
          color: color,
          weight: weight,
        },
      ]);
      hideDialog();
    }
  };
  const _onPressCancel = () => {
    hideDialog();
  };
  const clearAllInputs = () => {
    setName("");
    setCompound("");
    setColor("");
    setDensity(0);
    setWeight(0);
  };
  return (
    <Portal theme={theme}>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Введите данные</Dialog.Title>
        <Dialog.Content>
          <TextInput
            label="Название"
            onChangeText={(text) => setName(text)}
            mode="outlined"
          />
          <TextInput
            label="Состав"
            onChangeText={(text) => setCompound(text)}
            mode="outlined"
          />
          <TextInput
            label="Плотность"
            keyboardType="numeric"
            onChangeText={(text) => setDensity(+text)}
            mode="outlined"
          />
          <TextInput
            label="Цвет"
            onChangeText={(text) => setColor(text)}
            mode="outlined"
          />
          <TextInput
            label="Вес"
            keyboardType="numeric"
            onChangeText={(text) => setWeight(+text)}
            mode="outlined"
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => {
              _onPressCancel();
              clearAllInputs();
            }}
          >
            Отмена
          </Button>
          <Button
            onPress={() => {
              _onPressOK();
              clearAllInputs();
            }}
          >
            OK
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
