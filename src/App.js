import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { id } from 'postcss-selector-parser';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
       country: '',
       number:'',
       result:'',
       operator:'',
       bestop:'',
    };

    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCountryChange(event) {
     this.setState({country: event.target.value});
    //  console.log("country:"+event.target.value);
    //  alert('A name was submitted: ' + event.target.value);
  }
  handleNumberChange(event) {
    // this.setState({number: event.target.value});
    // console.log("number:"+event.target.value);
  }

  handleSubmit() {
    var OP1 = {
      "91" :  1.1,
      "92" :  1.2,
      "931" :  1.6,
      "961" : 3.6,
      "268": 5.1,
      "46" : 0.17,
      "4620": 0.0,
      "468": 0.15,
      "4631": 0.15,
      "4673" : 0.9,
      "4672": 1.1
    }
    var OP2 =   {
     "971" : 1.4,
     "972" : 0.5,
     "961" : 3.6,
      "46" : 0.13,
      "4620": 0.6,
      "468": 0.47,
      "4631": 0.10,
      "4673" : 0.3,
      "4672": 1.0
    }
    var countryCode = "";
    var countryCode2 = "";
    //Iterate through operator 1 price list
    for (var key in OP1) {
      if (OP1.hasOwnProperty(key)) {
        var val = OP1[key]; 
        if( key.charAt(0) === '+' )countryCode = key.slice(1);
        else countryCode = key;
        //  console.log("OP1 :"+val);
        if(countryCode == this.state.country){ 
          /* this.setState({result: val,
            operator : "OP1"
          }); */
          var result1 = val;
          var prefixFound = true;
        }
      }
    }

       //Iterate through operator 2 price list
        for (var key in OP2) {
          if (OP2.hasOwnProperty(key)) {
            var val2 = OP2[key];
            if( key.charAt( 0 ) === '+' ) countryCode2 = key.slice(1);
            else countryCode2 = key;
            //  console.log("OP2 :"+val);
            if(countryCode2 == this.state.country){ 
             /*  this.setState({result: val2,
                operator : "OP2"
              }); */
              var result2 = val2;
              var prefixFound2 = true;
            }
          }
         }

         //find if any matching prefixes entered
          if(prefixFound && prefixFound2){
              if(result1 < result2){
                this.setState({result: result1,
                  operator : "OP1"
                });
              }
              else if(result2 < result1){
                this.setState({result: result2,
                  operator : "OP2"
                });
              }
              else if(result2 == result1){
                this.setState({result: "SAME",
                });
              }
          }
          else if(prefixFound){
            this.setState({result: result1,
              operator : "OP1"
            });
          }
          else if(prefixFound2){
            this.setState({result: result2,
              operator : "OP2"
            });
          }
          else {
            var prefixFound = false;
          }
       if(!prefixFound) alert("No operator found !")    
  }

  render() {
    return (
      <div className="heidelForm">
      <h3> Sample Price List calulator </h3>
      <form method="POST" onSubmit={this.handleSubmit}>
        <label>
          Please enter the coutry code:
          <input name="country" type="text" maxLength="4" onChange={this.handleCountryChange} />
        </label>
        <br/>
        <label className="desc"> For eg: 91, 971, 974 etc.. maximum 4 numbers </label>
        <br/>
        <label>
          Please enter the telephone number:
          <input  name="number" type="text"  maxLength="10" onChange={this.handleNumberChange} />
        </label>
        <br/>
        <input type="button" value="Submit" onClick={this.handleSubmit} />
      </form>
      {(this.state.result== "SAME")?<label>
        Both operator 1 and 2 have same charge for this number
      </label>:""}

      {(this.state.result)?  <label>
        You will be charged {this.state.result} per minute as per {this.state.operator}
      </label>
        :""}
     
       </div>
      
    );
  }
}

export default App;
