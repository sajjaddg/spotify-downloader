import {StyleSheet, TextInput, View} from "react-native"
import {useCallback, useMemo, useState} from "react";
import AppText from "./AppText";

function AppInput({style, text, setText, error,}) {
  const [active, setActive] = useState(false)

    const borderColor = useMemo(() => active ? '#CED2D6' : error ? '#DE3636' : '#1F2429', [active, error])
    const changeStatus = useCallback(() => setActive(!active), [active])


  return (
    <>
      <View style={styles.container}>
        <View style={[styles.inputContainer, {borderColor}]}>
          <TextInput value={text} onChangeText={setText} textAlign='left' textContentType='URL'
                     style={{color: '#CED2D6', fontSize: 14}} placeholderTextColor="#CED2D6"
                     placeholder={'Paste your link'} onFocus={changeStatus} onBlur={changeStatus}/>
        </View>
        <View style={styles.errorContainer}>
          <AppText color={'red'}>{error ?? ''}</AppText>
        </View>
      </View>
    </>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    backgroundColor: '#1F2429',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 13,
    paddingHorizontal: 15,
  },
  errorContainer: {
    height: 16,
    marginTop: 10,
    paddingStart: 15,
  }
})
export default AppInput