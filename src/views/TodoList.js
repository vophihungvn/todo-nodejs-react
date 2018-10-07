import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Flex, Input, Button, Badge } from 'rebass';
import { actions } from '../store/reducer/todo';
import selectors from '../store/selector';

import Table, { Thead, Th, Td, Tr } from '../components/Table';

class TodoList extends Component {
  state = {
    todoContent: '',
  };

  submitTodo = e => {
    e.preventDefault();
    const { todoContent } = this.state;
    this.props.addTodo({
      title: todoContent,
    });
  };

  componentDidMount() {
    this.props.getTodos();
  }
 
  render() {
    const { todos } = this.props;
    return (
      <Flex flexDirection="column" width={'100vw'}>
        <Flex m={2} p={2}>
          <Input
            onChange={e => this.setState({ todoContent: e.target.value })}
            flex={1}
            mr={1}
          />
          <Button onClick={this.submitTodo}>Submit</Button>
        </Flex>
        <Flex m={2} p={2}>
          <Table flex={1}>
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Status</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <tbody>
              {todos.map((todo, i) => (
                <Tr key={i}>
                  <Td>{todo.title}</Td>
                  <Td textAlign="center"><Badge>{todo.finish ? 'Done' : 'Unfinish'}</Badge></Td>
                  <Td textAlign="center"><Button bg="red">Delete</Button></Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </Flex>
      </Flex>
    );
  }
}

const mapStateToProps = state => ({
  todos: selectors.getTodos(state) || [],
});

const mapDispatchToProps = dispatch => ({
  addTodo: actions.addTodo(dispatch),
  getTodos: actions.getTodos(dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
