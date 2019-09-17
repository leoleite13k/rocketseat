import React, {Component} from 'react';
import {ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

export default class User extends Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.getParam('user').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  state = {
    stars: [],
    page: 1,
    loading: false,
    refreshing: false,
  };

  componentDidMount() {
    const {page} = this.state;

    this.loadStarred(page);
  }

  loadStarred = async page => {
    const {navigation} = this.props;
    const {stars} = this.state;

    this.setState({loading: true});

    const user = navigation.getParam('user');

    const response = await api.get(`/users/${user.login}/starred?page=${page}`);

    this.setState({stars: [...stars, response.data], loading: false});
  };

  loadMore = () => {
    const {page} = this.state;

    this.loadStarred(page + 1);

    this.setState({page: page + 1});
  };

  refreshList = () => {
    this.setState({refreshing: true});

    this.setState({refreshing: false});
  };

  render() {
    const {navigation} = this.props;
    const {stars, page, loading, refreshing} = this.state;

    const user = navigation.getParam('user');

    return (
      <Container>
        <Header>
          <Avatar source={{uri: user.avatar}} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        {loading && page === 1 && (
          <ActivityIndicator size={30} color="#7159c1" />
        )}
        <Stars
          data={stars}
          keyExtractor={star => String(star.id)}
          onEndReachedThreshold={0.2}
          onEndReached={this.loadMore}
          refreshing={refreshing}
          onRefresh={this.refreshList}
          renderItem={({item}) => (
            <Starred>
              <OwnerAvatar source={{uri: item.owner.avatar_url}} />
              <Info>
                <Title>{item.name}</Title>
                <Author>{item.owner.login}</Author>
              </Info>
            </Starred>
          )}
        />
        {loading && page > 1 && <ActivityIndicator size={30} color="#7159c1" />}
      </Container>
    );
  }
}
