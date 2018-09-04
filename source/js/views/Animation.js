import React from 'react';

class AnimationComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      currentState: false,
    };
  }
  componentWillMount() {
    setTimeout(() => {
      this.setState({
        currentState: true,
      });
    }, 3000);
  }
  render() {
    return (
      <div className={ `animation-demo ${ this.state.currentState ? 'loaded' : '' }` }>
        <div className="picture-container">
          <div className="picture">
            <div className="back">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </div>
            <img className="front" src='https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.0-9/26196205_1625861000805228_6505967545545579185_n.jpg?_nc_cat=0&oh=bff56b0eb87351cc0704f97f8c6e5c1e&oe=5BF4D0AC' />
          </div>
          <div className="picture">
            <div className="back">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </div>
            <img className="front" src='https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.0-9/26196205_1625861000805228_6505967545545579185_n.jpg?_nc_cat=0&oh=bff56b0eb87351cc0704f97f8c6e5c1e&oe=5BF4D0AC' />
          </div>
        </div>
        <div className='box box1' />
        <div className='box box2' />
        <div className='box box3' />
        <div className='loading-indicator' />
        <div className='loader-wrapper-1' />
        <div className='loader-wrapper-2' />
      </div>
    );
  }
}

export default AnimationComponent;
