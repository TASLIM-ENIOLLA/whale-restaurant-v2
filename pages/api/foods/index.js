import config from '/backend/config'

export default async function handler(_, res){

    config.connect.query(
        'SELECT food.*, menu.name AS menu_name FROM food LEFT JOIN menu ON food.menu_id = menu.id ORDER BY timestamp DESC',
        (error, result) => {
            res.status(200).json({
                type: 'success',
                data: result.map((each) => config.unescapeObjectValues(each))
            })
        }
    )
}
