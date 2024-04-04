import { Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../styles/colors';

interface IProps {
  onPress: () => {};
}

const TabBarAddButton = (props: IProps) => {
  return (
    <View
      style={{
        position: 'relative',
        width: 70,
        height: 70,
      }}
    >
      <Pressable
        style={{
          backgroundColor: COLORS.primary500,
          borderRadius: 50,
          width: 65,
          height: 65,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: 12,
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.8,
          shadowRadius: 12,
          elevation: 10,
        }}
        onPress={props.onPress}
      >
        <Ionicons name='add' size={40} color={COLORS.bg300} />
      </Pressable>
    </View>
  );
};

export default TabBarAddButton;
