// Post.js
import React, { Component } from 'react';
import axios from 'axios';

class Post extends Component {
  state = {
    data: null
  }

  async initialize() {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
      this.setState({
        data: response.data
      });
    } catch (e) {
      console.log(e);
    }
  }

  componentDidMount() {
    this.initialize();  
  }

  render() {
    const { data } = this.state;
    if (!data) return null;
    return (
      <div>
        { JSON.stringify(data) }    
      </div>
    );
  }
}

export default Post;

// Comment.js
import React, { Component } from 'react';
import axios from 'axios';

class Comments extends Component {
  state = {
    data: null
  }

  async initialize() {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/comments?postId=1');
      this.setState({
        data: response.data
      });
    } catch (e) {
      console.log(e);
    }
  }

  componentDidMount() {
    this.initialize();
  }

  render() {
    const { data } = this.state;
    if (!data) return null;
    return (
      <div>
        {JSON.stringify(data)}
      </div>
    );
  }
}

export default Comments;

/* 
- 위처럼 반복되는 코드를 발견한다.
- HOC의 이름은 주로 with__ 형식으로 짓는다.
- HOC는, 파라미터로 컴포넌트를 받아오고, 함수 내부에서 새 컴포넌트를 만든 다음에
  해당 컴포넌트 안에서 파라미터로 받아온 컴포넌트를 렌더링하는 것이다.
  자신이 받아온 props들은 그대로 파라미터로 받아온 컴포넌트에 다시 주입해주고,
  필요에 따라 추가 props도 넣어준다.
 */

// withRequest.js
import React, { Component } from 'react';
import axios from 'axios';

const withRequest = (url) => (WrappedComponent) => {
  /* (url, WrappedComponent) 형식으로 하지 않은 이유는, 나중에 여러 개의 HOC를 
    합쳐서 사용할 때 더욱 편하게 사용하기 위함이다(compose 활용) */
  return class extends Component {
    state = {
      data: null
    }

    async initialize() {
      try {
        const response = await axios.get(url);
        this.setState({
          data: response.data
        });
      } catch (e) {
        console.log(e);
      }
    }

    componentDidMount() {
      this.initialize();
    }
  
    render() {
      const { data } = this.state;
      return (
        <WrappedComponent {...this.props} data={data} />
      )
    }
  }
}

export default withRequest;

// HOC 사용하기(Post.js)
import React, { Compoenent } from 'react';
import withRequest from './withRequest';

class Post extends Component {
  render() {
    const { data } = this.props;
    if (!data) return null;
    return (
      <div>
        {JSON.stringify(this.props.data)}
      </div>
    );
  }
}

export default withRequest('https://jsonplaceholder.typicode.com/posts/1');

// 이렇게 웹 요청을 하는 외에도, LifeCycle 메소드를 붙여준다던지, Redux에서 특정 값을
// 받아 주입해준다던지, 다국어 지원을 한다던지 등 여러가지 일들을 할 수 있다.

// recompose라는 라이브러리는 페이스북 개발자가 만든 유용한 HOC 컬렉션 라이브러리. 매우 쓸모 있다.