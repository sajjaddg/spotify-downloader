import {useCallback, useEffect, useMemo, useState} from "react";
import {useDispatch} from "react-redux";
import {StyleSheet, View} from "react-native";
import Animated, {runOnJS, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import * as FileSystem from 'expo-file-system';
import {callGetAlbumById, callGetPlayListById, callGetTrackById} from "../../redux/actions/apiActions";
import {selectApiGetAlbumById, selectApiGetTrackById} from "../../redux/api/apiSelector";
import {useShallowSelector} from "../../utils/store-helper";
import AppButton from "../../components/AppButton";
import AppIcon from "../../components/AppIcon";
import AppInput from "../../components/AppInput";
import AppText from "../../components/AppText";
import AppView from "../../components/AppView";
import {extractSpotifyInfo} from "../../utils/js-helper";
import AppAlbum from "../../components/AppAlbum";
import useDownloaderApi from "../../hooks/useDownloaderApi";

function HomeScreen(props) {
  const dispatch = useDispatch()

  const [link, setLink] = useState('')
  const [errorLink, setErrorLink] = useState(null)
  const [id, setId] = useState('')
  const [canShowData, setCanShowData] = useState(false)

  const y = useSharedValue(0)
  const mainData = useSharedValue(0)

  const translateY = useAnimatedStyle(() => {
    return {
      transform: [{translateY: y.value}],
    }
  })

  const showMain = useAnimatedStyle(() => {
    return {
      opacity: mainData.value
    }
  })

  const {data: dataTruck, error, loading: loadingTruck} = useShallowSelector(selectApiGetTrackById(id), {
    data: {},
    error: {},
    loading: true
  })
  const {
    data: dataAlbum,
    error: errorAlbum,
    loading: loadingAlbum
  } = useShallowSelector(selectApiGetAlbumById(id), {data: {}, loading: true})

  const hasData = useCallback(it => {
    return Object.keys(it).length
  }, [])

  const onPressItem = useCallback(async link => {
    console.log(link)
    const data = await getDownloadLink(link)
    const name = data.youtubeVideo.title.replace(/\s/g, '')
    const uri = await downloadFromUrl(data.youtubeVideo.audio[0].url, name)
  }, [])

  const loading = useMemo(() => loadingAlbum && loadingTruck, [loadingAlbum, loadingTruck])
  const data = useMemo(() => hasData(dataAlbum) ? {...dataAlbum, onPressItem} : {
    ...dataTruck.album,
    link,
    onPressItem
  }, [hasData, dataAlbum, onPressItem, dataTruck.album, link])
  const info = useMemo(() => extractSpotifyInfo(link), [link])

  const onPress = useCallback(() => {
    if (!info) {
      setErrorLink('invalid link')
      return
    }
    setErrorLink(null)
    setId(info.id)
    callApi(info.id)
  }, [info, callApi])

  const callApi = useCallback((id) => {
    switch (info.type) {
      case 'album':
        dispatch(callGetAlbumById(id))
        break
      case 'track':
        dispatch(callGetTrackById(id))
        break
      case 'playlist':
        dispatch(callGetPlayListById(id))
        break
    }
  }, [info?.type])


  const downloadFromUrl = async (link, name) => {
    console.log('start download')
    console.log(link, name)
    const result = await FileSystem.downloadAsync(
      link,
      FileSystem.documentDirectory + name + '.mp3'
    );
    console.log(result)

  };
  const getDownloadLink = async truckUrl => {
    const z = useDownloaderApi()
    try {
      const {data} = await z.get('https://spotify-scraper.p.rapidapi.com/v1/track/download', {params: {track: truckUrl}})
      return data
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (!loading) {
      y.value = withTiming(-290, {
        duration: 1000,
      }, () => runOnJS(setCanShowData)(true))
    }
  }, [y, loading])

  useEffect(() => {
    if (canShowData) {
      mainData.value = withTiming(1, {
        duration: 1000
      })
    }
  }, [mainData, canShowData])

  return (
    <AppView style={styles.container}>
      <Animated.View style={[styles.main, translateY]}>
        <View>
          <AppText size={20} color={'#C0C0C0'}>
            Welcome to
          </AppText>
          <AppText size={30} color={'#C0C0C0'}>
            Internship project
          </AppText>
        </View>
        <View style={{flex: 1, marginTop: 260}}>
          <View
            style={{justifyContent: 'space-between', gap: 16, flexDirection: 'row'}}>
            <AppInput error={errorLink} text={link} setText={setLink}/>
            <View style={{marginTop: 10}}>
              <AppIcon name='copy'/>
            </View>
          </View>
          <AppButton style={{marginTop: 10}} onClick={onPress}/>
        </View>
      </Animated.View>
      {
        !loading ?
          <Animated.View style={[styles.data, showMain]}>
            <AppAlbum data={data}/>
          </Animated.View>
          : null
      }
    </AppView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131619',
    paddingStart: 16,
    paddingEnd: 16,
  },
  main: {
    flex: 1,
  },
  data: {
    flex: 1,
    marginTop: -400,
    paddingBottom: 90
  }
});

export default HomeScreen