import React, {useRef, useEffect} from 'react';
import {FlatList, View} from 'react-native';
// common
import DoubleTouchableOpacity from '../common/DoubleTouchableOpacity';
// components
import Box from './Box';
import useListScroll from '../hooks/useListScroll';

export interface Item {
  width: number;
  text: string;
  color: string;
}

interface Props {
  scrollReset: boolean;
  items: Item[];
  style?: {};
}

export const BOX_WIDTH_BASIS = 50;
const BOX_GAP = 20;
const Row = ({scrollReset, items, style}: Props) => {
  const itemOffsets = useRef({});
  const {listRef, scrollToIndex, scrollToTop} = useListScroll(
    itemOffsets.current,
    BOX_GAP,
  );

  function addItemOffsets(layout, index) {
    itemOffsets.current[index] = layout.width;
  }

  useEffect(() => {
    if (scrollReset) {
      scrollToTop();
    }
  }, [scrollReset]);

  return (
    <FlatList
      ref={listRef}
      data={items}
      horizontal
      renderItem={({item, index}) => (
        <DoubleTouchableOpacity onPress={() => scrollToIndex(index)}>
          <View
            onLayout={({nativeEvent: {layout}}) =>
              addItemOffsets(layout, index)
            }
            style={{
              flex: 1,
              marginRight: index === items.length - 1 ? 0 : BOX_GAP,
            }}>
            <Box item={item} />
          </View>
        </DoubleTouchableOpacity>
      )}
      keyExtractor={(_, index) => String(index)}
      style={[{height: BOX_WIDTH_BASIS * 4}, style]}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default Row;
