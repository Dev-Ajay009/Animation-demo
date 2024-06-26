import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Styles from './Styles';
import Colors from './Colors';
// import MyHeader from '../components/MyHeader';
import Animated, { FadeIn, useAnimatedRef } from 'react-native-reanimated';

export default function ColorScreen({ route, navigation }) {
  const viewRef = useAnimatedRef(null);
  const [bgColor, setBgColor] = useState();
  useEffect(() => {
    switch (route.name) {
      case 'Home': { setBgColor('Home'); break; }
      case 'Search': { setBgColor('Search'); break; }
      case 'Add': { setBgColor('Add'); break; }
      case 'Account': { setBgColor('Account'); break; }
      case 'Like': { setBgColor('Like'); break; }
      default: setBgColor(Colors.white);
    }
  }, [])
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     viewRef.current.animate({ 0: { opacity: 0.5, }, 1: { opacity: 1 } });
  //   })
  //   return () => unsubscribe;
  // }, [navigation])
  return (
    <Animated.View ref={viewRef} entering={FadeIn.duration(800)}
      style={[Styles.container]}>
      {/* <MyHeader
        menu
        onPressMenu={() => navigation.goBack()}
        title={route.name}
        right="more-vertical"
        onRightPress={() => console.log('right')}
      /> */}
      <View style={[Styles.container]}>
        <Text style={{
          paddingLeft:10,
          color:'#000'
        }}>{bgColor}</Text>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({})
