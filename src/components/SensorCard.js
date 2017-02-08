import React, {PropTypes} from "react";
import "./SensorCard.scss";

export class SensorCard extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {onAction, onSettings, status} = this.props

    return (
        <div className='sensor-card'>
          <div className='sensor-card-header'>{this.props.name}</div>
          <div className='sensor-card-content'>
            <div className='sensor-card-image-container'>
              <img className='sensor-card-image' src={this.props.thumbnail}/>
              <div className='sensor-card-image-description'>
                {this.props.description}
              </div>
            </div>
            <div className='sensor-card-buttons'>
              <button className="primary" onClick={onAction}>{this.props.actionText}</button>
              <button onClick={onSettings}>Settings</button>
            </div>
          </div>
          <div className='sensor-card-footer'>{status}</div>
        </div>
    );
  }
}

SensorCard.propTypes = {
  onAction: PropTypes.func.isRequired,
  onSettings: PropTypes.func.isRequired,
}