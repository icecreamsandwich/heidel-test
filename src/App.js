import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import { id } from 'postcss-selector-parser';


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
    // var OP1 = {
    //   "91" :  1.1,
    //   "92" :  1.2,
    //   "931" :  1.6,
    //   "961" : 3.6,
    //   "268": 5.1,
    //   "46" : 0.17,
    //   "4620": 0.0,
    //   "468": 0.15,
    //   "4631": 0.15,
    //   "4673" : 0.9,
    //   "4672": 1.1
    // }
    // var OP2 =   {
    //  "971" : 1.4,
    //  "972" : 0.5,
    //  "961" : 3.6,
    //   "46" : 0.13,
    //   "4620": 0.6,
    //   "468": 0.47,
    //   "4631": 0.10,
    //   "4673" : 0.3,
    //   "4672": 1.0
    // }
    
    //Create two operator object randomly with some price lists
    var OP1 = { };
    for (var i = 0; i < 999; i++) {
      OP1[i] = i/50
    }
    var OP2 = { };
    for (var i2 = 0; i2 < 999; i2++) {
      OP2[i2] = i2/49
    }

    console.log(OP1);
    console.log(OP2);

    var countryCode = "";
    var countryCode2 = "";
    //Iterate through operator 1 price list
    for (var key in OP1) {
      if (OP1.hasOwnProperty(key)) {
        var val = OP1[key]; 
        if( key.charAt(0) === '+' )countryCode = key.slice(1);
        else countryCode = key;
        if (this.state.country.match("^"+countryCode)) {
          // do this if begins with particular country code
          var result1 = val;
          var prefixFound = true;
       }
       
        // if(countryCode == this.state.country){ 
        //   var result1 = val;
        //   var prefixFound = true;
        // }
      }
    }

       //Iterate through operator 2 price list
        for (var key in OP2) {
          if (OP2.hasOwnProperty(key)) {
            var val2 = OP2[key];
            if( key.charAt( 0 ) === '+' ) countryCode2 = key.slice(1);
            else countryCode2 = key;
            if (this.state.country.match("^"+countryCode2)) {
              // do this if begins with particular country code
              var result2 = val;
              var prefixFound2 = true;
           }
            /* if(countryCode2 == this.state.country){ 
              var result2 = val2;
              var prefixFound2 = true;
            } */
          }
         }

         //find if any matching prefixes entered
          if(prefixFound && prefixFound2){
              this.setState({
                resultA: result1,
                operatorA : "OP1",
                resultB: result2,
                operatorB : "OP2",
              });
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
             prefixFound = false;
          }
       if(!prefixFound) alert("No operator found !")    
  }

  render() {
    return (
      <div className="heidelForm">
      <h3> Sample Operator Price List calculator </h3>
      <form method="POST" onSubmit={this.handleSubmit}>
        <label>
          Please enter the telephone prefix (country + area code) without +:
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

      {(this.state.result)? 
         <label>
         You will be charged {this.state.resultA} per minute as per {this.state.operatorA} and    
       <br/>
         You will be charged {this.state.resultB} per minute as per {this.state.operatorB}     
       <br/>
       So better choose {this.state.operator}
      </label>
        :""}
     
       </div>
      
    );
  }
}

export default App;
