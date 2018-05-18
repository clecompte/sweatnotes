import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateSet } from '../../actions';

class SetList extends Component {
  render() {
    return (

        this.props.exercise.sets.map((set, setId) =>
          set === null ? '' : (
            <div key={setId}>
              <hr />
              <h6><strong>Set #{setId}</strong></h6>
              <p>
                <strong>Quantity:</strong> {set.quantity} {this.props.exercise.quantityUnit}
                <button onClick={() => this.props.updateSet('increase', this.props.exercise, set, this.props.exerciseId, setId)}>Increase</button>
                <button onClick={() => this.props.updateSet('decrease', this.props.exercise, set, this.props.exerciseId, setId)}>Decrease</button>
              </p>
              <p><strong>Exertion:</strong> {set.exertion} {this.props.exercise.exertionUnit}</p>
            </div>
          )
        )  
    )
  }
}

function mapStateToProps(state) {
  return { updateSet: state.updateSet };
}

export default connect(mapStateToProps, { updateSet })(SetList);