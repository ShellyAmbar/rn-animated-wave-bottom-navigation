import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import TabBar from "./tab-bar/tab-bar";
import {Text, View} from "react-native";

const Tab = createBottomTabNavigator();

const Screen1 = () => {
  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <Text>Page 1</Text>
    </View>
  );
};
const Screen2 = () => {
  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <Text>Page 2</Text>
    </View>
  );
};
const Screen3 = () => {
  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <Text>Page 3</Text>
    </View>
  );
};
const Screen4 = () => {
  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <Text>Page 4</Text>
    </View>
  );
};
const Screen5 = () => {
  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <Text>Page 5</Text>
    </View>
  );
};

const AnimatedWaveBottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props) => (
        <TabBar
          {...props}
          numOfTabs={5}
          icons={["home", "shopping-bag", "star", "star", "star"]}
        />
      )}
    >
      <Tab.Group
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen
          options={{tabBarLabel: "Screen1"}}
          name="Screen1"
          component={Screen1}
        />
        <Tab.Screen
          options={{tabBarLabel: "Screen2"}}
          name="Screen2"
          component={Screen2}
        />
        <Tab.Screen
          options={{tabBarLabel: "Screen3"}}
          name="Screen3"
          component={Screen3}
        />
        <Tab.Screen
          options={{tabBarLabel: "Screen4"}}
          name="Screen4"
          component={Screen4}
        />
        <Tab.Screen
          options={{tabBarLabel: "Screen5"}}
          name="Screen5"
          component={Screen5}
        />
      </Tab.Group>
    </Tab.Navigator>
  );
};

export default AnimatedWaveBottomTab;
