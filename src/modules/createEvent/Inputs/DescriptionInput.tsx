import {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'ScoutDesign/library';
import {LinearGradient} from 'expo-linear-gradient';
import Fonts from '../../../../constants/Fonts';
import Colors from '../../../../constants/Colors';
import {
  useEventForm,
  addEventFieldOfType,
} from 'CreateEvent/CreateEventFormStore';
import RichInputContainer from '../../../components/containers/RichInputContainer';
import RTE from '../../../components/RichTextEditor';
import PreviewTextBlock from '../../../components/PreviewTextBlock';
import InputModalContainer from '../../../components/containers/InputModalContainer';
import {EventInputProps} from './InputTypes';

const DescriptionInputButton = ({fieldName, onPress}) => {
  return (
    <View
      style={{
        marginHorizontal: 4,
        flex: 1,
      }}>
      <Text size="s" color="brandPrimaryDark">
        {fieldName.toUpperCase()}
      </Text>
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderBottomWidth: 2,
          borderColor: '#34A86C',
          marginVertical: 10,
          borderRadius: 1,
        }}>
        <LinearGradient
          colors={['rgba(104, 237, 180, 0.045)', 'rgba(23, 161, 101, 0.075)']}
          start={{x: 0.6, y: 0}}
          end={{x: 0.55, y: 1}}
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            flex: 1,
          }}>
          <Text size="l" padding="m" color="brandPrimaryDark">
            Add a description or any additional info...
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const DescriptionInput = ({
  id,
  Modal,
  modalProps,
  questionText,
}: EventInputProps) => {
  const [{fields}, dispatch] = useEventForm();
  const [description, setDescription] = useState(fields?.description || '');

  const nextForm = () => {
    dispatch(addEventFieldOfType(id, description));
  };

  return (
    <Modal {...modalProps} title={questionText} onNext={nextForm}>
      <RTE
        description={description}
        setDescription={setDescription}
        fullHeight
      />
    </Modal>
  );
};

export default {
  InitialButton: DescriptionInputButton,
  EditingComponent: DescriptionInput,
  CompletedComponent: PreviewTextBlock,
};