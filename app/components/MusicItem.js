import React from "react";
import {Image, View} from "react-native";
import AppIcon from "./AppIcon";
import AppText from "./AppText";
import useAppAlbum from "../hooks/useAppAlbum";


export const MusicKeyExtractor = item => `Music_${item.id}`
export const MusicRender = props => <MusicItem {...{...props}} />

function MusicItem({index, item}) {
  console.log(item)

  const {
    image,
    name,
    nameArtists,
  } = useAppAlbum(item)

  return (
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
      <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 12, gap: 12}}>
        <AppText color={'#CED2D6'} size={16}>{index + 1}</AppText>
        <Image
          style={{width: 44, height: 44, borderRadius: 8}}
          source={{uri: image}}/>
        <View style={{gap: 6}}>
          <AppText color='#CED2D6' size={16}>
            {name}
          </AppText>
          <AppText color='#CED2D6' size={12} style={{opacity: 0.5}}>
            {nameArtists}
          </AppText>
        </View>
      </View>
      <AppIcon size={24} name='download'/>
    </View>
  )
}

export default MusicItem