import React, {useState} from 'react';
import moment from 'moment';
import {
  useEventForm,
  addEventFieldOfType,
} from 'CreateEvent/CreateEventFormStore';
import DefaultInputButton from './components/DefaultInputButton';
import DateTimeLineItem from './components/DateTimeLineItem';
import {CalendarList} from 'react-native-calendars';
import {EventInputProps} from './InputTypes';
import {ModalProps} from 'ScoutDesign/library/Widgets/Modal/Modal';
import EventInputTemplate from '../Inputs/EventInputTemplate';
import {ScreenContainer, Text} from 'ScoutDesign/library';
import {useModal} from 'ScoutDesign/library';
import Row from './Row';
import TapToEditContainer from './components/TapToEditContainer';


// Component Types
import TitleInput from './TitleInput';
import LocationInput from './LocationInput';
import DateInput from './DateInputCustom';
import TimeInput from './TimeInputCustom';
import DescriptionInput from './DescriptionInput';
import NumberSliderInput from './NumberSliderInput';
import OptionsInput from './OptionsInput';

const eventComponents = {
  shortText: TitleInput,
  location: LocationInput,
  date: DateInput,
  time: TimeInput,
  description: DescriptionInput,
  slider: NumberSliderInput,
  setting: OptionsInput,
};

const chooseInterval = ({id, Modal, modalProps, questionText}: EventInputProps) => {
  return <div>amazing interval input</div>;
}

// creates sample props to test date and time 
const sampleDateAndTimeProps = {
  fieldTypes: {
    0 : 'date', 
    1 : 'time', 
    2 : 'date', 
    3 : 'time',
  },
  ids: {
    0 : 'date', 
    1 : 'time', 
    2 : 'date', 
    3 : 'time',
  },
  fieldNames: {
    0 : "Start Date",
    1 : "Start Time",
    2 : "End Date", 
    3 : "End Time",
  },
  questionTexts: {
    0 : "What is the start date?",
    1 : "What is the start time?",
    2 : "What is the end date?",
    3 : "What is the end time?",
  }
}

// creates sample props arrays to test date and time 
const sampleDateAndTimeArrays = {
  fieldTypes: ['date-start', 'time-start', 'date-end', 'time'],
  ids: ['date1', 'time1', 'date2', 'time2'],
  fieldNames: [
    "Start Date",
    "Start Time",
    "End Date", 
    "End Time"
  ],
  questionTexts: [
    "What is the start date?",
    "What is the start time?",
    "What is the end date?",
    "What is the end time?",
  ]
}

