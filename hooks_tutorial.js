// Applied from React v16.8. If you want to use hooks in react app, you have to update modules in app like 'react-dom' etc.

/* State Hook ****************************************************************/
import React, { useState } from 'react';

function Example1() {
  const [count, setCount] = useState(0);  // useState returns a pair: the current state and a function that lets you update it.
  // Only argument to useState() is initial state. The state here doesn't have to be object.

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
/* ---------------- */

function ExampleWithManyStates() {  // You can use State Hook more than once in a single component.
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }])
}
/* ---------------- */

/* Effect Hook ****************************************************************/
// 'side effect' (or 'effect') : Operation like data fetching, subscription, manually changing the DOM from react components before
// useEffect serve same purpose as componentDidMount, componentDidUpdate, componentWillMount, but unified in a single API.
import react, { useState, useEffect } from 'react';

function Example2() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate.
  useEffect(() => {  // You are telling React to run your 'effect' after flusing change to the DOM. (By default, react runs effects after every render.)
    // Update the document title using browser API.
    document.title = `You clicked ${count} times.`;  // Effects are declared inside the component so they have access to its states and props.
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
/* ---------------- */
// If you do something at 'ComponentWillUnmount' or 'ComponentWillUpdate', return 'cleanup' function.
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status){
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFreindStatus(props.friend.id, handleStatusChange);  // Subscribe friend's status.

    return () => {
      ChatAPI.unsubscribeToFreindStatus(props.friend.id, handleStatusChange);  // Clean up by unsubscribing from it.
    };
  });  // React would unsubscribe from ChatAPI when the component unmounts.

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
/* ---------------- */

// If you want to cleanup only when 'componentDidUnmount', pass [] to second parameter of useEffect() (with return cleanup function.).
useEffect(() => {
  console.log('effect');
  return () => {
    console.log('cleanup');
  }
},[]);

// You can use more than one effect in a component.
function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }
  // ... 
}
/* ---------------- */

// If you want to run effect only after mounting at first, not in every update, you can do like this.
useEffect(() => {
  console.log('run only at mount.');
}, []);
/* ---------------- */

// If you want to run effect only in specific condition, you did like this.
componentDidUpdate(prevProps, prevState) {
  if (prevProps.value !== this.props.value) {
    doSomething();
  }
}
// But you can do like this with hooks.
useEffect(() => {
  console.log('Only run if condition is tested in array.');
}, [name]);
/* ---------------- */





/* Rules of Hooks ****************************************************************/
// 1. Only call hooks at the top level. Not in loops, nested functions, conditions.
// 2. Only call hooks from React function components. Or you can call in your own custom hooks.
// (We provide a linter plugin to enforce these rules automatically.
// We understand these rules might seem limiting or confusing at first, but they are essential to making Hooks work well.)

/* Custom Hooks: building your own hooks ****************************************************************/
// We can re-use the same login 'with FriendStatus' in above example.
import React, { useState, useEffect } from 'react';

function useFriendStatus(friendID) {  // extract logic from FriendStatus.
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
  
  return isOnline;
}
/* ---------------- */

// Now we can use it from both components.
function FriendStatus2(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) return null;
  return isOnline ? 'Online' : 'Offline';
}

function FriendsListItem(props) {
  const isOnline = useFriendStatus(props.friend.id)

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
/* ---------------- */
// The state from two components is independent. Custom hooks are the way of re-use stateful login, not state itself.
// The useSomething naming convention is how our linter plugin is able to find bugs in the code using Hooks.

/* useContext ****************************************************************/
import React, { createContext, useContext } from 'react';

const ThemeContext = createContext('black');
const ContextSample = () => {
  const theme = useContext(ThemeContext);
  const style = {
    width: '24px',
    height: '24px',
    background: theme
  };
  return <div style={style}/>
};

export default ContextSample;
/* ---------------- */

/* useReducer ****************************************************************/
// In Redux, action object must have type field. But action object that useReducer use doesn't have to bring type. Even, it's ok if action is string or number.
// Most good thing for useReducer is that you can split out component logic out of component. (?)
import React, { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { value: state.value + 1 };
    case 'DECREMENT':
      return { value: state.value - 1 };
    default:
      return state;
  }
}

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, { value: 0 });  // First param: reducer, second param: initial State
  return (
    <div>
      <p>
        Current counter value is <b>{state.value}</b> .
      </p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+1</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-1</button>
    </div>
  );
};

export default Counter;
/* ---------------- */

import React, { useReducer } from 'react';

function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value
  };
}

const Info = () => {
  const [state, dispatch] = useReducer(reducer, {
    name: '',
    nickname: ''
  });
  const { name, nickname } = state;
  const onChange = e => {
    dispatch(e.target);
  };

  return (
    <div>
      <div>
        <input name="name" value={name} onChange={onChange} />
        <input name="nickname" value={nickname} onChange={onChange} />
      </div>
      <div>
        <div>
          <b>이름:</b> {name}
        </div>
        <div>
          <b>닉네임: </b>
          {nickname}
        </div>
      </div>
    </div>
  );
};

export default Info;