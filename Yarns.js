import { ScrollView, View } from "react-native";
import { PaperProvider, List, Button, Searchbar } from "react-native-paper";
import { styles } from "./styles";
import { theme } from "./theme";
import { useState, useEffect } from "react";
import { DialogWindow } from "./DialogForYarns";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Yarns() {
  const [yarns, setYarns] = useState([]);
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const [isInit, setIsInit] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("yarns-data");
      if (jsonValue === null) {
        const initYarns = [
          {
            id: "c79fc924-3feb-4c93-829b-f58d3fa04c4e",
            name: "Paola",
            density: "750",
            weight: "800",
            color: "красновато-коричневый",
            compound: "80% шерсть 20% п/а ",
          },
          {
            id: "d84fc924-3feb-4c93-029b-f58d6fa04c4e",
            name: "Alize Superwash Artisan",
            density: "420",
            weight: "100",
            color: "розовый",
            compound: "75% шерсть 25% п/а",
          },
        ];
        await AsyncStorage.setItem("yarns-data", JSON.stringify(initYarns));
        setYarns(initYarns);
      } else {
        const data = JSON.parse(jsonValue);
        setYarns(data);
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
    try {
      const jsonValue = JSON.stringify(yarns);
      await AsyncStorage.setItem("yarns-data", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (isInit) {
      storeData();
    }
  }, [yarns]);

  const deleteYarns = (yarnId) => {
    setYarns(yarns.filter((el) => el.id !== yarnId));
  };

  return (
    <PaperProvider theme={theme}>
      <Searchbar
        style={styles.searchbar}
        placeholder="Найти"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <ScrollView>
        {yarns
          .filter(
            (y) =>
              !searchQuery ||
              `${y.compound}|${y.density}`
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
          )
          .map((y) => {
            return (
              <View key={y.id} style={styles.containerForListItem}>
                <List.Item
                  style={styles.listItem}
                  title={`${y.name}, ${y.compound}`}
                  description={`${y.density} м/100 гр, ${y.color}, ${y.weight} гр`}
                  titleNumberOfLines={null}
                ></List.Item>
                <Button
                  icon="delete"
                  onPress={() => deleteYarns(y.id)}
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
          Добавить пряжу
        </Button>
        <DialogWindow
          visible={visible}
          hideDialog={hideDialog}
          yarns={yarns}
          setYarns={setYarns}
        ></DialogWindow>
      </View>
    </PaperProvider>
  );
}
