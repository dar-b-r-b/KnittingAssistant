import { List, PaperProvider, Divider, Button } from "react-native-paper";
import { ScrollView, View } from "react-native";
import { useState, useEffect } from "react";
import "react-native-get-random-values";
import { styles } from "./styles";
import { theme } from "./theme";
import { DialogWindow } from "./DialogForTools";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Tools() {
  const [needles, setNeedles] = useState([]);
  const [hooks, setHooks] = useState([]);
  const [cables, setCables] = useState([]);
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const [isInit, setIsInit] = useState(false);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("tools-data");
      if (jsonValue === null) {
        const initialData = {
          needles: [
            {
              id: "c89fc924-3feb-4c93-829b-f58d6fa04c4e",
              name: "спицы",
              size: "2",
              length: "100",
              type: "Круговые",
            },
          ],
          hooks: [
            {
              id: "20aa6309-b9be-4f3a-beb0-9f90873ffec7",
              name: "Крючок",
              size: "2",
            },
          ],
          cables: [
            {
              id: "ba796977-5859-49dc-b2fd-5fa124273ce1",
              name: "Леска",
              length: "60",
            },
          ],
        };
        await AsyncStorage.setItem("tools-data", JSON.stringify(initialData));
        setNeedles(initialData.needles);
        setHooks(initialData.hooks);
        setCables(initialData.cables);
      } else {
        const data = JSON.parse(jsonValue);
        //console.log(data);
        setNeedles(data.needles);
        setHooks(data.hooks);
        setCables(data.cables);
      }
      setIsInit(true);
    } catch (e) {
      console.log("Get data error", e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const storeData = async () => {
    const dataObj = { needles, hooks, cables };
    try {
      const jsonValue = JSON.stringify(dataObj);
      await AsyncStorage.setItem("tools-data", jsonValue);
      //console.log("saved");
    } catch (e) {
      console.log("Save error", e);
    }
  };

  useEffect(() => {
    if (isInit) {
      storeData();
    }
  }, [needles, hooks, cables]);

  const deleteTools = (setState, toolId) => {
    setState((state) => state.filter((el) => el.id !== toolId));
  };

  return (
    <PaperProvider theme={theme}>
      <ScrollView>
        <List.Subheader style={styles.subheader}>Спицы</List.Subheader>

        <Divider bold="true" />
        {needles.map((n) => {
          return (
            <View key={n.id} style={styles.containerForListItem}>
              <List.Item
                style={styles.listItem}
                title={`${n.type} ${n.name}`}
                description={`${n.size} мм ${n.length} см`}
              ></List.Item>
              <Button
                icon="delete"
                onPress={() => deleteTools(setNeedles, n.id)}
              ></Button>
            </View>
          );
        })}
        <List.Subheader style={styles.subheader}>Крючки</List.Subheader>
        <Divider bold="true" />
        {hooks.map((h) => {
          return (
            <View key={h.id} style={styles.containerForListItem}>
              <List.Item
                style={styles.listItem}
                title={h.name}
                description={`${h.size} мм`}
              ></List.Item>
              <Button
                icon="delete"
                onPress={() => deleteTools(setHooks, h.id)}
              ></Button>
            </View>
          );
        })}
        <List.Subheader style={styles.subheader}>Лески</List.Subheader>
        <Divider bold="true" />
        {cables.map((c) => {
          return (
            <View key={c.id} style={styles.containerForListItem}>
              <List.Item
                style={styles.listItem}
                title={c.name}
                description={`${c.length} см`}
              ></List.Item>
              <Button
                icon="delete"
                onPress={() => deleteTools(setCables, c.id)}
              ></Button>
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.addToolContainer}>
        <Button
          mode="contained"
          style={styles.addToolButton}
          labelStyle={styles.textInAddToolButton}
          onPress={() => {
            showDialog();
          }}
        >
          Добавить инструмент
        </Button>
        <DialogWindow
          visible={visible}
          hideDialog={hideDialog}
          hooks={hooks}
          setHooks={setHooks}
          needles={needles}
          setNeedles={setNeedles}
          cables={cables}
          setCables={setCables}
        />
      </View>
    </PaperProvider>
  );
}
