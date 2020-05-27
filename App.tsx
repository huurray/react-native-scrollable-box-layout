import React, {useEffect, useState} from 'react';
import {SafeAreaView, FlatList, StatusBar, View} from 'react-native';
// common
import DoubleTouchableOpacity from './src/common/DoubleTouchableOpacity';
// components
import Row from './src/components/Row';
// hooks
import useListScroll from './src/hooks/useListScroll';
// utils
import jsonData from './src/utils/data.json';

type Columns = string[];

const ROW_GAP = 50;
const App = () => {
  const [columns, setColumns] = useState<Columns>([]);
  const [scrollReset, setScrollReset] = useState(false);
  const {listRef, scrollToTop} = useListScroll();

  function handleDoublePressRowGap() {
    setScrollReset(true);
    scrollToTop();
    setTimeout(() => {
      setScrollReset(false);
    }, 0);
  }

  useEffect(() => {
    setColumns(Object.keys(jsonData));
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        {/* list virtualized를 위한 FlatList 사용 */}
        <FlatList
          ref={listRef}
          data={columns}
          renderItem={({item, index}) => (
            <>
              <Row items={jsonData[item].items} scrollReset={scrollReset} />
              {index === columns.length - 1 ? null : (
                <DoubleTouchableOpacity onPress={handleDoublePressRowGap}>
                  <View style={{flex: 1, height: ROW_GAP}} />
                </DoubleTouchableOpacity>
              )}
            </>
          )}
          keyExtractor={(item) => item}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </>
  );
};

export default App;
