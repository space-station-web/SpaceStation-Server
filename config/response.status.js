// response.status.js

import { StatusCodes } from "http-status-codes";

export const status = {
    // success
    SUCCESS: {status: StatusCodes.OK, "isSuccess": true, "code": 2000, "message": "success!"},    

    // error
    // common err
    INTERNAL_SERVER_ERROR: {status: StatusCodes.INTERNAL_SERVER_ERROR, "isSuccess": false, "code": "COMMON000", "message": "서버 에러, 관리자에게 문의 바랍니다." },
    BAD_REQUEST: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "COMMON001", "message": "잘못된 요청입니다." },
    UNAUTHORIZED: {status: StatusCodes.UNAUTHORIZED, "isSuccess": false, "code": "COMMON002", "message": "권한이 잘못되었습니다." },
    METHOD_NOT_ALLOWED: {status: StatusCodes.METHOD_NOT_ALLOWED, "isSuccess": false, "code": "COMMON003", "message": "지원하지 않는 Http Method 입니다." },
    FORBIDDEN: {status: StatusCodes.FORBIDDEN, "isSuccess": false, "code": "COMMON004", "message": "금지된 요청입니다." }, 

    // post

    POST_NOT_FOUND: {status: StatusCodes.NOT_FOUND, "isSuccess": false, "code": "POST002", "message": "해당 글을 찾을 수 없습니다."},
    POST_TITLE_EMPTY: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "POST011", "message": "제목을 입력해 주세요."},
    POST_CONTENT_EMPTY: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "POST012", "message": "내용을 입력해 주세요."},
    POST_CONTENT_TOO_LONG: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "POST013", "message": "게시글 내용이 너무 깁니다. 65535자 이내로 작성해주세요."},
    POST_VISIBILITY_EMPTY: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "POST014", "message": "공개여부를 선택해 주세요."},
    POST_TIME_EMPTY: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "POST015", "message": "터뜨리기 시간을 설정해주세요."},


    // book
    WRONG_EXTENSION: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "BOOK001", "message": "허용된 파일 확장자가 아닙니다." },
}