import React, { useCallback, useRef, useState } from 'react';
import { FlatList, Animated, View, Dimensions, NativeScrollEvent, NativeSyntheticEvent, ViewToken } from 'react-native';
import CarouselCard from '../components/CarouselCard';
import CTAButton from '../components/CTAButton';
import { carouselItems } from '../data/carouselData';
import { CarouselItem } from '../data/@types/carousel-item-type';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
interface ViewableItemsChanged {
    viewableItems: Array<ViewToken>;
    changed: Array<ViewToken>;
  }

const HomeScreen: React.FC = () => {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewedIndices, setViewedIndices] = useState<Set<number>>(new Set());
  const scrollY = useRef(new Animated.Value(0)).current;

  const handleViewableItemsChanged = useCallback(
    ({ viewableItems }: ViewableItemsChanged) => {
      const newIndices = new Set(viewedIndices);
      viewableItems.forEach((item) => {
        if (item.index !== null) {
          newIndices.add(item.index);
        }
      });
      setViewedIndices(newIndices);
    },
    [viewedIndices]
  );

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
    minimumViewTime: 400,
  };

  const handleNext = () => {
    if (currentIndex < carouselItems.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const newIndex = Math.round(offsetY / SCREEN_HEIGHT);
    setCurrentIndex(newIndex);
  };

  const renderItem = ({ item, index }: { item: CarouselItem; index: number }) => (
    <View style={{ height: SCREEN_HEIGHT }}>
      <CarouselCard 
        item={item} 
        scrollY={scrollY} 
        index={index}
        isViewed={viewedIndices.has(index)}
      />
      <CTAButton
        text={item.ctaText}
        theme={item.ctaTheme}
        onPress={handleNext}
      />
    </View>
  );

  return (
    <AnimatedFlatList
      ref={flatListRef}
      data={carouselItems}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      scrollEventThrottle={16}
      pagingEnabled // Snap to items
      showsVerticalScrollIndicator={false}
      getItemLayout={(_, index) => ({
        length: SCREEN_HEIGHT,
        offset: SCREEN_HEIGHT * index,
        index,
      })}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true, listener: handleScroll }
      )}
      onViewableItemsChanged={handleViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
      
    />
  );
};

export default HomeScreen;