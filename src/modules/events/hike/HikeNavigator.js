import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ChooseLocationView from '../eventComponents/ChooseLocation';
import ChooseMeetPoint from '../eventComponents/ChooseMeetPoint';
import HikeDetails from '../eventComponents/HikeDetails';

const HikeStack = createStackNavigator();

const HikeStackNavigator = () => {
  return (
    <HikeStack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}>
      <HikeStack.Screen name="HikeDetails" component={HikeDetails} />
      <HikeStack.Screen
        name="ChooseLocation"
        component={ChooseLocationView}
        initialParams={{
          placeholder: 'Where do you want to hike?',
          nextView: 'ChooseMeetPoint',
        }}
      />
      <HikeStack.Screen
        name="ChooseMeetPoint"
        component={ChooseLocationView}
        initialParams={{
          placeholder: 'Where should everyone meet?',
          nextView: 'HikeDetails',
        }}
      />
    </HikeStack.Navigator>
  );
};

export default HikeStackNavigator;
