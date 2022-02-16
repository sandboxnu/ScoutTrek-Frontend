import {Image} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import CalendarNav from './CalendarNavigator';
import ProfileScreen from '../profile/ProfileScreen';
import CalendarScreen from '../calendar/CalendarView';

import {Icon, Text, Avatar, Container} from 'ScoutDesign/library';
import {home, calendar, notifications} from 'ScoutDesign/icons';

import UpcomingEvents from '../home/UpcomingEvents';

const HomeStack = createStackNavigator();

const HomeNav = ({navigation}) => {
  return (
    <HomeStack.Navigator
      screenOptions={() => ({
        headerTitle: () => (
          <Container paddingVertical="none">
            <Text weight="bold">ScoutTrek</Text>
          </Container>
        ),
        headerRight: () => (
          <Container paddingVertical="none">
            <Icon
              icon={notifications}
              color="informationDark"
              size="m"
              onPress={() => {}}
            />
          </Container>
        ),
      })}>
      <HomeStack.Screen name="Home" component={UpcomingEvents} />
    </HomeStack.Navigator>
  );
};

// Global Styles
const MainBottomTab = createBottomTabNavigator();

// Icons
const homeDark = require('../../../assets/images/tabbar/homeDark.png');
const calendarDark = require('../../../assets/images/tabbar/calendarDark.png');

const MainBottomTabNavigator = () => {
  return (
    <MainBottomTab.Navigator screenOptions={MainBottomTabConfig}>
      <MainBottomTab.Screen
        options={{tabBarLabel: 'Home'}}
        name="UpcomingEvents"
        component={HomeNav}
      />
      <MainBottomTab.Screen name="Calendar" component={CalendarScreen} />
      <MainBottomTab.Screen name="Profile" component={ProfileScreen} />
    </MainBottomTab.Navigator>
  );
};

const MainBottomTabConfig = ({route}) => ({
  headerShown: false,
  tabBarShowLabel: false,
  tabBarIcon: ({focused}: {focused: boolean}) => {
    const size = 23;
    switch (route.name) {
      case 'UpcomingEvents':
        return focused ? (
          <Image source={homeDark} style={{width: size, height: size}} />
        ) : (
          <Icon icon={home} color="brandPrimary" size="m" />
        );
      case 'Calendar':
        return focused ? (
          <Image source={calendarDark} style={{width: size, height: size}} />
        ) : (
          <Icon icon={calendar} color="interactiveDark" size="m" />
        );
      case 'Profile':
        return (
          <Avatar
            size="m"
            source={{
              uri: 'https://picsum.photos/28',
            }}
          />
        );
      default:
        return null;
    }
  },
});

export default MainBottomTabNavigator;
