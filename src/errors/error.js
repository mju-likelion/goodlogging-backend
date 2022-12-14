const errorCodes = {
  USER_ALREADY_EXISTS: {
    message: '이미 사용중인 이메일/이름입니다.',
    code: 'USER_ALREADY_EXISTS',
  },
  EMAIL_NOT_EXISTS: {
    message: '등록되지 않은 이메일입니다.',
    code: 'EMAIL_NOT_EXISTS',
  },
  PASSWORD_NOT_MATCH: {
    message: '비밀번호 오류입니다.',
    code: 'PASSWORD_NOT_MATCH',
  },
  AUTH_EXPIRED: {
    message: '인증이 만료되었습니다.',
    code: 'TOKEN_EXPIRED',
  },
  UNVALID_AUTH: {
    message: '로그인이 필요합니다.',
    code: 'UNVALID_TOKEN',
  },
  USER_NOT_FOUND: {
    message: '유저가 존재하지 않습니다.',
    code: 'USER_NOT_FOUND',
  },
  UNAUTHORIZED: {
    message: '권한이 없습니다.',
    code: 'UNAUTHORIZED',
  },
  FILE_NOT_PROVIDED: {
    message: '파일이 제공되지 않았습니다.',
    code: 'FILE_NOT_PROVIDED',
  },
  PLOGGING_BAD_REQUEST: {
    message: '플로깅 요청이 올바르지 않습니다.',
    code: 'PLOGGING_BAD_REQUEST',
  },
  SORT_BAD_REQUEST: {
    message: '정렬 기준이 올바르지 않습니다.',
    code: 'SORT_BAD_REQUEST',
  },
  BOARD_BAD_REQUEST: {
    message: '게시물 요청이 올바르지 않습니다.',
    code: 'BOARD_BAD_REQUEST',
  },
};

export default errorCodes;
