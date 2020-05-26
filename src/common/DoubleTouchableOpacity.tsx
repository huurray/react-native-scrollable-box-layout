import React, {useRef, useEffect, useState, useCallback} from 'react';
import {TouchableOpacity} from 'react-native';

interface Props {
  children: any;
  onPress: () => void;
  duration?: number;
  style?: {};
  [key: string]: any;
}

const DOUBLE_PRESS_DELAY = 200;
const DoubleTouchableOpacity = ({
  children,
  onPress,
  duration = 500,
  style,
  ...props
}: Props) => {
  const lastPress = useRef(0);
  const timerToPreventInARow = useRef<any>(null);

  const [disabled, setDisabled] = useState(false);

  const handleDoublePress = useCallback(() => {
    const now = new Date().getTime();
    const pressDelay = now - lastPress.current;

    if (pressDelay < DOUBLE_PRESS_DELAY) {
      setDisabled(true);
      typeof onPress === 'function' && onPress();
      timerToPreventInARow.current = setTimeout(() => {
        setDisabled(false);
      }, duration);

      lastPress.current = 0;
    }
    lastPress.current = now;
  }, [duration]);

  useEffect(() => {
    return () => {
      if (timerToPreventInARow.current) {
        clearTimeout(timerToPreventInARow.current);
      }
    };
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={1}
      disabled={disabled}
      onPress={handleDoublePress}
      style={style}
      {...props}>
      {children}
    </TouchableOpacity>
  );
};

export default DoubleTouchableOpacity;
