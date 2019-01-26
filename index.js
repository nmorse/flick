
//const source = "5 0.5 * 1 + -1 * -1 +";
//const source = "5 dup *";
const source = "6 7 +";

const parsed_code = source.split(' ');
const words = {
    '+': {fn:(a, b) => [+a + +b], arity:2},
    '*': {fn:(a, b) => [+a * +b], arity:2},
    'dup': {fn:(a) => [a, a],     arity:1},
    'drop': {fn:(a) => [],        arity:1},
    'swap': {fn:(a, b) => [b, a], arity:2},
    ']': {fn:() => [b, a], arity:2}
};
const run = (list) => {
  let stack = [];
  let stack_history = [];
  list.map((word) => {
    if(words[word]) {
        const arity = words[word].arity;
        const args = stack.splice(arity*-1, arity);
        stack = [ ...stack, ...words[word].fn( ...args) ];
    }
    else {
        stack.push(word);
    }
    stack_history.push([ ...stack ]);
  });
  return stack_history;
};

let content = document.getElementById('main-content');
content.innerHTML = 
`<div>${source}</div>
 <div>[${parsed_code}]</div>
 <div>[[${run(parsed_code).join("], [")}]]</div>
`;

