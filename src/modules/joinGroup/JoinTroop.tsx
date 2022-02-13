import {gql, useQuery} from '@apollo/client';
import {Container, Text, Button, Stack} from 'ScoutDesign/library';
import {plusBold} from 'ScoutDesign/icons';
import RichInputContainer from '../../components/containers/RichInputContainer';
import {
  chooseGroup,
  useJoinGroupForm,
} from './JoinGroupForm/JoinGroupFormStore';

const GET_TROOPS = gql`
  query GetTroops {
    troops {
      id
      unitNumber
      council
      state
    }
  }
`;

const JoinTroop = ({navigation}) => {
  const [_, dispatch] = useJoinGroupForm();
  const {data, error, loading} = useQuery(GET_TROOPS, {
    fetchPolicy: 'network-only',
  });

  const nextForm = (troopID: string, troopNumber: string) => {
    dispatch(chooseGroup(troopID, troopNumber));
    navigation.navigate('ChooseRole');
  };

  if (loading) return null;
  if (error) return <Text>`Error! ${error.message}`</Text>;

  return (
    <RichInputContainer icon="back" back={navigation.goBack}>
      <Container>
        <Text preset="h2" textAlign="center" padding="m">
          What Troop are you in?
        </Text>
        <Stack
          accessibilityLabel="test-stack"
          radius="l"
          items={data.troops}
          everyItemProps={{
            fullWidth: true,
            justifyContent: 'flex-start',
            paddingVertical: 'm',
          }}
          RenderItem={({item, ...rest}) => {
            return (
              <Button
                accessibilityLabel={item.id}
                onPress={() => nextForm(item.id, item.unitNumber)}
                text={`Troop ${item.unitNumber} of ${item.council} council`}
                {...rest}
              />
            );
          }}
        />

        <Text paddingTop="xl" paddingBottom="s" paddingHorizontal="xs">
          Please select a Troop or add one below
        </Text>
        <Button
          accessibilityLabel="create-new-troop"
          text="Create Troop"
          backgroundColor="brandSecondary"
          icon={plusBold}
          onPress={() => {
            navigation.navigate('CreateTroop');
          }}
        />
      </Container>
    </RichInputContainer>
  );
};

export default JoinTroop;