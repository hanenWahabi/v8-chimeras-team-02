import React, { Component } from "react";
import { user } from "../resources/images";
import { blue, green } from "../resources/colors";
import { Header, ListItem, Footer } from "../components";

export default class NewQuestion extends Component {
  state = {
    questions: ['This is just a random question(?)'],
    newTitle: []
  };

  askQuestion = e => {
    e.preventDefault();
    this.setState({
      questions: [...this.state.questions, this.state.newTitle],
      newTitle: []
    });
  };

  handleChange = e => {
    this.setState({ newTitle: e.target.value });
  };

  render() {
    return (
      <div style={container}>
        <Header />

        <div style={gridView}>
          <div>
            {this.state.questions.map(question => (
              <ListItem
                title={question}
                user={"User001"}
                date={"Just now"}
                likes={"0"}
              />
            ))}
          </div>
        </div>

        <div style={gridView}>
          <div style={formView}>
            <form onSubmit={this.askQuestion}>
              <textarea
                style={newQuestionForm}
                placeholder="Add new question"
                value={this.state.newTitle}
                onChange={this.handleChange}
              />
              <br />
              <button type="submit" style={askBtn}>
                Ask
              </button>
            </form>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

const container = {
  backgroundColor: blue
};
const formView = {
  display: "flex",
  flex: 3,
  justifyContent: "center"
};
const gridView = {
  display: "flex",
  flex: 1,
  flexDirection: "row",
  marginTop: 40,
  color: "white",
  justifyContent: "center"
};
const newQuestionForm = {
  width: "80vw",
  margin: "0 auto"
};

const askBtn = {
  backgroundColor: green,
  width: 100,
  height: 36,
  alignItems: "center",
  fontSize: 14,
  color: "white",
  fontFamily: "Poppins",
  border: "0px"
};