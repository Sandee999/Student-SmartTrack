import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { Svg, Path } from "react-native-svg";
import { Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { getValue } from "../util/asyncStorage";

const Logo = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={148} height={105} {...props}>
    <Path
      fill="#FDFDFD"
      d="M59.016 30.116c2.322 1.035 3.218 1.999 4.726 4.032l1.523 2.02 1.61 2.207 1.686 2.269c1.192 1.605 2.38 3.214 3.564 4.826a559.051 559.051 0 0 0 5.84 7.71l3.848 5.07 1.868 2.416 1.714 2.287 1.526 2.005C88.238 67.45 88.201 69.221 88 72c-1.393.137-2.79.233-4.187.312l-2.356.176c-5.912-1.175-9.983-8.486-13.582-13.05l-1.59-1.999c-2.066-2.602-4.109-5.19-6.027-7.904L59 48h-2c-1.3 1.383-1.3 1.383-2.574 3.219l-1.513 2.066-1.6 2.215c-1.093 1.47-2.186 2.939-3.282 4.406a454.93 454.93 0 0 0-5.062 6.938c-3.785 4.927-3.785 4.927-7.39 5.625-2.261.028-4.35-.105-6.579-.469-.816-2.086-.816-2.086-1-5 1.598-2.436 3.156-4.453 5.063-6.625a944.056 944.056 0 0 0 3.312-3.96l1.781-2.137c3.931-4.857 7.546-9.958 11.21-15.019l1.7-2.337 1.499-2.075c3.795-4.884 3.795-4.884 6.451-4.731ZM88 30c4.785.843 6.681 3.87 9.5 7.563l1.568 2.007c5.323 6.846 10.515 13.796 15.67 20.77 1.156 1.521 2.386 2.987 3.621 4.445C120 67 120 67 119.75 69.813L119 72c-3.524.56-5.594.81-9 0-7.838-6.042-13.404-15.892-19-24-2.468 1.152-4.048 2.048-6 4-2.41-.233-3.78-.843-5.75-2.25-1.784-2.498-1.673-3.7-1.25-6.75a75.557 75.557 0 0 1 5-6.813l1.445-1.81A468.944 468.944 0 0 1 88 30Z"
    />
    <Path
      fill="#FBFBFB"
      d="M57 58c3.146.317 4.618.599 6.836 2.926l1.539 2.386 1.586 2.364C68 68 68 68 67 72H50c0-5.35.286-5.967 3.5-9.813l1.969-2.394L57 58Z"
    />
  </Svg>
);

export default function WelcomePage() {
  const [redirectTo, setRedirectTo] = useState(null);

  const [fontsLoaded, error] = useFonts({
    // Regular Variants
    "Poppins-Regular": require("../../assets/fonts/poppins/Poppins-Regular.ttf"),
    "Poppins-Black": require("../../assets/fonts/poppins/Poppins-Black.ttf"),
    "Poppins-Bold": require("../../assets/fonts/poppins/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../../assets/fonts/poppins/Poppins-ExtraBold.ttf"),
    "Poppins-Light": require("../../assets/fonts/poppins/Poppins-Light.ttf"),
    "Poppins-Medium": require("../../assets/fonts/poppins/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../../assets/fonts/poppins/Poppins-SemiBold.ttf"),
    "Poppins-ExtraLight": require("../../assets/fonts/poppins/Poppins-ExtraLight.ttf"),
    "Poppins-Thin": require("../../assets/fonts/poppins/Poppins-Thin.ttf"),
  
    // Italic Variants
    "Poppins-Italic": require("../../assets/fonts/poppins/Poppins-Italic.ttf"),
    "Poppins-BlackItalic": require("../../assets/fonts/poppins/Poppins-BlackItalic.ttf"),
    "Poppins-BoldItalic": require("../../assets/fonts/poppins/Poppins-BoldItalic.ttf"),
    "Poppins-ExtraBoldItalic": require("../../assets/fonts/poppins/Poppins-ExtraBoldItalic.ttf"),
    "Poppins-LightItalic": require("../../assets/fonts/poppins/Poppins-LightItalic.ttf"),
    "Poppins-MediumItalic": require("../../assets/fonts/poppins/Poppins-MediumItalic.ttf"),
    "Poppins-SemiBoldItalic": require("../../assets/fonts/poppins/Poppins-SemiBoldItalic.ttf"),
    "Poppins-ExtraLightItalic": require("../../assets/fonts/poppins/Poppins-ExtraLightItalic.ttf"),
    "Poppins-ThinItalic": require("../../assets/fonts/poppins/Poppins-ThinItalic.ttf"),
  });

  useEffect(() => {
    const checkSignInStatus = async () => {
      const user = await getValue('user');
      setRedirectTo(user ? "/home" : "/signUp");
    };

    const timer = setTimeout(checkSignInStatus, 1500);
    return ()=>clearTimeout(timer);
  }, []);

  const welcomeDisplay = (
    <View className="bg-sky-600 w-full h-full justify-center items-center">
      <Logo />
      <Text adjustsFontSizeToFit className="w-[80vw] h-[8vh] mb-[5vh] text-4xl font-poppins text-sky-50 text-center">Student SmartTrack</Text>
      <Text adjustsFontSizeToFit className="w-[70vw] h-[10vh] text-2xl text-center text-sky-100 font-light font-poppins">Start managing your student life effectively!</Text>
      <StatusBar animated style="light" />
    </View>
  );

  if (!fontsLoaded) return welcomeDisplay

  if (redirectTo) return <Redirect href={redirectTo} />;

  return welcomeDisplay;
}
