/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  DeviceEventEmitter
} from 'react-native';

import {
  Accelerometer,
  Gyroscope,
  Magnetometer
} from 'NativeModules';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

class MotionScience extends Component {
  constructor(props: {}) {
    super(props);
    this.state = {
      acceleration: { x: 0, y: 0, z: 0 }
    }
  }

  componentDidMount() {
    Accelerometer.setAccelerometerUpdateInterval(0.1);
    DeviceEventEmitter.addListener('AccelerationData', ({acceleration}) => {
      this.setState({ acceleration: acceleration });
    });
    Accelerometer.startAccelerometerUpdates();
  }

  render() {
    const {acceleration} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Accelerometer
        </Text>
        <Text style={styles.instructions}>
          x: {acceleration.x.toFixed(2)}
        </Text>
        <Text style={styles.instructions}>
          y: {acceleration.y.toFixed(2)}
        </Text>
        <Text style={styles.instructions}>
          z: {acceleration.z.toFixed(2)}
        </Text>
      </View>
    );
  }

  componentWillUnmount() {
    Accelerometer.stopAccelerometerUpdates();
  }
}

AppRegistry.registerComponent('MotionScience', () => MotionScience);
