const expect = require('expect');

const {Users} = require('./users');

describe('Users',()=>{

    beforeEach(()=>{
        users = new Users();
        users.users = [{
            id:'1',
            name:'Mika',
            room:'Node course'
        },{
            id:'2',
            name:'Ali',
            room:'Node course'
        },
        {
            id:'3',
            name:'mia',
            room:'Node course'
        }]
    });

    it('should add new',()=>{
        var users = new Users();
        var user = {
            id: '1234',
            name:'Andrew',
            room:'The offie'
        };
        var resUser = users.addUser(user.id,user.room);
        expect(users.users).toEqual([resUser]);
    });


    it('should remove a user',()=>{
        var userId = '1';
        var user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user',()=>{
        var userId = '99';
        var user = users.removeUser(userId);

        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('should find user',()=>{
        var userId = '2';
        var user = users.getUser(userId);

        expect(user.id).toBe(userId);
    });

    it('should not find user',()=>{
        var userId = '99';
        var user = users.getUser(userId);

        expect(user).toNotExist();
    });

    it('should return names for node course',()=>{
        var userList = users.getUserList('Node course');

        expect(userList).toEqual(['Mika','mia'])
    });

    
    it('should return names for node course',()=>{
        var userList = users.getUserList('react course');

        expect(userList).toEqual(['Andrew']);
    });


});