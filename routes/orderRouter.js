const {Router} = require('express');
const asyncHandler = require('../middlewares/async-handler');
const orderService = require('../services/orderService');
// 현재 사용자가 로그인했는지 체크하는 미들웨어 적용
const reqUserCheck = require('../middlewares/reqUserCheck');

const router = Router();

// create (bodyData : required -> address, total_price / not required -> delivery_request)
router.post('/', reqUserCheck, asyncHandler(async (req, res) => {
    const bodyData = req.body;
    const result = await orderService.createOrder(bodyData);
    return res.status(201).json(result);
}));

// find all
router.get('/', asyncHandler(async (req, res) => {
    const result = await orderService.findAllOrder();
    return res.status(200).json(result);
}));

// findOne
router.get('/:nanoid', asyncHandler(async (req, res) => {
    const {nanoid} = req.params;
    const result = await orderService.findById({nanoid});
    return res.status(200).json(result);
}));

// update (bodyData : address or total_price or delivery_request)
router.put('/:nanoid', reqUserCheck, asyncHandler(async (req, res) => {
    const {nanoid} = req.params;

    // 접근한 사용자가 is_admin === true 일 경우 수정이 가능함.
    if(req.user.is_admin === false){
        throw new Error("접근할 수 없는 요청입니다.");
    }

    const bodyData = req.body;
    const result = await orderService.updateById({nanoid}, bodyData);
    return res.status(200).json(result);
}));


// delete
router.delete('/:nanoid', reqUserCheck, asyncHandler(async (req,res) => {
    const {nanoid} = req.params;

    // 접근한 사용자가 is_admin === true 일 경우 삭제가 가능함.
    if(req.user.is_admin === false){
        throw new Error("접근할 수 없는 요청입니다.");
    }

    const result = await orderService.deleteById({nanoid});
    return res.status(200).json(result);
}));




module.exports = router;