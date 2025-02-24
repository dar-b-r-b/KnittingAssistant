import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  //Counter.js
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  containerButton: {
    flexDirection: "row",
    marginBottom: 20,
  },
  textCount: {
    fontSize: 150,
    marginBottom: 20,
  },
  icon: {
    fontSize: 70,
    marginLeft: -10,
  },
  textMessage: {
    marginBottom: 30,
    fontSize: 32,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    width: 100,
    marginLeft: 20,
    marginRight: 20,
  },
  resetButton: {
    marginBottom: 20,
    width: 250,
  },

  //Home.js
  containerForCards: {
    flexDirection: "row",
    flexWrap: "wrap",
    height: 210,
    marginLeft: 5,
  },
  card: {
    flexDirection: "column",
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
    marginTop: 10,
    width: 190,
    marginLeft: 5,
  },
  buttonNavigate: {
    marginBottom: 20,
    marginRight: 20,
  },
  cardImage: {
    width: 130,
    height: 130,
    marginLeft: 30,
    marginTop: 10,
    marginBottom: 10,
    resizeMode: "contain",
    backgroundColor: "#FFFFFF",
  },
  textInButtonNavigate: {
    fontSize: 20,
  },

  //DensityCalc.js
  containerForButton: {
    position: "absolute",
    bottom: -300, // ???
    left: 0,
    right: 0,
    alignItems: "center",
  },
  containerForInputs: {
    flexDirection: "row",
    marginTop: 10,
  },
  label: {
    fontSize: 20,
    marginLeft: 20,
    marginTop: 20,
  },
  input: {
    marginLeft: 20,
    width: 120,
  },
  buttonCalc: {
    marginTop: 30,
    width: 240,
  },
  textInButton: {
    marginTop: 15,
    marginBottom: 15,
    fontSize: 18,
  },
  resultText: {
    marginTop: 60,
    marginLeft: 30,
    marginRight: 20,
  },
  //Tools.js
  subheader: {
    fontSize: 20,
    marginLeft: 10,
    fontWeight: "bold",
  },
  listItem: {
    paddingVertical: 2,
  },
  addToolContainer: {
    alignItems: "center",
  },
  addToolButton: {
    width: 240,
    marginBottom: 40,
  },
  textInAddToolButton: {
    marginTop: 15,
    marginBottom: 15,
    fontSize: 18,
  },
  containerForListItem: {
    flexDirection: "row",
    width: 360, // исправить, найти вариант гибкой ширины
  },
  searchbar: {
    width: 390,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
  },
});
