import foods from '/data/foods'

export default function handler(req, res){
    const {query: {foodID}} = req
    const [foodData] = foods.filter(({id}) => id == foodID)

    res.status(200).json({
        type: 'success',
        data: foodData
    })
}
