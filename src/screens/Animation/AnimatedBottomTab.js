import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useRef } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native'
// import Icon, { Icons } from '../components/Icons';
import Colors from './Colors';
import ColorScreen from './ColorScreen';
import * as Animatable from 'react-native-animatable';
import { useTheme } from '@react-navigation/native';
import { Image } from 'react-native';

const TabArr = [
  { route: 'Home', label: 'Home', Img: require('../../assets/home2.png'), icon: 'home', component: ColorScreen },
  { route: 'Search', label: 'Search', Img: require('../../assets/search.png'), icon: 'search', component: ColorScreen },
  { route: 'Add', label: 'Add', Img:require('../../assets/more.png'), icon: 'plus-square', component: ColorScreen },
  { route: 'Like', label: 'Like', Img:require('../../assets/heart.png'), icon: 'heart', component: ColorScreen },
  { route: 'Account', label: 'Account', Img:require('../../assets/user.png'), icon: 'user-circle-o', component: ColorScreen },
];

const Tab = createBottomTabNavigator();

const animate1 = { 0: { scale: .5, translateY: 7 }, .92: { translateY: -50 }, 1: { scale: 1.2, translateY: -30 } }
const animate2 = { 0: { scale: 1.2, translateY: -24 }, 1: { scale: 1, translateY: 7 } }

const circle1 = { 0: { scale: 0 }, 0.3: { scale: .9 }, 0.5: { scale: .2 }, 0.8: { scale: .7 }, 1: { scale: 1 } }
const circle2 = { 0: { scale: 1 }, 1: { scale: 0 } }

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);
  const isDarkMode = useColorScheme() === 'dark';

  const { colors } = useTheme()
  const color = isDarkMode ? Colors.white : Colors.black;
  const bgColor = colors.background;

  useEffect(() => {
    if (focused) {
      viewRef.current.animate(animate1);
      circleRef.current.animate(circle1);
      textRef.current.transitionTo({ scale: 1 });
    } else {
      viewRef.current.animate(animate2);
      circleRef.current.animate(circle2);
      textRef.current.transitionTo({ scale: 0 });
    }
  }, [focused])

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}>
      <Animatable.View
        ref={viewRef}
        duration={1000}
        style={styles.container}>
        <View style={[styles.btn, { borderColor:  focused ? '#fff' :'#fff', backgroundColor: focused ? Colors.primary :null, }]}>
          <Animatable.View
            ref={circleRef}
            style={[styles.circle,{backgroundColor:focused ? Colors.primary : Colors.primary,}]} />
          {/* <Icon type={item.type} name={item.icon} color={focused ? Colors.white : Colors.primary} /> */}
          <Image 
          source={item.Img}
          style={{
            height:20,
            width:20,
            alignItems:"center",
            tintColor:focused ? Colors.white : Colors.primary
          }}
          />
        </View>
        <Animatable.Text
          ref={textRef}
          style={[styles.text]}>
          {item.label}
        
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  )
}

export default function AnimatedBottomTab() {
  return (
    <SafeAreaView style={{ backgroundColor: 'pink', flex: 1}}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
        }}
      >
        {TabArr.map((item, index) => {
          return (
            <Tab.Screen key={index} name={item.route} component={item.component}
              options={{
                tabBarShowLabel: false,
                tabBarButton: (props) => <TabButton {...props} item={item} />
              }}
            />
          )
        })}
      </Tab.Navigator>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    
  },
  tabBar: {
    height: 70,
    position: 'absolute',
     margin: 16,
    borderRadius: 16,
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
  

    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    
    borderRadius: 25,
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
    color: Colors.primary,
    fontWeight: '500'
  }
})