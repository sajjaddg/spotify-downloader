import * as React from "react"
import Svg, { Path } from "react-native-svg"
const IconDownload = ({size, ...props}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    {...props}
  >
    <Path
      stroke="#CED2D6"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.44 8.9c3.6.31 5.07 2.16 5.07 6.21v.13c0 4.47-1.79 6.26-6.26 6.26H8.74c-4.47 0-6.26-1.79-6.26-6.26v-.13c0-4.02 1.45-5.87 4.99-6.2M12 2v12.88"
    />
    <Path
      stroke="#CED2D6"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.35 12.65 12 16l-3.35-3.35"
    />
  </Svg>
)
export default IconDownload
