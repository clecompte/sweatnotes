import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateSet, addSet } from '../../actions';

class SetList extends Component {
  state = {
    showAddSetForm: false,
    addSetQuantity: '',
    addSetExertion: ''
  };

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


        {this.state.showAddSetForm &&
          <div>
            <form>
              <label>Quantity <small>(e.g. Number of Reps)</small></label>
              <input name="quantity" onChange={event => this.setState({ addSetQuantity: event.target.value })} />
            <label>Exertion <small>(e.g. Pounds of Weight)</small></label>
              <input name="exertion" onChange={event => this.setState({ addSetExertion: event.target.value })} />
            </form>
            <div className="btn-group m_inline">
              <button
                className="btn btn-action"
                onClick={
                  () => this.props.addSet(
                    this.props.exercise._id,
                    this.state.addSetQuantity,
                    this.state.addSetExertion,
                    () => {
                      this.setState({ showAddSetForm: false });
                    }
                  )
                }
              >
                Add
            </button>
              <button className="btn btn-mute" onClick={() => this.setState({ showAddSetForm: false })}>Cancel</button>
            </div>
          </div>
        }
        {!this.state.showAddSetForm &&
          <div className="btn-group">
            <button className="btn btn-action" onClick={() => this.setState({ showAddSetForm: true })}>Add Set</button>
          </div>
        }
      </div>

    )
  }
}

function mapStateToProps(state) {
  return { updateSet: state.updateSet };
}

export default connect(mapStateToProps, { updateSet, addSet })(SetList);