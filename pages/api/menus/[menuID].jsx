import menus from '/data/menus'

export default function handler(req, res){
    const {query: {menuID}} = req
    const [menuData] = menus.filter(({id}) => id == menuID)

    res.status(200).json({
        type: 'success',
        data: menuData
    })
}