// this component uses the DateInput and TimeInput components 
const DateAndTime = ({fieldTypes, ids, fieldNames, questionTexts}: EventInputTemplatePropsList) => {
  const [startDate, setStartDate] = useState("NOT SET YET");
  const [startTime, setStartTime] = useState("NOT SET YET");
  const [endDate, setEndDate] = useState("NOT SET YET");
  const [endTime, setEndTime] = useState("NOT SET YET");


  const CustomEventInputTemplate = ({fieldType, id, fieldName, questionText, payload}) => {
    var genericFieldType = '';
    if (fieldType == 'time-start' || fieldType == 'time-end') {
      genericFieldType = 'time';
    }
    else if (fieldType == 'date-start' || fieldType == 'date-end') {
      genericFieldType = 'date';
    }
    const {InitialButton, EditingComponent, CompletedComponent} = eventComponents[genericFieldType];
  
    const [{fields}] = useEventForm();
  
    const [showAndroidClock, setShowAndroidClock] = useState(false);
  
    const {modalProps, openModal, Modal} = useModal();
  
    switch(fieldType) {
      case 'time-start':
        return (
          <React.Fragment key={id}>
            <EditingComponent
              id={id}
              Modal={Modal}
              modalProps={modalProps}
              showAndroidClock={showAndroidClock}
              setShowAndroidClock={setShowAndroidClock}
              questionText={questionText}
              onPress={setStartTime}
            />
            <Row valid={!!fields?.[id]} fieldName={fieldName}>
              {!fields?.[id] ? (
                <InitialButton
                  onPress={() =>
                    Platform.OS === 'ios'
                      ? openModal()
                      : setShowAndroidClock(true)
                  }
                  fieldName={fieldName}
                />
              ) : (
                <TapToEditContainer
                  edit={() =>
                    Platform.OS === 'ios'
                      ? openModal()
                      : setShowAndroidClock(true)
                  }>
                  <CompletedComponent data={+fields?.[id]} />
                </TapToEditContainer>
              )}
            </Row>
          </React.Fragment>
        );
      case 'date-start':
        return (
          <React.Fragment key={id}>
            <EditingComponent
              id={id}
              Modal={Modal}
              modalProps={modalProps}
              questionText={questionText}
              onPress={setStartDate}
            />
            <Row valid={!!fields?.[id]} fieldName={fieldName}>
              {!fields?.[id] ? (
                <InitialButton onPress={openModal} fieldName={fieldName} />
              ) : (
                <TapToEditContainer edit={openModal}>
                  <CompletedComponent data={+fields?.[id]} />
                </TapToEditContainer>
              )}
            </Row>
          </React.Fragment>
        );
        case 'time-end':
        return (
          <React.Fragment key={id}>
            <EditingComponent
              id={id}
              Modal={Modal}
              modalProps={modalProps}
              showAndroidClock={showAndroidClock}
              setShowAndroidClock={setShowAndroidClock}
              questionText={questionText}
              onPress={setEndTime}
            />
            <Row valid={!!fields?.[id]} fieldName={fieldName}>
              {!fields?.[id] ? (
                <InitialButton
                  onPress={() =>
                    Platform.OS === 'ios'
                      ? openModal()
                      : setShowAndroidClock(true)
                  }
                  fieldName={fieldName}
                />
              ) : (
                <TapToEditContainer
                  edit={() =>
                    Platform.OS === 'ios'
                      ? openModal()
                      : setShowAndroidClock(true)
                  }>
                  <CompletedComponent data={+fields?.[id]} />
                </TapToEditContainer>
              )}
            </Row>
          </React.Fragment>
        );
      case 'date-end':
        return (
          <React.Fragment key={id}>
            <EditingComponent
              id={id}
              Modal={Modal}
              modalProps={modalProps}
              questionText={questionText}
              onPress={setEndDate}
            />
            <Row valid={!!fields?.[id]} fieldName={fieldName}>
              {!fields?.[id] ? (
                <InitialButton onPress={openModal} fieldName={fieldName} />
              ) : (
                <TapToEditContainer edit={openModal}>
                  <CompletedComponent data={+fields?.[id]} />
                </TapToEditContainer>
              )}
            </Row>
          </React.Fragment>
        );
      default: 
        return (
          <Text>DEFAULT</Text>
        )
    }
  }

  return (
    <ScreenContainer>
      <CustomEventInputTemplate
        fieldType={fieldTypes[0]}
        key={ids[0]}
        id={ids[0]}
        fieldName={fieldNames[0]}
        questionText={questionTexts[0]}
        payload={null}
      />
      <CustomEventInputTemplate
        fieldType={fieldTypes[1]}
        key={ids[1]}
        id={ids[1]}
        fieldName={fieldNames[1]}
        questionText={questionTexts[1]}
        payload={null}
      />
      <CustomEventInputTemplate
        fieldType={fieldTypes[2]}
        key={ids[2]}
        id={ids[2]}
        fieldName={fieldNames[2]}
        questionText={questionTexts[2]}
        payload={null}
      />
      <EventInputTemplate
        fieldType={fieldTypes[3]}
        key={ids[3]}
        id={ids[3]}
        fieldName={fieldNames[3]}
        questionText={questionTexts[3]}
        payload={null}
      />

      <Text>
        Start Date: {startDate}
      </Text>
      <Text>
        Start Time: {startTime}
      </Text>
      <Text>
        End Date: {endDate}
      </Text>
      <Text>
        End Time: {endTime}
      </Text>
    </ScreenContainer>
  )
}

interface EventInputPropsList {
  ids: string[];
  Modals: React.FC<ModalProps>[];
  modalPropsList: ModalProps[];
  questionTexts: string[];
}

interface EventInputTemplatePropsList {
  fieldTypes: string[];
  ids: string[];
  fieldNames: string[];
  questionTexts: string[];
}

const IntervalInputScreen = () => {
  return (
    <DateAndTime 
      fieldTypes={sampleDateAndTimeArrays.fieldTypes} 
      ids={sampleDateAndTimeArrays.ids}
      fieldNames={sampleDateAndTimeArrays.fieldNames}
      questionTexts={sampleDateAndTimeArrays.questionTexts}/>
  )
}


export default IntervalInputScreen;