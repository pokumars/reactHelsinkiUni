import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { prettyDOM, fireEvent } from '@testing-library/dom';

import Note from './Note';

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  };

  //method 1 of ways of investigating the content of the component being tested
  const component = render(
    <Note note = {note} />
  );

  //component.debug();

  const li = component.container.querySelector('li');
  console.log(prettyDOM(li));

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  );

  //method 2
  const element =component.getByText(
    'Component testing is done with react-testing-library'
  );
  expect(element).toBeDefined();

  //method 3
  const div = component.container.querySelector('.note');
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  );
});

test('clicking the button calls eventHandler once',() => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  };

  const mockHandler = jest.fn();

  const { getByText } = render(
    <Note note={note} toggleImportance={mockHandler} />
  );

  const button = getByText('make not important');
  fireEvent.click(button);

  expect(mockHandler.mock.calls.length).toBe(1);
});