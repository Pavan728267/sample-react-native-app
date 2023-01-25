import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { VdoPlayerView } from 'vdocipher-rn-bridge';

export default class NativeControlsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFullscreen: false
    }
    console.log('NativeControlsScreen contructor');
  }

  componentDidMount() {
    console.log('NativeControlsScreen did mount');
  }

  componentWillUnmount() {
    console.log('NativeControlsScreen will unmount');
  }

  _onEnterFullscreen = () => {
    console.log('onEnterFullscreen');
    this.setState({isFullscreen: true});
  }

  _onExitFullscreen = () => {
    console.log('onExitFullscreen');
    this.setState({isFullscreen: false});
  }

  render() {
    const embedInfo = this.props.route.params.embedInfo;
    var isFullscreen = this.state.isFullscreen;
    
    return (
      <View style={styles.container}>
        <VdoPlayerView ref={player => this._player = player}
          style={isFullscreen ? styles.playerFullscreen : styles.player}
          embedInfo={embedInfo}
          onInitializationSuccess={() => console.log('init success')}
          onInitializationFailure={(error) => console.log('init failure', error)}
          onLoading={(args) => console.log('loading')}
          onLoaded={(args) => console.log('loaded')}
          onLoadError={({errorDescription}) => console.log('load error', errorDescription)}
          onError={({errorDescription}) => console.log('error', errorDescription)}
          onTracksChanged={(args) => console.log('tracks changed')}
          onPlaybackSpeedChanged={(speed) => console.log('speed changed to', speed)}
          onMediaEnded={(args) => console.log('ended')}
          onEnterFullscreen={this._onEnterFullscreen }
          onExitFullscreen={this._onExitFullscreen }
        />
        { !isFullscreen &&
        <Text style={styles.description}>
          The ui controls for the player are embedded inside the native view
        </Text>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  player: {
    height: 200,
    width: '100%',
  },
  playerFullscreen: {
    height: '100%',
    width: '100%',
  },
  description: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
