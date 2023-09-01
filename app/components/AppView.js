import {SafeAreaView} from "react-native";

function AppView({children, style}) {
  return (
    <SafeAreaView style={style}>
      {children}
    </SafeAreaView>
  )
}

export default AppView