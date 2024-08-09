import usePageProps from './use_page_props'

export default function useMessage<T>() {
  const props = usePageProps<{message: T}>()

  return props.message;
}
