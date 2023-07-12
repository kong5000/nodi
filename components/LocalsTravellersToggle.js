import * as React from 'react';
import { ToggleButton } from 'react-native-paper';

const MyComponent = () => {
  const [value, setValue] = React.useState('left');

  return (
    <ToggleButton.Group
      onValueChange={value => setValue(value)}
      value={value}>
      <ToggleButton icon="format-align-left" value="left" />
      <ToggleButton icon="format-align-right" value="right" />
    </ToggleButton.Group>
  );
};

export default MyComponent;