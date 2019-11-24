import React from 'react';
import { render, fireEvent, prettyDOM } from '@testing-library/react';
import Togglable from './Togglable';

describe ('<Togglable />',() => {
  let component;

  beforeEach(() => {
    component = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv" />
      </Togglable>
    );
  });

  test('renders its children', () => {
    component.container.querySelector('.testDiv');
  });

  test('At the start, the content is not displayed', () => {
    const div = component.container.querySelector('.togglableContent');

    expect(div).toHaveStyle('display: none');
  });

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('show...');
    fireEvent.click(button);

    const div = component.container.querySelector('.togglableContent');
    expect(div).not.toHaveStyle('display: none');
  });

  test('toggled content can be closed',() => {
    const button = component.container.querySelector('button');
    fireEvent.click(button);

    const closeButton = component.getByText('cancel');
    console.log(prettyDOM(closeButton));
    fireEvent.click(closeButton);

    const div = component.container.querySelector('.togglableContent');
    expect(div).toHaveStyle('display: none');

  });
});