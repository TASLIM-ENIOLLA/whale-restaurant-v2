import config from '/backend/config'

export default async function handler(_, res){

    config.connect.query(
        'SELECT * FROM food ORDER BY timestamp DESC',
        (error, result) => {
            res.status(200).json({
                type: 'success',
                data: result.map((each) => config.unescapeObjectValues(each))
            })
        }
    )
}
