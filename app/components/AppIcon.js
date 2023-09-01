import IconCopy from "../assets/icons/IconCopy";
import IconDownload from "../assets/icons/IconDownload";

const icons = {
  'copy': IconCopy,
  'download': IconDownload
}

function AppIcon({name, size = 24}) {
  const Icon = icons[name]
  return <Icon size={size}/>
}


export default AppIcon