package serverhandlers

import (
	"back-end/pkg/structs"
	"net/http"
)

func (q *QuestionHandler) GetPersonalQuestions(w http.ResponseWriter, r *http.Request) {
	var ctxKey structs.CtxKey
	values := r.Context().Value(ctxKey).(map[string]interface{})
	_ = values["userId"].(int)

}
