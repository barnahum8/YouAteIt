import React from 'react';
import HomePage from './components/HomePage/HomePage';
import useStyles from './AppStyle';

const App = () => {
  const styles = useStyles();

  return (
    <div className={styles.App}>
      <HomePage></HomePage>
    </div>
  );
}

export default App;
