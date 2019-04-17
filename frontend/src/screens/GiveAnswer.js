import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { green } from '../resources/colors';
import { ListItem, SideList, Header, Footer } from '../components';

class GiveAnswer extends Component {
  state = {
    answers: [],
  };

  submitAnswer = e => {
    e.preventDefault();
    const answer = [
      {
        question_id: this.props.match.params.questionId,
        answer: e.target[0].value,
        user: 'TheUser',
      },
    ];
    this.setState({ answers: [...this.state.answers, ...answer] });
    e.currentTarget.reset();

    this.props
      .mutate({
        variables: {
          question_id: answer[0].question_id,
          answer: answer[0].answer,
          user: answer[0].user,
        },
      })
      .then(() => this.props.data.refetch())
      .catch(err => console.log(err));
  };

  renderQuestion() {
    if (this.props.data.loading) {
      return <h1>Loading...</h1>;
    } else {
      return (
        <ListItem
          title={this.props.data.question.title}
          user={'TheQuestionAsker'}
          date={'Just now'}
          likes={'0'}
        />
      );
    }
  }

  renderAnswers() {
    if (!this.props.data.loading && this.props.data.question.answers) {
      return this.props.data.question.answers.map(({ answer, _id }) => {
        return (
          <ListItem
            key={_id}
            title={answer}
            user={'TheAnswerGiver'}
            date={'10000 B.C.'}
            likes={'0'}
          />
        );
      });
    }
  }

  render() {
    return (
      <div style={container}>
        <Header />
        <div style={gridView}>
          <SideList />
          <div style={listview}>
            {/* Question */}
            {this.renderQuestion()}
            {console.log(this.props)}

            {/* Submit answer form */}
            <h1 style={{ color: '#7f7f7f' }}>Your answer</h1>
            <form style={{ display: 'flex' }} onSubmit={this.submitAnswer}>
              <textarea style={textareaStyle} placeholder="Enter answer..." />
              <button style={btn} type="submit">
                Answer
              </button>
            </form>
            {/* List of answers */}
            {this.renderAnswers()}
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

const GET_QUESTION = gql`
  query getQuestion($_id: ID!) {
    question(_id: $_id) {
      title
      question
      answers {
        _id
        answer
      }
    }
  }
`;

const CREATE_ANSWER = gql`
  mutation createAnswer($question_id: ID!, $answer: String!) {
    createAnswer(question_id: $question_id, answer: $answer) {
      _id
      answer
    }
  }
`;

// const updateAnswer = gql`
//   mutation updateAnswer($question_id: ID!, $_id: ID!, $newAnswer: String!) {
//     updateAnswer(question_id: $question_id, _id: $_id, newAnswer: $newAnswer) {
//       _id
//     }
//   }
// `;

// const deleteAnswer = gql`
//   mutation deleteAnswer($question_id: ID!, $_id: ID!) {
//     deleteAnswer(question_id: $question_id, _id: $_id) {
//       _id
//     }
//   }
// `;

export default compose(
  graphql(GET_QUESTION, {
    options: props => {
      return { variables: { _id: props.match.params.questionId } };
    },
  }),
  graphql(CREATE_ANSWER)
)(GiveAnswer);

const container = {
  color: '#7f7f7f',
};

const listview = {
  display: 'flex',
  flex: 3,
  flexDirection: 'column',
  maxWidth: '50%',
};
const gridView = {
  display: 'flex',
  flex: 1,
  flexDirection: 'row',
  marginTop: 40,
};

const textareaStyle = {
  width: '412px',
};

const btn = {
  backgroundColor: green,
  width: 100,
  height: 36,
  alignItems: 'center',
  fontSize: 14,
  color: 'white',
  fontFamily: 'Poppins',
  border: '0px',
};
