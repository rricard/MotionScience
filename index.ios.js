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
  Range,
  Map,
  List
} from "immutable";

import {
  Accelerometer,
  Gyroscope,
  Magnetometer
} from 'NativeModules';

import RNChart from 'react-native-chart';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  sectionTitle: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  sectionItem: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  chart: {
    height: 200,
    width: 300
  }
});

class MotionScience extends Component {
  constructor(props: {}) {
    super(props);
    this.state = {
      xAccel: new List([0]),
      yAccel: new List([0]),
      zAccel: new List([0]),
    }
  }

  componentDidMount() {
    Accelerometer.setAccelerometerUpdateInterval(.1);
    const wSize = 100;
    DeviceEventEmitter.addListener('AccelerationData', ({acceleration}) => {
      const {xAccel, yAccel, zAccel} = this.state;
      const newXAccel = xAccel.push(acceleration.x);
      const newYAccel = yAccel.push(acceleration.y);
      const newZAccel = zAccel.push(acceleration.z);
      this.setState({
        xAccel: newXAccel.size > wSize ? newXAccel.shift() : newXAccel,
        yAccel: newYAccel.size > wSize ? newYAccel.shift() : newYAccel,
        zAccel: newZAccel.size > wSize ? newZAccel.shift() : newZAccel,
      });
    });
    Accelerometer.startAccelerometerUpdates();
  }

  render() {
    const {xAccel, yAccel, zAccel} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>
          Accelerometer
        </Text>
        <RNChart style={styles.chart}
                 animationDuration={0.01}
                 showAxis={false}
                 showXAxisLabels={false}
                 chartData={[
                    {
                        name: 'LineChart',
                        color: 'red',
                        lineWidth: 2,
                        data: xAccel.toJS(),
                    },
                    {
                        name: 'LineChart',
                        color: 'green',
                        lineWidth: 2,
                        data: yAccel.toJS(),
                    },
                    {
                        name: 'LineChart',
                        color: 'blue',
                        lineWidth: 2,
                        data: zAccel.toJS(),
                    }
                 ]}
                 verticalGridStep={5}
                 xLabels={xAccel.map(() => "").toJS()}
                 />
      </View>
    );
  }

  componentWillUnmount() {
    Accelerometer.stopAccelerometerUpdates();
  }
}

AppRegistry.registerComponent('MotionScience', () => MotionScience);
