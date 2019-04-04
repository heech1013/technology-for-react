/* Map */
const { Map, fromJS, List } = 'Immutable';

// 내부 객체들도 Map으로 감싸야 setIn, getIn을 활용할 수 있다.
const data1 = Map({
  a: 1,
  b: 2,
  c: Map({
    d: 3,
    e: 4,
    f: 5
  })
});

// fromJS를 사용하면 내부의 객체들은 Map으로 감싸지 않아도 된다.
const data2 = fromJS({
  a: 1,
  b: 2,
  c: {
    d: 3,
    e: 4,
    f: 5
  }
});

// Immutable 객체를 일반 객체로 변형한다.
const deserialize = data1.toJS();

// 특정 키의 값을 불러온다.
data1.get('a');

// Map 내부에 또 Map이 존재하고, 그 Map 안에 있는 키 값을 불러올 때는 getIn을 사용한다.
data1.getIn(['c', 'd']);

// 새 값을 설정할 때는 set을 사용한다.
const newData1 = data1.set('a', 4);
// set을 한다고 해서 기존 객체의 데이터가 변하는 것은 아니다. 주어진 변화를 적용한 새 Map을 만드는 것이다.
console.log(newData1 === data1);  // false

// Map 내부에 또 Map이 존재하고, 그 Map 안에 있는 키 값을 수정할 때는 setIn을 사용한다.
const newData2 = data1.set(['c', 'd'], 10);

// 여러 값을 동시에 설정할 때는 mergeIn을 사용한다.
// 예를 들어 c값과 d값, c값과 e값을 동시에 바꾸어야 할 때는 다음과 같이 입력한다.
// c 안에 있는 f값은 그대로 유지하면서 d값과 e값만 변경한다.
const newData3 = data1.mergeIn(['c'], { d: 10, e: 10 });
// 다음과 같이 입력할 수도 있다.
const newData4 = data1.setIn(['c', 'd'], 10)
                      .setIn(['c', 'e'], 10);
// 최상위에서 merge를 할 때는 다음과 같이 입력한다.
const newData5 = data1.merge({ a: 10, b: 10 });


/* List
  - Immutable 데이터 구조로써 배열 대신 사용한다.
  - 배열과 동일하게 map, filter, sort, push, pop 함수를 내장하고 있다.
  - 내장 함수를 실행하면 List 자체를 변경하는 것이 아니라, 새로운 List를 반환한다.
  - 리액트 컴포넌트는 List 데이터 구조와 호환되기 때문에, map 함수를 사용하여 데이터가
    들어있는 List를 컴포넌트 List로 변환하여 JSX에서 보여 주어도 제대로 렌더링된다.
*/

const list1 = List([0, 1, 2, 3, 4]);

// 객체들의 List를 만들어야 할 때는 다음과 같이 객체들을 Map으로 만들어야
// 추후 get과 set을 사용할 수 있다.
const list2 = List([
  Map({ value: 1}),
  Map({ value: 2})
]);
// fromJS를 사용하면 내부 배열은 List로 만들고, 내부 객체는 Map으로 만든다.
const list3 = fromJS([
  { value: 1},
  { value: 2}
]);

// List도 toJS를 사용하여 일반 배열로 변환할 수 있다. 내부의 Map들도 자바스크립트 객체로 변환된다.
console.log(list1.toJS);

// n번째 원소 값은 get(n)을 사용하여 읽어 온다.
list.get(0);

// 0번째 아이템의 객체의 value 값은 getIn을 사용하여 다음과 같이 읽어 온다.
list.getIn([0, 'value']);

// n번째 아이템을 수정해야 할 때는 set과 setIn을 사용한다.
// 원소를 통째로 바꾸고 싶을 때는 set을 사용한다.
const newList1 = list1.set(0, Map({value: 10}));

// List의 Map 내부 값을 변경하고 싶을 때는 다음과 같이 setIn을 사용한다.
const newList2 = list1.set([0, 'value'], 10);

// 다른 방법으로는 update가 있다.
// 값을 업데이트해야 하는데, 기존 값을 참조해야 할 때는 다음과 같이 update를 사용하면 편하다.
// 첫 번째 파라미터는 선택할 인덱스 값, 두 번째 파라미터는 선택한 원소를 업데이트하는 함수이다.
const newList3 = list1.updateIn(0, item => item.set('value', item.get('value') * 5));
// update를 사용하지 않는다면 다음과 같이 작성해야 한다.
const newList4 = list1.setIn([0, 'value'], list.getIn([0, 'value'] * 5));

// 아이템을 추가할 때는 push를 사용한다.
// push를 사용한다고 해서 Array처럼 기존 List 자체에 아이템을 추가하는 것은 아니다.
// 새 List를 반환하므로 안심하고 사용해도 된다.
const newList5 = list1.push(Map({value: 3}));

// 리스트 맨 뒤가 아니라 맨 앞에 데이터를 추가하고 싶다면 push 대신에 unshift를 사용한다.
const newList6 = list.unshift(Map({value: 0}));

// 아이템을 제거할 때는 delete를 사용한다. 파라미터로는 제거할 아이템의 index를 넣는다.
const newList7 = list1.delete(1);

// 마지막 아이템을 제거하고 싶다면 pop을 사용한다.
const newList8 = list1.pop();

// Array에서 배열 크기를 가져오려면 length를 참조하지만, List에서는 size를 참조해야 한다.
console.log(list1.size);

// 비어 있는지 확인하려면 isEmpty()를 사용할 수 있다.
list1.isEmpty();