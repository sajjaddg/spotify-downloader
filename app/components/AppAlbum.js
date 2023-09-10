import React from 'react';
import {FlatList, Image, View} from "react-native";
import AppText from "./AppText";
import AppDivider from "./AppDivider";
import AppIndex from "./AppIndex";
import {MusicKeyExtractor, MusicRender} from "./MusicItem";
import useAppAlbum from "../hooks/useAppAlbum";

function AppAlbum({data}) {

  const {image, name, nameArtists, numberOfSongs, items} = useAppAlbum(data)

  return (
    <View style={{paddingTop: 30}}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
        <Image
          style={{width: 100, height: 100, borderRadius: 8}}
          source={{uri: image}}/>
        <View style={{gap: 18}}>
          <View style={{gap: 6}}>
            <AppText color='#CED2D6' size={20}>
              {name}
            </AppText>
            <AppText color='#CED2D6' size={14}>
              {nameArtists}
            </AppText>
          </View>
          <View style={{flexDirection: 'row', gap: 4}}>
            <AppText color={'#CED2D6'} size={12}>
              {numberOfSongs}
            </AppText>
            <AppText color={'#CED2D6'} size={12} style={{opacity: 0.5}}>4hr 50min</AppText>
          </View>
        </View>
      </View>
      <AppDivider color={'#2A2F34'} style={{marginTop: 16}}/>
      <FlatList
        keyExtractor={MusicKeyExtractor}
        renderItem={MusicRender}
        data={items}
      />
    </View>
  )
}

export default AppAlbum;