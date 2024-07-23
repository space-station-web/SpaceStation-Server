// question.dto.js

export const questionResponseDTO = (question) => {
    return {
        "id": question.id,
        "content": question.content,
        "date": question.date
    };
};

export const getqnaDTO = (data) => {
    let result = [];
    for (let i = 0; i < data.length; i++) {
        let item = data[i];
        result.push({
            question_id: item.question_id,
            question_content: item.question_content,
            answer_content: item.answer_content
        });
    }
    return result;
}
  