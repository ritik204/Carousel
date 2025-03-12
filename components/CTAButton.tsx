import React from 'react';
import { TouchableOpacity, Text} from 'react-native';
import { ctaStyles } from './cta-button-styles';
import { CTAButtonProps } from './@types/cta-button-prop-type';


const CTAButton: React.FC<CTAButtonProps> = ({ text, theme, onPress }) => {
  const buttonStyle = theme === 'dark' ? ctaStyles.darkButton : ctaStyles.lightButton;
  const textStyle = theme === 'dark' ? ctaStyles.darkText : ctaStyles.lightText;

  return (
    <TouchableOpacity style={[ctaStyles.button, buttonStyle]} onPress={onPress}>
      <Text style={[ctaStyles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};



export default CTAButton;