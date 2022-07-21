const errorCodes = {
    EMAIL_ALREADY_EXISTS: {
        message: '이미 사용중인 이메일입니다.',
        code: 'EMAIL_ALREADY_EXISTS'
    },
    EMAIL_NOT_EXISTS: {
        message: '등록되지 않은 이메일입니다.',
        code: 'EMAIL_NOT_EXISTS'
    },
    PASSWORD_NOT_MATCH: {
        message: '비밀번호 오류입니다.',
        code: 'PASSWORD_NOT_MATCH'
    }
}

export default errorCodes;