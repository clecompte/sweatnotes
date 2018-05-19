import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateSet } from '../../actions';

class SetList extends Component {
  render() {
    const exercise = this.props.exercise.sets;
    const sortedSets = exercise.sort((a, b) => {
      if (a.quantity < b.quantity)
        return -1;
      if (a.quantity > b.quantity)
        return 1;
      return 0;
    });



    return (
      sortedSets.map((set, setId) =>
          set === null ? '' : (
            <div key={setId}>
              <hr />
              <h6><strong>Set #{setId}</strong></h6>
              <p>
                <strong>Quantity:</strong> {set.quantity} {this.props.exercise.quantityUnit}
              </p>
              <p><strong>Exertion:</strong> {set.exertion} {this.props.exercise.exertionUnit}</p>
              <button onClick={() => this.props.updateSet('increase', this.props.exercise, set, this.props.exerciseId, setId)}>Increase</button>
              <button onClick={() => this.props.updateSet('decrease', this.props.exercise, set, this.props.exerciseId, setId)}>Decrease</button>
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