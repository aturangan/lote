import React from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import MapContainer from './MapContainer';
import Card from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';

class NewLote extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      lock: false,
      redirect: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLockToggle = this.handleLockToggle.bind(this);
    this.handleRecipientChange = this.handleRecipientChange.bind(this);
  }

  handleRecipientChange (event, index, receiver) {
    // console.log ('receiver id', receiverId);
    this.props.setActiveContact(receiver);
    // console.log (this.props.activeContact.id);
    // this.props.setActiveContact(receiver);
  }

  handleLockToggle(event, checked) {
    this.setState({ lock: checked });
  }

  handleSubmit(event) {
    event.preventDefault();

    axios.post(`/api/profiles/${this.props.profile.id}/lotes`, {
      senderId: this.props.profile.id,
      receiverId: this.props.activeContact.id,
      loteType: 'lotes_text',
      message: this.props.activeMessage,
      lock: this.state.lock
    })
    .then((res) => {
      this.props.setActiveMessage('');
      this.props.getLotes(this.props.profile.id);
      this.setState({ redirect: true });
      console.log (res);
    })
    .catch((err) => {
      console.log (err);
    });

  }

  render() {
    return (
      <div className='newLoteContainer'>
        { this.state.redirect && <Redirect to='/lotes' /> }
        <h1>New Lote</h1>
        <Card>
          <DropDownMenu ref="receiver" value={ this.props.activeContact.id ? this.props.activeContact : this.props.profile } onChange={ this.handleRecipientChange } openImmediately={ false }>
            <MenuItem value={ this.props.profile } primaryText={ this.props.profile.display + ' (Self)' }/>
            {this.props.contacts.map((contact, i) => {
              return (
                contact.receiver_id !== this.props.profile.id &&
                  <MenuItem key={i + 1} value={ contact.receiver } primaryText={ contact.receiver.display ? contact.receiver.display : contact.receiver.email }/>
              );
            })}
          </DropDownMenu>

          <form className="lote-form" ref="loteForm" onSubmit={ this.handleSubmit }>
            <div>
              <label className="lote-form-label">
                <TextField multiLine={true} rows={1} className="lote-form-input-message" ref="message" type="text" name="message" value={ this.props.activeMessage } onChange={ (event) => this.props.setActiveMessage(event.target.value) } />
              </label>
            </div>
            <div>
              <Checkbox label='Location-Locked' checked={ this.state.lock } onCheck={ this.handleLockToggle } />
            </div>
            <div>
              <RaisedButton labelColor='white' backgroundColor='#0740C3' className="submitButton" label="Submit" onTouchTap={ this.handleSubmit }/>
            </div>
          </form>

          <MapContainer {...this.props} />
        </Card>
      </div>
    );
  }
}

export default NewLote;
