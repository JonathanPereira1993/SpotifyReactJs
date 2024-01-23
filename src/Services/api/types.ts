export type TSearchCall = {
    q:string, 
    type:string
}

export type TReturnSearchCall = {
    response: {
        artists:any,
        albums:any,
        tracks:any,
    },
    err:any
}