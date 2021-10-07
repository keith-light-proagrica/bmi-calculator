import React, { Component } from "react";

const minValues = {
  height: 140,
  weight: 41,
};

const maxValues = {
  height: 211,
  weight: 132,
};

class Form extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      height: "",
      weight: "",
      BMI: "",
      isHealthy: "",
      isHealthyText: "",
    };

    this.state = this.initialState;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  isHealthyRange(BMI) {
    let isHealthy;
    let isHealthyText;

    if (BMI < 18.5) {
      isHealthy = "underweight";
      isHealthyText = "underweight";
    } else if (BMI < 25) {
      isHealthy = "healthy";
      isHealthyText = "a healthy weight";
    } else if (BMI < 30) {
      isHealthy = "overweight";
      isHealthyText = "overweight";
    } else {
      isHealthy = "obese";
      isHealthyText = "obese";
    }

    this.setState({
      isHealthy: isHealthy,
      isHealthyText: isHealthyText,
    });
  }

  handleChange(event) {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    // console.log(event);

    const { height, weight } = this.state;

    if (height < minValues.height) {
      console.log("too small");
    }

    if (height > maxValues.height) {
      console.log("too big");
    }

    if (weight < minValues.weight) {
      console.log("too light");
    }

    if (weight > maxValues.weight) {
      console.log("too heavy");
    }

    // Convert to inches
    // Formula - divide the length value by 2.54
    const heightInches = height / 2.54;
    // Convert to lb
    // Formula - for an approximate result, multiply the mass value by 2.205
    const weightPounds = weight * 2.205;
    // Work out BMI
    // Formula - weight (lb) / [height (in)]2 x 703
    const BMI = ((weightPounds / heightInches / heightInches) * 703).toFixed(1);

    this.setState({ BMI: BMI });
    this.isHealthyRange(BMI);
  }

  handleReset = (event) => {
    event.preventDefault();
    // console.log(event);

    this.setState(() => this.initialState);
  };

  render() {
    const { height, weight, BMI, isHealthy, isHealthyText } = this.state;
    
    return (
      <main className="container">
        <form className="standard-form" onSubmit={this.handleSubmit}>
          <div className="form-body">
            <ul className="form-fields">
              <li className="form-row">
                <fieldset className="form-field">
                  <label className="label-container" htmlFor="height">
                    <span className="form-label">Height</span>
                    <strong className="required">
                      <abbr title="required">*</abbr>
                    </strong>
                    <em className="label-description">In cm</em>
                  </label>
                  <div className="input-container">
                    <input id="height" name="height" type="number" value={height} onChange={this.handleChange} required />
                  </div>
                </fieldset>
              </li>
              <li className="form-row">
                <fieldset className="form-field">
                  <label className="label-container" htmlFor="weight">
                    <span className="form-label">Weight</span>
                    <strong className="required">
                      <abbr title="required">*</abbr>
                    </strong>
                    <em className="label-description">In kg</em>
                  </label>
                  <div className="input-container">
                    <input id="weight" name="weight" type="number" value={weight} onChange={this.handleChange} required />
                  </div>
                </fieldset>
              </li>
            </ul>
          </div>
          <div className="form-footer">
            <div className="btn-row btn-row--end">
              <button className="btn" type="reset" onClick={this.handleReset}>
                Reset
              </button>
              <button className="btn" type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
        {BMI !== "" && (
          <div className="result" data-value={isHealthy}>
            <h2>BMI - {BMI}</h2>
            <p>
              Your result suggests you are <strong>{isHealthyText}</strong>
            </p>
          </div>
        )}
      </main>
    );
  }
}

export default Form;
