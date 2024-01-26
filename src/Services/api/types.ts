export type TSearchCall = {
    q:string, 
    type:string
    token: string
}

export type TReturnSearchCall = {
    response: {
        artists:any,
        albums:any,
        tracks:any,
    },
    err:any
}

export type TGenresCall = {
    token: string
}

export type TReturnGenres = {
    response: {
        genres:any,
    },
    err:any
}
