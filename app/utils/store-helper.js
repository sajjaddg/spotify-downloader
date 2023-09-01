import {useSelector} from "react-redux";

export const useShallowSelector = (selector, defaultItem) => useSelector(selector) ?? defaultItem