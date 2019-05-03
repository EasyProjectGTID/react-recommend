import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Recommand extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);

    this.state = { series: {}, like: [], dislike: [] };
    this.handleChange = this.handleChange.bind(this);
    this.removeByValue = this.removeByValue.bind(this);
  }

  removeByValue(arr, value) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === value) {
        arr.splice(i, 1);
      }
    }
    return arr;
  }

  handleChange(event) {
    var series = Object.assign({}, this.state.series);

    if (event.target.name === 'likeChecked') {
      if (series[event.target.value]['dislikeChecked'] === !event.target.value) {
        series[event.target.value][event.target.name] = event.target.checked;
        if (event.target.checked === true) {
            this.setState({like: [...this.state.like, event.target.value ]})
        } else {
          let nv = this.state.like
          let newLike = this.removeByValue(nv,event.target.value );
          this.setState({like: newLike})
          
        }
        this.setState({ series: series});
      } else {
        series[event.target.value][event.target.name] = event.target.checked;
        series[event.target.value]['dislikeChecked'] = !event.target.checked;
        let newLike = this.state.like;
        let newL = this.removeByValue(newLike, event.target.value);
        this.setState({ series: series, like: newL });
      }
    } else {
      console.log('toto1');
      if (series[event.target.value]['likeChecked'] === !event.target.value) {
        series[event.target.value][event.target.name] = event.target.checked;
        this.setState({ series: series });
      } else {
        series[event.target.value][event.target.name] = event.target.checked;
        series[event.target.value]['likeChecked'] = !event.target.checked;

        this.setState({ series: series });
      }
    }
  }

  componentWillMount() {
    const { getAllSerie } = this.props.actions;
    getAllSerie().then(response => {
      let newObject = [];
      response.data.map(
        item =>
          (newObject[item.pk] = { name: item.name, likeChecked: false, dislikeChecked: false }),
      );
      this.setState({ series: newObject });
    });
  }

  render() {
    const { allSeries } = this.props.home;
    return (
      <div className="home-recommand  ">
        <div
          className="row header justify-content-md-center fixed-top"
          style={{ 'margin-top': '5%' }}
        >
          <div className="col-md-2">
            <FontAwesomeIcon
              className="icon-vote"
              icon={faThumbsUp}
              size="4x"
              color="green"
              onClick={() => {
                this.formatToPost(this.props.movie.pk, '1');
              }}
            />
          </div>
          <div className="col-md-4 centre" />
          <div className="col-md-2">
            <FontAwesomeIcon className="icon-vote" icon={faThumbsDown} size="4x" color="red" />{' '}
          </div>
        </div>
        {Object.keys(this.state.series).map((item, i) => (
          <div className="row justify-content-md-center" key={i}>
            <div className="col-md-2">
              <div className="form-check form-check-inline">
                <input
                  type="checkbox"
                  value={item}
                  className="form-control"
                  name="likeChecked"
                  checked={this.state.series[item].likeChecked}
                  onClick={this.handleChange}
                />
              </div>
            </div>
            <div className="col-md-4 centre">
              <div className="name">{this.state.series[item]['name']}</div>
            </div>
            <div className="col-md-2">
              <div className="form-check form-check-inline">
                <input
                  type="checkbox"
                  value={item}
                  name="dislikeChecked"
                  className="form-control"
                  checked={this.state.series[item].dislikeChecked}
                  onClick={this.handleChange}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Recommand);
