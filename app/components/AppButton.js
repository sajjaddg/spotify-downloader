import {TouchableOpacity} from "react-native";
import AppText from "./AppText";

function AppButton({style, onClick}) {
    return (
        <>
            <TouchableOpacity
                style={[{
                    padding: 10,
                    backgroundColor: '#1BC457',
                    alignSelf: 'center',
                    borderRadius: 20,
                    paddingHorizontal: 30
                }, style]}
                onPress={onClick ?? onClick}
            >
                <AppText size={16} color={'white'}>
                    Submit
                </AppText>
            </TouchableOpacity>
        </>
    )
}

export default AppButton