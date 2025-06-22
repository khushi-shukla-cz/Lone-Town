import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat } from 'react-native-reanimated';

const emotions = ['Empathy', 'Trust', 'Passion', 'Humor', 'Kindness', 'Adventure'];

const EmotionSignature = () => {
  const rotation = useSharedValue(0);

  React.useEffect(() => {
    rotation.value = withRepeat(withTiming(360, { duration: 20000 }), -1, false);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.constellation, animatedStyle]}>
        {emotions.map((emotion, i) => {
          const angle = (i / emotions.length) * 2 * Math.PI;
          const radius = 100;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);

          return (
            <View key={emotion} style={[styles.emotionNode, { transform: [{ translateX: x }, { translateY: y }] }]}>
               <Text style={styles.emotionText}>{emotion}</Text>
            </View>
          );
        })}
      </Animated.View>
       <View style={styles.heartContainer}>
        <Text style={styles.heart}>💖</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  constellation: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  heartContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ffb6c1',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  heart: {
    fontSize: 40,
  },
  emotionNode: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -30, // half of width
    marginTop: -15, // half of height
    width: 60,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emotionText: {
    color: '#333',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default EmotionSignature;
