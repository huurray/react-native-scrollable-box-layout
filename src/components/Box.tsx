import React from 'react';
import {View, Text} from 'react-native';
// type
import {Item, BOX_WIDTH_BASIS} from './Row';

interface Props {
  item: Item;
  style?: {};
}

const Box = ({item, style}: Props) => {
  return (
    <View
      style={[
        {
          flex: 1,
          width: item.width * BOX_WIDTH_BASIS,
          backgroundColor: item.color,
          justifyContent: 'center',
          alignItems: 'center',
        },
        style,
      ]}>
      <Text style={{fontSize: 18}}>{item.text}</Text>
    </View>
  );
};

function areEqual(prevProps: Props, nextProps: Props) {
  if (prevProps.item.color === nextProps.item.color) return true;
  if (prevProps.item.text === nextProps.item.text) return true;
  if (prevProps.item.width === nextProps.item.width) return true;
  return false;
}

export default React.memo(Box, areEqual);
