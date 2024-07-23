// response.status.js

import { StatusCodes } from "http-status-codes";

export const status = {
    // success
    SUCCESS: {status: StatusCodes.OK, "isSuccess": true, "code": 200, "message": "success!"},    

    // error
    // common err
    INTERNAL_SERVER_ERROR: {status: StatusCodes.INTERNAL_SERVER_ERROR, "isSuccess": false, "code": "COMMON000", "message": "서버 에러, 관리자에게 문의 바랍니다." },
    BAD_REQUEST: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "COMMON001", "message": "잘못된 요청입니다." },
    UNAUTHORIZED: {status: StatusCodes.UNAUTHORIZED, "isSuccess": false, "code": "COMMON002", "message": "권한이 잘못되었습니다." },
    METHOD_NOT_ALLOWED: {status: StatusCodes.METHOD_NOT_ALLOWED, "isSuccess": false, "code": "COMMON003", "message": "지원하지 않는 Http Method 입니다." },
    FORBIDDEN: {status: StatusCodes.FORBIDDEN, "isSuccess": false, "code": "COMMON004", "message": "금지된 요청입니다." }, 
 
    NOT_CREATED: {status: StatusCodes.INTERNAL_SERVER_ERROR, "isSuccess": false, "code": "COMMON010", "message": "데이터베이스 생성 실패했습니다."},
    NOT_SEARCHED: {status: StatusCodes.INTERNAL_SERVER_ERROR, "isSuccess": false, "code": "COMMON011", "message": "데이터베이스 조회 실패했습니다."},
    NOT_UPDATED: {status: StatusCodes.INTERNAL_SERVER_ERROR, "isSuccess": false, "code": "COMMON012", "message": "데이터베이스 수정 실패했습니다."},
    NOT_DELETED: {status: StatusCodes.INTERNAL_SERVER_ERROR, "isSuccess": false, "code": "COMMON013", "message": "데이터베이스 삭제 실패했습니다."},

    // post
    POST_NOT_FOUND: {status: StatusCodes.NOT_FOUND, "isSuccess": false, "code": "POST002", "message": "해당 글을 찾을 수 없습니다."},
    POST_TITLE_EMPTY: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "POST011", "message": "제목을 입력해 주세요."},
    POST_CONTENT_EMPTY: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "POST012", "message": "내용을 입력해 주세요."},
    POST_CONTENT_TOO_LONG: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "POST013", "message": "게시글 내용이 너무 깁니다. 65535자 이내로 작성해주세요."},
    POST_VISIBILITY_EMPTY: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "POST014", "message": "공개여부를 선택해 주세요."},
    POST_TIME_EMPTY: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "POST015", "message": "터뜨리기 시간을 설정해주세요."},
    POST_UNAUTHORIZED: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "POST016", "message": "해당 글의 작성자만 이용할 수 있는 서비스 입니다."},

    // book
    WRONG_EXTENSION: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "FILE001", "message": "허용된 파일 확장자가 아닙니다." },
    WRONG_QUERY: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "QUERY001", "message": "잘못된 QUERY String 입니다." },
    WRONG_PATH: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "PATH001", "message": "잘못된 PATH String 입니다." },

    BOOK_NOT_FOUND: {status: StatusCodes.NOT_FOUND, "isSuccess": false, "code": "BOOK001", "message": "해당 책을 찾지 못했습니다."},
    BOOK_CONTENT_NOT_FOUND: {status: StatusCodes.NOT_FOUND, "isSuccess": false, "code": "BOOK002", "message": "해당 목차를 찾지 못했습니다."},
    BOOK_UNAUTHORIZED: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "BOOK020", "message": "해당 책의 작성자만 이용할 수 있는 서비스 입니다."},

    // question
    QUESTION_ANSWER_ALREADY: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "QUESTION001", "message": "오늘의 질문에 이미 답변을 하셨습니다. 수정을 원하시면 수정하기를 선택해주세요."},
    QUESTION_NOT_FOUND: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "QUESTION001", "message": "오늘의 질문을 찾지 못했습니다. 관리자에게 문의해주세요."},
    QUESTION_UNAUTHORIZED: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "BOOK020", "message": "해당 답변의 작성자만 이용할 수 있는 서비스 입니다."},
}