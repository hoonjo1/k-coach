import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");

export const logUserIn = async (token) => {
  await AsyncStorage.multiSet([
    ["token", token],
    ["loggedIn", "yes"],
  ]);
  isLoggedInVar(true);
  tokenVar(token);
};

export const logUserOut = async () => {
  await AsyncStorage.clear();
  isLoggedInVar(false);
};

const client = new ApolloClient({
  uri: "https://graphql.kjbus-group.com/",
  // uri: "http://88c6ee5ef4d0.ngrok.io",
  cache: new InMemoryCache(),
});

export default client;
