import { Button, StyleSheet, View } from 'react-native';
import Theme from '../theme';
import useResponsive from '../hooks/useResponsive';

const useDynamicStyles = (variant) => {
  const { wp, hp } = useResponsive();

  return StyleSheet.create({
    button: {
      borderRadius: Theme.radius.medium,
      marginVertical: Theme.spacing.sm,
      overflow: 'hidden', // To ensure the border radius is applied
      paddingVertical: hp(1),
      paddingHorizontal: wp(3),
    },
    primary: {
      backgroundColor: Theme.colors.primary,
    },
    secondary: {
      backgroundColor: Theme.colors.accent,
    },
  });
};

const Boton = ({ title, onPress, variant }) => {
  const styles = useDynamicStyles(variant);
  const buttonStyle = variant === 'primary' ? styles.primary : styles.secondary;

  return (
    <View style={[styles.button, buttonStyle]}>
      <Button
        title={title}
        onPress={onPress}
        color={buttonStyle.backgroundColor}
      />
    </View>
  );
};

export default Boton;
