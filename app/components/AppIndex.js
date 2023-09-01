import {useCallback, useMemo, useState} from "react"
import {RefreshControl, StyleSheet, View} from "react-native"
import {KeyboardAwareFlatList} from "react-native-keyboard-aware-scroll-view";


function AppIndex(
  {
    callApi,
    data,
    emptyError,
    error,
    errorStyle,
    hasLoading,
    hasPagination,
    hasSwipeRefresh,
    isReachedToEnd,
    listRef,
    listStyle,
    loading,
    loadingStyle,
    onRefresh,
    page,
    setPage,
    style,
    ...props
  }) {

  const nextPage = useCallback(() => {
    if (isReachedToEnd || loading)
      return
    let newPage = page + 1
    setPage(newPage)
    callApi(newPage)
  }, [isReachedToEnd, page, setPage, callApi, loading])

  const hasError = useMemo(() => Object.keys(error).length !== 0, [error])

  const onEndReachCallback = useCallback(({_}) => {
    if (hasPagination && (data?.length || 0) > 0) {
      nextPage()
    }
  }, [hasPagination, data?.length, nextPage])


  return (<View style={[styles.root, style]} ref={props.ref}>
    {!hasError &&
      <KeyboardAwareFlatList
        ref={listRef}
        data={data}
        contentContainerStyle={[styles.list, listStyle]}
        onEndReached={!isReachedToEnd ? onEndReachCallback : null}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        {...props}/>}
  </View>)
}


AppIndex.defaultProps = {
  callApi: () => {
  },
  data: [],
  error: {},
  hasLoading: true,
  hasPagination: false,
  hasSwipeRefresh: true,
  isReachedToEnd: false,
  loading: false,
  page: 1,
  setPage: _ => {
  },
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  list: {
    flexGrow: 1
  },
  loadingPagination: {
    margin: 16,
  },
})

export default AppIndex