import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amountDue: "",
      amountReceived: "",
      output: "",
      twenties: "",
      tens: "",
      fives:"",
      ones:"",
      quarters:"",
      dimes:"",
      nickels:"",
      pennies:""

    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.calculate = this.calculate.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.breakdownChange = this.breakdownChange.bind(this);

  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  calculate() {
    const amountDue = (this.state.amountDue);
    const amountReceived = (this.state.amountReceived);
    const change = amountReceived - amountDue;
    return change;
  }

  breakdownChange(){
    //how much total change should be given
    let change = this.calculate();
    console.log("breakdown change", change);

    //how many dollars in change
    let dollars = parseInt(change);
    console.log("dollars", dollars);

    //how many twenties in change
    let twenties = parseInt(dollars/20);
    console.log("twenties", twenties);
    

    //remainder of dollars after twenties are subtracted
    let dollarsLeft = dollars - (twenties*20);
    console.log("dollars left", dollarsLeft)

    //how many tens in change
    let tens = parseInt(dollarsLeft/10);
    console.log("tens", tens);
    

    //remainder of dollars after tens are subracted
    dollarsLeft -= (tens*10);
    console.log("dollars left", dollarsLeft);

    //how many fives in change
    let fives = parseInt(dollarsLeft/5);
    console.log("fives", fives);

    //remainder of dollars after fives are subracted
    dollarsLeft -= (fives*5);
    console.log("dollars left", dollarsLeft);

    //how many ones in change
    let ones = dollarsLeft;
    console.log("ones", ones);

    //how much cents total in change
    let cents = change - dollars;
    cents = Math.round(100*cents)/100;
    console.log("cents", cents);

    //how many quarters in change
    let quarters = parseInt(cents/.25);
    console.log("quarters", quarters);


    //remainder of cents after quarters is subracted
    let changeLeft = Math.round(100*(cents%.25))/100;
    console.log("change left", changeLeft);

    //how many dimes in change
    let dimes = parseInt(changeLeft/.1);
    console.log("dimes", dimes);

    
    //remainder of cents after dimes is subracted
    changeLeft = Math.round(100*(changeLeft%.1))/100;
    console.log("change left", changeLeft);

    //how many nickels in change
    let nickels = parseInt(changeLeft/.05);
    console.log("nickels", nickels);


    //remainder of cents after nickels is subracted
    changeLeft = Math.round(100*(changeLeft%.05))/100;
    console.log("change left", changeLeft);

    //how many pennies in change
    let pennies = parseInt(changeLeft/.01);
    console.log("pennies", pennies);

    this.setState ({
      twenties: `${twenties}`,
      tens: `${tens}`,
      fives: `${fives}`,
      ones: `${ones}`,
      quarters: `${quarters}`,
      dimes: `${dimes}`,
      nickels: `${nickels}`,
      pennies: `${pennies}`

    });


}

  handleClick(){
    const result = this.calculate();
    const element = document.getElementById('toggle');
    if(result >= 0){
      this.setState ({
        output: `The total change due is $${result.toFixed(2)}`
      });
      element.classList.remove("alert-danger");
      element.classList.add("alert-success");
      this.breakdownChange();
    } else {
      this.setState ({
        output: `$${Math.abs(result)} is owed`,
        twenties: "",
        tens: "",
        fives: "",
        ones: "",
        quarters: "",
        dimes: "",
        nickels: "",
        pennies: ""
      });
      element.classList.remove("alert-success");
      element.classList.add("alert-danger");
    }


  }

  render() {
    return (
      <div className="container-fluid">
        <h1>Change Calculator</h1>
        <hr/>
        <div className="row">
          <div className="col-sm-4" style={{backgroundColor: 'lavender'}}>
            <div className="panel panel-default">
              <div className="panel-heading "></div>
                <form className="form-horizontal card card-body">
                  <div className="form-group">
                    <h6>Enter Information</h6>
                    <label htmlFor="inputDue" className="control-label">How much is Due?</label>
                    <div className="col-sm-10">

                    {/*input amount due*/}
                    <input 
                    onChange={this.handleInputChange} 
                    value={this.state.amountDue} 
                    type="number" 
                    name="amountDue" 
                    id ="inputDue" 
                    placeholder="Amount Due"/>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="inputReceived" className="control-label">How much was received?</label>
                    <div className="col-sm-10">

                    {/*input amount received*/}
                    <input onChange={this.handleInputChange} 
                    value={this.state.amountReceived} 
                    name="amountReceived" 
                    type="number" 
                    id="inputReceived" 
                    placeholder="Amount Received"/>
                    </div>
                  </div>
                  
                  {/*calculate button and click event */}
                  <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                    <button className="btn btn-primary" type="button" name="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      this.handleClick(e);
                    }}>Calculate</button>
                    </div>
                  </div>
        		    </form>
            </div>
          </div>


          {/*Success and Danger Alerts*/}
          <div className="col-sm-8" style={{backgroundColor:'lavenderblush'}}>
            <div className="alert" id="toggle" name="output" role="alert">{this.state.output}</div>
            
            {/*Grid for Total Change Due*/}
            <div className="row">
              <div className="col-lg-3 text-center card card-body">
                <label>Twenties</label>
                <p className="change">{this.state.twenties}</p>
              </div>
              
              <div className="col-lg-3 text-center card card-body">
              <label>Tens</label>
                <p className="change">{this.state.tens}</p>
              </div>
              <div className="col-lg-3 text-center card card-body">
              <label>Fives</label>
                <p className="change">{this.state.fives}</p>
              </div>
              <div className="col-lg-3 text-center card card-body">
              <label>Ones</label>
                <p className="change">{this.state.ones}</p>
              </div>
            </div>
          
            <div className="row">
              <div className="col-lg-3 text-center card card-body">
              <label>Quarters</label>
                <p className="change">{this.state.quarters}</p>
              </div>
              <div className="col-lg-3 text-center card card-body">
              <label>Dimes</label>
                <p className="change">{this.state.dimes}</p>
              </div>
              <div className="col-lg-3 text-center card card-body">
              <label>Nickels</label>
                <p className="change">{this.state.nickels}</p>
              </div>
              <div className="col-lg-3 text-center card card-body">
              <label>Pennies</label>
                <p className="change">{this.state.pennies}</p>
              </div>
            </div>

          </div>
        </div>
    </div>

    ); 
  }
}

export default App;
