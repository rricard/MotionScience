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
    height: 150,
    width: 300
  }
});

function appendMeasure(current, toAppend, wSize=-1) {
  const l = current.push(toAppend);
  return l.size > wSize && wSize > 0 ? l.shift() : l;
}

class MotionScience extends Component {
  constructor(props: {}) {
    super(props);
    this.state = {
      xAccel: new List([0]),
      yAccel: new List([0]),
      zAccel: new List([0]),
      xGyro: new List([0]),
      yGyro: new List([0]),
      zGyro: new List([0]),
    }
  }

  componentDidMount() {
    Accelerometer.setAccelerometerUpdateInterval(.1);
    Gyroscope.setGyroUpdateInterval(.1);
    const wSize = 100;
    DeviceEventEmitter.addListener('AccelerationData', ({acceleration}) => {
      const {xAccel, yAccel, zAccel} = this.state;
      this.setState({
        xAccel: appendMeasure(xAccel, acceleration.x, wSize),
        yAccel: appendMeasure(yAccel, acceleration.y, wSize),
        zAccel: appendMeasure(zAccel, acceleration.z, wSize)
      });
    });
    DeviceEventEmitter.addListener('GyroData', ({rotationRate}) => {
      const {xGyro, yGyro, zGyro} = this.state;
      this.setState({
        xGyro: appendMeasure(xGyro, rotationRate.x, wSize),
        yGyro: appendMeasure(yGyro, rotationRate.y, wSize),
        zGyro: appendMeasure(zGyro, rotationRate.z, wSize)
      });
    });
    Accelerometer.startAccelerometerUpdates();
    Gyroscope.startGyroUpdates();
  }

  render() {
    const {xAccel, yAccel, zAccel,
           xGyro, yGyro, zGyro} = this.state;
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
        <Text style={styles.sectionTitle}>
          Gyroscope
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
                        data: xGyro.toJS(),
                    },
                    {
                        name: 'LineChart',
                        color: 'green',
                        lineWidth: 2,
                        data: yGyro.toJS(),
                    },
                    {
                        name: 'LineChart',
                        color: 'blue',
                        lineWidth: 2,
                        data: zGyro.toJS(),
                    }
                 ]}
                 verticalGridStep={5}
                 xLabels={xGyro.map(() => "").toJS()}
                 />
      </View>
    );
  }

  componentWillUnmount() {
    Accelerometer.stopAccelerometerUpdates();
    Gyroscope.stopGyroUpdates();
  }
}

AppRegistry.registerComponent('MotionScience', () => MotionScience);
