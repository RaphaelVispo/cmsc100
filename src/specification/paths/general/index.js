export const general ={
    '/':{
        get:{
            summary: 'API general',
            operationId: 'general',
            responses: {
                200: {
                    description: 'successful response',
                    content :{
                        'application/json':{
                            schema:{
                                type: 'object',
                                properties:{
                                    success:{
                                        type: 'boolean'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

