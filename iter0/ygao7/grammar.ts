// the grammar
const grammar = `
@skip whitespace {
    board ::= row (',' row)* ';';
    row ::= cell (' ' cell)*;
    cell ::= star | empty;
    star ::= '1';
    empty ::= '0';

}
whitespace ::= [ \\t\\r\\n]+;
`;
