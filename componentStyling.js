<Fragment>

/****************************** 일반 CSS **********************************/
* 클래스명이 중복되지 않아야 한다.
- 방법 1: '컴포넌트명-클래스'로 네이밍하기
(App.css)
.App {
  text-align: center;
}
.App-logo {
  height: 40vmin;
}

(App.js)
<div className="App">
  <img className="App-logo"/>
</div>

- 방법 2: CSS Selector 활용하기
(App.css)
.App {
  text-align: center;
}
.App .logo {
  height: 40vmin;
}

(App.js)
<div className="App">
  <img className="logo"/>
</div>

/****************************** Sass **********************************/
* node-sass 설치 ($ yarn add node-sass)
* 자주 사용하는 변수와 믹스인을 utils.scss로 분리시킨 후,
  상대 경로 없이 불러오거나 불러오지 않고도 모든 파일에 적용시키는 법
  https://velog.io/@velopert/react-component-styling

(SassComponent.scss)
// 변수 사용
$red: #fa5252;
// mixin 만들기 (재사용되는 스타일 블록을 함수처럼 사용 가능)
@mixin square($size) {
  $calculated: 32px * $size;
}
.SassComponent {
  display: flex;
  .box {
    background: red;  // 일반 CSS에선 .SassComponent .box
    &.red {  // .red 클래스가 .box와 함께 사용되었을 때
      background: $red;
      @include square(1);
    }
  }
}

(SassComponent.js)
import './SassComponent.scss';
const SassComponent = () => {
  return (
    <div className="SassComponent">
      <div className="box red" />
    </div>
  )
}

* node_modules에서 불러오기 (yarn이나 npm을 통해 설치한 Sass 라이브러리를 불러오는 방법)
- 방법 1: 기본
@import '../../../node_modules/library/styles';
- 방법 2: ~ 사용
@import '~library/this.styles';

/****************************** CSS Module **********************************/
* CSS 클래스를 불러와서 사용할 때 [파일이름]_[클래스이름]__[해쉬값] 형태로, 클래스 네임을 자동으로
  고유한 값으로 만들어주어 컴포넌트 스타일 중첩 현상을 방지해주는 기술.
* [파일이름].module.css 로 파일을 저장해야 한다.

(CSSModule.module.css)
.wrapper {
  background: black;
}
.inverted {
  color: black;
}
:global .something {  // 클로벌 CSS 작성
  font-weight: 800;
}

(src/CSSModule.js)
import styles from './CSSModule.module.css';
const CSSModule = () => {
  return (
    <div className={style.wrapper}>
      <span className="something"/>
    </div>
    클래스 이름을 두 개 이상 적용할 때
    <div className={`${styles.wrapper} ${styles.inverted}`}></div>
  )
}

* classNames: CSS 클래스를 조건부로 설정할 때/CSS moudle을 사용하여 여러 클래스 적용할 때 유용
  ($ yarn add classnames)
import classNames from 'classnames';
classNames('one', 'two');  // 'one two'
classNames('one', { two: true });  // 'one two'
classNames('one', { two: false });  // 'one'
classNames('one', ['two', 'three']);  // 'one two'
const myClass = 'hello';
classNames('one', myClass, { myCondition: true }); //'one hello myCondition'

* classnames/bind: styles.[클래스]로 할 필요 없이, cx('class1', 'class2') 형태로 사용 가능
import classNames from 'classnames/bind';
import styles from './CSSModule.module.css';
const cx = classNames.bind(styles);  // 미리 styles에서 클래스를 받아오도록 설정.
const CSSModule = () => {
  return (
    <div className={cx('wrapper', 'inverted')}></div>
  )
}

* Sass와 CSS Module 함께 사용하기: 파일이름 뒤에 .module.scss 입력 시
(CSSModule.module.scss)
.wrapper {
  background: black;
  &.inverted {  // inverted가 .wrapper와 함께 사용되었을 때만 적용
    color: black;
  }
}
:global {  // 글로벌 css를 작성하고 싶을 때
  .something {
    font-weight: 500;
  }
}

* CSS Module이 아닌 파일에서 CSS Module 사용하기
:local .wrapper {
  (스타일)
}
:local {
  .wrapper {
    (스타일)
  }
}

/****************************** styled-component **********************************/
* 제일 잘 나가는 CSS-in-JS 라이브러리
* $ yarn add styled-component

(src/StyledComponent.js)
import styled, { css } from 'styled-component';
const Box = styled.div`
  background: ${props => props.color || 'blue'};  // props로 넣어준 값을 직접 전달해줄 수 있다.
  padding: 1rem
`;
const Button = styled.button`
  background: white;
  &:hover {  // & 를 사용하여 Sass처럼 자기 자신 선택 가능
    background: rgba(255, 255, 255, 0.9);
  }
  ${props =>
    props.inverted &&
    css`
      background: none;
      &:hover {
        background: white;
      }
    `};
  & + button {
    margin-left: 1rem;
  }  
`;
const StyledComponent = () => {
  <Box color="black">
    <Button inverted={true}>Hi</Button>
  </Box>
}

* Tagged Template Literal: ``를 사용할 때 내부에 전달된 JS 객체나 함수를 추출하기 위함
- 기존
`hello ${{foo: 'bar'}} ${() => 'world'}!`
// 결과: "hello [object object] () => 'world'!"
- 적용
function tagged(...args) {
  console.log(args);
}
tagged`hello ${{foo: 'bar'}} ${() => 'world'}!`

* 보여주어야 할 태그 형식이 유동적이거나, 특정 컴포넌트에 스타일링을 해야 할 때
// 문자열을 styled의 인자로 전달
const MyInput = styled('input')`
  background: gray;
`
// 아예 컴포넌트 형식의 값을 넣어줌
const StyledLink = styled(Link)`
  color: blue;
`

* 반응형 디자인
const Box = styled.div`
  display: flex;
  // 기본적으로 1024px에 가운데 정렬을 하고, 가로 크기가 작아짐에 따라 사이즈를 줄이고
  // 768px 미만으로 되면 꽉 채운다.
  width: 1024px;
  margin: 0 auto;
  @media (max-width: 1024px) {
    width: 768px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

* 위 작업을 함수화하여 더 쉽게 할 수도 있다.
https://velog.io/@velopert/react-component-styling






</Fragment>