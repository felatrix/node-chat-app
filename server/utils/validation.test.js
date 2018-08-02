const expect = require('expect');
//import isRealString
const {isRealString} = require('./validation');

//isRealString
    //should reject non string value
    //should reject string with only space
    //should allow string with non-space


    describe('isRealString', ()=>{
        it('should reject non-string values' ,()=>{

            var res = isRealString(98);
            expect(res).toBe(false);
        });
        it('it should reject string with only space',()=>{
            var res = isRealString('     ');
            expect(res).toBe(false);
        });

        it('should allow string allow with non space sharacters',()=>{
            var res = isRealString('   Andrew  ');
            expect(res).toBe(true);
        });
    });