import {useRef} from 'react';

const useListScroll = (
  itemOffsets?: {[key: string]: number},
  offsetBetween: number = 0,
) => {
  const listRef = useRef<any>(null);

  function getOffsetByIndex(index) {
    if (itemOffsets) {
      let offset = 0;
      for (let i = 0; i < index; i += 1) {
        const elementLayout = itemOffsets[i];
        if (elementLayout) {
          offset += elementLayout + offsetBetween;
        }
      }
      return offset;
    }
  }

  function scrollToTop() {
    if (!listRef.current) return;

    listRef.current?.scrollToOffset({
      offset: 0,
    });
  }

  function scrollToIndex(index: number) {
    if (!listRef.current) return;

    const offset = getOffsetByIndex(index);
    if (offset) {
      listRef.current?.scrollToOffset({
        offset,
      });
    }
  }

  return {
    listRef,
    scrollToTop,
    scrollToIndex,
  };
};

export default useListScroll;
