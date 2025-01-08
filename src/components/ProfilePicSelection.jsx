import { View, Text, FlatList, Image, Pressable, Animated } from 'react-native';
import React, { useEffect } from 'react';

export default function ProfilePicSelection(props) {
  const [pfpInteraction, setPfpInteraction] = React.useState(false);
  const fadeAnim = React.useRef(new Animated.Value(1)).current; // Initial opacity is 1

  const data = [
    { id: '1', link: require('./../../assets/profilePic/pfp1.png') },
    { id: '2', link: require('./../../assets/profilePic/pfp2.png') },
    { id: '3', link: require('./../../assets/profilePic/pfp3.png') },
    { id: '4', link: require('./../../assets/profilePic/pfp4.png') },
    { id: '5', link: require('./../../assets/profilePic/pfp5.png') },
    { id: '6', link: require('./../../assets/profilePic/pfp6.png') },
    { id: '7', link: require('./../../assets/profilePic/pfp7.png') },
    { id: '8', link: require('./../../assets/profilePic/pfp8.png') },
    { id: '9', link: require('./../../assets/profilePic/pfp9.png') },
  ];

  const renderItem = ({ item }) => (
    <View className={`w-[100vw] h-[40vh] items-center justify-center`}>
      <Image source={item.link} resizeMode='contain' className={`w-[80vw] h-[40vh] justify-center items-center`} />
    </View>
  );

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 70,
  };

  function visibleItemFunction(info) {
    if (info.viewableItems.length > 0) {
      const firstViewableItem = info.viewableItems[0].item;
      props.setUser ({
        ...props.user,
        pfpId: Number(firstViewableItem.id),
      });
    }
  }

  const handleScroll = () => {
    if (!pfpInteraction) {
      fadeOutMessage();
      const timer = setTimeout(()=>setPfpInteraction(true), 500);
      return ()=>clearTimeout(timer);
    }
  };

  const fadeOutMessage = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View className={`w-[100vw] h-[43vh] z-10 items-center justify-between`}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        initialNumToRender={data.length}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={(info) => visibleItemFunction(info)}
        onScroll={()=>handleScroll()}
      />
      {
        !pfpInteraction &&
        <Animated.View style={{ opacity: fadeAnim }} className={`z-10 px-7 py-3 justify-center items-center rounded-lg bg-[#555555]`}>
          <Text adjustsFontSizeToFit className={`text-md text-gray-50 text-center`} >Swipe to Choose a Profile Pic.</Text>
        </Animated.View>
      }
    </View>
  );
}