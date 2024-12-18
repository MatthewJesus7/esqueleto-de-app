import React, { useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from './CustomButton';
import { Ionicons } from '@expo/vector-icons';

const BottomBar = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('Home');

  const handlePress = (screen) => {
    setSelectedTab(screen);
    navigation.navigate(screen);
  };

  return (
    <View className="relative w-full flex-row justify-around p-3 border-t border-gray-200 bg-gray-600">
      <CustomButton
        label={<Ionicons name="home-outline" size={24} color="white" />} // Ícone de Home
        isSelected={selectedTab === 'index'}
        onPress={() => handlePress('index')}
      />
      <CustomButton
        label={<Ionicons name="search-outline" size={24} color="white" />} // Ícone de Search
        isSelected={selectedTab === 'Search'}
        onPress={() => handlePress('Search')}
      />
      <CustomButton
        label={<Ionicons name="notifications-outline" size={24} color="white" />} // Ícone de Notifications
        isSelected={selectedTab === 'Notifications'}
        onPress={() => handlePress('Notifications')}
      />
      <CustomButton
        label={<Ionicons name="person-outline" size={24} color="white" />} // Ícone de Profile
        isSelected={selectedTab === 'Profile'}
        onPress={() => handlePress('Profile')}
      />
    </View>
  );
};

export default BottomBar;
