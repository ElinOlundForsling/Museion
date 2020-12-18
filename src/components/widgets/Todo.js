import React from 'react';
import Widget from '../layout/Widget';

const Todo = () => {
  console.log('Todooo');
  return (
    <Widget
      heading='Todo'
      subHeading="What's going on?"
      className='todo-component'>
      Todo
    </Widget>
  );
};

export default Todo;
