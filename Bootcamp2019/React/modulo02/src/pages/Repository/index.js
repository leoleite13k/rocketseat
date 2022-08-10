import React, { Component } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Loading, Owner, IssueList, StateIssue, Footer } from './styles';

import api from '../../services/api';
import Container from '../../components/Container';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    stateCurrent: 'all',
    pageCurrent: 1,
  };

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          per_page: 15,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  async componentDidUpdate(_, prevState) {
    const { stateCurrent, pageCurrent } = this.state;

    if (
      prevState.stateCurrent !== stateCurrent ||
      prevState.pageCurrent !== pageCurrent
    ) {
      const { match } = this.props;
      const repoName = decodeURIComponent(match.params.repository);

      const issues = await api.get(`/repos/${repoName}/issues`, {
        params: {
          state: stateCurrent,
          per_page: 15,
          page: pageCurrent,
        },
      });

      this.setState({
        issues: issues.data,
        loading: false,
      });
    }
  }

  handleState = e => {
    const { target } = e;
    const { value } = target;

    switch (value) {
      case 'open':
        this.setState({ loading: true, stateCurrent: value, pageCurrent: 1 });
        break;

      case 'closed':
        this.setState({ loading: true, stateCurrent: value, pageCurrent: 1 });
        break;

      default:
        this.setState({ loading: true, stateCurrent: value, pageCurrent: 1 });
        break;
    }
  };

  render() {
    const {
      repository,
      issues,
      loading,
      stateCurrent,
      pageCurrent,
    } = this.state;

    if (loading) {
      return (
        <Loading>
          <strong>Carregando</strong>
          <FaSpinner color="#fff" size={30} />
        </Loading>
      );
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssueList>
          <StateIssue>
            <label>
              Todas
              <input
                type="radio"
                value="all"
                onClick={this.handleState}
                checked={stateCurrent === 'all'}
              />
            </label>
            <label>
              Abertas
              <input
                type="radio"
                value="open"
                onClick={this.handleState}
                checked={stateCurrent === 'open'}
              />
            </label>
            <label>
              Fechadas
              <input
                type="radio"
                value="closed"
                onClick={this.handleState}
                checked={stateCurrent === 'closed'}
              />
            </label>
          </StateIssue>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
        <Footer jc={pageCurrent > 1 && 'space-between'}>
          {pageCurrent > 1 && (
            <button
              onClick={() =>
                this.setState({ loading: true, pageCurrent: pageCurrent - 1 })
              }
            >
              Voltar
            </button>
          )}
          <button
            onClick={() =>
              this.setState({ loading: true, pageCurrent: pageCurrent + 1 })
            }
          >
            Próxima
          </button>
        </Footer>
      </Container>
    );
  }
}
