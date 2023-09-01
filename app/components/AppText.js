import {Text} from "react-native"

function AppText({size, font, color,style,children}) {
  return (
    <Text style={[{fontSize: size, fontFamily: font, color},style]}>
      {children}
    </Text>
  )
}

export default AppText