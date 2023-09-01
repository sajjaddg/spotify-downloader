import {View} from "react-native";

function AppDivider({height = 1, color, style}) {
  return (
    <View style={[{height, backgroundColor: color}, style]}/>
  )
}

export default AppDivider