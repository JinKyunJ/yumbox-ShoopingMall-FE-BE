const {User} = require('../models');

class UserService {
    /* create (bodyData : required: true -> email, name, password, address
                        / required: false -> birthday, gender)
    */
    async createUser(bodyData){
        const {email} = bodyData;
        const user = await User.findOne({email});
        if(user){
            const result = {
                value : "fail",
                data : "이미 회원가입 되어 있는 이메일입니다."
            };
            return result;
        } else {
            const newUser = await User.create(bodyData);
            const result = {
                value : "ok",
                data : newUser
            };
            return result;
        }
    }

    // find all
    async findAllUser(){
        const users = await User.find();
        if(users.length === 0){
            const result = {
                value : "fail",
                data : "조회된 회원이 없습니다."
            };
            return result;
        }
        const result = {
            value : "ok",
            data : users
        };
        return result;
    }

    // findOne by nanoid
    async findById({nanoid}) {
        const user = await User.findOne({nanoid});
        if(!user){
            const result = {
                value : "fail",
                data : "조회된 회원이 없습니다."
            };
            return result;
        }
        const result = {
            value : "ok",
            data : user
        };
        return result;
    }

    // findOne by email
    async findByEmail({email}) {
        const user = await User.findOne({email});
        if(!user){
            const result = {
                value : "fail",
                data : "이메일로 조회된 회원이 없습니다."
            };
            return result;
        }
        const result = {
            value : "ok",
            data : user
        };
        return result;
    }

    // update by nanoid (bodyData : name or password or address or birthday or gender)
    async updateById({nanoid}, bodyData){
        const user = await User.findOne({nanoid});
        if(!user){
            const result = {
                value : "fail",
                data : "조회된 회원이 없습니다."
            };
            return result;
        } else {
            await User.updateOne(user, bodyData);
            const result = {
                value : "ok",
                data : `${nanoid} 사용자 수정 동작 완료`
            };
            return result;
        }
    }

    // update by email (bodyData : name or password or address or birthday or gender)
    async updateByEmail({email}, bodyData){
        const user = await User.findOne({email});
        if(!user){
            const result = {
                value : "fail",
                data : "조회된 회원이 없습니다."
            };
            return result;
        } else {
            await User.updateOne(user, bodyData);
            const result = {
                value : "ok",
                data : `${email} 사용자 수정 동작 완료`
            };
            return result;
        }
    }

    // delete by nanoid
    async deleteById({nanoid}) {
        const user = await User.findOne({nanoid});
        if(!user){
            const result = {
                value : "fail",
                data : "조회된 회원이 없습니다."
            };
            return result;
        } else {
            await User.deleteOne(user);
            const result = {
                value : "ok",
                data : `${nanoid} 사용자 삭제 동작 완료`
            };
            return result;
        }
    }

    // delete by email
    async deleteByEmail({email}) {
        const user = await User.findOne({email});
        if(!user){
            const result = {
                value : "fail",
                data : "조회된 회원이 없습니다."
            };
            return result;
        } else {
            await User.deleteOne(user);
            const result = {
                value : "ok",
                data : `${email} 사용자 삭제 동작 완료`
            };
            return result;
        }
    }
}

const userService = new UserService();
module.exports = userService;