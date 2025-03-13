//JSON Daten, Backend antwortet mit dem und durch API wird es zurückgegeben, damit es im Frontend angezeigt werden kann
export interface Question {
    _id: number,
    correctAnswer: String,
    explanation: String,
    options: [String],
    questions: string;
    category: String;
}
