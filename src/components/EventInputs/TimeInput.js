import React, {useEffect, useState} from 'react';
import {eventData} from '../../../App';
import DateTimePicker from '@react-native-community/datetimepicker';
import DefaultInputButton from './components/DefaultInputButton';
import DateTimeLineItem from '../DateTimeLineItem';
import Colors from '../../../constants/Colors';
import {View, Platform, Modal} from 'react-native';
import InputModalContainer from '../containers/InputModalContainer';

const ChooseTime = ({
  id,
  Modal,
  modalProps,
  questionText,
  showAndroidClock,
  setShowAndroidClock,
}) => {
  const [time, setTime] = useState(+eventData()?.[id] || new Date());

  const onNext = (androidTime) => {
    console.log('Android time ', androidTime);
    eventData({
      ...eventData(),
      [id]: androidTime || time,
    });
    setModalVisible(false);
  };

  if (Platform.OS === 'ios') {
    return (
      <Modal {...modalProps} onNext={onNext} title={questionText}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 218,
              height: 64,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 40,
              backgroundColor: '#fff',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 0.08,
              shadowRadius: 6,

              elevation: 3,
            }}>
            <DateTimePicker
              value={time}
              minuteInterval={5}
              mode="time"
              display="inline"
              onChange={(_, newDateString) => {
                console.log(newDateString);
                // const date = new Date(newDateString);
                // if (!isNaN(date.valueOf())) {
                //   setTime(date);
                // }
              }}
              textColor={Colors.orange}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </View>
        </View>
      </Modal>
    );
  }
  return showAndroidClock ? (
    <DateTimePicker
      value={time}
      minuteInterval={5}
      mode="time"
      display="default"
      onChange={(_, newDateString) => {
        console.log('Date string ', newDateString);
        nextView(new Date(newDateString));
        setShowAndroidClock(false);
      }}
      textColor={Colors.orange}
      style={{flex: 1}}
    />
  ) : null;
};

export default {
  InitialButton: DefaultInputButton,
  EditingComponent: ChooseTime,
  CompletedComponent: (props) => <DateTimeLineItem {...props} format="time" />,
};
