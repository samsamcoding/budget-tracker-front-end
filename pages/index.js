import Link from "next/link";
import { Jumbotron, Button } from "react-bootstrap";
import React, {Component} from 'react';
import {DateTime} from 'luxon';
import Modal from 'react-modal';
// import "../styles/globals.css";

const NAME_LS = 'NAME_LS';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '100',
  }
};

class TimeHero extends Component {
  
  constructor() {
    super();
    
    var time = this.getTime();

    this.state = {
      time,
      name: '',
      isNameRequired: false,
      salutation: this.determineSalutation(time.hour),
      quote: null,
      geolocation: {
        latitude: null,
        longitude: null
      },
    };

    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  closeModal() {
    this.setState({modalIsOpen: false});
    this.setState({name: this.state.inputValue});
    localStorage.setItem(NAME_LS, this.state.inputValue);
  }

  handleChange(e) {
    this.setState({inputValue: e.target.value});
  }

  componentDidMount() {
    const name = localStorage.getItem(NAME_LS);
    if (name) {
      this.setState({name});
    } else {
      this.setState({modalIsOpen: true});
    }

    setInterval(() => {
      var time = DateTime.local();
      this.setState({
        time,
        salutation: this.determineSalutation(time.hour)
      });
    }, 1000 * 1);
  }

  determineSalutation(hour) {
    if (hour > 11 && hour < 19) {
      return 'afternoon';
    } else if (hour > 18) {
      return 'evening';
    } else {
      return 'morning';
    }
  }

  getTime() {
    return DateTime.local();
  }
  
  render() {
    return (
      <div style={{ 
        backgroundImage: `url("https://images.unsplash.com/photo-1622126958838-2e280164477e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80")`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        }}>

        <div className="bg-wrapper">
          <div className="text-center centered">
            <div className="block-text"  >
              <h1 id="time">{this.state.time.toFormat("h':'mm")}</h1>
              <h2 id="ampm">{this.state.time.toFormat('a')}</h2>
            </div>
            <h3 id="greetings">
              Good {this.state.salutation}, {this.state.name}
            </h3>

            <Modal
              isOpen={this.state.modalIsOpen}
              style={customStyles}
              contentLabel="name-modal"
            >
              <div class="mb-3">What's your name?</div>
                <input class="form-control pl-4" name="name" type="text" onChange={this.handleChange}/>
                <button class="btn btn-info mt-3" onClick={this.closeModal}>
                  Next
                </button>
            </Modal>
          </div>

          <div className="text-center welcome-text quote">
            
          <h4 className="pt-20">Welcome to <em><b>Sulitipid</b></em> Budget Tracking App </h4>
            {/* <p>Know where your money go. Save yourself from the heist of untracked expenses...</p> */}
            <div className="pt-20"> 
              <Button>
                <Link href="/login">
                  <a style={{ textDecoration: "none", color: "white"}}>
                    Get Started
                  </a>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TimeHero;

