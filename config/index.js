const dev = process.env.NODE_ENV !== 'production'

export const SIGNATURE = 'proteakuramowaters@2022'

export const SERVER = {
    FRONTEND: (
        (dev)
        ? 'http://localhost:3020/'
        : 'http://192.168.1.162:3020/'
    ),
    BACKEND: (
        (dev)
        ? ''
        : ''
    )
}
