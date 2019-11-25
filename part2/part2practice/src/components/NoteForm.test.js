import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import NoteForm from './NoteForm';
import { render, fireEvent } from '@testing-library/react';

const Wrapper = (props) => {
  const onChange = (event) => {
    props.state.value = event.target.value;
  };

  return (
    <NoteForm
      newNote ={props.state.value}
      addNote= {props.addNote}
      handleNoteChange={onChange} />
  );
};

test('<NoteForm /> updates parent state and calls onSubmit', () => {
  const addNote= jest.fn();
  const state = {
    value: ''
  };
  const component = render(
    <Wrapper addNote={addNote} state={state}/>
  );

  const input = component.container.querySelector('input');
  const form = component.container.querySelector('form');

  fireEvent.change(input, { target: { value:'testing of forms could be easier' } });
  fireEvent.submit(form);

  expect(state.value).toBe('testing of forms could be easier');
  expect(addNote.mock.calls.length).toBe(1);
});
