import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../styles/colors';

interface IProps {
  onPress: () => {};
}

const TabBarAddButton = (props: IProps) => {
  return (
    <Pressable
      style={{
        backgroundColor: COLORS.accent500,
        borderRadius: 50,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={props.onPress}
    >
      <Ionicons name='add' size={40} color={COLORS.text700} />
    </Pressable>
  );
};

export default TabBarAddButton;
