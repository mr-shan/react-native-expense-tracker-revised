import { StyleSheet, View, Pressable, Text, TextStyle, ViewStyle } from 'react-native';
import { ReactNode } from 'react';

import COLORS from '../styles/colors';

interface IProps {
  type: 'primary' | 'outlined' | 'flat' | 'icon';
  title?: string;
  color?: string;
  textColor?: string;
  rounded?: boolean;
  children?: ReactNode;
  disabled?: boolean;
  style?: ViewStyle;
  size?: 'small' | 'medium' | 'large'
  onPress: () => void;
}

const GenericButton = (props: IProps) => {
  const defaultStyle: ViewStyle = {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: '',
    borderColor: '',
    borderWidth: 2,
  };
  const containerStyle = props.style || {}
  const textStyle: TextStyle = {
    color: '',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  };

  if (props.size === 'small') {
    textStyle.fontSize = 12;
    defaultStyle.paddingHorizontal = 12;
    defaultStyle.paddingVertical = 8;
  } else if (props.size === 'large') {
    textStyle.fontSize = 24;
    defaultStyle.paddingHorizontal = 30;
    defaultStyle.paddingVertical = 12;
  }

  switch (props.type) {
    case 'primary':
      defaultStyle.backgroundColor = props.color || COLORS.primary500;
      defaultStyle.borderColor = props.color || COLORS.primary500;
      textStyle.color = props.textColor || COLORS.bg300;
      break;
    case 'outlined':
      defaultStyle.borderColor = props.color || COLORS.primary500;
      defaultStyle.backgroundColor = 'transparent';
      textStyle.color = props.textColor || defaultStyle.borderColor;
      break;
    case 'flat':
      defaultStyle.backgroundColor = 'transparent';
      defaultStyle.borderColor = 'transparent';
      textStyle.color = props.textColor || props.color || COLORS.primary500;
      break;
    case 'icon':
      defaultStyle.backgroundColor = 'transparent';
      defaultStyle.borderColor = 'transparent';
      textStyle.color = 'transparent';
      break;
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <Pressable
        style={({ pressed }) => [defaultStyle, pressed && styles.pressed]}
        onPress={props.onPress}
        disabled={props.disabled}
      >
        {props.children ? (
          props.children
        ) : (
          <Text style={textStyle}>{props.title}</Text>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  pressable: {},
  pressed: {
    opacity: 0.7
  },
});

export default GenericButton;
