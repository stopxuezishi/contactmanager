import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import propTypes from 'prop-types';
import { Consumer } from '../../context';
import axios from 'axios';

class Contact extends Component {
    state ={
        showContactInfo:false,

    };

    onDeleteClick =async (id,dispatch)=>{
        try{
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
            dispatch({type: 'DELETE_CONTACT', payload: id});
        }catch(e){
            dispatch({type: 'DELETE_CONTACT', payload: id});
        }

        
    };

    onShowClick =e=>{
        this.setState ={
            showContactInfo:false
        };
    }

    render() {
        const { id,name,email,phone }=this.props.contact;
        const {showContactInfo} =this.state;
        return (
            <Consumer>
                {value=>{
                    const {dispatch} =value;
                    return (
                        <div className="card card-body mb-3">
                <h4>
                    {name} {' '}<button onClick={()=>this.setState({
                        showContactInfo:!this.state.showContactInfo
                    }
                    )}
                    className="fas fa-sort-down"
                    style={{cursor:'pointer'}}
                    />
                <button
                    onClick={this.onDeleteClick.bind(this,id,dispatch)}
                />
                <Link to={`contact/edit/${id}`}>
                    <button className="fas fa-pencil-alt"
                        style = {{cursor:'pointer',
                                  float:'right',
                                  color:'black',
                                  marginRight:'1rem'}} />
                </Link>
                </h4>
                {showContactInfo?(
                <ul className="list-group">
                    <li className="list-group-item">Email: {email}</li>
                    <li className="list-group-item">Phone: {phone}</li>
                </ul>):null}
            </div>
                    )
                }}
            </Consumer>
        );
    }
}
Contact.propTypes={
    contact: propTypes.object.isRequired,
};
export default Contact;