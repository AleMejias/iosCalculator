import { Pressable, Text } from "react-native";
import { colors, globalStyles } from "../config/theme/app.theme";

interface Props {
  label:        string;
  dimension:    boolean;
  background?:  string;
  color?:       string;
  doubleSize?:  boolean;
  onPress?:() => void;
  operator?:    string;
}

export const CalculatorButton = ({
  label,
  dimension,
  background = colors.darkGray,
  color = colors.textPrimary,
  doubleSize = false,
  onPress,
  operator

}: Props) => {

  let widthHeight = (dimension) ? 60 : 70;
  const operatorPressed = label === operator ? true : false;

  return (
    <Pressable
      onPress={ () => onPress ? onPress() : null }
      style={({ pressed }) => [
        globalStyles.button,
        { 
          backgroundColor: ( operatorPressed ) ? colors.textPrimary : background, 
          opacity: pressed ? 0.8 : 1,
          width: (doubleSize) ? ((widthHeight * 2) + (globalStyles.button.marginHorizontal * 2)) : widthHeight, 
          height: widthHeight
        }
      ]}
    >
      <Text style={[
        globalStyles.buttonText,
        {
          color: ( operatorPressed ) ? colors.orange : color
        }
      ]}>{label === '*' ? 'x' : label}</Text>
    </Pressable>
  );
}