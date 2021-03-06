import React, {useState, useEffect} from 'react';
import {StyleSheet, useColorScheme, Image, View, Text, SafeAreaView} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack"
import {
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs"

import Loading from '../screens/Loading';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Home from '~/component/Home/Home/Home';
import Chart from '~/component/Chart/Chart';
import None from '~/component/Book/Book/None';
import Find from '~/component/Find/Find/Find';
import Mine from '~/component/Mine/Mine/Mine';
import Book from "~/component/Book/Book/Book"
import BookDetail from '~/component/Book/BookDetail/BookDetail';
import FindDetail from '~/component/Find/FindDetail/FindDetail';
import Badge from '~/component/Mine/Badge/Badge';
import Category from '~/component/Mine/Category/Category';
import About from '~/component/Mine/About/About';
import Timing from '~/component/Mine/Timing/Timing';
import Login from '~/component/Login/Login/Login/Login';
import Login2 from '~/component/Login/Login/Login2/Login2';
import Register from '~/component/Login/Register/Register';
import Register2 from '~/component/Login/Register/Register2';
import Register3 from '~/component/Login/Register/Register3';
import ACate from '~/component/Mine/ACate/ACate';

const styles = StyleSheet.create({
  normalItem: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: SCREEN_WIDTH / 5,
    marginBottom: 6,
  },
  normalIcon: {
    width: countcoordinatesX(50),
    height: countcoordinatesX(50),
  },
  normalName: {
    marginTop: 2,
    fontSize: FONT_SIZE(8),
    fontWeight: '100',
    color: kColor_Text_Black,
  },
  selectItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH / 5,
    marginTop: 6,
  },
  selectIcon: {
    width: countcoordinatesX(140),
    height: countcoordinatesX(140),
  },
  selectName: {
    marginTop: 2,
    fontSize: FONT_SIZE(8),
    fontWeight: '100',
    color: kColor_Text_Black,
  },
});
const tabbar_detail_n = require('~/assets/image/tabbar_detail_n.png');
const tabbar_detail_s = require('~/assets/image/tabbar_detail_s.png');
const tabbar_chart_n = require('~/assets/image/tabbar_chart_n.png');
const tabbar_chart_s = require('~/assets/image/tabbar_chart_s.png');
const tabbar_add_n = require('~/assets/image/tabbar_add_n.png');
const tabbar_add_h = require('~/assets/image/tabbar_add_h.png');
const tabbar_discover_n = require('~/assets/image/tabbar_discover_n.png');
const tabbar_discover_s = require('~/assets/image/tabbar_discover_s.png');
const tabbar_mine_n = require('~/assets/image/tabbar_mine_n.png');
const tabbar_mine_s = require('~/assets/image/tabbar_mine_s.png');
// ????????????
const navigationTitle = index => {
  if (index == 0) {
    return '??????';
  } else if (index == 1) {
    return '??????';
  } else if (index == 2) {
    return '??????';
  } else if (index == 3) {
    return '??????';
  } else if (index == 4) {
    return '??????';
  }
};
// ????????????
const navigationImage = index => {
  if (index == 0) {
    return [tabbar_detail_n, tabbar_detail_s];
  } else if (index == 1) {
    return [tabbar_chart_n, tabbar_chart_s];
  } else if (index == 2) {
    return [tabbar_add_n, tabbar_add_h];
  } else if (index == 3) {
    return [tabbar_discover_n, tabbar_discover_s];
  } else if (index == 4) {
    return [tabbar_mine_n, tabbar_mine_s];
  }
};
// ?????????????????????
const navigationOptions = () => ({
  header: null,
});

const AuthStack = createNativeStackNavigator();

