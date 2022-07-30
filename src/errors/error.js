const errorCodes = {
    USER_ALREADY_EXISTS: {
        message: '이미 사용중인 이메일/이름입니다.',
        code: 'USER_ALREADY_EXISTS'
    },
    EMAIL_NOT_EXISTS: {
        message: '등록되지 않은 이메일입니다.',
        code: 'EMAIL_NOT_EXISTS'
    },
    PASSWORD_NOT_MATCH: {
        message: '비밀번호 오류입니다.',
        code: 'PASSWORD_NOT_MATCH'
    },
    AUTH_EXPIRED: {
        message: '인증이 만료되었습니다.',
        code: 'TOKEN_EXPIRED'
    },
    UNVALID_AUTH: {
        message: '로그인이 필요합니다.',
        code: 'UNVALID_TOKEN'
    },
    USER_NOT_FOUND: {
        message: '유저가 존재하지 않습니다.',
        code: 'USER_NOT_FOUND'
    }
}

export default errorCodes;