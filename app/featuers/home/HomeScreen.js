import {useCallback, useEffect, useMemo, useState} from "react";
import {useDispatch} from "react-redux";
import {StyleSheet, View} from "react-native";
import Animated, {runOnJS, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
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

  const loading = useMemo(() => loadingAlbum && loadingTruck, [loadingAlbum, loadingTruck])
  const data = useMemo(() => hasData(dataAlbum) ? dataAlbum : dataTruck , [hasData, dataAlbum, dataTruck])
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


  const x = async () => {
    const z = useDownloaderApi()
    const xx = await z.get('https://spotify-downloader-api.p.rapidapi.com/Home/GetSpotifyUserInfo', {params: {Tracklink: 'https://open.spotify.com/track/6R6BpMBFQrF7n2uEOxYmss?si=dae3f80f86934437'}})
    console.log(xx)
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
    marginTop: -450
  }
});

export default HomeScreen