const NormalStack = createNativeStackNavigator();
const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="SignIn" component={SignIn} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
    </AuthStack.Navigator>
  );
};
const NormalStackScreen = () => {
  return (
    <NormalStack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {backgroundColor: "#ffd944"},
        cardOverlayEnabled: true
      }}>
      <NormalStack.Screen
        name="AppTabsScreen"
        screenOptions={{headerStyle: {backgroundColor: "#ffd944"}}}
        component={AppTabsScreen}></NormalStack.Screen>
      <NormalStack.Screen
        name="Book"
        screenOptions={({navigation}) => ({
          mode: "modal",
        })}
        component={Book}></NormalStack.Screen>
      <NormalStack.Screen
        name="BookDetail"
        screenOptions={{headerStyle: {backgroundColor: "#ffd944"}}}
        component={BookDetail}></NormalStack.Screen>
      <NormalStack.Screen name="Badge" component={Badge}></NormalStack.Screen>
      <NormalStack.Screen
        name="Category"
        component={Category}></NormalStack.Screen>
      <NormalStack.Screen name="ACate" component={ACate}></NormalStack.Screen>
      <NormalStack.Screen name="Timing" component={Timing}></NormalStack.Screen>
      <NormalStack.Screen name="Login" component={Login}></NormalStack.Screen>
      <NormalStack.Screen name="Login2" component={Login2}></NormalStack.Screen>
      <NormalStack.Screen
        name="Register"
        component={Register}></NormalStack.Screen>
      <NormalStack.Screen
        name="Register2"
        component={Register2}></NormalStack.Screen>
      <NormalStack.Screen
        name="FindDetail"
        component={FindDetail}></NormalStack.Screen>
      <NormalStack.Screen
        name="Register3"
        component={Register3}></NormalStack.Screen>
      <NormalStack.Screen name="About" component={About}></NormalStack.Screen>
    </NormalStack.Navigator>
  )
}
const defaultNavigationOptions = index => ({
  tabBarLabel: index === 2 ? '' : navigationTitle(index),
  mode: index === 2 ? "modal" : '',
  headerShown: false,
  screenOptions: {headerStyle: {backgroundColor: "#ffd944"}},
  tabBarIcon: ({tintColor, focused}) => {
    images = navigationImage(index)
    title = navigationTitle(index)
    if (index != 2) {
      return (
        <View style={styles.normalItem}>
          <Image
            style={styles.normalIcon}
            source={focused == true ? images[1] : images[0]}
          />
          {/* <Text style={styles.normalName}>{title}</Text> [tabbar_detail_n, tabbar_detail_s] */}
        </View>
      )
    } else {
      return (
        <View style={styles.selectItem}>
          <Image
            style={styles.selectIcon}
            source={focused == true ? images[1] : images[0]}
          />
          {/* <Text style={styles.selectName}>{title}</Text> */}
        </View>
      )
    }
  },
})
const AppTabs = createBottomTabNavigator();
function onPress () {
  console.log("onPress")
}
export const AppTabsScreen = () => {
  return (
    <AppTabs.Navigator
     initialRouteName="Home" 
     >
      <AppTabs.Screen
        name="Home"
        component={Home}
        initialRouteName="Home"
        options={defaultNavigationOptions(0)}
      />
      <AppTabs.Screen
        name="Chart"
        tabBarLabel="??????"
        initialRouteName="Chart"
        component={Chart}
        options={defaultNavigationOptions(1)}
      />
      <AppTabs.Screen
        name="None"
        initialRouteName="None"
        tabBarLabel="??????"
        listeners={({ navigation, route }) => ({
          tabPress: e => {
            // Prevent default action
            console.log('test')
            e.preventDefault()
            navigation.navigate("Book", {mode: "modal"})
          }
        })}
        component={None}
        options={defaultNavigationOptions(2)}
      />
      <AppTabs.Screen
        name="Find"
        initialRouteName="Find"
        tabBarLabel="??????"
        component={Find}
        options={({route, navigation}) => defaultNavigationOptions(3)}
      />
      <AppTabs.Screen
        name="Mine"
        initialRouteName="Mine"
        tabBarLabel="??????"
        component={Mine}
        options={defaultNavigationOptions(4)}
      />
    </AppTabs.Navigator>
  )
};

export const AppNavigator = () => {
  const colorScheme = useColorScheme();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(!isLoading);
      setUser({'user': 'leehave'});
    }, 500);
  }, []);

  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {isLoading ? (
        <Loading />
      ) : user ? (
        <>
          {/* <AppTabsScreen /> */}
          <NormalStackScreen />
        </>
      ) : (
        <AuthStackScreen />
      )}
    </NavigationContainer>
  );
};
