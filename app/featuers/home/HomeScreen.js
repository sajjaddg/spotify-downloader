import {useCallback, useMemo, useState} from "react";
import {useDispatch} from "react-redux";
import {ScrollView, StyleSheet, View} from "react-native";
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

function HomeScreen(props) {
  const dispatch = useDispatch()

  const [link, setLink] = useState('')
  const [errorLink, setErrorLink] = useState(null)
  const [id, setId] = useState('')

  const {data, error, loading} = useShallowSelector(selectApiGetTrackById(id), {data: {}, error: {}})
  const {
    data: dataAlbum,
    error: errorAlbum,
    loading: loadingAalbum
  } = useShallowSelector(selectApiGetAlbumById(id), {data: {}})
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

  const hasData = useCallback(it => {
    return Object.keys(it).length
  }, [])

  //console.log(JSON.stringify(dataAlbum))

  return (
    <AppView style={styles.container}>
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
          <AppIcon name='copy'/>
        </View>
        <AppButton style={{marginTop: 10}} onClick={onPress}/>
        {
          hasData(dataAlbum) ? <AppAlbum data={dataAlbum}/> : null
        }
      </View>
    </AppView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131619',
    paddingStart: 16,
    paddingEnd: 16,
  }
});

export default HomeScreen