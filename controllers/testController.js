export const testUserController = (req, res) => {
    try{
        res.status(200).send({
            success: true,
            message: 'test user DATA API',
        })
    }catch(error){
        console.log('error in TEST Api', error)
    }
}