import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";
//import { styles } from "./styles";
import { theme } from "./theme";
import { useState } from "react";
import { v4 as uuid } from "uuid";

export function DialogWindow({
  visible,
  hideDialog,
  needles,
  setNeedles,
  hooks,
  setHooks,
  cables,
  setCables,
}) {
  const options = [
    { label: "Спицы", value: "спицы" },
    { label: "Крючок", value: "крючок" },
    { label: "Леска", value: "леска" },
  ];
  const [category, setCategory] = useState("");
  const [size, setSize] = useState(0);
  const [length, setLength] = useState(0);
  const [typeOfNeedle, setTypeOfNeedle] = useState("");

  const firstCharToUpperCase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const _onPressOK = () => {
    switch (category) {
      case "спицы":
        if (size === 0 || length === 0) {
          alert("Заполните все поля");
        } else {
          setNeedles([
            ...needles,
            {
              id: uuid(),
              name: category,
              size: size,
              length: length,
              type: typeOfNeedle,
            },
          ]);
        }
        break;

      case "крючок":
        if (size === 0) {
          alert("Заполните все поля");
        } else {
          setHooks([
            ...hooks,
            { id: uuid(), name: firstCharToUpperCase(category), size: size },
          ]);
        }
        break;
      case "леска":
        if (length === 0) {
          alert("Заполните все поля");
        } else {
          setCables([
            ...cables,
            {
              id: uuid(),
              name: firstCharToUpperCase(category),
              length: length,
            },
          ]);
        }
        break;
    }

    hideDialog();
  };

  const _onPressCancel = () => {
    hideDialog();
  };
  const clearAllInputs = () => {
    setCategory("");
    setLength(0);
    setSize(0);
    setTypeOfNeedle("");
  };
  return (
    <Portal theme={theme}>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Введите данные</Dialog.Title>
        <Dialog.Content>
          <Dropdown
            label="Тип инструмента"
            placeholder="Тип инструмента"
            options={options}
            value={category}
            onSelect={setCategory}
            mode="outlined"
          />
          <TextInput
            label="Размер"
            keyboardType="numeric"
            onChangeText={(text) => setSize(+text)}
            mode="outlined"
            disabled={category === "леска" ? true : false}
          />
          <TextInput
            label="Длина"
            keyboardType="numeric"
            onChangeText={(text) => setLength(+text)}
            mode="outlined"
            disabled={category === "крючок" ? true : false}
          />
          <TextInput
            label="Тип спиц"
            onChangeText={(text) => setTypeOfNeedle(text)}
            mode="outlined"
            disabled={category === "спицы" ? false : true}
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
