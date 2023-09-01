import {useCallback, useState} from "react";
import {StyleSheet, View} from "react-native";
import AppText from "../../components/AppText";
import AppInput from "../../components/AppInput";
import AppIcon from "../../components/AppIcon";
import AppButton from "../../components/AppButton";
import AppView from "../../components/AppView";
import useSpotifyApi from "../../hooks/useSpotifyApi";

function HomeScreen(props) {
    const [link, setLink] = useState('')
    const spotify = useSpotifyApi()

    const onPress = useCallback(async () => {
        const x = await spotify.getTrack('4f0unHStImsx73OSmnGBAE')
        console.log(x.album.images)
    }, [spotify])

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
            <View style={{flex: 1, justifyContent: 'center'}}>
                <View
                    style={{justifyContent: 'space-between', gap: 16, flexDirection: 'row'}}>
                    <AppInput error={false} text={link} setText={setLink}/>
                    <AppIcon/>
                </View>
                <AppButton style={{marginTop: 10}} onClick={onPress}/>
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