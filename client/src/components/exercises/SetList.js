import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateSet } from '../../actions';

class SetList extends Component {
  render() {
    const exercise = this.props.exercise.sets;

    return (
      <div className="c_sets">
        {exercise.map((set, setId) => set === null ? '' : (
          <div key={setId} className="set">
            <button className="set-increase" onClick={() => this.props.updateSet('increase', this.props.exercise, set, this.props.exerciseId, setId)}>Increase</button>
            <div className="set-details">
              <p className="set-details-number"><strong>Set {setId + 1}</strong></p>
              <p className="set-details-quantity"><strong>Quantity</strong> {set.quantity} {this.props.exercise.quantityUnit}</p>
              <p className="set-details-exertion"><strong>Exertion</strong> {set.exertion} {this.props.exercise.exertionUnit}</p>
            </div>
            <button className="set-decrease" onClick={() => this.props.updateSet('decrease', this.props.exercise, set, this.props.exerciseId, setId)}>Decrease</button>
          </div>
        ))}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { updateSet: state.updateSet };
}

export default connect(mapStateToProps, { updateSet })(SetList);