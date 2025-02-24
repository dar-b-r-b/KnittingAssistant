import { Button, PaperProvider, Card } from "react-native-paper";
import { styles } from "./styles";
import { Image, View } from "react-native";
import { theme } from "./theme";

export function Home({ navigation }) {
  const sections = [
    {
      name: "Счетчик",
      cover: require("./assets/counter.png"),
      link: function () {
        navigation.navigate("Счетчик");
      },
    },
    {
      name: "Калькулятор",
      cover: require("./assets/calc.png"),
      link: function () {
        navigation.navigate("Калькулятор");
      },
    },
    {
      name: "Инструменты",
      cover: require("./assets/needles.png"),
      link: function () {
        navigation.navigate("Инструменты");
      },
    },
    {
      name: "Пряжа",
      cover: require("./assets/yarns.png"),
      link: function () {
        navigation.navigate("Пряжа");
      },
    },
  ];
  return (
    <PaperProvider theme={theme}>
      <View style={styles.containerForCards}>
        {sections.map((s) => {
          return (
            <Card style={styles.card} key={s.name}>
              <Image style={styles.cardImage} source={s.cover} />
              <Button
                mode="text"
                style={styles.buttonNavigate}
                labelStyle={styles.textInButtonNavigate}
                onPress={s.link}
              >
                {s.name}
              </Button>
            </Card>
          );
        })}
      </View>
    </PaperProvider>
  );
}
