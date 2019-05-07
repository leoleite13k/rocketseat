import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PlayerActions from '~/store/ducks/player';

import {
  Container,
  CoverBackground,
  EpisodeInfo,
  Title,
  Author,
  Controls,
  ControlButtom,
  ControlIcon,
} from './styles';

const Player = ({
  player, currentEpisode, play, pause, prev, next,
}) => player.current && (
<Container>
  <CoverBackground source={{ uri: currentEpisode.artwork }} />
  <EpisodeInfo>
    <Title>{currentEpisode.title}</Title>
    <Author>{currentEpisode.artist}</Author>
  </EpisodeInfo>

  <Controls>
    <ControlButtom onPress={prev}>
      <ControlIcon name="skip-previous" />
    </ControlButtom>
    <ControlButtom onPress={player.playing ? pause : play}>
      <ControlIcon name={player.playing ? 'pause-circle-filled' : 'play-circle-filled'} />
    </ControlButtom>
    <ControlButtom onPress={next}>
      <ControlIcon name="skip-next" />
    </ControlButtom>
  </Controls>
</Container>
);

const mapStateToProps = state => ({
  player: state.player,
  currentEpisode: state.player.podcast
    ? state.player.podcast.tracks.find(episode => episode.id === state.player.current)
    : null,
});

const mapDispatchToProps = dispatch => bindActionCreators(PlayerActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Player);
