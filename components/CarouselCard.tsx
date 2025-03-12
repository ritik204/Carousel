import React, { useEffect, useRef } from 'react';
import { View, ImageBackground, Animated } from 'react-native';
import { CarouselItem } from '../data/@types/carousel-item-type';
import { carouselStyles } from './carousel-card-styles';

interface CarouselCardProps {
  item: CarouselItem;
  scrollY: Animated.Value;
  index: number;
  isViewed: boolean;
}

const CarouselCard: React.FC<CarouselCardProps> = ({ item, isViewed, scrollY, index }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    if (isViewed) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isViewed]);

  const translateY = scrollY.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [50, 0, -50],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View style={[carouselStyles.card, { transform: [{ translateY }] }]}>
      {typeof item.background === 'string' && item.background.startsWith('#') ? (
        <View style={[carouselStyles.background, { backgroundColor: item.background }]}>
          <Animated.Text 
            style={[
                carouselStyles.title,
              {
                opacity: fadeAnim,
                transform: [{ translateY: translateYAnim }]
              }
            ]}
          >
            {item.title}
          </Animated.Text>
        </View>
      ) : (
        <ImageBackground source={item.background}  style={carouselStyles.background}>
          <Animated.Text 
            style={[
                carouselStyles.title,
              {
                opacity: fadeAnim,
                transform: [{ translateY: translateYAnim }],
                color:item.ctaTheme === "light" ?'#E6E6FA':'#1C3D5A'
              }
            ]}
          >
            {item.title}
          </Animated.Text>
        </ImageBackground>
      )}
    </Animated.View>
  );
};




export default CarouselCard;