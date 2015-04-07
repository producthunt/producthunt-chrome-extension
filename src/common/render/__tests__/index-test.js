jest.autoMockOff();

describe('render', function() {
  let React = require('react');
  let render = require('../');
  let Dummy = React.createClass({
    render() {
      return <h1>Foo</h1>;
    }
  });

  it('renders a react component into the body', function() {
    render(<Dummy />);
    expect(document.querySelector('h1')).toBeTruthy();
  });


  it('renders a react component into supplied element', function() {
    let container = document.createElement('div');
    render(<Dummy />, container);
    expect(container.querySelector('h1')).toBeTruthy();
  });
});
